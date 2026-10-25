/* Kelvora site script: theme, mobile nav, download menu, OS detection, hero demo, contact form, copy buttons. */
(function () {
  "use strict";
  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- theme toggle ---------- */
  var saved = store.get("kelvora-theme");
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function paintToggle() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
      b.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme");
      b.querySelector(".sun").toggleAttribute("hidden", !isDark());
      b.querySelector(".moon").toggleAttribute("hidden", isDark());
    });
  }
  document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store.set("kelvora-theme", next);
      paintToggle();
    });
  });
  paintToggle();

  /* ---------- mobile nav ---------- */
  var menuBtn = document.querySelector("[data-menu-btn]");
  var mobileNav = document.getElementById("mobile-nav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      mobileNav.hidden = !mobileNav.hidden;
      menuBtn.setAttribute("aria-expanded", String(!mobileNav.hidden));
    });
  }

  /* ---------- download dropdowns ---------- */
  document.querySelectorAll("[data-dl]").forEach(function (wrap) {
    var btn = wrap.querySelector("button"), menu = wrap.querySelector(".menu");
    function close() { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); }
    btn.addEventListener("click", function (e) {
      e.stopPropagation(); menu.hidden = !menu.hidden; btn.setAttribute("aria-expanded", String(!menu.hidden));
    });
    document.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  });

  /* ---------- OS detection ---------- */
  var ua = (navigator.userAgent || "").toLowerCase();
  var os = /windows/.test(ua) ? "windows" : /mac os|macintosh/.test(ua) ? "mac" : /linux|x11/.test(ua) && !/android/.test(ua) ? "linux" : null;
  var osNames = { windows: "Windows", mac: "macOS", linux: "Linux" };
  if (os) {
    document.querySelectorAll("[data-os-label]").forEach(function (el) { el.textContent = "Download for " + osNames[os]; });
    var card = document.querySelector('[data-plat="' + os + '"]');
    if (card) {
      card.classList.add("rec");
      var badge = card.querySelector(".badge"); if (badge) badge.hidden = false;
    }
  }

  /* ---------- hero demo ---------- */
  var demo = document.querySelector("[data-demo]");
  if (demo) {
    var scenes = [
      { q: "Write a polite follow-up email for an unpaid invoice from last month.",
        r: [["x", "provider A · rate limit reached"], ["x", "provider B · daily quota used"], ["y", "provider C · answered in 1.4s"]],
        a: "Subject: Friendly reminder on invoice #1048\n\nHi Ravi, I hope the month is going well. I'm following up on invoice #1048 for ₹42,500, which was due on 30 September. Could you let me know when payment is scheduled?" },
      { q: "Explain this error: TypeError: cannot read properties of undefined (reading 'map')",
        r: [["x", "provider D · timed out after 8s"], ["y", "provider A · answered in 0.9s"]],
        a: "The variable you call .map() on is undefined when the component first renders. Give it a default value, for example const items = data?.items ?? [], before mapping over it." },
      { q: "Plan a 3-day Jaipur trip on a ₹15,000 budget.",
        r: [["y", "provider E · answered in 1.1s"]],
        a: "Day 1: Amber Fort in the morning, Panna Meena ka Kund, dinner at Chokhi Dhani.\nDay 2: City Palace, Jantar Mantar, Hawa Mahal, shopping in Johari Bazaar.\nDay 3: Nahargarh at sunrise, Albert Hall, train back.\nStay: guesthouse near MI Road, about ₹1,800 a night." }
    ];
    var qEl = demo.querySelector("[data-q]"), rEl = demo.querySelector("[data-r]"), aEl = demo.querySelector("[data-a]");
    var chips = demo.querySelectorAll("[data-scene]");
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var timer = null, current = 0;

    function show(i) {
      current = i;
      clearTimeout(timer);
      chips.forEach(function (c, n) { c.setAttribute("aria-pressed", String(n === i)); });
      var s = scenes[i];
      qEl.textContent = s.q;
      rEl.innerHTML = "";
      aEl.textContent = "";
      var step = 0;
      function nextRoute() {
        if (step < s.r.length) {
          var d = document.createElement("div");
          d.innerHTML = '<span class="' + s.r[step][0] + '">' + (s.r[step][0] === "y" ? "✓" : "✕") + "</span> " + s.r[step][1];
          rEl.appendChild(d); step++;
          timer = setTimeout(nextRoute, reduce ? 0 : 420);
        } else typeAnswer(0);
      }
      function typeAnswer(n) {
        if (reduce) { aEl.textContent = s.a; return; }
        aEl.innerHTML = "";
        aEl.appendChild(document.createTextNode(s.a.slice(0, n)));
        if (n < s.a.length) {
          var c = document.createElement("span"); c.className = "caret"; aEl.appendChild(c);
          timer = setTimeout(function () { typeAnswer(n + 3); }, 18);
        } else {
          aEl.textContent = s.a;
          timer = setTimeout(function () { show((current + 1) % scenes.length); }, 5200);
        }
      }
      nextRoute();
    }
    chips.forEach(function (c, n) { c.addEventListener("click", function () { show(n); }); });
    show(0);
  }

  /* ---------- live routing panel ---------- */
  var flow = document.querySelector("[data-flow]");
  if (flow && !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    var rows = flow.querySelectorAll(".prov"), active = 1;
    var usage = [100, 38, 12, 5];
    setInterval(function () {
      usage[active] = Math.min(100, usage[active] + 31);
      if (usage[active] >= 100) {
        active = (active + 1) % rows.length;
        if (usage[active] >= 100) usage[active] = 6;
      }
      rows.forEach(function (r, n) {
        var full = usage[n] >= 100;
        r.className = "prov " + (n === active ? "live" : full ? "busy" : "idle");
        r.querySelector(".meter b").style.width = usage[n] + "%";
        r.querySelector(".st").textContent = n === active ? "routing here" : full ? "limit hit" : "standby";
      });
      // limits reset slowly
      usage = usage.map(function (u, n) { return n === active ? u : Math.max(4, u - 9); });
    }, 1600);
  }

  /* ---------- copy buttons ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var text = b.getAttribute("data-copy"), label = b.textContent;
      function done() { b.textContent = "Copied"; setTimeout(function () { b.textContent = label; }, 1600); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { selectSibling(b); });
      } else selectSibling(b);
    });
  });
  function selectSibling(b) {
    var code = b.parentNode.querySelector("code"); if (!code) return;
    var r = document.createRange(); r.selectNodeContents(code);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }

  /* ---------- contact form ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.querySelector(".form-msg");
      var name = form.name.value.trim(), email = form.email.value.trim(), topic = form.topic.value, body = form.message.value.trim();
      if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || body.length < 10) {
        msg.className = "form-msg err";
        msg.textContent = "Add your name, a valid email address and a message of at least 10 characters.";
        return;
      }
      var to = form.getAttribute("data-to");
      var href = "mailto:" + to + "?subject=" + encodeURIComponent("[" + topic + "] from " + name) +
        "&body=" + encodeURIComponent(body + "\n\n— " + name + " (" + email + ")");
      window.location.href = href;
      msg.className = "form-msg ok";
      msg.textContent = "Your email app should open with the message filled in. If it doesn't, write to " + to + " directly.";
    });
  }

  /* ---------- year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
