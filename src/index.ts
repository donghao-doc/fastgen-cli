import inquirer from 'inquirer';
import chalk from 'chalk';
import { existsSync } from 'fs';
import { join } from 'path';

async function main() {
  console.log(chalk.blue('🚀 欢迎使用 FastGen！'));
  
  try {
    // 提示用户输入项目名称
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称:',
        validate: (input: string) => {
          if (!input.trim()) {
            return '项目名称不能为空';
          }
          if (!/^[a-zA-Z0-9_-]+$/.test(input.trim())) {
            return '项目名称只能包含字母、数字、下划线和连字符';
          }
          return true;
        }
      }
    ]);

    const projectName = answers.projectName.trim();
    const projectPath = join(process.cwd(), projectName);

    // 检查项目目录是否存在
    if (existsSync(projectPath)) {
      console.log(chalk.red(`❌ 错误：项目 "${projectName}" 已存在于当前目录中`));
      process.exit(1);
    } else {
      console.log(chalk.green(`✅ 项目名称：${projectName}`));
    }

  } catch (error) {
    console.log(chalk.red('❌ 发生错误：'), error);
    process.exit(1);
  }
}

main();