/* Load YouTube player on every project page so Promo Video opens instantly. */
(function () {
  'use strict';

  var player = document.createElement('iframe');
  player.src = 'https://www.youtube.com/embed/8UI1SmC0qhY?rel=0';
  player.title = 'Promo Video preload';
  player.setAttribute('aria-hidden', 'true');
  player.tabIndex = -1;
  player.loading = 'eager';
  player.style.cssText =
    'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;border:0;left:-9999px;top:0;';
  document.body.appendChild(player);
}());
