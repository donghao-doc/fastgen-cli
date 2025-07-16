const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function build() {
  try {
    // 构建配置
    const result = await esbuild.build({
      entryPoints: ['src/index.ts'],
      outfile: 'bin/cli.js',
      bundle: true,
      minify: true,
      platform: 'node',
      target: 'node18',
      format: 'cjs',
      sourcemap: false,
      write: false, // 先不写入，我们需要添加 shebang
      external: ['electron'], // 排除 electron 依赖
    });

    // 获取构建结果
    const outputText = result.outputFiles[0].text;
    
    // 添加 shebang
    const finalCode = `#!/usr/bin/env node\n\n${outputText}`;
    
    // 确保 bin 目录存在
    const binDir = path.join(__dirname, '../bin');
    if (!fs.existsSync(binDir)) {
      fs.mkdirSync(binDir, { recursive: true });
      console.log('📁 创建 bin 目录');
    }
    
    // 写入文件
    const outputPath = path.join(binDir, 'cli.js');
    fs.writeFileSync(outputPath, finalCode);
    
    console.log('✅ 构建成功！');
    console.log('📦 输出文件：' + path.relative(process.cwd(), outputPath));
    
  } catch (error) {
    console.error('❌ 构建失败:', error);
    process.exit(1);
  }
}

build(); 