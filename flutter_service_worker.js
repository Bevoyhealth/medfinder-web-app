'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"env-dev.json": "6eb6a9f7e9964039362ab451fa6740dd",
"version.json": "a9d6afb9a266b2e1181c6c93e402dc18",
"index.html": "ea899539cd009b9a0a96e9348702aa3f",
"/": "ea899539cd009b9a0a96e9348702aa3f",
"main.dart.js": "f8b97a9b63187060e87e9407f2662813",
"env.json": "99d0e526276e8231339fc5764953ac3f",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
"payment_details.html": "d28f66015ef534ac5cfb360a9a2a5736",
"favicon.png": "47bb5028d79b4dfba4ac7958d98abdc1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "e9bed0d00c49081683acfd78e9fc7c63",
"return.html": "fc0d5b5df03d345198694a390c42ac6c",
"assets/AssetManifest.json": "8a9ad7fd1d0a8378ada5a7afe30bd52c",
"assets/prod.env": "b1e94cc4d9d5a7acb5e1036bc87967b3",
"assets/NOTICES": "1cfa42ac739ad39bba31f7f5997569ec",
"assets/dev.env": "0a401255630c06f9f1ac5bc8c22fd65d",
"assets/FontManifest.json": "c0b9c1676671374ddefef69b6a088e00",
"assets/AssetManifest.bin.json": "bb38bc32a76dc24da509231a089c35ba",
"assets/packages/flutter_smartlook/lib/smartlook.png": "49cb46409394bd16d0a8f924a54b7cc2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/amplify_auth_cognito_dart/lib/src/workers/workers.min.js.map": "78431b9ab6f0bdf0ea53fb030d2f4dc7",
"assets/packages/amplify_auth_cognito_dart/lib/src/workers/workers.min.js": "96a4f300372b4af473dfc064ed8c2bbb",
"assets/packages/amplify_authenticator/assets/social-buttons/SocialIcons.ttf": "376fbf368ffe39e045978e3d3197efbd",
"assets/packages/amplify_authenticator/assets/social-buttons/google.png": "a1e1d65465c69a65f8d01226ff5237ec",
"assets/packages/amplify_secure_storage_dart/lib/src/worker/workers.min.js.map": "cf150ebe9b8ab146e10e6b768b9151b7",
"assets/packages/amplify_secure_storage_dart/lib/src/worker/workers.min.js": "79da0578419862d4aec86b686e06f90c",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin": "e1bb1e1314bfcbdda556e5fa39c13263",
"assets/fonts/MaterialIcons-Regular.otf": "d8a354e10481d457409f8b95c08eab17",
"assets/assets/logo_dark_background.png": "81d658e1feed2797104687d5d71670bb",
"assets/assets/logo_light_background.png": "58f6350517bef5dd1d3c406132ca8eae",
"assets/assets/fonts/FuturaMedium/FuturaMedium.otf": "a8bb1c203a65eb1f8df75e5ae6dc676c",
"assets/assets/fonts/Inter/static/Inter-Medium.ttf": "16580ed788273749548eb27b9a9b674f",
"assets/assets/fonts/Inter/static/Inter-Light.ttf": "60c8f64064078554b6469eeda25944eb",
"assets/assets/fonts/Inter/static/Inter-Thin.ttf": "be37c2ebe9cd2e0719d1a9437858686f",
"assets/assets/fonts/Inter/static/Inter-Bold.ttf": "d17c0274915408cee0308d5476df9f45",
"assets/assets/fonts/Inter/static/Inter-Regular.ttf": "a4a7379505cd554ea9523594b7c28b2a",
"assets/assets/fonts/Inter/static/Inter-ExtraBold.ttf": "e771faf703386b0c5863cc3df1e26ba1",
"assets/assets/fonts/Inter/static/Inter-ExtraLight.ttf": "c36ac5a28afa9a4d70292df06a932ccd",
"assets/assets/fonts/Inter/static/Inter-Black.ttf": "10215142a203211d9292c62ae0503a97",
"assets/assets/fonts/Inter/static/Inter-SemiBold.ttf": "1753a05196abeef95c32f10246bd6473",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
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
