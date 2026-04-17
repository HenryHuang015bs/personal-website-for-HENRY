# Stagewise 看不到？按以下步骤排查

## 🔍 步骤 1: 检查 Cursor 扩展是否安装

1. **打开扩展面板**
   - 按 `Cmd+Shift+X` (Mac) 或 `Ctrl+Shift+X` (Windows/Linux)
   - 或者在左侧边栏点击扩展图标

2. **搜索 Stagewise**
   - 在搜索框中输入：`Stagewise`
   - 或搜索：`stagewise.stagewise-vscode-extension`

3. **确认安装状态**
   - ✅ 如果已安装，确认状态为 "已启用"
   - ❌ 如果未安装，点击 **Install（安装）**

4. **如果搜索不到扩展**
   - 直接访问：https://marketplace.cursorapi.com/items/?itemName=stagewise.stagewise-vscode-extension
   - 点击 "Install" 安装

## 🔍 步骤 2: 确认开发服务器正在运行

1. **启动开发服务器**
   ```bash
   npm run dev
   ```
   
2. **确认服务器地址**
   - 应该显示：`http://localhost:3000` 或类似的地址
   - 确认端口与 `stagewise.json` 中的 `appPort` 一致（当前是 3000）

## 🔍 步骤 3: 检查浏览器控制台

1. **打开浏览器**
   - 访问 `http://localhost:3000`
   - 打开开发者工具（F12 或 Cmd+Option+I）
   - 切换到 Console 标签页

2. **查看诊断信息**
   - 应该能看到：`🔍 Stagewise 诊断信息`
   - 查看是否有错误或警告信息

3. **检查检测结果**
   - ✅ 如果看到 `✅ Stagewise 已检测到`，说明扩展已注入
   - ⚠️ 如果看到 `⚠️ 未检测到 Stagewise`，继续下一步

## 🔍 步骤 4: 重启和刷新

1. **重启 Cursor**
   - 完全退出 Cursor
   - 重新打开 Cursor
   - 重新启动开发服务器

2. **刷新浏览器**
   - 在浏览器中按 `Cmd+Shift+R` (Mac) 或 `Ctrl+Shift+R` (Windows/Linux) 硬刷新
   - 清除浏览器缓存

## 🔍 步骤 5: 检查端口配置

1. **确认端口匹配**
   - 查看 `stagewise.json` 中的 `appPort`（当前是 3000）
   - 确认 `npm run dev` 启动的服务器端口与之一致
   - 如果端口不同，修改 `stagewise.json` 或调整服务器端口

2. **检查防火墙/代理**
   - 确认本地端口 3000 没有被阻止
   - 如果有代理，确认不会影响 localhost 连接

## 🔍 步骤 6: 尝试点击页面元素

1. **点击页面上的任意元素**
   - Stagewise 工具栏可能在点击时才出现
   - 尝试点击按钮、文本、图片等不同元素

2. **查看是否有工具栏出现**
   - 工具栏可能在元素旁边、页面边缘或作为悬浮窗口出现

## 🆘 如果仍然看不到

### 方案 A: 手动检查扩展连接

1. **查看 Cursor 状态栏**
   - 检查是否有 Stagewise 相关的状态指示器

2. **查看扩展输出**
   - 在 Cursor 中按 `Cmd+Shift+U` (Mac) 或 `Ctrl+Shift+U` (Windows/Linux)
   - 切换到 "Stagewise" 或相关的输出通道
   - 查看是否有错误信息

### 方案 B: 重新安装扩展

1. **卸载扩展**
   - 在扩展面板中，找到 Stagewise 扩展
   - 点击 "卸载"

2. **重新安装**
   - 重启 Cursor
   - 重新安装 Stagewise 扩展

### 方案 C: 检查扩展权限

某些情况下，扩展可能需要特定的权限：
- 确认 Cursor 有访问本地端口的权限
- 检查系统安全设置

## 📝 当前配置

- ✅ `stagewise.json` 已配置（端口：3000）
- ✅ `components/StagewiseInit.tsx` 已添加（诊断组件）
- ✅ `app/layout.tsx` 已包含 StagewiseInit 组件

## 💡 重要提示

根据官方文档：
- Stagewise **主要通过 Cursor 扩展自动注入**
- **无需安装 npm 包**（`@stagewise/toolbar` 已弃用）
- **无需手动初始化代码**（扩展会自动处理）
- 只需确保扩展已安装并启用即可

如果所有步骤都检查过了仍然看不到，可能是扩展版本或兼容性问题，建议：
1. 检查扩展版本是否为最新
2. 查看扩展的 GitHub Issues
3. 联系 Stagewise 团队获取支持
























