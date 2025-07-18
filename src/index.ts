import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
// @ts-ignore
import download from 'download-git-repo';
import { templates } from './templates';

// 读取 package.json 信息
const packageJsonPath = join(__dirname, '../package.json');
const packageInfo = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

// 处理 SIGINT (Ctrl+C) 信号
process.on('SIGINT', () => {
  process.exit(0);
});

// 将 GitHub URL 转换为 download-git-repo 需要的格式
function formatRepoUrl(repoUrl: string): string {
  // 如果是完整的 GitHub URL，提取 owner/repo 部分
  if (repoUrl.startsWith('https://github.com/')) {
    const match = repoUrl.match(/https:\/\/github\.com\/([^\/]+\/[^\/]+)(\.git)?/);
    if (match) {
      return match[1].replace('.git', '');
    }
  }
  // 如果已经是 owner/repo 格式，直接返回
  return repoUrl;
}

async function createProject() {
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
          { name: '管理后台', value: 'pc' },
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

    // 映射技术栈名称
    const mapTechStack = (techStack: string) => {
      return techStack === 'uni-app' ? 'uniapp' : techStack;
    };

    // 获取可用模板
    const getAvailableTemplates = (projectType: string, techStack: string): Array<{name: string, repo: string, description: string}> => {
      const mappedTechStack = mapTechStack(techStack);
      const projectTemplates = templates[projectType as keyof typeof templates];
      
      if (!projectTemplates) {
        return [];
      }
      
      const techStackTemplates = projectTemplates[mappedTechStack as keyof typeof projectTemplates];
      return techStackTemplates || [];
    };

    // 获取可用模板
    const availableTemplates = getAvailableTemplates(typeAnswer.projectType, techStackAnswer.techStack);

    if (availableTemplates.length === 0) {
      console.log(chalk.red(`❌ 抱歉，暂无 ${typeAnswer.projectType === 'pc' ? '管理后台' : typeAnswer.projectType === 'h5' ? 'H5' : '小程序'} + ${techStackAnswer.techStack === 'vue' ? 'Vue' : techStackAnswer.techStack === 'react' ? 'React' : 'uni-app'} 的可用模板`));
      process.exit(1);
    }

    // 提示用户选择项目模板
    const templateAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: '请选择项目模板:',
        choices: availableTemplates.map((template, index) => ({
          name: `${template.name} - ${template.description}`,
          value: index
        }))
      }
    ]);

    const selectedTemplate = availableTemplates[templateAnswer.template];

    // 输出最终选择结果
    console.log('\n' + chalk.cyan('='.repeat(50)));
    console.log(chalk.yellow('📋 项目配置确认：'));
    console.log(chalk.green(`📁 项目名称：${projectName}`));
    console.log(chalk.green(`🎯 项目类型：${typeAnswer.projectType === 'pc' ? '管理后台' : typeAnswer.projectType === 'h5' ? 'H5' : '小程序'}`));
    console.log(chalk.green(`⚡ 技术栈：${techStackAnswer.techStack === 'vue' ? 'Vue' : techStackAnswer.techStack === 'react' ? 'React' : 'uni-app'}`));
    console.log(chalk.green(`🎨 项目模板：${selectedTemplate.name}`));
    console.log(chalk.gray(`   ${selectedTemplate.description}`));
    console.log(chalk.cyan('='.repeat(50)));

    // 开始下载模板
    console.log('\n' + chalk.blue('🔽 正在下载项目模板...'));
    
    const formattedRepo = formatRepoUrl(selectedTemplate.repo);
    
    await new Promise<void>((resolve, reject) => {
      download(formattedRepo, projectPath, { clone: false }, (err: Error | null) => {
        if (err) {
          console.log(chalk.red(`❌ 下载失败：${err.message}`));
          reject(err);
        } else {
          console.log(chalk.green(`🎉 项目模板下载完成，你可以开始开发了！`));
          console.log(chalk.green(`   cd ${projectName}`));
          resolve();
        }
      });
    });

  } catch (error: any) {
    // 检查是否为用户主动退出
    if (error.name === 'ExitPromptError' || 
        error.message?.includes('User force closed the prompt') ||
        error.message?.includes('SIGINT')) {
      process.exit(0); // 正常退出，而不是错误退出
    } else {
      console.log(chalk.red('❌ 发生错误：'), error);
      process.exit(1);
    }
  }
}

// 创建命令行程序
const program = new Command();

program
  .name(packageInfo.name)
  .description(packageInfo.description)
  .version(packageInfo.version)
  .action(async () => {
    await createProject();
  });

// 解析命令行参数
program.parse();