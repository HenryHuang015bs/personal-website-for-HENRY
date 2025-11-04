# 检查 Stagewise 扩展是否已安装

## 快速检查方法

### 方法 1：在 Cursor 中检查（推荐）

1. **打开扩展面板**
   - 点击 Cursor 左侧边栏的扩展图标（四个方块的图标）
   - 或按快捷键：`Cmd + Shift + X` (Mac) 或 `Ctrl + Shift + X` (Windows/Linux)

2. **搜索 Stagewise**
   - 在搜索框中输入：`stagewise`
   - 查看结果

3. **检查状态**
   - ✅ **已安装**：如果看到 "Stagewise" 扩展，并且显示"已启用"或"Enabled"
   - ❌ **未安装**：如果搜索不到，或显示"安装"按钮

### 方法 2：查看命令面板

1. 按 `Cmd + Shift + P` (Mac) 或 `Ctrl + Shift + P` (Windows/Linux)
2. 输入：`Extensions: Show Installed Extensions`
3. 在列表中查找 "Stagewise"

### 方法 3：检查状态栏

- 如果扩展已安装并运行，Cursor 状态栏可能会显示 Stagewise 相关的状态指示

### 方法 4：检查扩展目录（高级）

在终端运行（Mac/Linux）：
```bash
ls -la ~/.cursor/extensions/ | grep stagewise
```

或（Windows）：
```powershell
dir %USERPROFILE%\.cursor\extensions\ | findstr stagewise
```

## 如果未安装

1. 点击 Cursor 左侧边栏的扩展图标
2. 搜索：`stagewise.stagewise-vscode-extension`
3. 点击"安装"按钮
4. 等待安装完成
5. 扩展会自动启用

## 验证扩展是否正常工作

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **打开浏览器**
   - 访问 `http://localhost:3000`
   - 打开开发者工具（F12 或 Cmd+Option+I）

3. **检查连接**
   - 如果扩展正常工作，浏览器控制台可能会有相关日志
   - 点击页面元素，看是否有 Stagewise 功能响应

## 常见问题

**Q: 扩展显示已安装但无法使用？**
- 尝试禁用并重新启用扩展
- 重启 Cursor

**Q: 找不到扩展？**
- 确认您使用的是 Cursor 编辑器（不是 VS Code）
- 扩展 ID 应为：`stagewise.stagewise-vscode-extension`

**Q: 安装后没有反应？**
- 确保开发服务器正在运行
- 检查 `stagewise.json` 配置文件中的端口是否正确

