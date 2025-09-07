// Performance Optimization Module
class PerformanceOptimizer {
    constructor() {
        this.intersectionObserver = null;
        this.performanceObserver = null;
        this.resourceHints = [];
        this.init();
    }
    
    init() {
        // 성능 측정 시작
        this.measureCoreWebVitals();
        
        // Lazy Loading 설정
        this.setupLazyLoading();
        
        // Resource Hints 설정
        this.setupResourceHints();
        
        // 이미지 최적화
        this.optimizeImages();
        
        // 폰트 최적화
        this.optimizeFonts();
        
        // Critical CSS 인라인
        this.inlineCriticalCSS();
        
        // 서비스 워커 등록
        this.registerServiceWorker();
        
        // 메모리 관리
        this.setupMemoryManagement();
    }
    
    // Core Web Vitals 측정
    measureCoreWebVitals() {
        // LCP (Largest Contentful Paint)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            
            // Analytics로 전송
            if (window.analytics) {
                window.analytics.track('web_vitals', {
                    metric: 'LCP',
                    value: lastEntry.renderTime || lastEntry.loadTime
                });
            }
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // FID (First Input Delay)
        new PerformanceObserver((entryList) => {
            const firstInput = entryList.getEntries()[0];
            const fid = firstInput.processingStart - firstInput.startTime;
            console.log('FID:', fid);
            
            if (window.analytics) {
                window.analytics.track('web_vitals', {
                    metric: 'FID',
                    value: fid
                });
            }
        }).observe({ entryTypes: ['first-input'] });
        
        // CLS (Cumulative Layout Shift)
        let clsValue = 0;
        let clsEntries = [];
        
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    if (clsEntries.length === 0) {
                        clsEntries = [entry];
                        clsValue = entry.value;
                    } else {
                        const firstSessionEntry = clsEntries[0];
                        const lastSessionEntry = clsEntries[clsEntries.length - 1];
                        
                        if (entry.startTime - lastSessionEntry.startTime < 1000 &&
                            entry.startTime - firstSessionEntry.startTime < 5000) {
                            clsEntries.push(entry);
                            clsValue += entry.value;
                        } else {
                            clsEntries = [entry];
                            clsValue = entry.value;
                        }
                    }
                    
                    console.log('CLS:', clsValue);
                }
            }
        }).observe({ entryTypes: ['layout-shift'] });
        
        // TTFB (Time to First Byte)
        window.addEventListener('load', () => {
            const navTiming = performance.getEntriesByType('navigation')[0];
            const ttfb = navTiming.responseStart - navTiming.requestStart;
            console.log('TTFB:', ttfb);
            
            if (window.analytics) {
                window.analytics.track('web_vitals', {
                    metric: 'TTFB',
                    value: ttfb
                });
            }
        });
    }
    
    // Lazy Loading 설정
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.intersectionObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const element = entry.target;
                            
                            // 이미지 lazy loading
                            if (element.tagName === 'IMG' && element.dataset.src) {
                                element.src = element.dataset.src;
                                element.removeAttribute('data-src');
                                element.classList.add('loaded');
                            }
                            
                            // iframe lazy loading
                            if (element.tagName === 'IFRAME' && element.dataset.src) {
                                element.src = element.dataset.src;
                                element.removeAttribute('data-src');
                            }
                            
                            // 컴포넌트 lazy loading
                            if (element.dataset.component) {
                                this.loadComponent(element.dataset.component);
                            }
                            
                            this.intersectionObserver.unobserve(element);
                        }
                    });
                },
                {
                    rootMargin: '50px 0px',
                    threshold: 0.01
                }
            );
            
            // Lazy load 대상 요소들 관찰
            document.querySelectorAll('[data-src], [data-component]').forEach(el => {
                this.intersectionObserver.observe(el);
            });
        }
    }
    
    // Resource Hints 설정
    setupResourceHints() {
        // DNS Prefetch
        const dnsPrefetchDomains = [
            'https://fonts.googleapis.com',
            'https://www.googletagmanager.com',
            'https://connect.facebook.net',
            'https://developers.kakao.com',
            'https://t1.daumcdn.net'
        ];
        
        dnsPrefetchDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });
        
        // Preconnect
        const preconnectDomains = [
            'https://fonts.gstatic.com',
            'https://www.google-analytics.com'
        ];
        
        preconnectDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
        
        // Prefetch 다음 화면 리소스
        this.prefetchNextScreen();
    }
    
    // 다음 화면 리소스 prefetch
    prefetchNextScreen() {
        // 현재 화면에 따라 다음 화면 리소스 prefetch
        const currentScreen = document.querySelector('.screen.active');
        if (!currentScreen) return;
        
        // API prefetching removed as this is a static site
        // Resources are embedded in the main JavaScript files
    }
    
    // 이미지 최적화
    optimizeImages() {
        // WebP 지원 체크
        const webpSupport = this.checkWebPSupport();
        
        document.querySelectorAll('img').forEach(img => {
            // WebP 대체 이미지 설정
            if (webpSupport && img.dataset.webp) {
                img.src = img.dataset.webp;
            }
            
            // 적응형 이미지 크기
            this.setResponsiveImage(img);
            
            // 이미지 디코딩 최적화
            img.decoding = 'async';
            img.loading = 'lazy';
        });
    }
    
    // WebP 지원 체크
    checkWebPSupport() {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
    }
    
    // 반응형 이미지 설정
    setResponsiveImage(img) {
        if (!img.dataset.srcset) return;
        
        const devicePixelRatio = window.devicePixelRatio || 1;
        const screenWidth = window.innerWidth;
        
        // srcset 파싱 및 최적 이미지 선택
        const sources = img.dataset.srcset.split(',').map(src => {
            const [url, descriptor] = src.trim().split(' ');
            const value = parseInt(descriptor);
            return { url, value };
        });
        
        const optimalSource = sources.find(source => 
            source.value >= screenWidth * devicePixelRatio
        ) || sources[sources.length - 1];
        
        img.src = optimalSource.url;
    }
    
    // 폰트 최적화
    optimizeFonts() {
        // Font Display Swap
        const fontFaceStyle = document.createElement('style');
        fontFaceStyle.innerHTML = `
            @font-face {
                font-family: 'Pretendard';
                font-display: swap;
            }
        `;
        document.head.appendChild(fontFaceStyle);
        
        // 사용하지 않는 폰트 weight 제거
        this.removeUnusedFontWeights();
    }
    
    // 사용하지 않는 폰트 weight 제거
    removeUnusedFontWeights() {
        const usedWeights = new Set();
        
        // 사용중인 font-weight 수집
        document.querySelectorAll('*').forEach(el => {
            const weight = window.getComputedStyle(el).fontWeight;
            usedWeights.add(weight);
        });
        
        // Google Fonts URL 업데이트
        const fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
        if (fontLink) {
            const weights = Array.from(usedWeights).join(';');
            fontLink.href = fontLink.href.replace(/wght@[\d;]+/, `wght@${weights}`);
        }
    }
    
    // Critical CSS 인라인
    inlineCriticalCSS() {
        // Above-the-fold에 필요한 CSS만 인라인으로 포함
        const criticalCSS = `
            body { margin: 0; font-family: 'Pretendard', sans-serif; }
            #loadingScreen { position: fixed; inset: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
            .loading-content { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
            .year-animation { font-size: 72px; font-weight: 900; color: white; animation: pulse 2s infinite; }
            @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        `;
        
        const style = document.createElement('style');
        style.innerHTML = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    }
    
    // 서비스 워커 등록
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered:', registration);
                        
                        // 업데이트 체크
                        registration.addEventListener('updatefound', () => {
                            const newWorker = registration.installing;
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // 새 버전 알림
                                    this.showUpdateNotification();
                                }
                            });
                        });
                    })
                    .catch(error => {
                        console.log('SW registration failed:', error);
                    });
            });
        }
    }
    
    // 업데이트 알림 표시
    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <p>새로운 버전이 있습니다!</p>
            <button onclick="location.reload()">업데이트</button>
        `;
        document.body.appendChild(notification);
    }
    
    // 메모리 관리
    setupMemoryManagement() {
        // 메모리 누수 방지를 위한 이벤트 리스너 관리
        const eventManager = {
            listeners: new Map(),
            
            add(element, event, handler, options) {
                if (!this.listeners.has(element)) {
                    this.listeners.set(element, new Map());
                }
                this.listeners.get(element).set(event, { handler, options });
                element.addEventListener(event, handler, options);
            },
            
            remove(element, event) {
                if (this.listeners.has(element)) {
                    const elementListeners = this.listeners.get(element);
                    if (elementListeners.has(event)) {
                        const { handler, options } = elementListeners.get(event);
                        element.removeEventListener(event, handler, options);
                        elementListeners.delete(event);
                    }
                }
            },
            
            removeAll(element) {
                if (this.listeners.has(element)) {
                    const elementListeners = this.listeners.get(element);
                    elementListeners.forEach(({ handler, options }, event) => {
                        element.removeEventListener(event, handler, options);
                    });
                    this.listeners.delete(element);
                }
            }
        };
        
        window.eventManager = eventManager;
        
        // 페이지 전환 시 이전 화면 리소스 정리
        this.setupScreenCleanup();
        
        // 주기적 가비지 컬렉션 트리거
        setInterval(() => {
            if (window.gc) {
                window.gc();
            }
        }, 60000); // 1분마다
    }
    
    // 화면 전환 시 리소스 정리
    setupScreenCleanup() {
        const screenObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.classList.contains('screen') && !target.classList.contains('active')) {
                        // 비활성화된 화면의 리소스 정리
                        this.cleanupScreen(target);
                    }
                }
            });
        });
        
        document.querySelectorAll('.screen').forEach(screen => {
            screenObserver.observe(screen, { attributes: true });
        });
    }
    
    // 화면 리소스 정리
    cleanupScreen(screen) {
        // 이벤트 리스너 제거
        if (window.eventManager) {
            screen.querySelectorAll('*').forEach(el => {
                window.eventManager.removeAll(el);
            });
        }
        
        // 타이머 정리
        screen.dataset.timers?.split(',').forEach(timerId => {
            clearTimeout(parseInt(timerId));
            clearInterval(parseInt(timerId));
        });
        
        // 애니메이션 정리
        screen.querySelectorAll('*').forEach(el => {
            el.getAnimations?.().forEach(animation => {
                animation.cancel();
            });
        });
    }
    
    // 컴포넌트 동적 로딩
    async loadComponent(componentName) {
        try {
            const module = await import(`./components/${componentName}.js`);
            module.default.init();
        } catch (error) {
            console.error('Failed to load component:', componentName, error);
        }
    }
    
    // 리소스 압축 상태 체크
    checkCompression() {
        const resources = performance.getEntriesByType('resource');
        resources.forEach(resource => {
            if (resource.encodedBodySize > 0 && resource.decodedBodySize > 0) {
                const compressionRatio = 1 - (resource.encodedBodySize / resource.decodedBodySize);
                if (compressionRatio < 0.3) {
                    console.warn(`Poor compression for ${resource.name}: ${(compressionRatio * 100).toFixed(1)}%`);
                }
            }
        });
    }
}

// 인스턴스 생성 및 초기화
const performanceOptimizer = new PerformanceOptimizer();

// 전역 노출
window.performanceOptimizer = performanceOptimizer;