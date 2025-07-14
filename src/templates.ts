export const templates = {
  pc: {
    vue: [
      {
        name: 'Vben Admin',
        repo: 'https://github.com/vbenjs/vue-vben-admin.git',
        description: '基于 Vue3、Pinia、Vue Router、TypeScript 等最新技术栈的管理后台模板',
      }
    ],
    react: [
      {
        name: 'Slash Admin',
        repo: 'https://github.com/d3george/slash-admin.git',
        description: '基于 React18、Vite、TypeScript、Ant Design 5.0 等最新技术栈的管理后台模板',
      }
    ]
  },
  h5: {
    vue: [
      {
        name: 'Vue-H5-Template',
        repo: 'https://github.com/sunniejs/vue-h5-template.git',
        description: '基于 vite3 + vue3 + pinia + Vant + viewport 适配方案的移动端快速开发脚手架',
      },
      {
        name: 'vue3-vant-mobile',
        repo: 'https://github.com/vue-zone/vue3-vant-mobile.git',
        description: '基于 Vue 3 生态系统的移动 web 应用模板',
      }
    ]
  },
  miniprogram: {
    uniapp: [
      {
        name: 'uni-best',
        repo: 'https://github.com/codercup/unibest.git',
        description: '由 uniapp + Vue3 + Ts + Vite4 + UnoCss + VSCode + uni插件+ wot-ui 构建的最佳实践模板',
      }
    ]
  }
};

export const packageManagers = {
  npm: {
    name: 'npm',
    installCommand: 'npm install',
    runCommand: 'npm run'
  },
  yarn: {
    name: 'yarn',
    installCommand: 'yarn install',
    runCommand: 'yarn'
  },
  pnpm: {
    name: 'pnpm',
    installCommand: 'pnpm install',
    runCommand: 'pnpm'
  }
};