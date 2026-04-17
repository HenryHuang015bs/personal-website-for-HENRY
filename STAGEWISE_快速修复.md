# Stagewise 快速修复指南

## 🚨 Stagewise 打不开？立即检查这 5 点

### ✅ 步骤 1: 打开浏览器控制台查看诊断信息

1. **打开浏览器**
   - 访问 `http://localhost:3000`
   - 按 `F12` 或 `Cmd+Option+I` (Mac) 打开开发者工具
   - 切换到 **Console** 标签页

2. **查看诊断信息**
   - 应该能看到：`🔍 Stagewise 诊断信息`
   - 查看检查结果，确认哪些项目通过了（✅）哪些失败了（❌）

### ✅ 步骤 2: 确认 Cursor 扩展已安装

1. **打开扩展面板**
   - 在 Cursor 中按 `Cmd+Shift+X` (Mac) 或 `Ctrl+Shift+X` (Windows)
   - 或点击左侧边栏的扩展图标

2. **搜索 Stagewise**
   - 在搜索框中输入：`Stagewise`
   - 或搜索：`stagewise.stagewise-vscode-extension`

3. **确认状态**
   - ✅ 如果已安装：确认状态显示为 **"已启用"**
   - ❌ 如果未安装：点击 **"Install"** 安装

4. **如果搜索不到扩展**
   - 直接访问：https://marketplace.cursorapi.com/items/?itemName=stagewise.stagewise-vscode-extension
   - 点击 "Install" 按钮

### ✅ 步骤 3: 重启 Cursor 和刷新浏览器

1. **完全退出 Cursor**
   - Mac: `Cmd+Q`
   - Windows: 关闭所有窗口

2. **重新打开 Cursor**
   - 打开项目文件夹
   - 确认开发服务器正在运行（`npm run dev`）

3. **刷新浏览器**
   - 在浏览器中按 `Cmd+Shift+R` (Mac) 或 `Ctrl+Shift+R` (Windows) 硬刷新
   - 或清除缓存后刷新

### ✅ 步骤 4: 确认端口配置正确

1. **检查 stagewise.json**
   ```json
   {
     "appPort": 3000
   }
   ```

2. **确认开发服务器端口**
   - Next.js 默认端口是 3000
   - 如果服务器运行在其他端口（如 3001），需要修改 `stagewise.json` 中的 `appPort`

3. **检查服务器地址**
   - 浏览器地址栏应该显示：`http://localhost:3000`
   - 不应该有其他端口号

### ✅ 步骤 5: 尝试点击页面元素

1. **点击页面上的任意元素**
   - 按钮、文本、图片、链接等
   - Stagewise 工具栏可能在点击时才出现

2. **查看是否有工具栏**
   - 工具栏可能在元素旁边
   - 或在页面边缘出现
   - 或作为悬浮窗口

## 🔧 常见问题修复

### 问题 1: 扩展已安装但不工作

**解决方案：**
1. 在扩展面板中，找到 Stagewise 扩展
2. 点击 "禁用"，然后再次点击 "启用"
3. 或点击 "卸载"，重启 Cursor 后重新安装

### 问题 2: 控制台显示所有检查都失败

**解决方案：**
1. 确认扩展已安装并启用
2. 确认开发服务器正在运行
3. 确认浏览器访问的是 `http://localhost:3000`
4. 重启 Cursor 编辑器
5. 清除浏览器缓存

### 问题 3: 端口不匹配

**解决方案：**
1. 查看开发服务器启动时显示的端口（如：`Local: http://localhost:3001`）
2. 修改 `stagewise.json` 中的 `appPort` 为实际端口号
3. 重启开发服务器

### 问题 4: 扩展搜索不到

**解决方案：**
1. 确认 Cursor 版本是最新的
2. 检查网络连接
3. 直接访问扩展页面：https://marketplace.cursorapi.com/items/?itemName=stagewise.stagewise-vscode-extension
4. 手动安装扩展文件（如果提供）

## 📋 当前项目配置

✅ **已配置项：**
- `stagewise.json` - 端口配置（3000）
- `components/StagewiseInit.tsx` - 诊断组件（已增强）
- `app/layout.tsx` - 已包含 StagewiseInit 组件

## 🎯 测试步骤

1. **打开浏览器控制台**，查看诊断信息
2. **按照控制台提示**，逐一检查各项配置
3. **点击页面元素**，测试工具栏是否出现

## 💡 重要提示

根据官方文档：
- Stagewise **主要通过 Cursor 扩展自动注入**
- **无需手动初始化代码**（扩展会自动处理）
- **无需安装 npm 包**（`@stagewise/toolbar` 已弃用）
- 只需确保扩展已安装并启用即可

## 🆘 仍然无法解决？

如果所有步骤都尝试过了仍然无法打开：

1. **查看扩展输出**
   - 在 Cursor 中按 `Cmd+Shift+U` (Mac) 或 `Ctrl+Shift+U` (Windows)
   - 切换到 "Stagewise" 或相关的输出通道
   - 查看是否有错误信息

2. **检查扩展版本**
   - 确认扩展版本是最新的
   - 尝试更新扩展

3. **查看扩展文档**
   - 访问扩展的 GitHub 仓库
   - 查看 Issues 部分，看是否有类似问题

4. **联系支持**
   - 在扩展的 GitHub 仓库提交 Issue
   - 提供详细的错误信息和诊断结果
























