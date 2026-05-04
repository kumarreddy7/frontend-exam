/**
 * questions.js
 * ─────────────────────────────────────────────────────────
 * 4 Test Sets × 5 Questions Each
 * Each question has: id, title, description, starterCode, validate()
 * validate() returns { pass: boolean, feedback: string }
 * ─────────────────────────────────────────────────────────
 */

const QuestionSets = {

  // ════════════════════════════════════════════════════════
  // SET A
  // ════════════════════════════════════════════════════════
  A: [
    {
      id: 'A1',
      title: 'Centered Red Box',
      description: 'Create a <code>div</code> with id <code>box</code>. It must be <code>200px × 200px</code>, background <code>red</code>, and horizontally centered on the page using flexbox on the body.',
      starterCode: `<!-- Write your HTML & CSS below -->\n<style>\n\n</style>\n\n<div>\n\n</div>`,
      validate(doc) {
        try {
          const box = doc.getElementById('box');
          if (!box) return { pass: false, feedback: '#box not found' };
          const s = doc.defaultView.getComputedStyle(box);
          const w = parseInt(s.width);
          const h = parseInt(s.height);
          if (w !== 200) return { pass: false, feedback: `Width should be 200px, got ${w}px` };
          if (h !== 200) return { pass: false, feedback: `Height should be 200px, got ${h}px` };
          const bg = s.backgroundColor;
          if (!bg.includes('255, 0, 0') && !bg.includes('rgb(255,0,0)'))
            return { pass: false, feedback: `Background should be red, got: ${bg}` };
          const body = doc.body;
          const bs = doc.defaultView.getComputedStyle(body);
          if (!bs.display.includes('flex'))
            return { pass: false, feedback: 'Body must use display:flex for centering' };
          return { pass: true, feedback: 'All checks passed ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'A2',
      title: 'Toggle Button',
      description: 'Create a button with id <code>toggle-btn</code> and a div with id <code>panel</code>. Clicking the button must toggle the panel\'s visibility (display none/block). Panel starts visible.',
      starterCode: `<style>\n  #panel { width: 200px; height: 100px; background: steelblue; }\n</style>\n\n<button id="toggle-btn">Toggle</button>\n<div id="panel"></div>\n\n<script>\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const btn = doc.getElementById('toggle-btn');
          const panel = doc.getElementById('panel');
          if (!btn) return { pass: false, feedback: '#toggle-btn not found' };
          if (!panel) return { pass: false, feedback: '#panel not found' };
          const s0 = doc.defaultView.getComputedStyle(panel).display;
          if (s0 === 'none') return { pass: false, feedback: 'Panel should start visible' };
          btn.click();
          const s1 = doc.defaultView.getComputedStyle(panel).display;
          if (s1 !== 'none') return { pass: false, feedback: 'Panel should hide after 1st click' };
          btn.click();
          const s2 = doc.defaultView.getComputedStyle(panel).display;
          if (s2 === 'none') return { pass: false, feedback: 'Panel should show after 2nd click' };
          return { pass: true, feedback: 'Toggle works correctly ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'A3',
      title: 'List Builder',
      description: 'Create an <code>input</code> with id <code>task-input</code>, a button with id <code>add-btn</code>, and a <code>ul</code> with id <code>task-list</code>. Clicking the button appends the input value as a new <code>&lt;li&gt;</code> and clears the input.',
      starterCode: `<input id="task-input" type="text" placeholder="Enter task">\n<button id="add-btn">Add</button>\n<ul id="task-list"></ul>\n\n<script>\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const inp = doc.getElementById('task-input');
          const btn = doc.getElementById('add-btn');
          const list = doc.getElementById('task-list');
          if (!inp || !btn || !list) return { pass: false, feedback: 'Missing required elements' };
          inp.value = 'Test Item One';
          btn.click();
          const items = list.querySelectorAll('li');
          if (items.length < 1) return { pass: false, feedback: 'No <li> added after button click' };
          if (!items[0].textContent.includes('Test Item One'))
            return { pass: false, feedback: 'li text does not match input value' };
          if (inp.value !== '')
            return { pass: false, feedback: 'Input should be cleared after add' };
          inp.value = 'Second Item';
          btn.click();
          if (list.querySelectorAll('li').length < 2)
            return { pass: false, feedback: 'Second item not added' };
          return { pass: true, feedback: 'List builder works ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'A4',
      title: 'CSS Card',
      description: 'Create a <code>div.card</code> with a nested <code>h2.card-title</code> and <code>p.card-body</code>. Card must have: <code>border-radius: 8px</code>, a <code>box-shadow</code>, padding ≥ <code>16px</code>, and a white background.',
      starterCode: `<style>\n  /* Style the card */\n</style>\n\n<div class="card">\n  <h2 class="card-title">Hello</h2>\n  <p class="card-body">World</p>\n</div>`,
      validate(doc) {
        try {
          const card = doc.querySelector('.card');
          if (!card) return { pass: false, feedback: '.card not found' };
          const title = card.querySelector('.card-title');
          const body  = card.querySelector('.card-body');
          if (!title) return { pass: false, feedback: '.card-title not found inside .card' };
          if (!body)  return { pass: false, feedback: '.card-body not found inside .card' };
          const s = doc.defaultView.getComputedStyle(card);
          const br = parseFloat(s.borderRadius);
          if (br < 6) return { pass: false, feedback: `border-radius should be ≥8px, got ${s.borderRadius}` };
          if (!s.boxShadow || s.boxShadow === 'none')
            return { pass: false, feedback: 'box-shadow required on .card' };
          const pad = parseFloat(s.paddingTop);
          if (pad < 16) return { pass: false, feedback: `Padding should be ≥16px, got ${pad}px` };
          const bg = s.backgroundColor;
          if (!bg.includes('255, 255, 255'))
            return { pass: false, feedback: 'Background should be white' };
          return { pass: true, feedback: 'Card structure valid ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'A5',
      title: 'Character Counter',
      description: 'Create a <code>textarea</code> with id <code>msg-input</code> and a <code>span</code> with id <code>char-count</code>. As user types, span must show current character count.',
      starterCode: `<textarea id="msg-input" rows="4" cols="40"></textarea>\n<p>Characters: <span id="char-count">0</span></p>\n\n<script>\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const ta   = doc.getElementById('msg-input');
          const span = doc.getElementById('char-count');
          if (!ta)   return { pass: false, feedback: '#msg-input not found' };
          if (!span) return { pass: false, feedback: '#char-count not found' };
          // Simulate input
          const nativeInputSetter = Object.getOwnPropertyDescriptor(doc.defaultView.HTMLTextAreaElement.prototype, 'value').set;
          nativeInputSetter.call(ta, 'Hello');
          ta.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
          if (span.textContent.trim() !== '5')
            return { pass: false, feedback: `Expected "5" for "Hello", got "${span.textContent.trim()}"` };
          nativeInputSetter.call(ta, '');
          ta.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
          if (span.textContent.trim() !== '0')
            return { pass: false, feedback: 'Counter should reset to 0 when empty' };
          return { pass: true, feedback: 'Character counter works ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    }
  ],

  // ════════════════════════════════════════════════════════
  // SET B
  // ════════════════════════════════════════════════════════
  B: [
    {
      id: 'B1',
      title: 'Navbar Layout',
      description: 'Create a <code>nav</code> with id <code>navbar</code>. Inside it: a <code>div.nav-brand</code> on the left and a <code>ul.nav-links</code> with 3 <code>li</code> items on the right. Use flexbox with <code>justify-content: space-between</code>.',
      starterCode: `<style>\n  /* Navbar styles */\n</style>\n\n<nav id="navbar">\n\n</nav>`,
      validate(doc) {
        try {
          const nav = doc.getElementById('navbar');
          if (!nav) return { pass: false, feedback: '#navbar not found' };
          const brand = nav.querySelector('.nav-brand');
          const links = nav.querySelector('.nav-links');
          if (!brand) return { pass: false, feedback: '.nav-brand not found in navbar' };
          if (!links) return { pass: false, feedback: '.nav-links not found in navbar' };
          const lis = links.querySelectorAll('li');
          if (lis.length < 3) return { pass: false, feedback: `Need 3 li items, found ${lis.length}` };
          const s = doc.defaultView.getComputedStyle(nav);
          if (!s.display.includes('flex')) return { pass: false, feedback: 'nav must use display:flex' };
          if (!s.justifyContent.includes('space-between'))
            return { pass: false, feedback: 'justify-content must be space-between' };
          return { pass: true, feedback: 'Navbar layout valid ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'B2',
      title: 'Color Changer',
      description: 'Create a <code>div</code> with id <code>color-box</code> (100×100px) and a button with id <code>change-btn</code>. Each click changes the box background to a random RGB color.',
      starterCode: `<div id="color-box"></div>\n<button id="change-btn">Change Color</button>\n\n<script>\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const box = doc.getElementById('color-box');
          const btn = doc.getElementById('change-btn');
          if (!box) return { pass: false, feedback: '#color-box not found' };
          if (!btn) return { pass: false, feedback: '#change-btn not found' };
          const s = doc.defaultView.getComputedStyle(box);
          if (parseInt(s.width) < 80)  return { pass: false, feedback: 'box must be ~100px wide' };
          if (parseInt(s.height) < 80) return { pass: false, feedback: 'box must be ~100px tall' };
          const bg0 = box.style.backgroundColor || s.backgroundColor;
          btn.click();
          const bg1 = box.style.backgroundColor;
          btn.click();
          const bg2 = box.style.backgroundColor;
          if (!bg1 || !bg1.includes('rgb'))
            return { pass: false, feedback: 'Background not changed on click' };
          if (bg1 === bg2) {
            // Allow rare collision: click again
            btn.click();
            const bg3 = box.style.backgroundColor;
            if (bg1 === bg3) return { pass: false, feedback: 'Color not randomising properly' };
          }
          return { pass: true, feedback: 'Color randomiser works ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'B3',
      title: 'Form Validation',
      description: 'Create a form with an <code>input#email</code> and a <code>button#validate-btn</code>. Clicking the button shows <code>span#result</code> with text "Valid" (green) if email contains "@" and ".", else "Invalid" (red).',
      starterCode: `<input id="email" type="text" placeholder="Enter email">\n<button id="validate-btn">Validate</button>\n<span id="result"></span>\n\n<script>\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const inp = doc.getElementById('email');
          const btn = doc.getElementById('validate-btn');
          const res = doc.getElementById('result');
          if (!inp || !btn || !res) return { pass: false, feedback: 'Missing required elements' };

          inp.value = 'test@example.com';
          btn.click();
          if (!res.textContent.toLowerCase().includes('valid'))
            return { pass: false, feedback: 'Should show "Valid" for test@example.com' };
          const s1 = doc.defaultView.getComputedStyle(res);
          const col1 = s1.color;
          if (!col1.includes('0, 128') && !col1.includes('0, 255') && !col1.includes('green') && !col1.includes('34, 197'))
            return { pass: false, feedback: 'Valid result should use a green color' };

          inp.value = 'notanemail';
          btn.click();
          if (!res.textContent.toLowerCase().includes('invalid'))
            return { pass: false, feedback: 'Should show "Invalid" for notanemail' };
          return { pass: true, feedback: 'Validation logic correct ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'B4',
      title: 'CSS Grid Gallery',
      description: 'Create a <code>div#gallery</code> containing at least 6 <code>div.item</code> children. The gallery must use CSS Grid with <code>3 equal columns</code> and a gap of at least <code>10px</code>.',
      starterCode: `<style>\n  #gallery { /* grid styles */ }\n  .item { height: 80px; background: coral; }\n</style>\n\n<div id="gallery">\n  <div class="item"></div>\n  <div class="item"></div>\n  <div class="item"></div>\n  <div class="item"></div>\n  <div class="item"></div>\n  <div class="item"></div>\n</div>`,
      validate(doc) {
        try {
          const gallery = doc.getElementById('gallery');
          if (!gallery) return { pass: false, feedback: '#gallery not found' };
          const items = gallery.querySelectorAll('.item');
          if (items.length < 6) return { pass: false, feedback: `Need 6 .item elements, found ${items.length}` };
          const s = doc.defaultView.getComputedStyle(gallery);
          if (!s.display.includes('grid'))
            return { pass: false, feedback: '#gallery must use display:grid' };
          const cols = s.gridTemplateColumns;
          const colArr = cols.trim().split(/\s+/);
          if (colArr.length !== 3)
            return { pass: false, feedback: `Need 3 columns, detected: "${cols}"` };
          const gap = parseFloat(s.gap || s.columnGap || '0');
          if (gap < 10) return { pass: false, feedback: `Gap must be ≥10px, got ${gap}px` };
          return { pass: true, feedback: 'Grid gallery valid ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'B5',
      title: 'Counter App',
      description: 'Create <code>button#inc</code>, <code>button#dec</code>, and <code>span#count</code> showing the count. Inc increases by 1, Dec decreases by 1. Count must not go below 0.',
      starterCode: `<button id="dec">−</button>\n<span id="count">0</span>\n<button id="inc">+</button>\n\n<script>\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const inc   = doc.getElementById('inc');
          const dec   = doc.getElementById('dec');
          const count = doc.getElementById('count');
          if (!inc || !dec || !count) return { pass: false, feedback: 'Missing required elements' };
          inc.click(); inc.click(); inc.click();
          if (count.textContent.trim() !== '3')
            return { pass: false, feedback: `After 3 inc clicks expected "3", got "${count.textContent.trim()}"` };
          dec.click();
          if (count.textContent.trim() !== '2')
            return { pass: false, feedback: `After dec expected "2", got "${count.textContent.trim()}"` };
          // Drain to 0 and try to go below
          dec.click(); dec.click(); dec.click(); dec.click();
          const val = parseInt(count.textContent.trim());
          if (val < 0) return { pass: false, feedback: 'Count went below 0, should be clamped' };
          return { pass: true, feedback: 'Counter logic correct ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    }
  ],

  // ════════════════════════════════════════════════════════
  // SET C
  // ════════════════════════════════════════════════════════
  C: [
    {
      id: 'C1',
      title: 'Sticky Header',
      description: 'Create a <code>header#site-header</code> that is sticky at the top of the page (<code>position: sticky; top: 0</code>). It must have a <code>z-index ≥ 10</code> and a non-transparent background.',
      starterCode: `<style>\n  /* header styles */\n</style>\n\n<header id="site-header">My Site</header>\n<main style="height:2000px;padding:20px">Scroll content</main>`,
      validate(doc) {
        try {
          const hdr = doc.getElementById('site-header');
          if (!hdr) return { pass: false, feedback: '#site-header not found' };
          const s = doc.defaultView.getComputedStyle(hdr);
          if (s.position !== 'sticky')
            return { pass: false, feedback: `position must be sticky, got "${s.position}"` };
          if (parseInt(s.top) !== 0)
            return { pass: false, feedback: `top must be 0, got "${s.top}"` };
          if (parseInt(s.zIndex) < 10)
            return { pass: false, feedback: `z-index must be ≥10, got "${s.zIndex}"` };
          const bg = s.backgroundColor;
          if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent')
            return { pass: false, feedback: 'Header must have a visible background' };
          return { pass: true, feedback: 'Sticky header correct ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'C2',
      title: 'Tab Switcher',
      description: 'Create 3 buttons (<code>.tab-btn</code>) with data-tab="t1","t2","t3" and 3 divs (<code>.tab-panel</code>) with id="t1","t2","t3". Clicking a button shows only the matching panel; others are hidden.',
      starterCode: `<div>\n  <button class="tab-btn" data-tab="t1">Tab 1</button>\n  <button class="tab-btn" data-tab="t2">Tab 2</button>\n  <button class="tab-btn" data-tab="t3">Tab 3</button>\n</div>\n<div id="t1" class="tab-panel">Content 1</div>\n<div id="t2" class="tab-panel">Content 2</div>\n<div id="t3" class="tab-panel">Content 3</div>\n\n<script>\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const btns   = doc.querySelectorAll('.tab-btn');
          const panels = doc.querySelectorAll('.tab-panel');
          if (btns.length < 3)   return { pass: false, feedback: 'Need 3 .tab-btn elements' };
          if (panels.length < 3) return { pass: false, feedback: 'Need 3 .tab-panel elements' };
          btns[0].click();
          const v1 = doc.getElementById('t1');
          const h2 = doc.getElementById('t2');
          if (!v1 || doc.defaultView.getComputedStyle(v1).display === 'none')
            return { pass: false, feedback: 'Clicking Tab 1 should show #t1' };
          if (h2 && doc.defaultView.getComputedStyle(h2).display !== 'none')
            return { pass: false, feedback: '#t2 should hide when Tab 1 active' };
          btns[2].click();
          const v3 = doc.getElementById('t3');
          if (!v3 || doc.defaultView.getComputedStyle(v3).display === 'none')
            return { pass: false, feedback: 'Clicking Tab 3 should show #t3' };
          if (doc.defaultView.getComputedStyle(v1).display !== 'none')
            return { pass: false, feedback: '#t1 should hide when Tab 3 active' };
          return { pass: true, feedback: 'Tab switcher works ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'C3',
      title: 'Search Filter',
      description: 'Create an <code>input#search</code> and a <code>ul#items</code> with 5+ <code>li</code> elements. Typing in the input filters the list to show only items whose text includes the search string (case-insensitive).',
      starterCode: `<input id="search" placeholder="Search...">\n<ul id="items">\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Cherry</li>\n  <li>Date</li>\n  <li>Elderberry</li>\n</ul>\n\n<script>\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const inp  = doc.getElementById('search');
          const list = doc.getElementById('items');
          if (!inp)  return { pass: false, feedback: '#search not found' };
          if (!list) return { pass: false, feedback: '#items not found' };
          const lis = list.querySelectorAll('li');
          if (lis.length < 5) return { pass: false, feedback: 'Need at least 5 li items' };
          // Simulate typing
          const setter = Object.getOwnPropertyDescriptor(doc.defaultView.HTMLInputElement.prototype, 'value').set;
          setter.call(inp, 'an');
          inp.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
          const visible = Array.from(list.querySelectorAll('li')).filter(li => doc.defaultView.getComputedStyle(li).display !== 'none');
          // "Banana" contains "an", others shouldn't
          if (visible.length === 0) return { pass: false, feedback: 'No items visible after typing "an"' };
          const allMatch = visible.every(li => li.textContent.toLowerCase().includes('an'));
          if (!allMatch) return { pass: false, feedback: 'Non-matching items are still visible' };
          // Clear filter
          setter.call(inp, '');
          inp.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
          const all = Array.from(list.querySelectorAll('li')).filter(li => doc.defaultView.getComputedStyle(li).display !== 'none');
          if (all.length < 5) return { pass: false, feedback: 'All items should show when search is empty' };
          return { pass: true, feedback: 'Search filter works ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'C4',
      title: 'Progress Bar',
      description: 'Create a <code>div#progress-bar</code> with a child <code>div#bar-fill</code>. The fill\'s width is set via a <code>input[type=range]#slider</code> (0–100). Moving the slider changes fill width % to match slider value.',
      starterCode: `<input type="range" id="slider" min="0" max="100" value="0">\n<div id="progress-bar" style="width:300px;height:20px;background:#ddd;">\n  <div id="bar-fill" style="height:100%;background:steelblue;width:0%"></div>\n</div>\n\n<script>\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const slider = doc.getElementById('slider');
          const bar    = doc.getElementById('progress-bar');
          const fill   = doc.getElementById('bar-fill');
          if (!slider) return { pass: false, feedback: '#slider not found' };
          if (!bar)    return { pass: false, feedback: '#progress-bar not found' };
          if (!fill)   return { pass: false, feedback: '#bar-fill not found' };
          const setter = Object.getOwnPropertyDescriptor(doc.defaultView.HTMLInputElement.prototype, 'value').set;
          setter.call(slider, '50');
          slider.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
          const w = fill.style.width;
          if (w !== '50%') return { pass: false, feedback: `At slider=50, fill width should be "50%", got "${w}"` };
          setter.call(slider, '100');
          slider.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
          const w2 = fill.style.width;
          if (w2 !== '100%') return { pass: false, feedback: `At slider=100, fill width should be "100%", got "${w2}"` };
          return { pass: true, feedback: 'Progress bar works ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'C5',
      title: 'Accordion',
      description: 'Create 3 <code>.accordion-item</code> elements, each with a <code>.acc-header</code> and a <code>.acc-body</code>. Clicking a header toggles its body. Other bodies collapse when one opens.',
      starterCode: `<style>\n  .acc-body { display: none; padding: 10px; background: #f5f5f5; }\n</style>\n\n<div class="accordion-item">\n  <div class="acc-header">Section 1</div>\n  <div class="acc-body">Content 1</div>\n</div>\n<div class="accordion-item">\n  <div class="acc-header">Section 2</div>\n  <div class="acc-body">Content 2</div>\n</div>\n<div class="accordion-item">\n  <div class="acc-header">Section 3</div>\n  <div class="acc-body">Content 3</div>\n</div>\n\n<script>\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const headers = doc.querySelectorAll('.acc-header');
          const bodies  = doc.querySelectorAll('.acc-body');
          if (headers.length < 3) return { pass: false, feedback: 'Need 3 .acc-header elements' };
          if (bodies.length < 3)  return { pass: false, feedback: 'Need 3 .acc-body elements' };
          headers[0].click();
          if (doc.defaultView.getComputedStyle(bodies[0]).display === 'none')
            return { pass: false, feedback: 'Body 1 should open when header 1 clicked' };
          headers[1].click();
          if (doc.defaultView.getComputedStyle(bodies[1]).display === 'none')
            return { pass: false, feedback: 'Body 2 should open when header 2 clicked' };
          if (doc.defaultView.getComputedStyle(bodies[0]).display !== 'none')
            return { pass: false, feedback: 'Body 1 should close when header 2 clicked' };
          return { pass: true, feedback: 'Accordion logic correct ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    }
  ],

  // ════════════════════════════════════════════════════════
  // SET D
  // ════════════════════════════════════════════════════════
  D: [
    {
      id: 'D1',
      title: 'Responsive Two-Column',
      description: 'Create a <code>div#layout</code> with two children: <code>div#sidebar</code> and <code>div#content</code>. Use CSS Grid: sidebar 250px, content takes remaining space. On screens ≤600px, stack them vertically.',
      starterCode: `<style>\n  #layout { /* grid here */ }\n  #sidebar { background: #f0f0f0; min-height: 200px; padding: 16px; }\n  #content { background: #fff; min-height: 200px; padding: 16px; }\n  @media (max-width: 600px) { /* responsive */ }\n</style>\n\n<div id="layout">\n  <div id="sidebar">Sidebar</div>\n  <div id="content">Content</div>\n</div>`,
      validate(doc) {
        try {
          const layout  = doc.getElementById('layout');
          const sidebar = doc.getElementById('sidebar');
          const content = doc.getElementById('content');
          if (!layout)  return { pass: false, feedback: '#layout not found' };
          if (!sidebar) return { pass: false, feedback: '#sidebar not found' };
          if (!content) return { pass: false, feedback: '#content not found' };
          const s = doc.defaultView.getComputedStyle(layout);
          if (!s.display.includes('grid'))
            return { pass: false, feedback: '#layout must use display:grid' };
          const cols = s.gridTemplateColumns;
          if (!cols.includes('250px'))
            return { pass: false, feedback: `sidebar must be 250px, gridTemplateColumns: "${cols}"` };
          if (!cols.includes('1fr') && !cols.includes('auto') && !cols.split(' ')[1])
            return { pass: false, feedback: 'Content column should use 1fr or auto' };
          return { pass: true, feedback: 'Two-column layout correct ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'D2',
      title: 'Drag Count',
      description: 'Create a <code>div#draggable</code> (draggable=true) and a <code>div#drop-zone</code>. Dragging the element into the drop zone increments a counter in <code>span#drop-count</code>.',
      starterCode: `<div id="draggable" draggable="true" style="width:80px;height:80px;background:coral;cursor:grab;">Drag me</div>\n<div id="drop-zone" style="width:200px;height:150px;border:2px dashed #999;margin-top:16px;display:flex;align-items:center;justify-content:center;">\n  Drop Here\n</div>\n<p>Drops: <span id="drop-count">0</span></p>\n\n<script>\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const drag  = doc.getElementById('draggable');
          const zone  = doc.getElementById('drop-zone');
          const count = doc.getElementById('drop-count');
          if (!drag)  return { pass: false, feedback: '#draggable not found' };
          if (!zone)  return { pass: false, feedback: '#drop-zone not found' };
          if (!count) return { pass: false, feedback: '#drop-count not found' };
          if (drag.getAttribute('draggable') !== 'true')
            return { pass: false, feedback: '#draggable must have draggable="true"' };
          // Simulate drop
          zone.dispatchEvent(new doc.defaultView.DragEvent('dragover', { bubbles: true, cancelable: true }));
          zone.dispatchEvent(new doc.defaultView.DragEvent('drop', { bubbles: true, cancelable: true }));
          const val = parseInt(count.textContent.trim());
          if (isNaN(val) || val < 1)
            return { pass: false, feedback: 'Counter did not increment on drop event' };
          return { pass: true, feedback: 'Drag & drop counter works ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'D3',
      title: 'Dark Mode Toggle',
      description: 'Create a <code>button#dark-toggle</code> and a <code>div#page-root</code>. Clicking the button toggles class <code>dark</code> on <code>#page-root</code>. In dark mode the background must be <code>#111</code> and color <code>#eee</code>.',
      starterCode: `<style>\n  #page-root { padding: 20px; background: #fff; color: #000; transition: all 0.3s; }\n  #page-root.dark { /* dark mode styles */ }\n</style>\n\n<div id="page-root">\n  <button id="dark-toggle">Toggle Dark Mode</button>\n  <p>Hello World</p>\n</div>\n\n<script>\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const btn  = doc.getElementById('dark-toggle');
          const root = doc.getElementById('page-root');
          if (!btn)  return { pass: false, feedback: '#dark-toggle not found' };
          if (!root) return { pass: false, feedback: '#page-root not found' };
          btn.click();
          if (!root.classList.contains('dark'))
            return { pass: false, feedback: '.dark class not added on click' };
          const s = doc.defaultView.getComputedStyle(root);
          const bg  = s.backgroundColor;
          const col = s.color;
          if (!bg.includes('17, 17, 17') && !bg.includes('rgb(17,17,17)') && bg !== '#111')
            return { pass: false, feedback: `Dark mode bg should be #111, got: ${bg}` };
          if (!col.includes('238, 238, 238') && !col.includes('rgb(238,238,238)') && col !== '#eee')
            return { pass: false, feedback: `Dark mode color should be #eee, got: ${col}` };
          btn.click();
          if (root.classList.contains('dark'))
            return { pass: false, feedback: '.dark class should be removed on 2nd click' };
          return { pass: true, feedback: 'Dark mode toggle works ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'D4',
      title: 'Live Clock',
      description: 'Create a <code>div#clock</code> that displays the current time in <code>HH:MM:SS</code> format, updating every second using <code>setInterval</code>.',
      starterCode: `<div id="clock" style="font-size:32px;font-family:monospace;"></div>\n\n<script>\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const clock = doc.getElementById('clock');
          if (!clock) return { pass: false, feedback: '#clock not found' };
          const text = clock.textContent.trim();
          if (!text) return { pass: false, feedback: '#clock is empty' };
          const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
          if (!timeRegex.test(text))
            return { pass: false, feedback: `Clock text "${text}" doesn't match HH:MM:SS format` };
          const [h, m, s] = text.split(':').map(Number);
          if (h > 23) return { pass: false, feedback: 'Hours > 23' };
          if (m > 59) return { pass: false, feedback: 'Minutes > 59' };
          if (s > 59) return { pass: false, feedback: 'Seconds > 59' };
          return { pass: true, feedback: 'Live clock format correct ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    },
    {
      id: 'D5',
      title: 'Image Carousel',
      description: 'Create an <code>img#carousel-img</code> and <code>button#prev</code>, <code>button#next</code>. Clicking next/prev cycles through at least 3 image URLs stored in a JS array. Display <code>span#img-index</code> as "1/3", "2/3" etc.',
      starterCode: `<button id="prev">← Prev</button>\n<img id="carousel-img" src="" alt="slide" style="width:200px;height:150px;object-fit:cover;">\n<button id="next">Next →</button>\n<div>Slide <span id="img-index">1/3</span></div>\n\n<script>\n  const images = [\n    'https://picsum.photos/seed/a/200/150',\n    'https://picsum.photos/seed/b/200/150',\n    'https://picsum.photos/seed/c/200/150'\n  ];\n  // your JS\n</script>`,
      validate(doc) {
        try {
          const img   = doc.getElementById('carousel-img');
          const prev  = doc.getElementById('prev');
          const next  = doc.getElementById('next');
          const idxEl = doc.getElementById('img-index');
          if (!img)   return { pass: false, feedback: '#carousel-img not found' };
          if (!prev)  return { pass: false, feedback: '#prev not found' };
          if (!next)  return { pass: false, feedback: '#next not found' };
          if (!idxEl) return { pass: false, feedback: '#img-index not found' };
          const src0 = img.src;
          next.click();
          const src1 = img.src;
          if (src0 === src1) return { pass: false, feedback: 'Image src did not change on next click' };
          const idx1 = idxEl.textContent.trim();
          if (!idx1.includes('/')) return { pass: false, feedback: `img-index format should be "N/M", got "${idx1}"` };
          next.click();
          prev.click();
          const src2 = img.src;
          if (src2 !== src1) return { pass: false, feedback: 'prev after 2 nexts should go back to 2nd image' };
          return { pass: true, feedback: 'Carousel logic correct ✓' };
        } catch(e) { return { pass: false, feedback: 'Eval error: ' + e.message }; }
      }
    }
  ]
};

// Expose set keys
QuestionSets.SETS = ['A', 'B', 'C', 'D'];
