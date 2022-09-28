export default {
  // ------------------ User ------------------
  300: () => {
    return {
      code: 300,
      data: '',
      msg: '请重新登录',
    };
  },
  301: () => {
    return {
      code: 301,
      data: '',
      msg: '邮箱或密码错误',
    };
  },
  302: () => {
    return {
      code: 302,
      data: '',
      msg: '用户名或邮箱已存在，请修改后重试',
    };
  },
  // ------------------ Server ------------------
  500: (data: any) => {
    return {
      code: 500,
      data,
      msg: '服务端错误',
    };
  },
};
