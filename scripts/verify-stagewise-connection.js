#!/usr/bin/env node

/**
 * Stagewise 连接验证脚本
 * 用于检查 Stagewise 扩展是否正确连接到开发服务器
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const projectRoot = path.resolve(__dirname, '..');
const stagewiseConfigPath = path.join(projectRoot, 'stagewise.json');

console.log('🔍 开始验证 Stagewise 连接配置...\n');

// 1. 检查 stagewise.json 文件
console.log('📋 步骤 1: 检查 stagewise.json 配置文件');
if (fs.existsSync(stagewiseConfigPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(stagewiseConfigPath, 'utf-8'));
    console.log('   ✅ stagewise.json 存在');
    console.log('   📝 配置内容:', JSON.stringify(config, null, 2));
    
    if (config.appPort) {
      console.log(`   ✅ 端口配置: ${config.appPort}`);
    } else {
      console.log('   ⚠️  警告: 未找到 appPort 配置');
    }
  } catch (e) {
    console.log('   ❌ 错误: 无法解析 stagewise.json');
    console.log('   错误信息:', e.message);
    process.exit(1);
  }
} else {
  console.log('   ❌ 错误: stagewise.json 不存在');
  console.log('   💡 提示: 创建 stagewise.json 文件');
  process.exit(1);
}

console.log('');

// 2. 检查布局文件是否包含 StagewiseInit
console.log('📋 步骤 2: 检查组件集成');
const layoutPath = path.join(projectRoot, 'app', 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
  if (layoutContent.includes('StagewiseInit')) {
    console.log('   ✅ StagewiseInit 组件已集成到 layout.tsx');
  } else {
    console.log('   ⚠️  警告: layout.tsx 中未找到 StagewiseInit');
    console.log('   💡 提示: 确保 layout.tsx 中导入并使用了 StagewiseInit');
  }
} else {
  console.log('   ⚠️  警告: 未找到 layout.tsx 文件');
}

console.log('');

// 3. 检查组件文件
console.log('📋 步骤 3: 检查 StagewiseInit 组件文件');
const componentPath = path.join(projectRoot, 'components', 'StagewiseInit.tsx');
if (fs.existsSync(componentPath)) {
  console.log('   ✅ StagewiseInit.tsx 存在');
  const componentContent = fs.readFileSync(componentPath, 'utf-8');
  if (componentContent.includes('useEffect')) {
    console.log('   ✅ 组件包含初始化逻辑');
  }
} else {
  console.log('   ❌ 错误: StagewiseInit.tsx 不存在');
  process.exit(1);
}

console.log('');

// 4. 检查端口是否可用
console.log('📋 步骤 4: 检查端口可用性');
const config = JSON.parse(fs.readFileSync(stagewiseConfigPath, 'utf-8'));
const port = config.appPort || 3000;

const testPort = (port) => {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.listen(port, 'localhost', () => {
      server.close(() => {
        resolve(true); // 端口可用
      });
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve('in_use'); // 端口被占用
      } else {
        resolve(false); // 其他错误
      }
    });
  });
};

testPort(port).then((result) => {
  if (result === true) {
    console.log(`   ⚠️  端口 ${port} 未被使用`);
    console.log('   💡 提示: 开发服务器可能未运行');
    console.log('   💡 运行: npm run dev');
  } else if (result === 'in_use') {
    console.log(`   ✅ 端口 ${port} 正在使用中（开发服务器可能正在运行）`);
  } else {
    console.log(`   ❌ 端口 ${port} 测试失败`);
  }

  console.log('');
  console.log('📊 验证总结:');
  console.log('   ✅ 配置文件存在');
  console.log('   ✅ 组件文件存在');
  console.log('   ' + (result === 'in_use' ? '✅' : '⚠️ ') + ' 端口状态');
  console.log('');
  console.log('🎯 下一步操作:');
  console.log('   1. 确保开发服务器正在运行: npm run dev');
  console.log('   2. 在 Cursor 中重新加载窗口: Cmd+Shift+P → "Developer: Reload Window"');
  console.log('   3. 刷新浏览器页面');
  console.log('   4. 打开浏览器控制台查看连接状态');
  console.log('');
});



