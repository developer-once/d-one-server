import shell from 'shelljs';
/**
 * ---- 上传 Git 仓库 ----
 * @param { String } url
 * @param { String } path
 */
export const pushGit = async (
  path: string,
  address: string,
) => {

  // ---- 判断是否存在 git ----
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }

  // ---- 1. 进入文件夹 ----
  shell.cd(path);

  // ---- 2. Git 初始化 ----
  if (shell.exec('git init').code !== 0) {
    shell.echo('Error: Git init failed');
    shell.exit(1);
  }

  // ---- 3. Git 添加仓库 ----
  if (shell.exec(`git remote add origin ${address}`).code !== 0) {
    shell.echo('Error: Git add remote failed');
    shell.exit(1);
  }

  // ---- 4. Git add ----
  if (shell.exec('git add .').code !== 0) {
    shell.echo('Error: Git commit failed');
    shell.exit(1);
  }

  // ---- 5. Git commit ----
  if (shell.exec('git commit -m "d-one: d-one commit"').code !== 0) {
    shell.echo('Error: Git commit failed');
    shell.exit(1);
  }

  // ---- 6. Git push ----
  if (shell.exec('git push origin master').code !== 0) {
    shell.echo('Error: Git push failed');
    shell.exit(1);
  }
};
