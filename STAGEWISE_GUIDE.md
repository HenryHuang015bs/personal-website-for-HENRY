# Stagewise 使用指南

## 什么是 Stagewise？

Stagewise 是一个前端开发工具，它将 AI 编程助手（如 Cursor、GitHub Copilot）与浏览器无缝连接，让您可以直接在浏览器中：
- 点击选择网页元素
- 添加注释描述想要进行的修改
- AI 自动定位代码并进行修改

## 安装方式（VS Code 扩展）

### 步骤 1：安装 VS Code 扩展

1. **在 Cursor 中安装扩展**
   - Cursor 会自动提示您安装推荐的扩展
   - 或者点击 Cursor 侧边栏的扩展图标
   - 搜索 "Stagewise" 或直接访问：[Stagewise VS Code Extension](https://marketplace.cursorapi.com/items/?itemName=stagewise.stagewise-vscode-extension)
   - 点击 "Install" 安装

2. **确认扩展已启用**
   - 安装后，扩展会自动启用
   - 您可以在扩展面板中看到 "Stagewise" 已启用

### 步骤 2：启动开发服务器

在终端运行：
```bash
npm run dev
# 或
pnpm dev
# 或
yarn dev
```

### 步骤 3：在浏览器中使用

1. **打开浏览器**
   - 访问 `http://localhost:3000`（或您的开发服务器地址）
   - 打开浏览器开发者工具（F12 或 Cmd+Option+I）

2. **检查连接状态**
   - 扩展会自动连接到开发服务器
   - 无需在代码中添加任何额外配置

3. **开始使用**
   - 点击页面上的任意元素
   - Stagewise 会识别元素并显示相关信息
   - 可以添加注释描述想要进行的修改
   - AI 会自动定位代码并进行修改

**注意**：
- 无需安装任何 npm 包或添加代码到项目中
- 扩展方式更简洁，无需修改项目代码
- 配置文件 `stagewise.json` 已存在，用于指定开发服务器端口（默认 3000）

## 使用方法

1. **启动开发服务器**
   ```bash
   npm run dev
   # 或
   pnpm dev
   ```

2. **在浏览器中打开您的网站**
   - 访问 `http://localhost:3000`（或您的开发服务器地址）
   - 确保 Stagewise VS Code 扩展已安装并启用

3. **选择元素**
   - 点击页面上的任意元素
   - Stagewise 会识别该元素并显示相关信息

4. **添加修改请求**
   - 通过扩展界面输入您想要进行的修改
   - 例如："将这个按钮的颜色改为红色"
   - 或者："增大这个标题的字体大小"

5. **AI 自动修改**
   - Stagewise 会将元素信息和您的描述发送给 Cursor
   - Cursor 会自动定位到相关代码并进行修改

## 功能特性

- ✅ 可视化选择网页元素
- ✅ 实时查看元素的 DOM 结构和样式
- ✅ 与 Cursor AI 无缝集成
- ✅ 自动定位代码位置
- ✅ 无需修改项目代码
- ✅ 仅开发模式启用，不影响生产环境

## 注意事项

- 确保 VS Code 扩展已安装并启用
- 确保您正在使用 Cursor 或其他支持的 AI 编程助手
- 某些复杂的选择器可能需要手动调整生成的代码
- 配置文件 `stagewise.json` 用于指定开发服务器端口（默认 3000）

## 故障排除

如果无法连接或使用：

1. **确认扩展已安装**
   - 在 Cursor 扩展面板中检查 "Stagewise" 是否已安装并启用
   - 如果没有，请从 [扩展市场](https://marketplace.cursorapi.com/items/?itemName=stagewise.stagewise-vscode-extension) 安装

2. **确认开发服务器正在运行**
   - 运行 `npm run dev` 启动开发服务器
   - 确保服务器运行在 `http://localhost:3000`（或 `stagewise.json` 中配置的端口）

3. **检查扩展状态**
   - 查看 Cursor 的状态栏，确认 Stagewise 扩展已连接
   - 检查浏览器控制台是否有错误信息

4. **重启扩展**
   - 尝试禁用并重新启用 Stagewise 扩展
   - 或重启 Cursor 编辑器

## 配置文件

项目中的 `stagewise.json` 用于配置开发服务器端口：

```json
{
  "appPort": 3000
}
```

如果您的开发服务器运行在其他端口，请更新此文件。

## 更多信息

- [Stagewise VS Code Extension](https://marketplace.cursorapi.com/items/?itemName=stagewise.stagewise-vscode-extension)
- [Stagewise 官方文档](https://stagewise.dev)
- [GitHub 仓库](https://github.com/stagewise/stagewise)

