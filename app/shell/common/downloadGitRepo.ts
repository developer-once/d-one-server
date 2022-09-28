// eslint-disable-next-line @typescript-eslint/no-var-requires
// const download = require('download-git-repo');
import download from 'download-git-repo';

/**
 * --- 下载 Git 仓库 ---
 * @param { String } url
 * @param { String } path
 */
export const downloadGitRepo = async (url: string, path: string) => {
  return new Promise(resolve => {
    download(url, path, { clone: true }, (err: any) => {
      console.log(err ? 'Error' : 'Success', err);
      resolve(true);
    });
  });
};
