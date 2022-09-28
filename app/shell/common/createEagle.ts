/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
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
      console.log(err);
    }
  });

  return cookie;
};

export const createEagle = async (cookie: string) => {
  let data;

  await axios.post(eagleConfig.createUrl, { name: 'test2' },
    {
      headers: {
        cookie: `eagle-eye=${cookie}`,
        'Content-Type': 'application/json',
      },
    },
  ).then((res: any) => {
    try {
      data = res.data.data;
    } catch (err) {
      console.log(err);
    }
  }).catch((err: any) => {
    console.log(cookie, err);
  });

  return data;
};
