'use client';

import { useEffect, useState } from 'react';

export default function StagewiseInit() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'not-found'>('checking');
  const [showStatus, setShowStatus] = useState(true);

  useEffect(() => {
    // 确保在客户端运行
    if (typeof window === 'undefined') {
      console.log('⚠️ StagewiseInit: window 未定义，跳过初始化（服务器端渲染）');
      return;
    }

    // 在开发环境和预览环境中检查 Stagewise（包括 Vercel 预览部署）
    const hostname = window.location.hostname;
    const isLocalhost =
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '' ||
      hostname === '::1'; // IPv6 localhost

    // 允许在 Vercel 预览部署中使用（*.vercel.app）
    const isVercelPreview = hostname.includes('vercel.app');

    // 允许在开发环境或预览环境中运行
    const isDevOrPreview = isLocalhost || isVercelPreview;

    // 添加调试信息
    console.log('%c🔍 Stagewise 环境检查', 'font-size: 16px; font-weight: bold; color: #007acc;');
    console.log('📋 环境信息:', {
      hostname: hostname,
      port: window.location.port || '3000',
      protocol: window.location.protocol,
      url: window.location.href,
      isLocalhost: isLocalhost,
      isVercelPreview: isVercelPreview,
      isDevOrPreview: isDevOrPreview,
      userAgent: navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other',
      isSecureContext: window.isSecureContext,
      locationOrigin: window.location.origin,
    });

    if (!isDevOrPreview) {
      console.log('%c⚠️ Stagewise 未在开发/预览环境中运行，已禁用', 'color: orange; font-weight: bold;');
      console.log('当前环境:', hostname);
      console.log('提示: Stagewise 仅在 localhost 或 Vercel 预览环境中运行');
      setShowStatus(false);
      return; // 生产环境不加载（除非是 Vercel 预览）
    }

    console.log('%c✅ Stagewise 环境检查通过，开始初始化', 'font-size: 16px; font-weight: bold; color: green;');

    // 检查是否有来自扩展的消息监听器
    let extensionDetected = false;
    const checkExtension = () => {
      // 检查 window 上的各种可能属性
      const win = window as any;
      const possibleKeys = [
        '__STAGEWISE__',
        'stagewise',
        '__stagewise__',
        'Stagewise',
        'STAGEWISE',
      ];
      
      for (const key of possibleKeys) {
        if (win[key]) {
          console.log(`✅ 发现 window.${key}:`, win[key]);
          extensionDetected = true;
        }
      }
      
      // 检查是否通过 content script 注入
      // 扩展可能通过 Chrome 扩展 API 注入
      // 注意：只进行被动检测，不主动调用任何 runtime API，避免触发 runtime.connect() 错误
      try {
        // 只检查 chrome 对象是否存在，不调用任何方法
        if (typeof chrome !== 'undefined' && chrome.runtime) {
          // 不调用 getManifest() 或其他可能触发连接的方法
          // 只检查对象是否存在
          console.log('✅ 检测到 Chrome 扩展环境（被动检测）');
          extensionDetected = true;
        }
      } catch (e) {
        // 忽略错误
      }
      
      return extensionDetected;
    };

    // 尝试手动触发初始化（如果扩展提供了 API）
    const tryManualInit = () => {
      const win = window as any;
      const initMethods = [
        () => win.__STAGEWISE__?.init?.(),
        () => win.stagewise?.init?.(),
        () => win.__STAGEWISE__?.initToolbar?.(),
        () => win.stagewise?.initToolbar?.(),
      ];

      for (const initMethod of initMethods) {
        try {
          if (typeof initMethod === 'function') {
            const result = initMethod();
            if (result !== undefined) {
              console.log('✅ 成功调用初始化方法');
              return true;
            }
          }
        } catch (e) {
          // 继续尝试下一个方法
        }
      }
      return false;
    };

    // 检查所有可能的位置
    const checkStagewise = () => {
      extensionDetected = checkExtension(); // 更新全局状态
      
      const checks: Record<string, boolean> = {
        'window.__STAGEWISE__': !!(window as any).__STAGEWISE__,
        'window.stagewise': !!(window as any).stagewise,
        '[data-stagewise]': !!document.querySelector('[data-stagewise]'),
        'script[src*="stagewise"]': !!document.querySelector('script[src*="stagewise"]'),
        '#stagewise': !!document.querySelector('#stagewise'),
        '.stagewise': !!document.querySelector('.stagewise'),
        'iframe[src*="stagewise"]': !!document.querySelector('iframe[src*="stagewise"]'),
      };

      // 检查所有 scripts
      const allScripts = Array.from(document.querySelectorAll('script'));
      checks['scripts with stagewise'] = allScripts.some(
        (script) =>
          script.src?.includes('stagewise') ||
          script.innerHTML?.includes('stagewise') ||
          script.innerHTML?.includes('STAGEWISE')
      );

      // 检查所有样式
      const allStyles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
      checks['styles with stagewise'] = allStyles.some(
        (style) =>
          (style as HTMLLinkElement).href?.includes('stagewise') ||
          style.textContent?.includes('stagewise')
      );

      // 检查所有属性
      const allElements = document.querySelectorAll('*');
      checks['elements with stagewise attr'] = Array.from(allElements).some((el) => {
        return Array.from(el.attributes).some((attr) =>
          attr.name.toLowerCase().includes('stagewise')
        );
      });

      console.log('🔎 检查结果:');
      Object.entries(checks).forEach(([key, value]) => {
        console.log(`   ${value ? '✅' : '❌'} ${key}: ${value}`);
      });

      // 检查所有 iframe（扩展可能通过 iframe 注入）
      const allIframes = Array.from(document.querySelectorAll('iframe'));
      checks['iframes with stagewise'] = allIframes.some(
        (iframe) =>
          iframe.src?.includes('stagewise') ||
          iframe.id?.includes('stagewise') ||
          iframe.name?.includes('stagewise')
      );

      // 检查 postMessage 监听器（扩展可能通过消息通信）
      const hasPostMessage = 'onmessage' in window && window.onmessage !== null;
      checks['postMessage listener'] = hasPostMessage;

      const hasStagewise = Object.values(checks).some((v) => v) || extensionDetected;

      // 如果检测到扩展 API，尝试手动初始化
      if (extensionDetected && !hasStagewise) {
        console.log('🔄 尝试手动初始化 Stagewise...');
        const initSuccess = tryManualInit();
        if (initSuccess) {
          console.log('%c✅ Stagewise 手动初始化成功！', 'font-size: 14px; font-weight: bold; color: green;');
        }
      }

      if (hasStagewise || extensionDetected) {
        setStatus('connected');
        console.log('%c✅ Stagewise 已检测到！', 'font-size: 14px; font-weight: bold; color: green;');
        console.log('💡 现在可以点击页面上的元素来使用 Stagewise');
        console.log('💡 如果工具栏不出现，尝试点击页面上的按钮、文本或图片等元素');
        console.log('💡 尝试按 Ctrl+Shift+P (Cmd+Shift+P on Mac) 搜索 "Stagewise" 命令');
      } else {
        console.log('%c⚠️ 未检测到 Stagewise', 'font-size: 14px; font-weight: bold; color: orange;');
        console.log('');
        console.log('📝 排查步骤:');
        console.log('   1️⃣  检查 Cursor 扩展');
        console.log('      - 按 Cmd+Shift+X (Mac) 或 Ctrl+Shift+X (Windows)');
        console.log('      - 搜索 "Stagewise"');
        console.log('      - 确认已安装并启用');
        console.log('');
        console.log('   2️⃣  确认服务器地址');
        console.log('      - 当前地址:', window.location.href);
        console.log('      - 应该访问: http://localhost:3000');
        console.log('');
        console.log('   3️⃣  重启和刷新');
        console.log('      - 重启 Cursor 编辑器');
        console.log('      - 刷新浏览器页面 (Cmd+Shift+R)');
        console.log('      - 清除浏览器缓存');
        console.log('');
        console.log('   4️⃣  检查端口配置');
        console.log('      - 确认 stagewise.json 中的 appPort 是 3000');
        console.log('      - 确认开发服务器运行在端口 3000');
        console.log('');
        console.log('   5️⃣  尝试点击元素');
        console.log('      - Stagewise 工具栏可能在点击时才出现');
        console.log('      - 尝试点击页面上的不同元素');
        console.log('');
        console.log('🌐 扩展安装地址:');
        console.log('   https://marketplace.cursorapi.com/items/?itemName=stagewise.stagewise-vscode-extension');
        console.log('');
        console.log('   6️⃣  检查 Cursor 编辑器');
        console.log('      - 确保 Cursor 编辑器已启动并运行');
        console.log('      - 检查编辑器右下角是否有 Stagewise 状态指示');
        console.log('      - 尝试在 Cursor 中打开命令面板 (Cmd+Shift+P)');
        console.log('      - 搜索 "Stagewise" 查看可用命令');
        console.log('');
        console.log('   7️⃣  检查扩展连接');
        console.log('      - Stagewise 扩展需要连接到开发服务器');
        console.log('      - 确认服务器正在运行: npm run dev');
        console.log('      - 检查浏览器控制台是否有连接错误');
        console.log('');
        console.log('   8️⃣  尝试手动触发');
        console.log('      - 在页面上点击任意元素');
        console.log('      - 尝试双击元素');
        console.log('      - 尝试右键点击元素');
        console.log('      - 某些扩展只在特定交互时才显示工具栏');
      }

      // 添加全局点击监听器，帮助用户发现 Stagewise
      const clickHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target) {
          console.log('🖱️  点击了元素:', {
            tag: target.tagName,
            id: target.id,
            className: typeof target.className === 'string' ? target.className : 'N/A',
            text: target.textContent?.slice(0, 50),
          });
          // 检查点击后是否出现了 Stagewise 元素
          setTimeout(() => {
            const stagewiseElements = document.querySelectorAll('[data-stagewise], #stagewise, .stagewise');
            if (stagewiseElements.length > 0) {
              console.log('%c✅ 检测到 Stagewise 元素在点击后出现！', 'color: green; font-weight: bold;');
            }
          }, 100);
        }
      };
      
      document.addEventListener('click', clickHandler, true);
      
      // 30 秒后移除监听器
      setTimeout(() => {
        document.removeEventListener('click', clickHandler, true);
      }, 30000);

      // 安全地检查 className 是否包含某个字符串
      const hasClassName = (element: Element, search: string): boolean => {
        try {
          const className = element.className;
          if (typeof className === 'string') {
            return className.includes(search);
          }
          // 对于 DOMTokenList (HTML 元素)
          if (className instanceof DOMTokenList) {
            return className.contains(search);
          }
          // 对于 SVGAnimatedString (SVG 元素)
          if (className && typeof className === 'object' && 'baseVal' in className) {
            const baseVal = (className as any).baseVal;
            return typeof baseVal === 'string' && baseVal.includes(search);
          }
        } catch (e) {
          // 忽略错误，返回 false
        }
        return false;
      };

      // 监听 DOM 变化，看是否有 Stagewise 元素被注入
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              const element = node as Element;
              if (
                element.hasAttribute?.('data-stagewise') ||
                (element.id && typeof element.id === 'string' && element.id.includes('stagewise')) ||
                hasClassName(element, 'stagewise') ||
                element.tagName?.toLowerCase() === 'stagewise'
              ) {
                console.log('%c✅ 检测到 Stagewise 元素被注入!', 'color: green; font-weight: bold;');
                console.log('元素:', element);
              }
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-stagewise', 'id', 'class'],
      });

      // 30 秒后停止观察
      setTimeout(() => {
        observer.disconnect();
        if (!hasStagewise && !extensionDetected) {
          console.log('⏱️  已停止监听 DOM 变化（30秒后）');
          console.log('💡 如果仍未看到 Stagewise，请按照上述步骤排查');
          console.log('');
          console.log('📞 如果问题持续，请检查：');
          console.log('   - Cursor 编辑器日志（帮助 > 切换开发者工具）');
          console.log('   - 浏览器开发者工具 > Network 标签，查看是否有失败的请求');
          console.log('   - 确认 stagewise.json 文件在项目根目录且配置正确');
        }
      }, 30000);
    };

    // 延迟检查，给扩展时间注入（多次检查）
    setTimeout(checkStagewise, 500);
    setTimeout(checkStagewise, 2000);
    setTimeout(checkStagewise, 5000);
    setTimeout(checkStagewise, 10000);
    
    // 注意：移除主动发送消息给扩展，避免触发任何连接尝试
    // 扩展应该自动注入并监听，不需要页面主动触发
    // 如果扩展需要初始化，它应该通过 content script 自动完成

    // 监听来自扩展的消息
    const messageHandler = (event: MessageEvent) => {
      if (
        event.data &&
        typeof event.data === 'object' &&
        (event.data.type === 'STAGEWISE_READY' ||
          event.data.source === 'stagewise' ||
          event.data.source === 'stagewise-extension')
      ) {
        setStatus('connected');
        console.log('%c✅ 收到来自 Stagewise 扩展的消息！', 'color: green; font-weight: bold;');
        console.log('消息内容:', event.data);
        extensionDetected = true;
      }
    };
    
    window.addEventListener('message', messageHandler);

    // 注意：移除 WebSocket 连接尝试，避免产生连接错误
    // 扩展应该通过 content script 注入，而不是通过 WebSocket 连接

    // 定期检查扩展是否已连接
    let checkCount = 0;
    const maxChecks = 30; // 检查 60 秒（每 2 秒一次）
    const intervalId = setInterval(() => {
      checkCount++;
      const detected = checkExtension();
      const win = window as any;
      
      if (win.__STAGEWISE__ || win.stagewise || detected) {
        clearInterval(intervalId);
        setStatus('connected');
        console.log('%c✅ Stagewise 扩展已连接！', 'color: green; font-weight: bold;');
        console.log('💡 如果工具栏仍未出现，尝试点击页面上的元素');
      } else if (checkCount >= maxChecks) {
        setStatus('not-found');
        clearInterval(intervalId);
        console.log('%c⚠️  扩展检查超时', 'color: orange; font-weight: bold;');
        console.log('');
        console.log('📋 最后尝试：');
        console.log('   1. 确保 Cursor 编辑器已启动并打开此项目');
        console.log('   2. 在 Cursor 中按 Cmd+Shift+P，搜索 "Developer: Reload Window"');
        console.log('   3. 等待窗口重新加载后，刷新浏览器页面');
        console.log('   4. 检查 Cursor 右下角是否有 Stagewise 状态指示');
        console.log('   5. 尝试完全退出并重新启动 Cursor 编辑器');
      }
    }, 2000);
    
    // 60 秒后停止定期检查
    setTimeout(() => {
      clearInterval(intervalId);
    }, 60000);
    
    // 注意：移除所有主动连接尝试（WebSocket、postMessage 等）
    // 组件完全被动，只检测扩展是否已存在，不触发任何连接
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  // 渲染状态指示器（仅开发环境）
  if (!showStatus) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 left-4 z-[9999] pointer-events-none"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      <div
        className={`
          px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm border transition-all duration-300
          ${
            status === 'connected'
              ? 'bg-green-500/90 text-white border-green-400'
              : status === 'not-found'
              ? 'bg-orange-500/90 text-white border-orange-400'
              : 'bg-blue-500/90 text-white border-blue-400'
          }
        `}
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          {status === 'connected' && (
            <>
              <span className="animate-pulse">●</span>
              <span>Stagewise 已连接</span>
            </>
          )}
          {status === 'not-found' && (
            <>
              <span>⚠️</span>
              <span>Stagewise 未检测到</span>
            </>
          )}
          {status === 'checking' && (
            <>
              <span className="animate-spin">⟳</span>
              <span>正在检查 Stagewise...</span>
            </>
          )}
        </div>
        <button
          onClick={() => setShowStatus(false)}
          className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center text-white/70 hover:text-white transition-colors pointer-events-auto"
          aria-label="关闭状态指示器"
        >
          ×
        </button>
      </div>
    </div>
  );
}

