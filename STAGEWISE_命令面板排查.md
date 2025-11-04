# Stagewise 命令面板排查指南

## ✅ 确认扩展已安装

您的扩展已安装在：
```
~/.cursor/extensions/stagewise.stagewise-vscode-extension-0.11.3-universal
```

## 🔍 Stagewise 扩展注册的命令

Stagewise 扩展只注册了 **一个命令**：

- **命令 ID**: `stagewise.setAgent`
- **显示名称**: `Stagewise: Set the preferred agent you want to use with stagewise`
- **类别**: `stagewise`

## 📋 如何在命令面板中找到

### 方法 1：搜索完整命令名称

1. 按 `Cmd+Shift+P` (Mac) 或 `Ctrl+Shift+P` (Windows/Linux) 打开命令面板
2. **输入以下任一关键词**：
   - `stagewise`（应该会显示相关命令）
   - `set agent` 或 `agent`（也能找到）
   - `Stagewise: Set`（完整的显示名称）

### 方法 2：检查扩展是否激活

扩展的激活事件是 `onStartupFinished`，这意味着：
- 扩展会在 Cursor 启动完成后自动激活
- 如果刚安装扩展，可能需要重启 Cursor

### 方法 3：验证扩展状态

1. 打开命令面板：`Cmd+Shift+P`
2. 输入：`Developer: Reload Window` 或 `开发人员: 重新加载窗口`
3. 这会重新加载整个窗口并激活扩展

## 🚀 快速解决方案

### 方案 1：重新加载窗口（推荐）

1. 按 `Cmd+Shift+P` 打开命令面板
2. 输入：`Developer: Reload Window`
3. 等待窗口重新加载
4. 再次打开命令面板，输入 `stagewise`

### 方案 2：完全重启 Cursor

1. 完全退出 Cursor（不是关闭窗口，而是退出应用）
2. 重新打开 Cursor
3. 打开您的项目
4. 等待几秒让扩展激活（扩展在启动完成后激活）
5. 打开命令面板，输入 `stagewise`

### 方案 3：禁用并重新启用扩展

1. 按 `Cmd+Shift+X` 打开扩展面板
2. 搜索 `Stagewise`
3. 点击扩展右侧的 **齿轮图标** ⚙️
4. 选择 **禁用**
5. 再次点击齿轮图标，选择 **启用**
6. 重新加载窗口

## ⚠️ 重要说明

**Stagewise 扩展的主要功能不依赖命令面板！**

即使命令面板中看不到命令，Stagewise 扩展也能正常工作：

1. **扩展会在后台自动运行**
   - 激活事件是 `onStartupFinished`，会在启动后自动激活
   
2. **通过浏览器连接**
   - 启动开发服务器：`npm run dev`
   - 在浏览器中打开：`http://localhost:3000`
   - 扩展会自动检测并连接到开发服务器

3. **直接使用工具栏**
   - 点击页面元素
   - 工具栏会自动出现
   - 无需通过命令面板操作

## 📝 验证扩展是否工作

### 测试 1：检查扩展是否激活

1. 启动开发服务器：`npm run dev`
2. 在浏览器中打开：`http://localhost:3000`
3. 打开浏览器开发者工具（F12）
4. 查看控制台是否有 Stagewise 相关的消息

### 测试 2：检查状态栏

- 查看 Cursor 状态栏（底部）是否有 Stagewise 相关的图标或状态

### 测试 3：直接使用功能

1. 启动开发服务器
2. 在浏览器中打开页面
3. 点击页面上的任意元素
4. 看是否出现 Stagewise 工具栏（即使命令面板中没有命令）

## 🎯 总结

**关键点**：
- Stagewise 只有一个命令：`stagewise.setAgent`（设置首选代理）
- **但扩展的主要功能不需要通过命令面板使用**
- 扩展会在后台自动运行并与浏览器连接
- 如果命令面板中看不到，尝试重新加载窗口或重启 Cursor
- **最重要的是确保开发服务器正在运行，然后直接在浏览器中使用功能**

## 🔧 如果仍然看不到命令

1. **检查扩展日志**：
   - 打开命令面板
   - 输入：`Developer: Show Logs` → 选择 `Stagewise`
   - 查看是否有错误信息

2. **检查扩展输出**：
   - 查看 Cursor 的输出面板（底部面板）
   - 切换到 "Stagewise" 频道（如果有）

3. **重新安装扩展**：
   - 在扩展面板中卸载 Stagewise
   - 重启 Cursor
   - 重新安装扩展


