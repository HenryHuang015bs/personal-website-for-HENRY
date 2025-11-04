# AI助手"小憨"使用说明

## 功能介绍

您的网站现在已经集成了AI助手"小憨"，它是一个类似OpenAI的聊天助手，可以帮助访客解答问题。

## 使用方法

### 1. 首次使用配置

1. **获取OpenAI API密钥**
   - 访问 [OpenAI Platform](https://platform.openai.com/)
   - 注册或登录账号
   - 在 [API Keys](https://platform.openai.com/api-keys) 页面创建新的API密钥

2. **配置API密钥**
   - 在网站页面右下角点击AI助手按钮
   - 在弹出的聊天窗口中，会提示您输入OpenAI API密钥
   - 输入密钥后点击"保存"按钮
   - 密钥会保存在浏览器本地存储中，不会上传到服务器

### 2. 使用AI助手

1. **打开聊天窗口**
   - 点击页面右下角的圆形聊天按钮
   - 聊天窗口会从底部弹出

2. **发送消息**
   - 在输入框中输入您的问题
   - 按Enter键或点击发送按钮
   - AI助手会立即回复

3. **关闭窗口**
   - 点击右上角的关闭按钮
   - 或点击窗口外部区域

## 技术细节

### 文件结构

```
js/
  └── ai-assistant.js    # AI助手主要逻辑
index.html               # 已集成AI助手脚本
```

### API配置

- **API服务**: OpenAI API
- **默认模型**: GPT-3.5-turbo
- **API端点**: https://api.openai.com/v1/chat/completions

### 安全说明

- ✅ API密钥仅存储在浏览器本地（localStorage）
- ✅ 密钥不会上传到任何服务器
- ✅ 所有API请求直接从用户的浏览器发送到OpenAI
- ⚠️ 请注意保护您的API密钥，不要分享给他人

### 自定义配置

如需修改AI助手配置，可以编辑 `js/ai-assistant.js` 文件：

```javascript
const AI_CONFIG = {
  apiKey: '',           // API密钥（从用户输入获取）
  apiUrl: 'https://api.openai.com/v1/chat/completions',
  model: 'gpt-3.5-turbo',  // 可以改为 'gpt-4' 或其他模型
  assistantName: '小憨',
};
```

### 样式定制

AI助手使用了您网站的主题色（`--accent`变量），会自动适配您的网站风格。

## 故障排查

### 问题：聊天窗口不显示

- 检查浏览器控制台是否有错误
- 确认 `js/ai-assistant.js` 文件已正确加载
- 确认网站已通过HTTP服务器运行（不能使用file://协议）

### 问题：API请求失败

- 检查API密钥是否正确
- 检查网络连接
- 查看浏览器控制台的错误信息
- 确认OpenAI账户有足够的余额

### 问题：消息发送失败

- 检查API密钥是否已配置
- 确认输入的消息不为空
- 查看浏览器控制台的错误信息

## 未来改进建议

- [ ] 支持多轮对话上下文
- [ ] 添加打字动画效果
- [ ] 支持语音输入
- [ ] 添加消息历史记录
- [ ] 支持自定义AI模型

## 注意事项

1. **API费用**: 使用OpenAI API会产生费用，请合理使用
2. **速率限制**: OpenAI API有速率限制，避免过于频繁的请求
3. **内容安全**: AI回复的内容由OpenAI模型生成，请自行审查内容安全性

---

如有问题，请查看浏览器控制台的错误信息或联系网站管理员。
