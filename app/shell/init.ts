/**
 * ---- 执行 Init Shell ----
 */
import { template } from './config/config';
import { createDir } from './common/createDir';
import { downloadGitRepo } from './common/downloadGitRepo';
import { changePackage } from './common/changePackage';
import { getEagleCookie, createEagle } from './common/createEagle';
import { createGit } from './common/createGit';
import { pushGit } from './common/pushGit';
// import { removeProject } from './remove';


/**

 * @param { String } name
 * @param { String } type
 * @param { String } description
 */
export const initProject = async (
  name: string,
  type: string,
  description: string,
  isCreateEagle?: boolean,
) => {

  // ---- Step.1 获取项目 url 信息 ----
  const url = template[type].url;

  // ---- Step.2 服务端创建文件夹 ----
  const { projectPath } = createDir();
  const path = `./app/shell/project/${projectPath}`;

  // ---- Step.3 克隆模版 ----
  await downloadGitRepo(url, path);

  // ---- Step.4 创建监控并引入项目 ----
  let cookie = '';
  let appKey = '';
  if (isCreateEagle) {
    cookie = await getEagleCookie();
    appKey = await createEagle(cookie);
  }

  // ---- Step.5 修改项目信息 ----
  await changePackage(name, path, description, isCreateEagle, appKey);

  // ---- Step.6 创建 Page ----

  // ---- Step.7 创建 Gitlab 仓库 ----
  const address = await createGit(name, description);

  // ---- Step.7 执行上传仓库 ----
  await pushGit(path, address);

  // ---- Step.8 上传完成之后删除项目 ----
  // removeProject();

  // ---- Step.9 结束流程 -----
};
