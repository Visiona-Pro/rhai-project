(function () {
  // UUID anônimo por dispositivo — sem nome, email ou IP
  var uid = localStorage.getItem('_vid');
  if (!uid) {
    uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    localStorage.setItem('_vid', uid);
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-EQV04QDBCE', {
    user_id: uid,
    anonymize_ip: true,
    send_page_view: true,
  });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-EQV04QDBCE';
  document.head.appendChild(s);
})();
