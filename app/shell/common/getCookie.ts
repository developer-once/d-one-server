import axios from 'axios';
import { eagleConfig } from '../config/config';

/**
 * --- 获取 GitLab cookie ---
 */
export const getEagleCookie = async () => {
  let cookie = '';

  await axios.post(eagleConfig.url, { email: eagleConfig.email, password: eagleConfig.password }).then((res: any) => {
    try {
      cookie = res.headers['set-cookie'][0].split('; ')[0].split('=')[1];
    } catch (err) {
      console.log('+++++', err);
    }
  });

  return cookie;
};
