// 성능 최적화 모듈 - Linus Torvalds 접근법
const PerformanceOptimizer = {
    // 이미지 지연 로딩
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    },
    
    // 애니메이션 최적화
    optimizeAnimations() {
        // requestAnimationFrame 사용
        let ticking = false;
        
        function updateAnimations() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // 애니메이션 업데이트
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        // will-change 속성 관리
        document.querySelectorAll('.animated').forEach(el => {
            el.addEventListener('animationstart', () => {
                el.style.willChange = 'transform, opacity';
            });
            el.addEventListener('animationend', () => {
                el.style.willChange = 'auto';
            });
        });
    },
    
    // 메모리 관리
    memoryManager: {
        cache: new Map(),
        maxCacheSize: 50,
        
        set(key, value) {
            if (this.cache.size >= this.maxCacheSize) {
                const firstKey = this.cache.keys().next().value;
                this.cache.delete(firstKey);
            }
            this.cache.set(key, value);
        },
        
        get(key) {
            const value = this.cache.get(key);
            if (value) {
                // LRU 업데이트
                this.cache.delete(key);
                this.cache.set(key, value);
            }
            return value;
        },
        
        clear() {
            this.cache.clear();
        }
    },
    
    // 이벤트 디바운싱
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 이벤트 쓰로틀링
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 불필요한 리플로우 방지
    batchDOMUpdates(updates) {
        // 읽기 작업 먼저
        const reads = updates.filter(u => u.type === 'read');
        reads.forEach(u => u.fn());
        
        // 쓰기 작업 나중에
        const writes = updates.filter(u => u.type === 'write');
        requestAnimationFrame(() => {
            writes.forEach(u => u.fn());
        });
    },
    
    // 초기화
    init() {
        // 이미지 지연 로딩
        this.lazyLoadImages();
        
        // 애니메이션 최적화
        this.optimizeAnimations();
        
        // 스크롤 이벤트 최적화
        let lastScrollY = 0;
        const scrollHandler = this.throttle(() => {
            const currentScrollY = window.scrollY;
            
            // 스크롤 방향 감지
            const direction = currentScrollY > lastScrollY ? 'down' : 'up';
            
            // 필요한 업데이트만 수행
            if (Math.abs(currentScrollY - lastScrollY) > 10) {
                document.body.setAttribute('data-scroll-direction', direction);
            }
            
            lastScrollY = currentScrollY;
        }, 100);
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
        
        // 리사이즈 이벤트 최적화
        const resizeHandler = this.debounce(() => {
            // 뷰포트 재계산
            document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        }, 250);
        
        window.addEventListener('resize', resizeHandler);
        
        // 초기 뷰포트 설정
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        
        console.log('🚀 성능 최적화 모듈 초기화 완료');
    },
    
    // 성능 측정
    measurePerformance() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const metrics = {
                // 페이지 로드 시간
                pageLoadTime: timing.loadEventEnd - timing.navigationStart,
                // DOM 준비 시간
                domReadyTime: timing.domContentLoadedEventEnd - timing.navigationStart,
                // 첫 바이트까지 시간
                ttfb: timing.responseStart - timing.navigationStart,
                // DNS 조회 시간
                dnsTime: timing.domainLookupEnd - timing.domainLookupStart,
                // TCP 연결 시간
                tcpTime: timing.connectEnd - timing.connectStart,
                // 응답 시간
                responseTime: timing.responseEnd - timing.responseStart
            };
            
            console.table(metrics);
            
            // 성능 경고
            if (metrics.pageLoadTime > 3000) {
                console.warn('⚠️ 페이지 로드 시간이 3초를 초과합니다');
            }
            
            return metrics;
        }
    }
};

// 자동 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PerformanceOptimizer.init());
} else {
    PerformanceOptimizer.init();
}

// 페이지 로드 완료 후 성능 측정
window.addEventListener('load', () => {
    setTimeout(() => {
        PerformanceOptimizer.measurePerformance();
    }, 0);
});