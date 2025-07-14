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
    });

    // 获取构建结果
    const outputText = result.outputFiles[0].text;
    
    // 添加 shebang
    const finalCode = `#!/usr/bin/env node\n\n${outputText}`;
    
    // 写入文件
    fs.writeFileSync(path.join(__dirname, '../bin/cli.js'), finalCode);
    
    console.log('✅ 构建成功！');
    console.log('📦 输出文件：bin/cli.js');
    
  } catch (error) {
    console.error('❌ 构建失败:', error);
    process.exit(1);
  }
}

build(); 