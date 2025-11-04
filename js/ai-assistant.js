// AI助手"小憨"功能实现
(function() {
  'use strict';

  // AI助手配置
  const AI_CONFIG = {
    apiKey: '', // 将在初始化时从环境或用户输入获取
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    assistantName: '小憨',
  };

  // 初始化AI助手
  function initAIAssistant() {
    // 创建AI助手HTML结构
    const assistantHTML = `
      <!-- AI助手"小憨"聊天组件 -->
      <div id="ai-assistant" class="fixed bottom-6 right-6 z-50">
        <!-- 聊天按钮 -->
        <button
          id="ai-assistant-btn"
          class="w-14 h-14 rounded-full bg-[var(--accent)] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
          aria-label="打开AI助手小憨"
          title="与小憨聊天"
        >
          <svg
            class="w-6 h-6 transition-transform group-hover:rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>

        <!-- 聊天窗口 -->
        <div
          id="ai-assistant-window"
          class="hidden fixed bottom-24 right-6 w-96 h-[600px] rounded-2xl border border-white/30 bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col transition-all duration-300"
          style="transform: translateY(20px); opacity: 0;"
        >
          <!-- 头部 -->
          <div class="flex items-center justify-between p-4 border-b border-white/30 bg-[var(--accent)]/10 rounded-t-2xl">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center">
                <span class="text-white font-semibold text-lg">小</span>
              </div>
              <div>
                <h3 class="font-semibold text-[#052659]">小憨</h3>
                <p class="text-xs text-[#052659]/70">AI 助手</p>
              </div>
            </div>
            <button
              id="ai-assistant-close"
              class="w-8 h-8 rounded-full hover:bg-white/30 transition-colors flex items-center justify-center text-[#052659]"
              aria-label="关闭聊天窗口"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- 消息区域 -->
          <div
            id="ai-assistant-messages"
            class="flex-1 overflow-y-auto p-4 space-y-4"
          >
            <!-- 欢迎消息将在初始化时添加 -->
          </div>

          <!-- 输入区域 -->
          <div class="p-4 border-t border-white/30">
            <div class="flex gap-2">
              <input
                type="text"
                id="ai-assistant-input"
                placeholder="输入消息..."
                class="flex-1 rounded-full px-4 py-2 text-sm border border-white/40 bg-white/80 text-[#052659] placeholder:text-[#052659]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 transition-all"
              />
              <button
                id="ai-assistant-send"
                class="w-10 h-10 rounded-full bg-[var(--accent)] text-white hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="发送消息"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
            <p class="text-xs text-[#052659]/50 mt-2 text-center">
              使用 OpenAI API 驱动
            </p>
          </div>
        </div>
      </div>
    `;

    // 将AI助手添加到页面
    document.body.insertAdjacentHTML('beforeend', assistantHTML);

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
      #ai-assistant-messages::-webkit-scrollbar {
        width: 6px;
      }
      #ai-assistant-messages::-webkit-scrollbar-track {
        background: transparent;
      }
      #ai-assistant-messages::-webkit-scrollbar-thumb {
        background: rgba(5, 38, 89, 0.3);
        border-radius: 3px;
      }
      #ai-assistant-messages::-webkit-scrollbar-thumb:hover {
        background: rgba(5, 38, 89, 0.5);
      }

      #ai-assistant-window.show {
        display: flex !important;
        transform: translateY(0) !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);

    // 获取DOM元素
    const btn = document.getElementById('ai-assistant-btn');
    const window = document.getElementById('ai-assistant-window');
    const closeBtn = document.getElementById('ai-assistant-close');
    const messagesContainer = document.getElementById('ai-assistant-messages');
    const input = document.getElementById('ai-assistant-input');
    const sendBtn = document.getElementById('ai-assistant-send');

    // 添加欢迎消息
    addMessage('小憨', '你好！我是小憨，你的AI助手。有什么问题我可以帮你解答吗？😊', 'assistant');

    // 初始化API密钥
    function initApiKey() {
      // 尝试从localStorage获取
      const savedKey = localStorage.getItem('ai_assistant_api_key');
      if (savedKey) {
        AI_CONFIG.apiKey = savedKey;
        return true;
      }
      
      // 如果没有API密钥，显示提示
      setTimeout(() => showApiKeyPrompt(), 500);
      return false;
    }

    // 显示API密钥输入提示
    function showApiKeyPrompt() {
      const promptDiv = document.createElement('div');
      promptDiv.className = 'flex items-start gap-3 mt-4 ai-api-prompt';
      promptDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
          <span class="text-yellow-600 text-xs">⚠</span>
        </div>
        <div class="flex-1 rounded-2xl rounded-tl-sm bg-yellow-50 p-3 shadow-sm">
          <p class="text-sm text-[#052659] mb-2">
            请先配置OpenAI API密钥才能使用AI功能。
          </p>
          <div class="flex gap-2">
            <input
              type="password"
              id="api-key-input"
              placeholder="输入你的OpenAI API密钥"
              class="flex-1 rounded-lg px-3 py-1.5 text-xs border border-yellow-300 bg-white text-[#052659] focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
            <button
              id="save-api-key"
              class="px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-xs hover:bg-yellow-600 transition-colors"
            >
              保存
            </button>
          </div>
          <p class="text-xs text-[#052659]/60 mt-2">
            密钥仅存储在浏览器本地，不会上传到服务器
          </p>
        </div>
      `;
      messagesContainer.appendChild(promptDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      const saveBtn = document.getElementById('save-api-key');
      const keyInput = document.getElementById('api-key-input');
      
      saveBtn.addEventListener('click', () => {
        const key = keyInput.value.trim();
        if (key) {
          localStorage.setItem('ai_assistant_api_key', key);
          AI_CONFIG.apiKey = key;
          promptDiv.remove();
          addMessage('小憨', '太好了！现在我可以为你服务了，有什么问题尽管问我吧！😊', 'assistant');
        }
      });

      keyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          saveBtn.click();
        }
      });
    }

    // 切换聊天窗口显示
    function toggleWindow() {
      window.classList.toggle('show');
      if (window.classList.contains('show')) {
        input.focus();
        if (!AI_CONFIG.apiKey) {
          initApiKey();
        }
      }
    }

    // 关闭聊天窗口
    function closeWindow() {
      window.classList.remove('show');
    }

    // 添加消息到聊天窗口
    function addMessage(sender, text, role = 'user') {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'flex items-start gap-3 ' + (role === 'user' ? 'flex-row-reverse' : '');
      
      if (role === 'assistant') {
        messageDiv.innerHTML = `
          <div class="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
            <span class="text-[var(--accent)] text-sm font-semibold">小</span>
          </div>
          <div class="flex-1 rounded-2xl rounded-tl-sm bg-white/80 p-3 shadow-sm">
            <p class="text-sm text-[#052659] whitespace-pre-wrap">${escapeHtml(text)}</p>
          </div>
        `;
      } else {
        messageDiv.innerHTML = `
          <div class="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
            <span class="text-white text-sm font-semibold">你</span>
          </div>
          <div class="flex-1 rounded-2xl rounded-tr-sm bg-[var(--accent)]/20 p-3 shadow-sm">
            <p class="text-sm text-[#052659] whitespace-pre-wrap">${escapeHtml(text)}</p>
          </div>
        `;
      }
      
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      return messageDiv;
    }

    // 转义HTML
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // 显示加载动画
    function showLoading() {
      const loadingDiv = document.createElement('div');
      loadingDiv.id = 'ai-loading';
      loadingDiv.className = 'flex items-start gap-3';
      loadingDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
          <span class="text-[var(--accent)] text-sm font-semibold">小</span>
        </div>
        <div class="flex-1 rounded-2xl rounded-tl-sm bg-white/80 p-3 shadow-sm">
          <div class="flex gap-1">
            <div class="w-2 h-2 rounded-full bg-[var(--accent)]/40 animate-bounce" style="animation-delay: 0s;"></div>
            <div class="w-2 h-2 rounded-full bg-[var(--accent)]/40 animate-bounce" style="animation-delay: 0.2s;"></div>
            <div class="w-2 h-2 rounded-full bg-[var(--accent)]/40 animate-bounce" style="animation-delay: 0.4s;"></div>
          </div>
        </div>
      `;
      messagesContainer.appendChild(loadingDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      return loadingDiv;
    }

    // 移除加载动画
    function removeLoading() {
      const loading = document.getElementById('ai-loading');
      if (loading) loading.remove();
    }

    // 发送消息到AI
    async function sendMessage(message) {
      if (!AI_CONFIG.apiKey) {
        addMessage('系统', '请先配置OpenAI API密钥', 'assistant');
        showApiKeyPrompt();
        return;
      }

      // 添加用户消息
      addMessage('你', message, 'user');
      
      // 显示加载动画
      const loading = showLoading();
      
      // 收集对话历史（排除提示消息）
      const messageElements = Array.from(messagesContainer.children)
        .filter(el => !el.id && !el.classList.contains('ai-api-prompt'));
      
      const messages = [];
      for (const el of messageElements) {
        const text = el.querySelector('p')?.textContent || '';
        if (!text || text.includes('配置OpenAI API密钥') || text.includes('仅存储在浏览器本地')) continue;
        
        const role = el.classList.contains('flex-row-reverse') ? 'user' : 'assistant';
        messages.push({ role, content: text });
      }

      // 准备发送到OpenAI的消息
      const chatMessages = [
        { role: 'system', content: '你是一个名为"小憨"的友好AI助手，擅长帮助用户解答问题。请用中文回复，保持友好和专业的语调。' },
        ...messages,
        { role: 'user', content: message }
      ];

      try {
        const response = await fetch(AI_CONFIG.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AI_CONFIG.apiKey}`
          },
          body: JSON.stringify({
            model: AI_CONFIG.model,
            messages: chatMessages,
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        removeLoading();

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error?.message || 'API请求失败');
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        addMessage('小憨', aiResponse, 'assistant');

      } catch (error) {
        removeLoading();
        console.error('AI请求错误:', error);
        const errorMsg = error.message.includes('401') || error.message.includes('unauthorized')
          ? 'API密钥无效，请检查你的密钥是否正确。'
          : error.message.includes('rate limit')
          ? '请求过于频繁，请稍后再试。'
          : `抱歉，发生了一些错误：${error.message}。请检查你的API密钥是否正确，或者稍后再试。`;
        addMessage('小憨', errorMsg, 'assistant');
      }
    }

    // 事件监听
    btn.addEventListener('click', toggleWindow);
    closeBtn.addEventListener('click', closeWindow);
    sendBtn.addEventListener('click', () => {
      const message = input.value.trim();
      if (message) {
        sendMessage(message);
        input.value = '';
      }
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
      }
    });

    // 点击外部关闭窗口
    document.addEventListener('click', (e) => {
      if (window.classList.contains('show') && 
          !window.contains(e.target) && 
          !btn.contains(e.target)) {
        closeWindow();
      }
    });

    // 初始化
    initApiKey();
  }

  // 当DOM加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAIAssistant);
  } else {
    initAIAssistant();
  }
})();
