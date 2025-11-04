# Stagewise 测试步骤

## 重要提示

**Stagewise 工具栏不是一个一直显示在页面上的浮动工具栏！** 

它会：
1. 在页面加载时初始化（你看不到它）
2. **只有当你点击页面上的元素时，工具栏才会出现**

## 测试步骤

### 1. 启动开发服务器

**重要：必须先启动开发服务器！**

在终端运行：
```bash
npm run dev
```

等待看到：
```
▲ Next.js 14.2.25
- Local:        http://localhost:3000
```

### 2. 打开浏览器

访问：`http://localhost:3000`

**不要访问 `http://127.0.0.1:3000` 或其他地址**（除非你的开发服务器配置了其他地址）

### 3. 打开浏览器控制台

按 `F12` 或 `Cmd+Option+I`（Mac）打开开发者工具，然后切换到 **Console** 标签页

### 4. 检查初始化消息

你应该在控制台看到以下消息之一：

**✅ 成功的情况：**
```
🔍 Stagewise Toolbar 检查: {isDev: true, isClient: true, ...}
📦 Stagewise 模块加载成功
✅ Stagewise toolbar initialized successfully
💡 现在可以点击页面上的元素来使用 Stagewise
💡 Stagewise 工具栏会在您点击元素时出现
```

同时，你会在页面**右下角**看到一个绿色的 "✓ Stagewise Ready" 提示（3秒后消失）

**❌ 失败的情况：**
```
⚠️ Stagewise toolbar not available: [错误信息]
```

### 5. 测试工具栏

**关键步骤：点击页面上的任意元素！**

1. 点击页面上任意可见的元素（按钮、文字、图片等）
2. **工具栏应该会出现在你点击的元素附近**
3. 工具栏会显示该元素的信息

### 6. 如果仍然看不到工具栏

如果初始化成功，但点击元素时看不到工具栏，可能是：

1. **浏览器扩展冲突**
   - 尝试在无痕模式下打开
   - 或禁用广告拦截器等扩展

2. **页面元素被遮挡**
   - 工具栏可能出现在屏幕外
   - 尝试滚动页面查看

3. **CSS z-index 问题**
   - 某些样式可能覆盖了工具栏
   - 检查是否有 `z-index: 999999` 的样式冲突

## 快速诊断命令

在浏览器控制台中运行以下命令来检查状态：

```javascript
// 检查 Stagewise 是否已初始化
window.stagewiseInitialized = true; // 如果看到这个，说明已经初始化

// 检查是否有 Stagewise 相关的 DOM 元素
document.querySelector('[id*="stagewise"], [class*="stagewise"]');

// 查看所有已加载的脚本
Array.from(document.querySelectorAll('script')).map(s => s.src);
```

## 常见问题

### Q: 为什么我看不到一直显示的工具栏？
A: Stagewise 工具栏是**按需显示**的，只有点击元素时才会出现。这是正常行为。

### Q: 点击元素后还是没有工具栏？
A: 
1. 确认控制台显示 "✅ Stagewise toolbar initialized successfully"
2. 尝试点击不同的元素
3. 检查是否有 JavaScript 错误
4. 尝试刷新页面（Cmd+R 或 Ctrl+R）

### Q: 看到 "⚠️ Stagewise toolbar not available" 错误？
A: 依赖可能没有正确安装，运行：
```bash
npm install -D @stagewise/toolbar --legacy-peer-deps
```

然后重启开发服务器。

### Q: 开发服务器启动后，修改了代码但看不到变化？
A: 需要硬刷新浏览器（Cmd+Shift+R 或 Ctrl+Shift+R）

