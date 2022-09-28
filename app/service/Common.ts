import { Service } from 'egg';
// const { Op, literal, fn } = require("sequelize");

export default class Common extends Service {

  /**
   * @description 查询用户 email
   * @return email { string }
   */
  public async getUserEmail() {
    const { ctx } = this;
    // --- 获取 cookie ---
    let cookie: any = ctx.cookies.get('d-one', {
      signed: true,
      encrypt: true,
    });
    cookie = cookie?.split('#') || [];
    const email = cookie[0] || '';
    if (email) {
      return email;
    }

    return false;
  }

  /**
   * @description 查询用户 ID
   * @param email { String }
   * @return id { number }
   */
  public async getUserId(email: string) {
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

    return result.id;
  }

  /**
   * @description 查询用户全部信息
   * @return user
   */
  public async getUser() {
    const email = await this.getUserEmail();
    if (!email) { return false; }

    const userId = await this.getUserId(email);

    if (userId) {
      return {
        id: userId,
        email,
      };
    }
  }

  /**
   * @description 获取用户的权限角色
   * @param user_id { String }
   * @return role_list
   */
  public async getUserRoleList() {
    const email = await this.ctx.service.common.getUserEmail();
    if (!email) { return false; }

    const userId = await this.getUserId(email);
    const option: any = {
      where: {
        user_id: userId,
      },
    };
    const result = await this.ctx.model.RuleRoles.findAll(option);
    if (!result) {
      return [];
    }

    return result;
  }

}
