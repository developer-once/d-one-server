import BaseController from './BaseController';

/**
 * ProjectController
 * @controller ProjectController
 */
export default class ProjectController extends BaseController {

  /**
   * @summary 创建项目
   * @router post /project/create
   * @request query string name 项目名称
   * @request query string type 项目类型
   * @request query string description 项目描述详情
   * @request query string description 项目描述详情
   * @response 200 SuccessBody 返回结果
   */
  public async create() {
    const { ctx } = this;
    const { name, type, description = '' } = ctx.request.body;
    // --- 获取 cookie ---
    const email = await ctx.service.common.getUserEmail();
    if (email) {
      const userId = await ctx.service.common.getUserId(email);
      ctx.body = await ctx.service.project.createProject(name, userId, type, description);
    }
  }

  /**
   * @summary 查询项目
   * @router get /project/get
   * @request query string app_key 项目 app_key
   * @response 200 SuccessBody 返回结果
   */
  public async getProject() {
    const { ctx } = this;
    const { app_key } = ctx.request.query;
    const data: any = await ctx.service.project.getProject(app_key);

    ctx.body = {
      code: 200,
      data,
      msg: 'success',
    };
  }

  /**
   * @summary 查询用户项目列表
   * @router get /project/get/list
   * @request query string name 项目名称
   * @response 200 SuccessBody 返回结果
   */
  public async getUserProjectList() {
    const { ctx } = this;
    const { name } = ctx.request.query;
    ctx.body = await ctx.service.project.getProjectList(name);
  }

  /**
   * --- 设置项目 ---
   * @param { String } name
  */
  /**
   * @summary 设置项目
   * @router post /project/set
   * @request query string name 项目名称
   * @response 200 SuccessBody 返回结果
   */
  public async set() {
    const { ctx } = this;
    const { id, name } = ctx.request.body;
    // --- 获取 cookie ---
    ctx.body = await ctx.service.project.setProjectConfig(id, name);
  }
}
