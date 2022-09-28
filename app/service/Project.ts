import { Service } from 'egg';
import crypto from 'crypto';
import { Op } from 'sequelize';
// const crypto = require('crypto');
// const { Op } = require("sequelize");

import { initProject } from '../shell/init';

/**
 * Create Service
 */
export default class Project extends Service {

  /**
   * --- 创建项目 ---
   * @param name - project name
  */
  public async createProject(
    name: string,
    userId: number,
    type: string,
    description?: string,
    isCreateEagle?: boolean,
  ) {
    // -- 生成随机数 创建项目 --
    const app_key = crypto.randomBytes(12).toString('hex').slice(0, 22);

    // -- 检查 name 是否已经存在 --
    const option: any = {
      where: {
        name,
        app_key,
      },
    };
    const result = await this.ctx.model.Project.count(option);
    if (result) {
      return {
        code: 110,
        data: '',
        msg: '项目已存在，请修改项目名称后重试',
      };
    }

    const data = await this.ctx.model.Project.create({
      name,
      app_key,
      version: '1.0.0',
    });

    const project_id: number = data.dataValues.id;
    // ---- 创建权限 ----
    await this.addProjectRule(userId, project_id, 'admin');

    /**
     * ------- **核心** -------
     * ---- 进入 D-One 创建项目流程 ----
     */
    await initProject(
      name,
      type || 'vite-react-ts',
      description || 'd-one create project',
      isCreateEagle,
    );

    return {
      code: 200,
      data: app_key,
      msg: 'success',
    };
  }

  /**
   * --- 添加项目权限 ---
   * @param user_id
   * @param project_id
   * @param rule
  */
  public async addProjectRule(
    user_id: number,
    project_id: number,
    rule: string,
  ) {
    const code = `project_${project_id}_${rule}`;

    await this.ctx.model.RuleRoles.create({
      user_id,
      code,
    });
    // ---- 创建项目详细权限 ----
    if (rule === 'admin') {
      const arr: any = [];
      const rule_arr = [ 'R', 'U', 'D' ];
      rule_arr.forEach((item: any) => {
        arr.push({
          project_id,
          role_code: code,
          operation: item,
        });
      });
      await this.ctx.model.RulePermission.bulkCreate(arr);
    } else if (rule === 'view') {
      await this.ctx.model.RulePermission.create({
        project_id,
        role_code: code,
        operation: 'R',
      });
    }
    return true;
  }

  /**
   * --- 查询项目 ---
   * @param { String } app_key
   * @returns Object
  */
  public async getProject(app_key: string) {
    const option: any = {
      where: {
        app_key,
      },
    };
    const result = await this.ctx.model.Project.findOne(option);
    return {
      code: 200,
      data: result,
      msg: 'success',
    };
  }

  /**
   * --- 查询项目列表 ---
   * @param id
  */
  public async getProjectList(name?: string) {

    // ---- 找到 user_id 对应的权限 ----
    const user_role_list = await this.ctx.service.common.getUserRoleList();
    const role_code_array = user_role_list.map((item: any) => {
      return {
        role_code: item.code,
      };
    });
    // ---- 根据权限找到 project ----
    const option: any = {
      where: {
        [Op.or]: role_code_array,
        operation: 'R',
      },
      attributes: [ 'project_id' ],
      group: 'project_id',
    };
    const result = await this.ctx.model.RulePermission.findAll(option);

    // ---- 返回 project List ----
    const array = await this.getProjectDetailList(result, name || '');

    return {
      data: array,
      code: 200,
      msg: 'success',
    };
  }

  /**
   * --- 根据项目 ID 返回项目详情列表 ---
   * @param project_list { Array<string> }
   * @return project_list
  */
  public async getProjectDetailList(project_list: Array<any>, name: string) {
    const project_array = project_list.map((item: any) => {
      return item.project_id;
    });
    const option: any = {
      where: {
        id: project_array,
        name: {
          [Op.like]: `${name}%`,
        },
      },
    };
    const result = await this.ctx.model.Project.findAll(option);
    return result;
  }


  /**
   * --- 设置项目配置 ---
   * @param app_key string
   * @param name    string
   * @return project
  */
  public async setProjectConfig(
    id: string,
    name: string,
  ) {
    const config = {
      name,
    };
    const option: any = {
      where: {
        id,
      },
    };
    await this.ctx.model.Project.update(config, option);


    return {
      code: 200,
      result: 'success',
      msg: 'success',
    };
  }
}
