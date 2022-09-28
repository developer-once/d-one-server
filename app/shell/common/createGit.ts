// eslint-disable-next-line
// @ts-ignore
import axios from 'axios';
import FormData from 'form-data';
import {
  giteeKey,
  giteeCreateRepos,
} from '../../config/gitee-key';

/**
 * --- 创建 Git 仓库 ---
 */
export const createGit = async (
  name: string,
  description: string,
) => {
  const form = new FormData();
  form.append('access_token', giteeKey);
  form.append('name', name);
  form.append('description', description);

  const data = await axios({
    method: 'post',
    url: giteeCreateRepos,
    data: form,
  });

  console.log('++++++++', data.data.ssh_url);
  return data.data.ssh_url;
};
