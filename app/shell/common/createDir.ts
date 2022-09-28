// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
import { createRandomStr } from '../../utils/createRandomStr';

/**
 * --- 创建文件夹 ---
 */

type createDirType = {
  success: boolean;
  projectPath: string;
};

export const createDir = (): createDirType => {
  const name = createRandomStr();

  // ---- mkdir ----
  fs.mkdir(`./app/shell/project/${name}`, ((error: Error) => {
    if (error) {
      return {
        success: false,
        projectPath: '',
      };
    }
  }));

  return {
    success: true,
    projectPath: name,
  };
};
