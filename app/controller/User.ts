
import { Controller } from 'egg';

/**
 * UserController
 * @controller UserController
 */
export default class UserController extends Controller {
  /**
   * @summary Get user
   * @router post /user/login
   * @request query string email email
   * @request query string password password
   * @response 200 SuccessBody 返回结果
   */
  public async getUser() {
    const { ctx } = this;
    const { email, password } = ctx.request.body;
    ctx.body = await ctx.service.user.getUser(email, password);
  }

  /**
   * @summary 创建用户
   * @router post /user/create
   * @request query string email email
   * @request query string password password
   * @response 200 SuccessBody 返回结果
   */
  public async createUser() {
    const { ctx } = this;
    const { name, email, password } = ctx.request.body;
    ctx.body = await ctx.service.user.createUser(name, email, password);
  }
}
