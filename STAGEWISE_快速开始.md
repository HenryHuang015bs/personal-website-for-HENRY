# Stagewise 快速开始指南

## ✅ 当前状态

你的项目已经配置好了：
- ✅ `stagewise.json` 已配置（端口：3000）
- ✅ 已使用 VS Code 扩展方式（无需 npm 包）
- ✅ 项目代码已清理，无需额外集成

## 🚀 使用步骤

### 1️⃣ 安装 Stagewise VS Code 扩展

**在 Cursor 中：**
1. 点击左侧边栏的 **扩展图标**（或按 `Cmd+Shift+X`）
2. 搜索：`Stagewise` 或 `stagewise.stagewise-vscode-extension`
3. 点击 **Install** 安装
4. 安装后扩展会自动启用

**或者直接访问：**
https://marketplace.cursorapi.com/items/?itemName=stagewise.stagewise-vscode-extension

### 2️⃣ 启动开发服务器

在终端运行：
```bash
npm run dev
```

等待看到：
```
▲ Next.js 14.2.25
✓ Ready in 2.5s
○ Local:        http://localhost:3000
```

### 3️⃣ 在浏览器中打开

1. **打开浏览器**，访问：`http://localhost:3000`
2. **打开开发者工具**（按 `F12` 或 `Cmd+Option+I`）
3. **切换到 Console 标签页**

### 4️⃣ 检查连接状态

你应该看到扩展已连接的提示（具体消息可能因扩展版本而异）

### 5️⃣ 开始使用

1. **点击页面上的任意元素**（按钮、文字、图片等）
2. **Stagewise 工具栏会出现**在你点击的元素附近
3. **在工具栏中输入你的修改需求**
4. **AI 会自动定位代码并进行修改**

## 📋 验证清单

- [ ] Stagewise 扩展已安装在 Cursor 中
- [ ] 开发服务器正在运行（`npm run dev`）
- [ ] 浏览器已访问 `http://localhost:3000`
- [ ] 浏览器开发者工具已打开
- [ ] 点击页面元素时能看到 Stagewise 工具栏

## ⚠️ 常见问题

### 问题：看不到扩展图标

**解决：**
- 确认扩展已安装并启用
- 重启 Cursor 编辑器
- 检查扩展市场是否能正常访问

### 问题：点击元素没有反应

**解决：**
1. 确认开发服务器正在运行
2. 检查浏览器控制台是否有错误
3. 尝试硬刷新页面（`Cmd+Shift+R` 或 `Ctrl+Shift+R`）
4. 检查是否有浏览器扩展冲突（如广告拦截器）

### 问题：扩展无法连接

**解决：**
1. 确认 `stagewise.json` 中的端口号（3000）与开发服务器一致
2. 如果开发服务器运行在其他端口，更新 `stagewise.json` 中的 `appPort`
3. 重启开发服务器和 Cursor

## 🔧 配置文件说明

`stagewise.json` 用于告诉扩展你的开发服务器端口：

```json
{
  "appPort": 3000
}
```

如果你的 Next.js 运行在其他端口，请更新此文件。

## 📚 更多帮助

- 查看详细文档：`STAGEWISE_GUIDE.md`
- 扩展市场：https://marketplace.cursorapi.com/items/?itemName=stagewise.stagewise-vscode-extension
- 官方文档：https://stagewise.dev

