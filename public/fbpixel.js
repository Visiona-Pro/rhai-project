// Stub do Meta Pixel — carregamento adiado até consentimento (LGPD)
// fbevents.js é injetado dinamicamente pelo hook usePixelConsent após aceite
!function(f,b,e,v,n,t,s){
  if(f.fbq)return;
  n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
