# Stagewise 安装指南

## 问题诊断

如果您在 Cursor 命令面板中输入 `stagewise` 时看不到任何命令，可能是以下原因：

1. **扩展已安装但未激活** - 需要重新加载窗口
2. **扩展已激活但命令名称不匹配** - Stagewise 只有一个命令：`stagewise.setAgent`
3. **扩展功能不需要命令面板** - Stagewise 主要在后台运行，通过浏览器连接使用

**重要**：即使命令面板中没有命令，Stagewise 扩展也能正常工作！扩展会在后台自动运行并与浏览器连接。

## 解决方案

### 方案 1：安装 Cursor/VS Code 扩展（推荐）

1. **在 Cursor 中安装扩展**
   - 按 `Cmd+Shift+X` (Mac) 或 `Ctrl+Shift+X` (Windows/Linux) 打开扩展面板
   - 在搜索框中输入：`Stagewise` 或 `stagewise.stagewise-vscode-extension`
   - 点击 **Install（安装）** 按钮
   - 等待安装完成

2. **验证安装**
   - 安装后，扩展应该会自动启用
   - 重启 Cursor 编辑器
   - 再次按 `Cmd+Shift+P` 打开命令面板
   - 输入 `stagewise`，应该能看到相关命令

3. **直接访问扩展页面**
   - 如果搜索不到，可以访问：
   - Cursor Marketplace: https://marketplace.cursorapi.com/items/?itemName=stagewise.stagewise-vscode-extension
   - VS Code Marketplace: https://marketplace.visualstudio.com/items?itemName=stagewise.stagewise-vscode-extension

### 方案 2：使用 npm 包方式（如果扩展不可用）

如果扩展无法安装，可以使用 npm 包方式：

1. **安装 npm 包**
   ```bash
   npm install -D @stagewise/toolbar
   ```

2. **代码已配置**
   - `components/StagewiseInit.tsx` 已经配置好了
   - 会在开发环境中自动初始化工具栏

3. **验证**
   - 启动开发服务器：`npm run dev`
   - 打开浏览器访问 `http://localhost:3000`
   - 打开浏览器控制台，应该看到 Stagewise 初始化消息
   - 点击页面元素，工具栏应该出现

## 当前项目状态

✅ `stagewise.json` 已配置（端口：3000）
✅ `components/StagewiseInit.tsx` 已更新（使用 npm 包方式）
✅ `app/layout.tsx` 已包含 StagewiseInit 组件

## 下一步

1. **如果扩展已安装**：
   - 启动开发服务器：`npm run dev`
   - 在浏览器中打开 `http://localhost:3000`
   - 点击页面元素，工具栏应该出现

2. **如果扩展未安装**：
   - 先尝试安装 Cursor 扩展（方案 1）
   - 如果扩展不可用，代码已经配置好 npm 包方式（方案 2）

## 验证清单

- [ ] Stagewise 扩展已安装在 Cursor 中（方案 1）
- [ ] 或者 `@stagewise/toolbar` npm 包已安装（方案 2）
- [ ] 开发服务器正在运行（`npm run dev`）
- [ ] 浏览器已访问 `http://localhost:3000`
- [ ] 浏览器控制台有 Stagewise 初始化消息
- [ ] 点击页面元素时能看到工具栏


