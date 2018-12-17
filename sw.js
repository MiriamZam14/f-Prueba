const CACHE_NAME='cache_pwa_prueba';
var UrlsToCache=[
  './',
  './css/estilos_index.css',
  './css/menu.css',
  './css/footer.css'
  './img/apple-icon-120x120.png',
  './img/audio.mpeg',
  './img/1088_2.mp4'
  './img/tecISC.jpg',
  './img/apple-icon-precomposed.png',
  './img/apple-icon-76x76.png',
  './img/logoISIC.jpeg',
  './img/apple-icon-72x72.png',
  './img/android-icon-192x192.png',
  './img/favicon-16x16.png',
  './img/eneit.jpg',
  './img/isic1.jpg',
  './img/apple-icon-144x144.png',
  './img/apple-icon-152x152.png',
  './img/ms-icon-70x70.png',
  './img/android-icon-36x36.png',
  './img/favicon-32x32.png',
  './img/favicon-96x96.png',
  './img/apple-icon.png',
  './img/ms-icon-150x150.png',
  './img/delfinPro.jpg',
  './img/android-icon-96x96.png',
];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>{
      return cache.addAll(UrlsToCache)
      .then(()=>{
        self.skipWaiting();
      });
    }).catch(err=>
      console.log('no se ha registrado el cache',err)));
});
self.addEventListener('activate',e=>{
  const cacheWhiteList=[CACHE_NAME];
  e.waitUntil(
    caches.keys()
      .then(cacheNames =>{
        return Promise.all(cacheNames.map(cacheName=>{
          if(cacheWhiteList.indexOf(cacheName)===- 1){
              return caches.delete(cacheName);
          }
        })
       );
     })
     .then(()=>{
        self.clients.claim();
     })
  );
});
self.addEventListener('fetch',e=>{
    e.respondWith(
      caches.match(e.request)
        .then(res=>{
          if(res){
            return res;
          }
          return fetch(e.request);
        })
    );
});
