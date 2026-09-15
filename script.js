/* FinegirlDami — site behaviour: nav, scroll state, reveals, FAQ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Mobile nav ---- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  function closeNav() {
    if (!links || !toggle) return;
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---- Sticky nav background ---- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll ---- */
  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.transitionDelay = Math.min(i * 70, 280) + 'ms';
        el.classList.add('is-visible');
        observer.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el) {
      observer.observe(el);
    });
  }

  /* ---- Active section in nav ---- */
  var sections = document.querySelectorAll('main section[id]');
  var navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        Array.prototype.forEach.call(navAnchors, function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Array.prototype.forEach.call(sections, function (s) { spy.observe(s); });
  }

  /* ---- FAQ: one open at a time ---- */
  var faqItems = document.querySelectorAll('.faq__item');
  Array.prototype.forEach.call(faqItems, function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      Array.prototype.forEach.call(faqItems, function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---- Portrait: use the first image file that actually exists ---- */
  (function () {
    var img = document.getElementById('portraitImg');
    var frame = document.getElementById('portrait');
    if (!img || !frame) return;

    var candidates = ['assets/dami.jpg', 'assets/dami.png', 'assets/dami.jpeg', 'assets/dami.webp'];
    var i = 0;

    function tryNext() {
      if (i >= candidates.length) {
        frame.classList.add('portrait--empty');   // fall back to the monogram
        return;
      }
      img.src = candidates[i++];
    }

    img.addEventListener('error', tryNext);
    tryNext();
  })();

  /* ---- Blink: irregular, with the occasional double ---- */
  (function () {
    var frame = document.getElementById('portrait');
    if (!frame || reduceMotion) return;

    function blink() {
      frame.classList.add('is-blinking');
      setTimeout(function () { frame.classList.remove('is-blinking'); }, 160);
    }

    function schedule() {
      // Real blinks are irregular: mostly 3-7s apart, sometimes a quick double.
      var wait = 3000 + Math.random() * 4000;
      setTimeout(function () {
        blink();
        if (Math.random() < 0.28) setTimeout(blink, 260);
        schedule();
      }, wait);
    }

    schedule();
  })();

  /* ---- Typewriter: the page writes its own subtitle ---- */
  (function () {
    var out = document.getElementById('typeOut');
    if (!out || reduceMotion) return;   // reduced motion keeps the static first line

    var phrases = [
      'threads people actually bookmark.',
      'whitepapers people actually finish.',
      'explainers people finally understand.',
      'copy that stops the "wait, what do you do?"'
    ];

    var phrase = 0, chars = phrases[0].length, deleting = false;

    function tick() {
      var full = phrases[phrase];
      chars += deleting ? -1 : 1;
      out.textContent = full.slice(0, chars);

      var delay = deleting ? 28 : 55;
      if (!deleting && chars === full.length) {
        delay = 2100;                       // let a finished sentence sit and be read
        deleting = true;
      } else if (deleting && chars === 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        delay = 420;
      }
      setTimeout(tick, delay);
    }

    setTimeout(tick, 2100);   // the first phrase is already in the HTML — hold, then continue
  })();

  /* ---- Footer year ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = '© ' + new Date().getFullYear();
})();
