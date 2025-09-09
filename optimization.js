// 🚀 성능 및 UX 최적화 모듈
const OptimizationModule = {
    // 초기화
    init() {
        this.performanceOptimization();
        this.accessibilityEnhancement();
        this.mobileOptimization();
        this.errorHandling();
        this.lazyLoading();
        console.log('✨ Optimization Module Initialized');
    },
    
    // 1. 성능 최적화
    performanceOptimization() {
        // 이미지 지연 로딩
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.add('loaded');
                        }
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // 스크롤 성능 최적화 (Passive Event Listeners)
        let scrollTimeout;
        const scrollHandler = () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(() => {
                // 스크롤 관련 작업
                this.updateScrollProgress();
            });
        };
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
        
        // Prefetch 다음 페이지
        this.prefetchNextPages();
    },
    
    // 2. 접근성 개선
    accessibilityEnhancement() {
        // ARIA 레이블 자동 추가
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        });
        
        // 키보드 네비게이션 개선
        document.querySelectorAll('.mbti-btn, .cta-button, .btn-primary').forEach(element => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
            
            // Enter 키로 클릭 가능하게
            element.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
        
        // Skip to main content 링크 추가
        if (!document.querySelector('.skip-to-main')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.className = 'skip-to-main';
            skipLink.textContent = '본문으로 건너뛰기';
            skipLink.style.cssText = `
                position: absolute;
                top: -40px;
                left: 0;
                background: #667eea;
                color: white;
                padding: 8px;
                text-decoration: none;
                z-index: 10000;
                border-radius: 0 0 4px 0;
            `;
            skipLink.addEventListener('focus', () => {
                skipLink.style.top = '0';
            });
            skipLink.addEventListener('blur', () => {
                skipLink.style.top = '-40px';
            });
            document.body.insertBefore(skipLink, document.body.firstChild);
        }
        
        // 메인 콘텐츠에 ID 추가
        const mainContent = document.querySelector('.container, main, .app');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
        
        // 색상 대비 개선
        this.improveColorContrast();
        
        // 스크린 리더용 라이브 영역 추가
        if (!document.querySelector('#aria-live-region')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'aria-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            liveRegion.style.cssText = `
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
            document.body.appendChild(liveRegion);
        }
    },
    
    // 3. 모바일 최적화
    mobileOptimization() {
        // 터치 타겟 크기 확보
        const minTouchSize = 44; // iOS 권장 최소 크기
        
        document.querySelectorAll('button, a, input, select, textarea').forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.width < minTouchSize || rect.height < minTouchSize) {
                element.style.minWidth = minTouchSize + 'px';
                element.style.minHeight = minTouchSize + 'px';
            }
        });
        
        // 모바일 스크롤 성능 개선
        document.querySelectorAll('.screen, .container, .modal-content').forEach(element => {
            element.style.webkitOverflowScrolling = 'touch';
            element.style.overscrollBehavior = 'contain';
        });
        
        // 뷰포트 높이 이슈 해결 (모바일 브라우저)
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);
        
        // 터치 이벤트 최적화
        let touchStartY = 0;
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        // Pull-to-refresh 방지
        document.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            const touchDiff = touchY - touchStartY;
            
            if (touchDiff > 0 && window.scrollY === 0) {
                e.preventDefault();
            }
        }, { passive: false });
    },
    
    // 4. 에러 처리
    errorHandling() {
        // 전역 에러 핸들러
        window.addEventListener('error', (event) => {
            console.error('Application Error:', event.error);
            
            // 사용자 친화적 에러 메시지
            this.showErrorMessage('문제가 발생했습니다. 페이지를 새로고침해주세요.');
            
            // 에러 로깅 (프로덕션에서는 서버로 전송)
            this.logError({
                message: event.message,
                source: event.filename,
                line: event.lineno,
                column: event.colno,
                error: event.error?.stack
            });
        });
        
        // Promise 거부 핸들러
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            
            this.showErrorMessage('일시적인 오류가 발생했습니다.');
            
            this.logError({
                type: 'unhandledrejection',
                reason: event.reason
            });
        });
    },
    
    // 5. 이미지 지연 로딩
    lazyLoading() {
        // CSS 배경 이미지 지연 로딩
        const lazyBackgrounds = document.querySelectorAll('[data-bg]');
        
        if ('IntersectionObserver' in window) {
            const bgObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        element.style.backgroundImage = `url(${element.dataset.bg})`;
                        element.removeAttribute('data-bg');
                        bgObserver.unobserve(element);
                    }
                });
            });
            
            lazyBackgrounds.forEach(element => bgObserver.observe(element));
        }
    },
    
    // 유틸리티 함수들
    
    // 색상 대비 개선
    improveColorContrast() {
        // 낮은 대비 색상 조합 수정
        const lowContrastElements = document.querySelectorAll('.text-muted, .subtitle');
        lowContrastElements.forEach(element => {
            const bgColor = window.getComputedStyle(element.parentElement).backgroundColor;
            if (bgColor === 'rgb(255, 255, 255)' || bgColor === 'rgba(255, 255, 255, 1)') {
                element.style.color = '#495057'; // 더 진한 회색
            }
        });
    },
    
    // 다음 페이지 프리페치
    prefetchNextPages() {
        const currentPath = window.location.pathname;
        const nextPages = {
            '/index.html': ['/mbti-daily.html', '/mbti-compatibility.html'],
            '/mbti-daily.html': ['/mbti-compatibility.html', '/mbti-reactions.html'],
            '/mbti-compatibility.html': ['/mbti-reactions.html', '/mbti-career.html']
        };
        
        const pagesToPrefetch = nextPages[currentPath] || [];
        
        pagesToPrefetch.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
        });
    },
    
    // 스크롤 진행률 업데이트
    updateScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
    },
    
    // 에러 메시지 표시
    showErrorMessage(message) {
        const existingToast = document.querySelector('.error-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #dc3545;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },
    
    // 에러 로깅
    logError(errorData) {
        // 로컬 스토리지에 에러 저장 (개발용)
        const errors = JSON.parse(localStorage.getItem('appErrors') || '[]');
        errors.push({
            ...errorData,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        });
        
        // 최대 50개 에러만 유지
        if (errors.length > 50) {
            errors.splice(0, errors.length - 50);
        }
        
        localStorage.setItem('appErrors', JSON.stringify(errors));
        
        // 프로덕션에서는 서버로 전송
        // if (window.CONFIG && window.CONFIG.ENV === 'production') {
        //     fetch('/api/errors', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(errorData)
        //     });
        // }
    }
};

// 브라우저 지원 체크
const BrowserSupport = {
    check() {
        const unsupportedFeatures = [];
        
        // 필수 기능 체크
        if (!('IntersectionObserver' in window)) {
            unsupportedFeatures.push('IntersectionObserver');
        }
        
        if (!('localStorage' in window)) {
            unsupportedFeatures.push('localStorage');
        }
        
        if (!('fetch' in window)) {
            unsupportedFeatures.push('fetch');
        }
        
        // 구형 브라우저 경고
        if (unsupportedFeatures.length > 0) {
            console.warn('Browser missing features:', unsupportedFeatures);
            this.showUpgradeMessage();
        }
        
        return unsupportedFeatures.length === 0;
    },
    
    showUpgradeMessage() {
        const banner = document.createElement('div');
        banner.className = 'browser-upgrade-banner';
        banner.innerHTML = `
            <p>최적의 경험을 위해 최신 브라우저를 사용해주세요.</p>
            <a href="https://browsehappy.com/" target="_blank" rel="noopener">브라우저 업그레이드</a>
        `;
        banner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #ffc107;
            color: #000;
            padding: 10px;
            text-align: center;
            z-index: 10000;
        `;
        document.body.insertBefore(banner, document.body.firstChild);
    }
};

// 애니메이션 스타일 추가
const addOptimizationStyles = () => {
    if (!document.querySelector('#optimization-styles')) {
        const styles = document.createElement('style');
        styles.id = 'optimization-styles';
        styles.innerHTML = `
            @keyframes slideUp {
                from {
                    transform: translate(-50%, 100%);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
            }
            
            @keyframes slideDown {
                from {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
                to {
                    transform: translate(-50%, 100%);
                    opacity: 0;
                }
            }
            
            /* 이미지 로딩 애니메이션 */
            img {
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            img.loaded {
                opacity: 1;
            }
            
            /* 스크롤 진행 바 */
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, #667eea, #764ba2);
                z-index: 10001;
                transition: width 0.1s;
            }
            
            /* 포커스 스타일 개선 */
            *:focus {
                outline: 2px solid #667eea;
                outline-offset: 2px;
            }
            
            /* 모바일 뷰포트 높이 대응 */
            .full-height {
                height: 100vh;
                height: calc(var(--vh, 1vh) * 100);
            }
            
            /* 터치 최적화 */
            @media (hover: none) and (pointer: coarse) {
                button, a {
                    -webkit-tap-highlight-color: rgba(102, 126, 234, 0.2);
                }
            }
            
            /* 스크롤바 스타일링 */
            ::-webkit-scrollbar {
                width: 10px;
                height: 10px;
            }
            
            ::-webkit-scrollbar-track {
                background: #f1f1f1;
            }
            
            ::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-radius: 5px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: #667eea;
            }
        `;
        document.head.appendChild(styles);
    }
};

// 스크롤 진행 바 추가
const addScrollProgress = () => {
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
};

// 초기화
const initOptimization = () => {
    // 브라우저 지원 체크
    if (BrowserSupport.check()) {
        // 스타일 추가
        addOptimizationStyles();
        
        // 스크롤 진행 바 추가
        addScrollProgress();
        
        // 최적화 모듈 초기화
        OptimizationModule.init();
    }
};

// DOM 준비 시 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOptimization);
} else {
    initOptimization();
}

// 전역 접근 가능하게 설정
window.OptimizationModule = OptimizationModule;