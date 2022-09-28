/* eslint-disable node/prefer-promises/fs */
import * as fs from 'fs';

/**
 * --- 修改 package.json 文件信息 ---
 * @param name { String }
 * @param path { String }
 * @param description { String }
 * @param appKey { String }
 * @return { String } hash
 */
export const changePackage = async (
  name: string,
  path: string,
  description: string,
  isCreateEagle?: boolean,
  appKey?: string,
) => {
  return new Promise(async resolve => {
    // ----- package.json -----
    const data = await fs.readFileSync(`${path}/package.json`, 'utf8');
    const packageJson = JSON.parse(data);
    packageJson.name = name;
    packageJson.description = description;

    // - 修改package.json -
    fs.writeFile(`${path}/package.json`, JSON.stringify(packageJson, null, 2), 'utf8', err2 => {
      console.log(err2);
    });

    // ----- eagle appKey.json -----
    if (!isCreateEagle) {
      return resolve(true);
    }
    const eagle = await fs.readFileSync(`${path}/appkey.json`, 'utf8');
    const eagleConfig = JSON.parse(eagle);

    eagleConfig.appKey = appKey;

    // - 修改package.json -
    fs.writeFile(`${path}/appkey.json`, JSON.stringify(eagleConfig, null, 2), 'utf8', err2 => {
      console.log(err2);
      resolve(true);
    });
  });
};
