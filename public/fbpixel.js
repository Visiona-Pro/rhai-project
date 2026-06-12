// Meta Pixel — carrega imediatamente (detectável pelo Pixel Helper).
// Bloqueado apenas quando o usuário recusou cookies (LGPD opt-out).
(function () {
  var PIXEL_ID = "2279783359459191";
  var CONSENT_KEY = "cookie_consent";

  function isDeclined() {
    try {
      return localStorage.getItem(CONSENT_KEY) === "declined";
    } catch (e) {
      return false;
    }
  }

  // Stub global — sempre presente para enfileirar eventos após aceite tardio
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
  }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  if (isDeclined()) {
    // Sinaliza ao Meta Pixel Helper que o pixel existe mas está desativado por opt-out.
    // disableForCurrentUser é lido diretamente no objeto stub (sem necessidade de fbevents.js).
    window.fbq.disableForCurrentUser = true;
    return;
  }

  !function (f, b, e, v, n, t, s) {
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  fbq("init", PIXEL_ID);
  fbq("track", "PageView");
})();
