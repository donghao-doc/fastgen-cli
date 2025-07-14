import inquirer from 'inquirer';
import chalk from 'chalk';
import { existsSync } from 'fs';
import { join } from 'path';

async function main() {
  console.log(chalk.blue('🚀 欢迎使用 FastGen！'));
  
  try {
    // 提示用户输入项目名称
    const nameAnswer = await inquirer.prompt([
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

    const projectName = nameAnswer.projectName.trim();
    const projectPath = join(process.cwd(), projectName);

    // 检查项目目录是否存在
    if (existsSync(projectPath)) {
      console.log(chalk.red(`❌ 错误：项目 "${projectName}" 已存在于当前目录中`));
      process.exit(1);
    }

    // 提示用户选择项目类型
    const typeAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'projectType',
        message: '请选择项目类型:',
        choices: [
          { name: 'PC', value: 'pc' },
          { name: 'H5', value: 'h5' },
          { name: '小程序', value: 'miniprogram' }
        ]
      }
    ]);

    // 提示用户选择技术栈
    const techStackAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'techStack',
        message: '请选择技术栈:',
        choices: [
          { name: 'Vue', value: 'vue' },
          { name: 'React', value: 'react' },
          { name: 'uni-app', value: 'uni-app' }
        ]
      }
    ]);

    // 输出最终选择结果
    console.log('\n' + chalk.cyan('='.repeat(40)));
    console.log(chalk.yellow('📋 项目配置确认：'));
    console.log(chalk.green(`📁 项目名称：${projectName}`));
    console.log(chalk.green(`🎯 项目类型：${typeAnswer.projectType === 'pc' ? 'PC' : typeAnswer.projectType === 'h5' ? 'H5' : '小程序'}`));
    console.log(chalk.green(`⚡ 技术栈：${techStackAnswer.techStack === 'vue' ? 'Vue' : techStackAnswer.techStack === 'react' ? 'React' : 'uni-app'}`));
    console.log(chalk.cyan('='.repeat(40)));

  } catch (error) {
    console.log(chalk.red('❌ 发生错误：'), error);
    process.exit(1);
  }
}

main();