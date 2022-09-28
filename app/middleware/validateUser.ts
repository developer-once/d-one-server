import moment from 'moment';
import { ignoreRouter } from './../config/ignoreRouter';
import { FORMAT_TIME_STR } from './../config/constValue';

module.exports = () => {
  return async function validateUser(ctx, next) {
    const { path } = ctx.request;
    if (ignoreRouter.indexOf(path) !== -1) {
      return next();
    }

    // -- 检查 cookie 是否携带 --
    let cookie = ctx.cookies.get('d-one', {
      signed: true,
      encrypt: true,
    });
    if (!cookie) {
      ctx.body = {
        code: 300,
        result: '',
        msg: '请重新登录',
      };
      ctx.logger.error(`---- Api - ${path} -- log: [${moment(new Date()).format(FORMAT_TIME_STR)}]`, 'params = :', ctx.request?.body?.data || ctx.request?.query, 'msg: 请重新登录');
      return ctx.body;
    }
    // -- 查询 cookie 的内容是否正确 --
    cookie = cookie?.split('#') || [];
    const email = cookie[0] || '';
    const data = cookie[1] || '';
    const redisData = await ctx.app.redis.get(`cookie-${email}`);
    if (redisData !== data) {
      ctx.body = {
        code: 300,
        result: '',
        msg: '请重新登录',
      };
      ctx.logger.error(`---- Api - ${path} -- log: [${moment(new Date()).format(FORMAT_TIME_STR)}]`, 'params = :' , ctx.request?.body?.data || ctx.request?.query, 'msg: 请重新登录');
      return ctx.body;
    }
    await next();
  };
};
