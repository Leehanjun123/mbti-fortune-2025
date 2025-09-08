// Service Worker - v2.2.0
const CACHE_NAME = 'mbti-fortune-v2.2.0';
const RUNTIME_CACHE = 'runtime-cache';

// 캐시할 정적 자원들
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/mobile-fix.css',
  '/simple-fix.css',
  '/emergency-fix.css',
  '/result-redesign.css',
  '/bottom-redesign.css',
  '/script.js',
  '/config.js',
  '/analytics.js',
  '/viral.js',
  '/monetization.js',
  '/performance.js',
  '/manifest.json'
  // Google Fonts는 CORS 때문에 제외 (런타임에 캐시)
];

// 캐시 우선순위 전략
const CACHE_STRATEGIES = {
  cacheFirst: [
    /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
    /^https:\/\/fonts\.googleapis\.com/,
    /^https:\/\/fonts\.gstatic\.com/
  ],
  networkFirst: [
    /\/api\//,
    /^https:\/\/www\.google-analytics\.com/,
    /^https:\/\/connect\.facebook\.net/
  ],
  staleWhileRevalidate: [
    /\.(?:js|css)$/,
    /^https:\/\/developers\.kakao\.com/
  ]
};

// 설치 이벤트
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// 활성화 이벤트
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch 이벤트
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 외부 도메인 요청은 네트워크로 직접 전달
  if (!url.origin.includes('localhost') && !url.origin.includes('mbti-destiny.site')) {
    // Google Fonts, 카카오 등 외부 리소스는 no-cors 모드로
    if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
      event.respondWith(
        fetch(request, { mode: 'cors' }).catch(() => {
          console.log('[SW] External font failed, continuing without cache');
          return new Response('', { status: 200 });
        })
      );
      return;
    }
    // 다른 외부 리소스는 그냥 통과
    return;
  }
  
  // 캐시 전략 결정
  if (isMatch(url, CACHE_STRATEGIES.cacheFirst)) {
    event.respondWith(cacheFirst(request));
  } else if (isMatch(url, CACHE_STRATEGIES.networkFirst)) {
    event.respondWith(networkFirst(request));
  } else if (isMatch(url, CACHE_STRATEGIES.staleWhileRevalidate)) {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

// 캐시 우선 전략
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    console.log('[SW] Cache hit:', request.url);
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// 네트워크 우선 전략
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      console.log('[SW] Fallback to cache:', request.url);
      return cached;
    }
    return new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate 전략
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });
  
  return cachedResponse || fetchPromise;
}

// URL 매칭 헬퍼
function isMatch(url, patterns) {
  return patterns.some(pattern => {
    if (pattern instanceof RegExp) {
      return pattern.test(url.href);
    }
    return url.href.includes(pattern);
  });
}

// 백그라운드 동기화
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

// 분석 데이터 동기화
async function syncAnalytics() {
  const cache = await caches.open('analytics-cache');
  const requests = await cache.keys();
  
  for (const request of requests) {
    try {
      const response = await fetch(request);
      if (response.ok) {
        await cache.delete(request);
      }
    } catch (error) {
      console.error('[SW] Analytics sync failed:', error);
    }
  }
}

// 푸시 알림 (향후 구현)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : '새로운 운세가 도착했습니다!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('2025 MBTI 운세', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});