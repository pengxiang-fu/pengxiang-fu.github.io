(function () {
  'use strict';

  var key = 'homepage-exclude-visits';
  var preference = new URLSearchParams(window.location.search).get('exclude_visits');
  var excluded = preference === '1';
  try {
    if (preference === '1') window.localStorage.setItem(key, '1');
    if (preference === '0') window.localStorage.removeItem(key);
    excluded = excluded || window.localStorage.getItem(key) === '1';
  } catch (error) {
    // The URL preference still applies when browser storage is unavailable.
  }

  var map = document.getElementById('visitor-map-image');
  var counter = document.querySelector('.visitor-count');
  var production = window.location.hostname === 'pengxiang-fu.github.io';

  if (!production || excluded) {
    if (counter) counter.textContent = excluded
      ? 'Your browser is excluded from visitor statistics.'
      : 'Visitor statistics are disabled in local previews.';
    if (map) map.parentElement.hidden = true;
    return;
  }

  if (map) map.src = map.getAttribute('data-src');
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
  document.head.appendChild(script);
}());
