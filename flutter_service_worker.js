'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"index.html": "b9064a916ec4565273010067a0324aff",
"/": "b9064a916ec4565273010067a0324aff",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"main.dart.js": "fa732b42a4e904223953c3d1de040b71",
"version.json": "266af159797672c25ecb7413d1fbabec",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"assets/assets/images/genres/drama.jpg": "99858094fc56d2c50a29606d93d82f55",
"assets/assets/images/genres/adventure.jpg": "af2830ce6c092a2b03e42adfad7c6849",
"assets/assets/images/genres/retroscifi.jpg": "0c54cbea063c40962541bd30b5ef13c6",
"assets/assets/images/genres/scifi.jpg": "73786ce42769706163e39b3c8be7b0de",
"assets/assets/images/genres/music.jpg": "5e90f2d4cc897b0bcd4b55c1acf7e0d9",
"assets/assets/images/genres/comedy.jpg": "bc130f9fc8d05c67b033fda23da558fa",
"assets/assets/images/genres/anygenre.jpg": "abd2b4760e789ed6dbde411b39c2ed8d",
"assets/assets/images/genres/fantasy.jpg": "72908f4eb45291f80d08828d3421098b",
"assets/assets/images/genres/series.jpg": "03e0e1195776b0feb9d884789df84b69",
"assets/assets/images/genres/suspense.jpg": "ff7e0eae87cdf0fb772e7e620b1e7cf4",
"assets/assets/images/genres/western.jpg": "dc0a86dda80892e5d647b5d6d4714d06",
"assets/assets/images/genres/history.jpg": "48d9cb35267b473f142dda973a35e5c7",
"assets/assets/images/genres/animeseries.jpg": "7488590b5ff29acb4c0b3b86648ec24b",
"assets/assets/images/genres/animation.jpg": "2f3e5c4ee1ca049cc74dc5ca40d71895",
"assets/assets/images/genres/horror.jpg": "09c1ebf8af85e283f1e4edcac6b616d4",
"assets/assets/images/genres/war.jpg": "c7e3c0c6728ae561eb9b719e34885ed6",
"assets/assets/images/genres/mistery.jpg": "ab109aa2dce93a7ef065f5502e5d3b74",
"assets/assets/images/genres/documental.jpg": "abe03ff75a81316db2bbc2f149b68d54",
"assets/assets/images/genres/80s.jpg": "5c18fb576cfa03fb6fb9b5929a0410a1",
"assets/assets/images/genres/romance.jpg": "231dde2b584e638cb994db4e0daffbb4",
"assets/assets/images/genres/family.jpg": "051285cb22e95df51fe1c9fbfcf9a6ba",
"assets/assets/images/genres/crime.jpg": "1420e2d6e56b94f522c79e502b8d6c36",
"assets/assets/images/genres/action.jpg": "061f695a2837c973cdedebb4ecd3927c",
"assets/assets/images/over/over12.gif": "81639bf75525da34e572b5cac905c4b5",
"assets/assets/images/tmdb.png": "44bd2581970edea5b463dfa04c0ad8ae",
"assets/assets/images/movietheater.jpg": "58d2a4d40d01bfd2c7b9649b181c0558",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin": "a5b15720747a67b572493651ff75b57a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/fonts/MaterialIcons-Regular.otf": "8152a57771d6f275aba5b418b075982a",
"assets/AssetManifest.json": "3fd71343077003c91d88c44a0514341b",
"assets/NOTICES": "1214f7cf41db8c858d972d43f3c544a0",
"manifest.json": "a91867911e1c87d7cdec67675db08bc2",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
