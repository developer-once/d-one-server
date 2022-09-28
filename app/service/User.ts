import { Service } from 'egg';
import crypto from 'crypto';
import { Op } from 'sequelize';
// const { Op } = require('sequelize');
// const crypto = require('crypto');

/**
 *  User service
 */
export default class User extends Service {

  /**
   * --- 获取用户信息 ---
   * @param { string } name - user name
   * @param { string } email - user email
   * @param { string } password - user password
   */
  public async getUser(
    email: string,
    password: string,
  ) {
    const result = await this.checkUserMessage(email, password);
    // 未找到用户 或账号密码不对
    if (!result) {
      return {
        code: 301,
        data: '',
        msg: '邮箱或密码错误',
      };
    }
    await this.setUserCookie(email);
    return {
      code: 200,
      data: {
        email: result.result,
        name: result.name,
        id: result.id,
      },
      msg: 'success',
    };
  }

  /**
   * --- 确认用户信息 ---
   * @param email
   * @param password
   */
  public async checkUserMessage(
    email: string,
    password: string,
  ) {
    // -- 检查 用户名/邮箱 是否已经存在 --
    const option: any = {
      where: {
        email,
      },
    };
    const result = await this.ctx.model.User.findOne(option);
    if (!result) {
      return false;
    }
    const salt = result.salt;
    const db_hash = result.password;
    // ------ TODO - md5.digest 如果参数与上次相同则会触发报错 ------
    const md5 = crypto.createHash('md5');
    md5.update(password + salt);

    if (!(md5.digest('hex') === db_hash)) {
      return false;
    }

    return result;
  }

  /**
   * --- 设置用户信息进入 cookie ---
   * @param { string } email - user email
   * @param { string } password - user password
   */
  public async setUserCookie(
    email: string,
  ) {
    const cookie = crypto.randomBytes(12).toString('hex').slice(0, 22);
    this.ctx.cookies.set('d-one', `${email}#${cookie}`, {
      httpOnly: true,
      // 加密传输
      encrypt: true,
      // 登录 cookie 7 天有效
      maxAge: new Date()?.getTime() + 86400 * 1000 * 7,
      overwrite: true,
      signed: true,
    });
    await this.app.redis.set(`cookie-${email}`, cookie, 'px', 86400 * 1000 * 7);
  }

  /**
   * --- 设置用户信息进入 cookie ---
   * @param { string } email - user email
   * @param { string } password - user password
   */
  public async cleanUserCookie() {
    this.ctx.cookies.set('d-one', '', {
      maxAge: 1,
    });
  }

  /**
   * --- 创建用户 ---
   * @param { string } name - user name
   * @param { string } email - user email
   * @param { string } password - user password
   */
  public async createUser(
    name: string,
    email: string,
    password: string,
  ) {
    // -- 检查 用户名/邮箱 是否已经存在 --
    const option: any = {
      where: {
        [Op.or]: [
          {
            name,
          },
          {
            email,
          },
        ],
      },
    };
    const result = await this.ctx.model.User.count(option);
    if (result) {
      return {
        code: 110,
        data: '',
        msg: '用户名或邮箱已存在，请修改后重试',
      };
    }
    const salt = crypto.randomBytes(4).toString('hex');
    const md5 = crypto.createHash('md5');
    md5.update(password + salt);

    await this.ctx.model.User.create({
      name,
      email,
      password: md5.digest('hex'),
      salt,
    });

    return {
      code: 200,
      data: '',
      msg: 'success',
    };
  }
}
