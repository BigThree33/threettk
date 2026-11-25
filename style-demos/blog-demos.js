/* ==========================================================================
   Interactive Engine for Personal Blog Demos (O – X)
   Clean lifecycle: only the active panel runs rAF / timers.
   ========================================================================== */
(function () {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  const BLOG_POSTS = {
    'noeva-deploy': {
      no: '01',
      title: '把 NOEVA 第一次送上生产环境：从本地跑到线上踩过的 7 个坑',
      category: '工程部署',
      date: '2026.11.22',
      readTime: '8 min read',
      tags: ['NOEVA', 'Next.js', '部署复盘'],
      cover: 'linear-gradient(135deg,#0f172a,#1d4ed8 55%,#38bdf8)',
      lead: '写完功能只算走完一半，真正让一个个人项目从 localhost 走进公网，才算第一次拥有生命。',
      quote: '个人项目最容易死在“等我再重构完这一版就上线”。先发一版能跑的，线上反馈会推着你继续改。',
      paragraphs: [
        'NOEVA 原本是我写给自己记思路、复盘项目的小工具。本地跑了两个多月后，我决定不再拖延，直接配好域名、HTTPS 和自动化构建，把第一个可用版本推上生产环境。',
        '真正上线那天踩了不少细碎的坑：环境变量在构建期与运行期的差异、静态资源缓存策略、移动端首屏字体闪烁，以及数据库迁移脚本的幂等处理。每一项单看都不大，凑在一起却足够折腾一整晚。',
        '复盘下来最大的收获不是学会了某条配置命令，而是建立了「最小可上线闭环」的体感——以后无论是 GeeGeeKing 还是这个个人博客，都可以用同一套轻量清单快速发布。'
      ],
      code: `# 最小发布前自检清单\npnpm build && pnpm start\n# 1. 核对生产环境变量与回调域名\n# 2. 检查首屏 LCP / 字体回退 / 移动端视口\n# 3. 验证冷启动日志与错误边界`
    },
    'geegeeking-tauri': {
      no: '02',
      title: '给 GeeGeeKing 套壳 Tauri：Web 前端第一次碰桌面端原生体验',
      category: '桌面端实验',
      date: '2026.11.24',
      readTime: '6 min read',
      tags: ['GeeGeeKing', 'Tauri', '像素风'],
      cover: 'linear-gradient(135deg,#1e1b4b,#7c3aed 55%,#ec4899)',
      lead: '想让一只像素待办小人真的住进任务栏旁边，网页标签页终究隔了一层，于是开始啃 Tauri。',
      quote: '把像素小组件从浏览器拖到桌面的那一刻，它不再只是一个网页，而是每天陪你干活的小摆件。',
      paragraphs: [
        'GeeGeeKing 最初是个纯前端的像素风待办小组件，但在浏览器里总会被几十个标签页淹没。我希望它能开机自启、透明置顶、轻量常驻内存，所以把目光转向了 Tauri。',
        '对比 Electron，Tauri 打包出来的体积小得多，前端代码几乎可以无缝迁移；真正需要重新适应的是窗口透明通道、系统托盘菜单、全局快捷键以及本地 JSON 存档的权限配置。',
        '目前已经跑通了本地窗口拖拽和像素无抗锯齿渲染（image-rendering: pixelated），下一步准备把每日完成任务后的角色动画和音效接进来。'
      ],
      code: `// src-tauri/tauri.conf.json 片段\n{\n  "app": {\n    "windows": [{ "label": "geegeeking", "width": 260, "height": 320, "transparent": true, "alwaysOnTop": true }]\n  }\n}`
    },
    'spring-motion': {
      no: '03',
      title: '写给自己的前端动效笔记：如何用弹簧曲线做出不油腻的交互',
      category: '交互与动效',
      date: '2026.11.18',
      readTime: '10 min read',
      tags: ['Framer', 'CSS', '微交互'],
      cover: 'linear-gradient(135deg,#042f2e,#0f766e 55%,#2dd4bf)',
      lead: '翻完几十个 Framer 和 Awwwards 获奖站点后，我发现高级感往往来自“克制的减速”，而不是满屏乱飞的特效。',
      quote: '好的动效像门轴里的阻尼器：你不会刻意注意到它，但只要去掉它，整个界面就会立刻变得生硬。',
      paragraphs: [
        '以前做页面容易陷入两个极端：要么完全静态，要么给每个卡片都加上大幅度弹跳。拆解 Framer Gallery 和 React Bits 的组件后才发现，真正耐看的动效只有三件事：清晰的方向因果、短促的响应时间（180–360ms），以及自然收尾的贝塞尔或弹簧阻尼。',
        '比如悬停卡片时，让微弱的光斑跟随指针（Spotlight），同时主体只上移 4px，视觉反馈已经足够明确；列表切换时，与其让整页闪白，不如让元素做 8px 的错峰浮现。',
        '同样重要的是尊重用户的 prefers-reduced-motion 偏好，并在标签页或面板隐藏时彻底停掉 requestAnimationFrame，性能干净，手感才会稳。'
      ],
      code: `/* 克制的弹簧感贝塞尔曲线 */\ntransition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1),\n            border-color 200ms ease;`
    },
    'ai-agent-ui': {
      no: '04',
      title: '从 C 端出图工具到 B 端教师 Agent：做 AI 界面的状态设计复盘',
      category: 'AI 产品',
      date: '2026.11.09',
      readTime: '12 min read',
      tags: ['AI UI', 'Agent', '产品思考'],
      cover: 'linear-gradient(135deg,#431407,#c2410c 55%,#fb923c)',
      lead: '传统 CRUD 界面只有加载、成功和报错；而 AI 应用里，最消耗用户耐心的是“正在思考但不知道在干嘛”的那十秒。',
      quote: 'AI 界面的核心不是把对话框做得多炫，而是把不确定的等待拆成可理解、可中断、可微调的阶段反馈。',
      paragraphs: [
        '白天在公司分别做过面向普通用户的 C 端图片 / AI 生成工具，以及面向课堂教学场景的 B 端教师 Agent 助手。两类产品受众完全不同，但在交互层面面对的是同一个难题：生成结果的不确定性。',
        '在 C 端出图工具里，用户更在意「低门槛试错」——预设风格芯片、草图直出和一键微调比满屏参数滑块有效得多；而在 B 端教师 Agent 里，老师最需要的是「过程透明」与「结果可编辑」，每一步调用了什么资料、生成的大纲能不能局部重写，直接决定信任度。',
        '这些工作里的状态机经验，反过来也帮我把个人小项目的空状态、异常恢复和微反馈设计得更完整。'
      ]
    },
    'why-handcode-blog': {
      no: '05',
      title: '为什么我还是想亲手写一个个人博客，而不是只发社交媒体',
      category: '个人随笔',
      date: '2026.10.28',
      readTime: '5 min read',
      tags: ['博客', '长期主义', '写作'],
      cover: 'linear-gradient(135deg,#18181b,#3f3f46 58%,#a1a1aa)',
      lead: '信息流里的帖子活不过三天，而一个属于自己的域名，可以把散落的灵感、半成品和踩坑慢慢长成档案。',
      quote: '社交媒体适合即时表达，但只有自己的博客能让你决定字号、留白、节奏，以及时间怎样被保存。',
      paragraphs: [
        '做这 24 套风格 Demo 的过程本身就很有意思：像素存档、瑞士网格、Framer 动效刊、Awwwards 索引、3D 雕塑馆……每换一套外壳，同一份个人经历都会呈现完全不同的情绪。',
        '但剥离掉外层视觉之后，博客真正能坚持写下去的前提其实是「轻」：既能发几千字的工程复盘，也能随手丢一句今天折腾 Tauri 的碎念，不用为了凑一篇大文章而停更半年。',
        '所以无论最后选定哪一种视觉主调，我都打算保留清晰的阅读正文与轻量的近况流，让这里既像作品展厅，也像每天路过的书桌。'
      ]
    },
    'game-site-study': {
      no: '06',
      title: '仿写游戏公司官网的 48 小时：拆解排版节奏与首屏视觉重心',
      category: '设计拆解',
      date: '2026.10.14',
      readTime: '7 min read',
      tags: ['排版', 'Awwwards', '仿写练习'],
      cover: 'linear-gradient(135deg,#14532d,#15803d 52%,#84cc16)',
      lead: '提升审美最快的方法不是收藏一百个灵感站，而是挑一个最打动你的首页，从栅格到动效一像素一像素抄懂。',
      quote: '看十遍“如何做好排版”，不如亲手把一个优秀官网的首屏字号比例、行高和留白量一遍。',
      paragraphs: [
        '之前做过一次练手项目：完整仿写某游戏公司的品牌官网。动手前以为最难的是炫酷的动画，真正量完发现，拉开差距的其实是极端的字号对比、精准的网格对齐和克制的配色数量。',
        '首屏往往只突出一个绝对核心（大标题或主视觉），导航和辅助信息全部退到 11–12px 的小字层级，让视线自然形成「一眼记住 → 顺流阅读 → 点击探索」的路径。',
        '把这套拆解方法迁移到个人博客上，即使没有重型插画，仅靠字重对比、细线网格和一点点交互巧思，也能做出很有记忆点的页面。'
      ]
    }
  };

  /* ---------- Horizontal mouse wheel scrolling on bottom .switch ---------- */
  const switchNav = document.querySelector('.switch');
  if (switchNav) {
    switchNav.addEventListener(
      'wheel',
      (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          switchNav.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }

  /* ---------- Shared Quick-Read Blog Modal ---------- */
  const modalBackdrop = document.getElementById('bmBackdrop');
  const modalDialog = document.getElementById('bmDialog');
  const modalCategory = document.getElementById('bmCategory');
  const modalDate = document.getElementById('bmDate');
  const modalRead = document.getElementById('bmRead');
  const modalTitle = document.getElementById('bmTitle');
  const modalLead = document.getElementById('bmLead');
  const modalBody = document.getElementById('bmBody');
  const modalTags = document.getElementById('bmTags');
  const modalClose = document.getElementById('bmClose');

  let activePanelId = 'a';
  const DARK_PANELS = new Set(['s', 't', 'u', 'x']);

  function openPostModal(postId) {
    const post = BLOG_POSTS[postId];
    if (!post || !modalBackdrop) return;
    const isDark =
      DARK_PANELS.has(activePanelId) ||
      (activePanelId === 'r' && document.getElementById('r')?.dataset.mat === 'chrome');
    modalDialog.classList.toggle('dark', isDark);
    modalCategory.textContent = post.category;
    modalDate.textContent = post.date;
    modalRead.textContent = post.readTime;
    modalTitle.textContent = post.title;
    modalLead.textContent = post.lead;

    let html = `<blockquote>${post.quote}</blockquote>`;
    html += post.paragraphs.map((p) => `<p>${p}</p>`).join('');
    if (post.code) {
      const escaped = post.code.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      html += `<pre><code>${escaped}</code></pre>`;
    }
    modalBody.innerHTML = html;
    modalTags.textContent = post.tags.map((t) => '#' + t).join('  ');
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    modalClose.focus();
  }

  function closePostModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
  }

  if (modalClose) modalClose.addEventListener('click', closePostModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closePostModal();
    });
  }
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) closePostModal();
  });

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-post]');
    if (!trigger) return;
    // Let Q's inline expand and V's split reader handle their own clicks
    if (trigger.closest('#q') || trigger.closest('#v')) return;
    if (e.target.closest('button.w-like')) return;
    openPostModal(trigger.dataset.post);
  });

  /* ---------- O: Framer category filter ---------- */
  const oTabs = document.querySelectorAll('.o-tab');
  const oCards = document.querySelectorAll('.o-card');
  oTabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      oTabs.forEach((b) => b.classList.toggle('on', b === btn));
      oCards.forEach((card) => {
        card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
      });
    });
  });

  /* ---------- P: Awwwards Clock + Lerped Cursor Preview ---------- */
  const pClock = document.getElementById('pClock');
  const pPreview = document.getElementById('pPreview');
  const pPrevInner = document.getElementById('pPreviewInner');
  const pRows = document.querySelectorAll('#p .p-row');
  let pClockTimer = 0;
  let pRaf = 0;
  let pActive = false;
  const pPos = { tx: -500, ty: -500, x: -500, y: -500, visible: false };

  function updatePClock() {
    if (!pClock) return;
    const now = new Date();
    pClock.textContent = now.toTimeString().slice(0, 8) + ' CST';
  }
  function tickPPreview() {
    if (!pActive) return;
    pPos.x += (pPos.tx - pPos.x) * 0.16;
    pPos.y += (pPos.ty - pPos.y) * 0.16;
    if (pPreview) {
      const tilt = Math.max(-7, Math.min(7, (pPos.tx - pPos.x) * 0.18));
      pPreview.style.transform = `translate3d(${pPos.x + 26}px, ${pPos.y - 96}px, 0) rotate(${tilt.toFixed(2)}deg)`;
    }
    pRaf = requestAnimationFrame(tickPPreview);
  }
  pRows.forEach((row) => {
    row.addEventListener('pointerenter', (e) => {
      const post = BLOG_POSTS[row.dataset.post];
      if (!post || !pPreview || !pPrevInner) return;
      pPrevInner.style.background = post.cover;
      pPrevInner.innerHTML = `<div class="p-preview-shape"></div><small>ISSUE ${post.no} / ${post.category}</small><b>${post.title.slice(0, 22)}${post.title.length > 22 ? '…' : ''}</b><span>${post.readTime} · ${post.date}</span>`;
      pPos.tx = e.clientX;
      pPos.ty = e.clientY;
      if (!pPos.visible) {
        pPos.x = e.clientX;
        pPos.y = e.clientY;
      }
      pPos.visible = true;
      pPreview.classList.add('show');
    });
    row.addEventListener('pointermove', (e) => {
      pPos.tx = e.clientX;
      pPos.ty = e.clientY;
    });
    row.addEventListener('pointerleave', () => {
      pPos.visible = false;
      pPreview?.classList.remove('show');
    });
  });

  function startP() {
    pActive = true;
    updatePClock();
    clearInterval(pClockTimer);
    pClockTimer = setInterval(updatePClock, 1000);
    cancelAnimationFrame(pRaf);
    if (!reduceMotion.matches) tickPPreview();
  }
  function stopP() {
    pActive = false;
    clearInterval(pClockTimer);
    cancelAnimationFrame(pRaf);
    pPreview?.classList.remove('show');
  }

  /* ---------- Q: Recent Stream filter + inline expand ---------- */
  const qFilterBtns = document.querySelectorAll('#q .q-filter button');
  const qEntries = document.querySelectorAll('#q .q-entry');
  qFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      qFilterBtns.forEach((b) => b.classList.toggle('on', b === btn));
      qEntries.forEach((entry) => {
        entry.classList.toggle('hidden', type !== 'all' && entry.dataset.type !== type);
      });
    });
  });
  qEntries.forEach((entry) => {
    entry.addEventListener('click', () => {
      entry.classList.toggle('open');
      const hint = entry.querySelector('.q-toggle-hint');
      if (hint) hint.textContent = entry.classList.contains('open') ? '收起摘要 ↑' : '点击展开全文摘要 ↓';
    });
  });

  /* ---------- R: Thrine 3D Material Switcher + Perspective Rig ---------- */
  const rPanel = document.getElementById('r');
  const rMatBtns = document.querySelectorAll('.r-mat-btn');
  const rStage = document.getElementById('rStage');
  const rRig = document.getElementById('rRig');
  rMatBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mat = btn.dataset.mat;
      rPanel.dataset.mat = mat;
      rMatBtns.forEach((b) => b.classList.toggle('on', b === btn));
    });
  });
  if (rStage && rRig) {
    rStage.addEventListener('pointermove', (e) => {
      if (reduceMotion.matches) return;
      const rect = rStage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      rRig.style.transform = `rotateY(${(nx * 32).toFixed(1)}deg) rotateX(${(-ny * 28).toFixed(1)}deg)`;
    });
    rStage.addEventListener('pointerleave', () => {
      rRig.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  /* ---------- S: React Bits Squares Canvas + Decrypted Text + Spotlight + Dock ---------- */
  const sPanel = document.getElementById('s');
  const sCanvas = document.getElementById('sCanvas');
  const sCtx = sCanvas ? sCanvas.getContext('2d') : null;
  let sRaf = 0;
  let sActive = false;
  let sOffset = 0;
  const sCells = new Map();
  let sW = 0,
    sH = 0;
  const S_CELL = 44;

  function sizeS() {
    if (!sPanel || !sCanvas || !sCtx) return;
    const rect = sPanel.getBoundingClientRect();
    sW = rect.width;
    sH = rect.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    sCanvas.width = Math.round(sW * dpr);
    sCanvas.height = Math.round(sH * dpr);
    sCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawS();
  }
  function drawS() {
    if (!sCtx) return;
    sCtx.clearRect(0, 0, sW, sH);
    const ox = sOffset % S_CELL;
    const oy = (sOffset * 0.6) % S_CELL;

    // Illuminated hovered squares
    for (const [key, alpha] of sCells.entries()) {
      const [cx, cy] = key.split(',').map(Number);
      sCtx.fillStyle = `rgba(56,189,248,${(alpha * 0.22).toFixed(3)})`;
      sCtx.fillRect(cx * S_CELL - ox, cy * S_CELL - oy, S_CELL, S_CELL);
      const next = alpha - 0.025;
      if (next <= 0.01) sCells.delete(key);
      else sCells.set(key, next);
    }

    sCtx.strokeStyle = 'rgba(148,163,184,0.09)';
    sCtx.lineWidth = 1;
    sCtx.beginPath();
    for (let x = -ox; x < sW + S_CELL; x += S_CELL) {
      sCtx.moveTo(x, 0);
      sCtx.lineTo(x, sH);
    }
    for (let y = -oy; y < sH + S_CELL; y += S_CELL) {
      sCtx.moveTo(0, y);
      sCtx.lineTo(sW, y);
    }
    sCtx.stroke();
  }
  function tickS() {
    if (!sActive) return;
    sOffset += 0.22;
    drawS();
    sRaf = requestAnimationFrame(tickS);
  }
  if (sPanel) {
    sPanel.addEventListener('pointermove', (e) => {
      if (!sActive) return;
      const rect = sPanel.getBoundingClientRect();
      const ox = sOffset % S_CELL;
      const oy = (sOffset * 0.6) % S_CELL;
      const cx = Math.floor((e.clientX - rect.left + ox) / S_CELL);
      const cy = Math.floor((e.clientY - rect.top + oy) / S_CELL);
      sCells.set(`${cx},${cy}`, 1);
    });
  }

  // Spotlight per card
  document.querySelectorAll('#s .s-card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--sx', e.clientX - r.left + 'px');
      card.style.setProperty('--sy', e.clientY - r.top + 'px');
    });
  });

  // Decrypted Text scramble effect
  const sDecryptEl = document.getElementById('sDecryptTarget');
  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+';
  let decryptTimer = 0;
  function runDecrypt() {
    if (!sDecryptEl || reduceMotion.matches) return;
    const original = sDecryptEl.dataset.text || sDecryptEl.textContent;
    let iter = 0;
    clearInterval(decryptTimer);
    decryptTimer = setInterval(() => {
      sDecryptEl.textContent = original
        .split('')
        .map((ch, i) => {
          if (ch === ' ' || ch === '.') return ch;
          if (i < iter) return original[i];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');
      iter += 0.65;
      if (iter >= original.length) {
        sDecryptEl.textContent = original;
        clearInterval(decryptTimer);
      }
    }, 26);
  }
  if (sDecryptEl) {
    sDecryptEl.parentElement.addEventListener('pointerenter', runDecrypt);
    sDecryptEl.parentElement.addEventListener('click', runDecrypt);
  }

  // Dock topic filter
  const sDockBtns = document.querySelectorAll('#s .s-dock button');
  const sCards = document.querySelectorAll('#s .s-card');
  sDockBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const topic = btn.dataset.topic;
      sDockBtns.forEach((b) => b.classList.toggle('on', b === btn));
      sCards.forEach((c) => c.classList.toggle('hidden', topic !== 'all' && c.dataset.topic !== topic));
    });
  });

  function startS() {
    sActive = true;
    cancelAnimationFrame(sRaf);
    sizeS();
    runDecrypt();
    if (!reduceMotion.matches) tickS();
  }
  function stopS() {
    sActive = false;
    cancelAnimationFrame(sRaf);
    clearInterval(decryptTimer);
  }

  /* ---------- T: Resend RSS Copy Feedback ---------- */
  const tbRss = document.getElementById('tbRssBtn');
  if (tbRss) {
    tbRss.addEventListener('click', () => {
      const old = tbRss.textContent;
      tbRss.textContent = '✓ 已复制 rss.xml 订阅地址';
      setTimeout(() => (tbRss.textContent = old), 1800);
    });
  }

  /* ---------- U: React Bits Aurora Silk Canvas + True Focus ---------- */
  const uPanel = document.getElementById('u');
  const uCanvas = document.getElementById('uCanvas');
  const uCtx = uCanvas ? uCanvas.getContext('2d') : null;
  const uWords = [...document.querySelectorAll('#u .u-word')];
  let uActive = false;
  let uRaf = 0;
  let uTimer = 0;
  let uW = 0,
    uH = 0,
    uT = 0;
  let uIdx = 0;
  let uLocked = false;

  function setUFocus(i) {
    uWords.forEach((w, idx) => w.classList.toggle('active', idx === i));
  }
  uWords.forEach((w, idx) => {
    w.addEventListener('pointerenter', () => {
      uLocked = true;
      uIdx = idx;
      setUFocus(idx);
    });
    w.addEventListener('pointerleave', () => {
      uLocked = false;
    });
  });

  function sizeU() {
    if (!uPanel || !uCanvas || !uCtx) return;
    const rect = uPanel.getBoundingClientRect();
    uW = rect.width;
    uH = rect.height;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    uCanvas.width = Math.round(uW * dpr);
    uCanvas.height = Math.round(uH * dpr);
    uCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawU();
  }
  function drawU() {
    if (!uCtx) return;
    uCtx.fillStyle = '#090613';
    uCtx.fillRect(0, 0, uW, uH);
    const ribbons = [
      { color: 'rgba(45,212,191,0.22)', amp: 64, freq: 0.0028, speed: 0.7, y: uH * 0.22 },
      { color: 'rgba(139,92,246,0.26)', amp: 85, freq: 0.0021, speed: -0.5, y: uH * 0.34 },
      { color: 'rgba(236,72,153,0.18)', amp: 58, freq: 0.0032, speed: 0.9, y: uH * 0.46 }
    ];
    uCtx.save();
    uCtx.filter = 'blur(42px)';
    ribbons.forEach((r) => {
      uCtx.beginPath();
      uCtx.moveTo(0, r.y);
      for (let x = 0; x <= uW; x += 36) {
        const y = r.y + Math.sin(x * r.freq + uT * r.speed) * r.amp + Math.cos(x * 0.0014 - uT) * 28;
        uCtx.lineTo(x, y);
      }
      uCtx.lineTo(uW, r.y + 180);
      uCtx.lineTo(0, r.y + 180);
      uCtx.closePath();
      uCtx.fillStyle = r.color;
      uCtx.fill();
    });
    uCtx.restore();
  }
  function tickU() {
    if (!uActive) return;
    uT += 0.015;
    drawU();
    uRaf = requestAnimationFrame(tickU);
  }
  function startU() {
    uActive = true;
    cancelAnimationFrame(uRaf);
    clearInterval(uTimer);
    sizeU();
    setUFocus(uIdx);
    if (!reduceMotion.matches) {
      tickU();
      uTimer = setInterval(() => {
        if (!uLocked && uWords.length) {
          uIdx = (uIdx + 1) % uWords.length;
          setUFocus(uIdx);
        }
      }, 2200);
    }
  }
  function stopU() {
    uActive = false;
    cancelAnimationFrame(uRaf);
    clearInterval(uTimer);
  }

  /* ---------- V: Awwwards Live Interactive Split Reader ---------- */
  const vPicks = document.querySelectorAll('#v .v-pick');
  const vCat = document.getElementById('vReaderCat');
  const vMeta = document.getElementById('vReaderMeta');
  const vTitle = document.getElementById('vReaderTitle');
  const vQuote = document.getElementById('vReaderQuote');
  const vBody = document.getElementById('vReaderBody');
  const vTags = document.getElementById('vReaderTags');

  function renderVPost(postId) {
    const post = BLOG_POSTS[postId];
    if (!post || !vTitle) return;
    vCat.textContent = post.category;
    vMeta.textContent = `${post.date} · ${post.readTime}`;
    vTitle.textContent = post.title;
    vQuote.textContent = post.quote;
    vBody.innerHTML = post.paragraphs.map((p) => `<p>${p}</p>`).join('');
    vTags.textContent = post.tags.map((t) => '#' + t).join('  ');
  }
  vPicks.forEach((btn) => {
    btn.addEventListener('click', () => {
      vPicks.forEach((b) => b.classList.toggle('on', b === btn));
      renderVPost(btn.dataset.post);
    });
  });
  renderVPost('noeva-deploy');

  /* ---------- W: Thrine Clay Mood Filter + Tactile Likes ---------- */
  const wMoods = document.querySelectorAll('#w .w-mood');
  const wPosts = document.querySelectorAll('#w .w-post');
  wMoods.forEach((btn) => {
    btn.addEventListener('click', () => {
      const m = btn.dataset.mood;
      wMoods.forEach((b) => b.classList.toggle('on', b === btn));
      wPosts.forEach((p) => {
        p.style.display = m === 'all' || p.dataset.mood === m ? '' : 'none';
      });
    });
  });
  document.querySelectorAll('#w .w-like').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const liked = btn.classList.toggle('liked');
      const base = Number(btn.dataset.count || 12);
      btn.textContent = `${liked ? '♥' : '♡'} ${liked ? base + 1 : base}`;
    });
  });

  /* ---------- X: React Bits Bayer 4x4 Dither Wave Canvas + Pixel Cards ---------- */
  const xPanel = document.getElementById('x');
  const xdCanvas = document.getElementById('xdCanvas');
  const xdCtx = xdCanvas ? xdCanvas.getContext('2d') : null;
  const xdPalBtns = document.querySelectorAll('#x .xd-pal button');
  let xActive = false;
  let xRaf = 0;
  let xTime = 0;
  const xPtr = { x: 0.5, y: 0.5 };
  const BAYER4 = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5]
  ];
  const CRT_COLORS = {
    amber: [255, 176, 0],
    green: [61, 255, 143],
    cyan: [56, 232, 255]
  };

  function sizeX() {
    if (!xdCanvas || !xdCtx) return;
    const rect = xdCanvas.parentElement.getBoundingClientRect();
    // Low-res pixel grid upscaled crisply via CSS image-rendering: pixelated
    xdCanvas.width = Math.max(120, Math.round(rect.width / 5));
    xdCanvas.height = Math.max(52, Math.round(rect.height / 5));
    drawX();
  }
  function drawX() {
    if (!xdCtx || !xdCanvas) return;
    const w = xdCanvas.width;
    const h = xdCanvas.height;
    const img = xdCtx.createImageData(w, h);
    const data = img.data;
    const mode = xPanel?.dataset.crt || 'amber';
    const [cr, cg, cb] = CRT_COLORS[mode] || CRT_COLORS.amber;

    for (let y = 0; y < h; y++) {
      const ny = y / h;
      for (let x = 0; x < w; x++) {
        const nx = x / w;
        const dist = Math.hypot(nx - xPtr.x, ny - xPtr.y);
        const wave =
          Math.sin(nx * 7.5 + xTime) * 0.28 +
          Math.cos(ny * 5.2 - xTime * 0.8) * 0.22 +
          Math.sin((nx + ny) * 6 - xTime * 1.1) * 0.2 +
          Math.max(0, 0.36 - dist) * 0.85;
        const lum = Math.max(0, Math.min(1, 0.34 + wave));
        const threshold = (BAYER4[y & 3][x & 3] + 0.5) / 16;
        const on = lum > threshold;
        const idx = (y * w + x) * 4;
        if (on) {
          data[idx] = cr;
          data[idx + 1] = cg;
          data[idx + 2] = cb;
          data[idx + 3] = 215;
        } else {
          data[idx] = 14;
          data[idx + 1] = 16;
          data[idx + 2] = 20;
          data[idx + 3] = 255;
        }
      }
    }
    xdCtx.putImageData(img, 0, 0);
  }
  function tickX() {
    if (!xActive) return;
    xTime += 0.04;
    drawX();
    xRaf = requestAnimationFrame(tickX);
  }
  if (xdCanvas) {
    xdCanvas.parentElement.addEventListener('pointermove', (e) => {
      const r = xdCanvas.parentElement.getBoundingClientRect();
      xPtr.x = (e.clientX - r.left) / r.width;
      xPtr.y = (e.clientY - r.top) / r.height;
    });
  }
  xdPalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      xPanel.dataset.crt = btn.dataset.crt;
      xdPalBtns.forEach((b) => b.classList.toggle('on', b === btn));
      if (reduceMotion.matches) drawX();
    });
  });
  document.querySelectorAll('#x .xd-card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--pxm', e.clientX - r.left + 'px');
      card.style.setProperty('--pym', e.clientY - r.top + 'px');
    });
  });

  function startX() {
    xActive = true;
    cancelAnimationFrame(xRaf);
    sizeX();
    if (!reduceMotion.matches) tickX();
  }
  function stopX() {
    xActive = false;
    cancelAnimationFrame(xRaf);
  }

  /* ---------- Resize & Motion Listeners ---------- */
  addEventListener('resize', () => {
    if (sActive) sizeS();
    if (uActive) sizeU();
    if (xActive) sizeX();
  });
  reduceMotion.addEventListener('change', () => {
    window.onDemoPanelChange(activePanelId);
  });

  /* ---------- Global Panel Lifecycle Hook ---------- */
  window.onDemoPanelChange = function (k) {
    activePanelId = k;
    k === 'p' ? startP() : stopP();
    k === 's' ? startS() : stopS();
    k === 'u' ? startU() : stopU();
    k === 'x' ? startX() : stopX();
  };
})();
