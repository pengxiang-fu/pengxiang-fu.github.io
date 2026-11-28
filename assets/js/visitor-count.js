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
  var status = document.getElementById('visitor-map-status');
  var production = window.location.hostname === 'pengxiang-fu.github.io';

  if (!production || excluded) {
    if (status) status.textContent = 'Saved map snapshot · November 28, 2026' +
      (excluded ? ' · Your visits are excluded.' : ' · Local preview.');
    return;
  }

  if (!map) return;
  var fallback = map.getAttribute('src');
  map.onerror = function () {
    map.onerror = null;
    map.onload = null;
    map.src = fallback;
    if (status) status.textContent = 'Saved map snapshot · November 28, 2026 · Live map temporarily unavailable.';
  };
  map.onload = function () {
    if (status) status.textContent = 'Live visitor map';
  };
  map.src = map.getAttribute('data-src');
}());
