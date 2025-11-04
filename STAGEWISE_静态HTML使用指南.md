# Stagewise 在静态 HTML 中的使用指南

## ✅ 已完成的配置

1. ✅ 已安装 `@stagewise/toolbar` npm 包
2. ✅ 已在 `index.html` 中添加 Stagewise 初始化脚本

## 🎯 Stagewise 的工作方式

**重要**：根据官方文档，`@stagewise/toolbar` npm 包已被弃用。**Stagewise 主要通过 Cursor 扩展自动注入到浏览器中。**

### 方式一：使用 Cursor 扩展（推荐）✅

**这是最简单的方式！**

1. **确保 Cursor 扩展已安装**
   - 在 Cursor 中，按 `Cmd+Shift+X` 打开扩展面板
   - 搜索 "Stagewise" 并确认已安装并启用

2. **启动开发服务器**
   ```bash
   # 使用任何静态服务器
   npx serve .
   # 或
   npm run dev  # 如果使用 Next.js
   ```

3. **Stagewise 会自动注入**
   - Cursor 扩展会自动连接到开发服务器
   - **无需任何代码配置**
   - 打开浏览器访问 `http://localhost:3000`
   - Stagewise 工具栏会在点击元素时自动出现

### 方式二：手动初始化（如果扩展不可用）

如果 Cursor 扩展未正常工作，可以使用 `index.html` 中已添加的脚本：

1. **使用支持 ES 模块的服务器**
   ```bash
   # 选项 1: 使用 Vite（需要先配置 vite.config.js）
   npx vite
   
   # 选项 2: 使用 Next.js（推荐）
   npm run dev
   ```

2. **检查浏览器控制台**
   - 打开浏览器开发者工具（F12）
   - 查看 Console 标签页
   - 应该看到：`✅ Stagewise toolbar initialized successfully`

## 🔍 如何验证 Stagewise 是否工作

### 步骤 1: 打开浏览器

1. 访问 `http://localhost:3000`（或您的服务器地址）
2. 打开开发者工具（F12 或 Cmd+Option+I）

### 步骤 2: 检查控制台

**如果看到以下消息，说明已成功：**
```
✅ Stagewise toolbar initialized successfully
💡 现在可以点击页面上的元素来使用 Stagewise
```

**如果看到警告，可能是：**
- Cursor 扩展未安装或未启用
- 服务器不支持 ES 模块导入

### 步骤 3: 测试工具栏

**重要**：Stagewise 工具栏**不是一直显示的**，它只在您点击页面元素时出现！

1. 点击页面上的任意元素（按钮、文字、图片等）
2. **工具栏应该会出现在您点击的元素附近**
3. 工具栏会显示该元素的信息

## 🚨 常见问题

### Q: 我在服务器中看不到 Stagewise

**A**: Stagewise 不是一个"服务器中的东西"，它是一个浏览器工具栏！

- Stagewise **在浏览器中运行**（通过 Cursor 扩展注入）
- 您需要在浏览器中看到它，而不是在服务器中

### Q: 点击元素后没有看到工具栏

**检查清单：**
1. ✅ Cursor 扩展已安装并启用
2. ✅ 开发服务器正在运行
3. ✅ 浏览器控制台没有错误
4. ✅ 尝试点击不同的元素

### Q: 控制台显示 "Stagewise toolbar not available"

**解决方案：**
1. **确保使用 Cursor 扩展**（推荐）
   - Cursor 扩展会自动注入，无需手动初始化
   - 检查扩展是否已启用

2. **如果必须手动初始化：**
   ```bash
   # 使用 Next.js 开发服务器（推荐）
   npm run dev
   ```

### Q: 使用 `npx serve` 时无法加载模块

**原因**：`npx serve` 是简单的静态文件服务器，不支持 ES 模块从 `node_modules` 导入。

**解决方案：**
1. **使用 Cursor 扩展**（推荐，会自动注入）
2. **或使用 Next.js 开发服务器**：
   ```bash
   npm run dev
   ```

## 📋 总结

### 推荐方式（最简单）：

1. ✅ 安装 Cursor Stagewise 扩展
2. ✅ 启动任何静态服务器（`npx serve`、`npm run dev` 等）
3. ✅ 在浏览器中访问网站
4. ✅ **Cursor 扩展会自动注入 Stagewise**

### 备选方式（如果扩展不可用）：

1. ✅ 使用 Next.js 开发服务器：`npm run dev`
2. ✅ 浏览器会自动加载 `index.html` 中的初始化脚本
3. ✅ Stagewise 会在控制台显示初始化成功消息

## 💡 提示

- **Stagewise 工具栏是"按需显示"的**，只有点击元素时才会出现
- **Cursor 扩展会自动注入**，无需手动配置代码
- **开发服务器可以是任何静态服务器**，Cursor 扩展会找到它

