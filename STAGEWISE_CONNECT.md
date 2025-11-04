# Stagewise 连接指南 - 方式一

## 快速连接步骤

### 📋 第一步：安装依赖（在 Cursor 中）

1. 按 `Cmd + Shift + P` (macOS) 或 `Ctrl + Shift + P` (Windows/Linux) 打开命令面板
2. 输入 `Tasks: Run Task` 并回车
3. 选择 `Stagewise: Setup Toolbar` 任务
4. 等待安装完成

### 🚀 第二步：启动开发服务器

**方法 A：使用 Cursor 任务**
1. 按 `Cmd + Shift + P` (macOS) 或 `Ctrl + Shift + P` (Windows/Linux)
2. 输入 `Tasks: Run Task` 并回车
3. 选择 `Stagewise: Start Dev Server` 任务

**方法 B：使用终端**
```bash
npm run dev
# 或
pnpm dev
```

### 🌐 第三步：在浏览器中连接

1. **打开浏览器**
   - 访问 `http://localhost:3000`
   - 打开开发者工具（F12 或 Cmd+Option+I）

2. **检查连接状态**
   - 在控制台中查看是否有 `✅ Stagewise toolbar connected to Cursor` 消息
   - 如果看到警告，说明依赖未安装，请先完成第一步

3. **使用工具栏**
   - 点击页面上的任意元素
   - 工具栏应该会出现在页面上
   - 输入您想要进行的修改，Stagewise 会发送给 Cursor AI

## 🔧 故障排除

### 问题：任务列表中没有看到 Stagewise 任务

**解决方案**：
- 确保项目根目录下有 `.vscode/tasks.json` 文件
- 重启 Cursor 编辑器
- 检查是否在正确的项目目录中

### 问题：浏览器控制台显示 "Stagewise toolbar not available"

**解决方案**：
1. 运行安装任务：`Tasks: Run Task` → `Stagewise: Setup Toolbar`
2. 或者在终端手动安装：
   ```bash
   npm install -D @stagewise/toolbar --legacy-peer-deps
   ```
3. 重启开发服务器

### 问题：工具栏出现但无法连接到 Cursor

**解决方案**：
1. 确保 Cursor 编辑器正在运行
2. 检查 Cursor 是否允许外部连接（在 Cursor 设置中）
3. 检查防火墙是否阻止了 WebSocket 连接

## 📝 验证连接成功的标志

- ✅ 浏览器控制台显示 "Stagewise toolbar connected to Cursor"
- ✅ 点击页面元素时，工具栏出现并显示元素信息
- ✅ 输入修改请求后，Cursor 中能看到相应的代码变更建议

## 💡 提示

- Stagewise 仅在开发模式（`npm run dev`）下工作
- 生产环境构建（`npm run build`）不会包含 Stagewise
- 确保 Cursor 编辑器保持打开状态以保持连接

