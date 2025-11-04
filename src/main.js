// Theme toggle
const rootHtml = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') rootHtml.classList.add('dark');
  themeToggle.addEventListener('click', () => {
    rootHtml.classList.toggle('dark');
    localStorage.setItem('theme', rootHtml.classList.contains('dark') ? 'dark' : 'light');
  });
}

// Scroll progress bar
const progress = document.getElementById('scroll-progress');
if (progress) {
  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = p + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Simple typewriter for hero subtitle
const typeEl = document.getElementById('typewriter');
if (typeEl) {
  const text = 'Data · Product · Growth';
  let i = 0;
  const tick = () => {
    if (i <= text.length) {
      typeEl.textContent = text.slice(0, i);
      i++;
      setTimeout(tick, 80);
    }
  };
  tick();
}

// Ken Burns gallery basic carousel
(() => {
  const images = Array.from(document.querySelectorAll('#gallery [data-gallery], #gallery img')); // first img has no data-gallery
  if (!images.length) return;
  let current = 0;
  const dots = Array.from(document.querySelectorAll('#gallery [data-dot]'));

  function show(idx) {
    images.forEach((img, i) => {
      img.style.opacity = i === idx ? '1' : '0';
      img.classList.toggle('animate-kenburns', i === idx);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('w-6', i === idx);
      d.classList.toggle('w-2', i !== idx);
      d.classList.toggle('bg-accent', i === idx);
      d.classList.toggle('bg-white/40', i !== idx);
    });
  }
  function next() { current = (current + 1) % images.length; show(current); }
  function prev() { current = (current - 1 + images.length) % images.length; show(current); }

  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  nextBtn && nextBtn.addEventListener('click', next);
  prevBtn && prevBtn.addEventListener('click', prev);

  let timer = setInterval(next, 6000);
  const gallery = document.getElementById('gallery');
  if (gallery) {
    gallery.addEventListener('mouseenter', () => clearInterval(timer));
    gallery.addEventListener('mouseleave', () => { timer = setInterval(next, 6000); });
  }
  show(current);
})();

// AI Chat: elements
const fab = document.getElementById('ai-fab');
const panel = document.getElementById('ai-chat');
const closeBtn = document.getElementById('ai-close');
const minBtn = document.getElementById('ai-min');
const input = document.getElementById('ai-input');
const sendBtn = document.getElementById('ai-send');
const messages = document.getElementById('ai-messages');

function openChat() { panel?.classList.remove('hidden'); input?.focus(); }
function closeChat() { panel?.classList.add('hidden'); }

fab?.addEventListener('click', openChat);
closeBtn?.addEventListener('click', closeChat);
minBtn?.addEventListener('click', closeChat);

// textarea autoresize and send state
function updateSendState() {
  if (!input || !sendBtn) return;
  sendBtn.disabled = input.value.trim().length === 0;
}
input?.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 112) + 'px';
  updateSendState();
});
updateSendState();

// helper to append message bubble
function appendMessage({ role, text }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex items-end gap-2 ' + (role === 'user' ? 'justify-end' : '');

  if (role === 'ai') {
    const avatar = document.createElement('div');
    avatar.className = 'w-6 h-6 rounded-full bg-[#2a2a2a] ring-1 ring-white/10';
    wrapper.appendChild(avatar);
  }

  const bubble = document.createElement('div');
  bubble.className = 'max-w-[75%] px-3 py-2 text-sm rounded-2xl ' + (role === 'user' ? 'bubble-user rounded-br-sm' : 'bubble-ai rounded-bl-sm');
  bubble.textContent = text;
  wrapper.appendChild(bubble);

  const time = document.createElement('div');
  time.className = 'text-[10px] text-slate-500 mt-1 ' + (role === 'user' ? 'text-right' : '');
  time.textContent = '刚刚';

  const block = document.createElement('div');
  block.appendChild(wrapper);
  block.appendChild(time);

  messages?.appendChild(block);
  messages?.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
}

function showTyping() {
  const row = document.createElement('div');
  row.className = 'flex items-end gap-2';
  const avatar = document.createElement('div');
  avatar.className = 'w-6 h-6 rounded-full bg-[#2a2a2a] ring-1 ring-white/10';
  const bubble = document.createElement('div');
  bubble.className = 'max-w-[75%] px-3 py-2 text-sm rounded-2xl bubble-ai rounded-bl-sm typing-dots';
  bubble.textContent = '';
  row.appendChild(avatar);
  row.appendChild(bubble);
  messages?.appendChild(row);
  messages?.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
  return row;
}

async function fakeAIResponse(prompt) {
  // 简单模拟：根据关键词返回固定回复
  if (/联系|email|邮箱/i.test(prompt)) return '你可以通过邮箱 huangrenheng015@gmail.com 联系我。';
  if (/项目|project/i.test(prompt)) return '最近在做的项目包括指数标签系统与城市通勤可视化。';
  if (/资源|学习/i.test(prompt)) return '学习建议：Python 数据分析、可视化、产品增长案例。';
  return '你好，我是你的 AI 助手，很高兴与你交流！';
}

async function sendCurrent() {
  const val = input?.value.trim();
  if (!val) return;
  appendMessage({ role: 'user', text: val });
  if (input) { input.value = ''; input.style.height = 'auto'; updateSendState(); }

  const typing = showTyping();
  await new Promise(r => setTimeout(r, 900));
  const reply = await fakeAIResponse(val);
  typing?.remove();
  appendMessage({ role: 'ai', text: reply });
}

sendBtn?.addEventListener('click', sendCurrent);
input?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendCurrent();
  }
});

// Suggestion chips
document.querySelectorAll('[data-suggest]').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.textContent || '';
    if (input) {
      input.value = text;
      input.dispatchEvent(new Event('input'));
      input.focus();
    }
  });
});


