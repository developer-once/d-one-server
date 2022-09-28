import { createHash } from './createHash';

/**
 * ----- 生成随机 Name -----
 * @param { String } name
 * @returns { String } hash
 */
export const createRandomStr = () => {
  const data = createHash(`${Math.random()}`);

  return data;
};
