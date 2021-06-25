importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

  workbox.precaching.precacheAndRoute([
      { url: '/index.html', revision: '1' },
      { url: '/nav.html', revision: '1' },
      { url: '/team.html', revision: '1' },
      { url: '/images/icons/icon16.png', revision: '1' },
      { url: '/images/icons/icon32.png', revision: '1' },
      { url: '/images/icons/icon96.png', revision: '1' },
      { url: '/images/icons/icon192.png', revision: '1' },
      { url: '/images/icons/icon512.png', revision: '1' },
      { url: '/manifest.json', revision: '1' },
      { url: '/manifestfcm.json', revision: '1' },
      { url: '/css/materialize.min.css', revision: '1' },
      { url: '/css/style.css', revision: '1' },
      { url: '/js/api.js', revision: '1' },
      { url: '/js/db.js', revision: '1' },
      { url: '/js/idb.js', revision: '1' },
      { url: '/js/materialize.min.js', revision: '1' },
      { url: '/js/nav.js', revision: '1' },
      { url: '/js/sw.js', revision: '1' },
      { url: '/js/sw-team.js', revision: '1' },
  ],
  {
    ignoreUrlParametersMatching: [/.*/]
  }
  );

  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'pages'
      })
  );

  workbox.routing.registerRoute(
      new RegExp('https://api.football-data.org/v2/'),
      workbox.strategies.staleWhileRevalidate()
  );

self.addEventListener("push", event => {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  var options = {
    body: body,
    icon: "images/icons/icon-96x96.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primariKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
