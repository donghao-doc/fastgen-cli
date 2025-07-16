# FastGen

[![npm version](https://badge.fury.io/js/fastgen.svg)](https://www.npmjs.com/package/fastgen)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/donghao-doc/fastgen-cli/blob/main/LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

FastGen 是一个高效的命令行工具，专为快速生成各种前端项目脚手架而设计。通过交互式命令行界面，你可以轻松创建管理后台、H5 移动端应用和小程序项目。

## ✨ 特性

- 🚀 **快速生成**: 一键创建完整的项目结构
- 🎯 **多种类型**: 支持 PC 管理后台、H5 移动端、小程序
- ⚡ **多技术栈**: 支持 Vue、React、uni-app 等主流技术栈
- 🎨 **精选模板**: 内置优质开源项目模板
- 💫 **交互体验**: 友好的命令行交互界面
- 📦 **开箱即用**: 模板项目可直接运行

## 🎯 支持的项目类型

| 项目类型 | 技术栈 | 模板名称 | 描述 |
|---------|--------|----------|------|
| 管理后台 (PC) | Vue | [Vben Admin](https://github.com/vbenjs/vue-vben-admin) | 基于 Vue3、Pinia、Vue Router、TypeScript 的现代化管理后台 |
| 管理后台 (PC) | React | [Slash Admin](https://github.com/d3george/slash-admin) | 基于 React18、Vite、TypeScript、Ant Design 5.0 的管理后台模板 |
| H5 移动端 | Vue | [Vue-H5-Template](https://github.com/sunniejs/vue-h5-template) | 基于 Vite3 + Vue3 + Pinia + Vant + viewport 适配的移动端脚手架 |
| H5 移动端 | Vue | [vue3-vant-mobile](https://github.com/vue-zone/vue3-vant-mobile) | 基于 Vue 3 生态系统的移动 web 应用模板 |
| 小程序 | uni-app | [uni-best](https://github.com/codercup/unibest) | 基于 uniapp + Vue3 + TypeScript + Vite4 + UnoCss + wot-ui 的最佳实践模板 |

## 📦 安装

### 全局安装 (推荐)

```bash
npm install -g fastgen
# 或
pnpm add -g fastgen
# 或
yarn global add fastgen
```

### npx 使用 (无需安装)

```bash
npx fastgen
```

## 🚀 使用方法

1. **启动工具**

    ```bash
    fastgen
    ```

2. **跟随交互式提示**

   - 输入项目名称
   - 选择项目类型（管理后台/H5/小程序）
   - 选择技术栈（Vue/React/uni-app）
   - 选择具体模板

3. **进入项目目录开始开发**

   ```bash
   cd your-project-name
   ```

## 📸 使用演示

```bash
$ fastgen

🚀 欢迎使用 FastGen！
? 请输入项目名称: my-awesome-project
? 请选择项目类型: 管理后台
? 请选择技术栈: Vue
? 请选择项目模板: Vben Admin - 基于 Vue3、Pinia、Vue Router、TypeScript 等最新技术栈的管理后台模板

==================================================
📋 项目配置确认：
📁 项目名称：my-awesome-project
🎯 项目类型：管理后台
⚡ 技术栈：Vue
🎨 项目模板：Vben Admin
   基于 Vue3、Pinia、Vue Router、TypeScript 等最新技术栈的管理后台模板
==================================================

🔽 正在下载项目模板...
🎉 项目模板下载完成，你可以开始开发了！
   cd my-awesome-project
```

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。
