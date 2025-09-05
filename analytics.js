// Analytics & Tracking Module
class Analytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.events = [];
        this.abTests = {};
        this.initializeGA();
        this.initializePixel();
        this.initializeABTests();
    }
    
    // Google Analytics 초기화
    initializeGA() {
        if (typeof gtag === 'undefined' || !CONFIG.GA_TRACKING_ID) return;
        
        gtag('config', CONFIG.GA_TRACKING_ID, {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true
        });
    }
    
    // Facebook Pixel 초기화 
    initializePixel() {
        if (typeof fbq === 'undefined') return;
        
        // 기본 페이지뷰 추적
        fbq('track', 'PageView');
    }
    
    // A/B 테스트 초기화
    initializeABTests() {
        Object.keys(CONFIG.AB_TESTS).forEach(testName => {
            const test = CONFIG.AB_TESTS[testName];
            if (!test.enabled) return;
            
            const variant = this.selectVariant(test.variants, test.weights);
            this.abTests[testName] = variant;
            this.track('ab_test_assigned', {
                test_name: testName,
                variant: variant
            });
        });
    }
    
    // A/B 테스트 변형 선택
    selectVariant(variants, weights) {
        const random = Math.random();
        let cumSum = 0;
        
        for (let i = 0; i < variants.length; i++) {
            cumSum += weights[i];
            if (random < cumSum) {
                return variants[i];
            }
        }
        return variants[0];
    }
    
    // 이벤트 추적
    track(eventName, parameters = {}) {
        const event = {
            name: eventName,
            parameters: {
                ...parameters,
                session_id: this.sessionId,
                timestamp: Date.now(),
                time_on_site: Math.floor((Date.now() - this.startTime) / 1000)
            }
        };
        
        this.events.push(event);
        
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, event.parameters);
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined' && this.getFBEvent(eventName)) {
            fbq('track', this.getFBEvent(eventName), parameters);
        }
        
        // Console log for debugging (개발 환경)
        if (window.location.hostname === 'localhost') {
            console.log('📊 Event tracked:', event);
        }
        
        // 서버로 이벤트 전송 (배치)
        this.sendToServer(event);
    }
    
    // Facebook Pixel 이벤트 매핑
    getFBEvent(eventName) {
        const mapping = {
            'test_start': 'InitiateCheckout',
            'test_complete': 'CompleteRegistration',
            'share_click': 'Lead',
            'premium_view': 'ViewContent',
            'premium_purchase': 'Purchase'
        };
        return mapping[eventName];
    }
    
    // 페이지뷰 추적
    trackPageView(pageName, additionalParams = {}) {
        this.track('page_view', {
            page_name: pageName,
            page_title: document.title,
            page_location: window.location.href,
            ...additionalParams
        });
    }
    
    // 사용자 속성 설정
    setUserProperties(properties) {
        if (typeof gtag !== 'undefined') {
            gtag('set', {'user_properties': properties});
        }
        
        // 로컬 스토리지에도 저장
        localStorage.setItem('user_properties', JSON.stringify(properties));
    }
    
    // 전환 추적
    trackConversion(conversionType, value = 0) {
        this.track(`conversion_${conversionType}`, {
            value: value,
            currency: 'KRW'
        });
        
        // Google Ads 전환 추적
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': `${CONFIG.GA_TRACKING_ID}/${conversionType}`,
                'value': value,
                'currency': 'KRW'
            });
        }
    }
    
    // 퍼널 분석
    trackFunnel(step, stepName) {
        this.track('funnel_step', {
            step: step,
            step_name: stepName,
            funnel_name: 'main_flow'
        });
    }
    
    // 에러 추적
    trackError(error, context = {}) {
        this.track('error_occurred', {
            error_message: error.message || error,
            error_stack: error.stack,
            ...context
        });
    }
    
    // 성능 측정
    trackPerformance() {
        if (!window.performance || !window.performance.timing) return;
        
        const timing = window.performance.timing;
        const metrics = {
            page_load_time: timing.loadEventEnd - timing.navigationStart,
            dom_ready_time: timing.domContentLoadedEventEnd - timing.navigationStart,
            time_to_first_byte: timing.responseStart - timing.navigationStart,
            dns_lookup_time: timing.domainLookupEnd - timing.domainLookupStart,
            tcp_connect_time: timing.connectEnd - timing.connectStart
        };
        
        this.track('performance_metrics', metrics);
    }
    
    // 세션 ID 생성
    generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // 서버로 이벤트 전송 (배치)
    sendToServer(event) {
        // 이벤트를 큐에 추가
        const queue = JSON.parse(localStorage.getItem('event_queue') || '[]');
        queue.push(event);
        localStorage.setItem('event_queue', JSON.stringify(queue));
        
        // 10개 이상 쌓이면 전송
        if (queue.length >= 10) {
            this.flushEvents();
        }
    }
    
    // 이벤트 일괄 전송
    async flushEvents() {
        const queue = JSON.parse(localStorage.getItem('event_queue') || '[]');
        if (queue.length === 0) return;
        
        try {
            // 실제 배포 시 엔드포인트 설정
            const response = await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    events: queue,
                    session_id: this.sessionId
                })
            });
            
            if (response.ok) {
                localStorage.setItem('event_queue', '[]');
            }
        } catch (error) {
            console.error('Failed to send analytics:', error);
        }
    }
    
    // A/B 테스트 변형 가져오기
    getABTestVariant(testName) {
        return this.abTests[testName];
    }
    
    // 광고 추적
    trackAd(adType, action, adUnit) {
        this.track(`ad_${action}`, {
            ad_type: adType,
            ad_unit: adUnit,
            page: window.location.pathname
        });
    }
    
    // 스크롤 깊이 추적
    trackScrollDepth() {
        let maxScroll = 0;
        let scrollPoints = [25, 50, 75, 90, 100];
        let triggered = new Set();
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            
            scrollPoints.forEach(point => {
                if (scrollPercent >= point && !triggered.has(point)) {
                    triggered.add(point);
                    this.track('scroll_depth', {
                        depth: point,
                        page: window.location.pathname
                    });
                }
            });
            
            maxScroll = Math.max(maxScroll, scrollPercent);
        });
        
        // 페이지 떠날 때 최대 스크롤 깊이 기록
        window.addEventListener('beforeunload', () => {
            this.track('max_scroll_depth', {
                depth: maxScroll,
                page: window.location.pathname
            });
        });
    }
    
    // 체류 시간 추적
    trackEngagement() {
        let engagementTime = 0;
        let isEngaged = true;
        
        setInterval(() => {
            if (isEngaged) {
                engagementTime++;
                
                // 30초마다 체류 시간 업데이트
                if (engagementTime % 30 === 0) {
                    this.track('engagement_time', {
                        seconds: engagementTime,
                        minutes: Math.floor(engagementTime / 60)
                    });
                }
            }
        }, 1000);
        
        // 탭 전환 감지
        document.addEventListener('visibilitychange', () => {
            isEngaged = !document.hidden;
        });
        
        // 마우스/키보드 활동 감지
        let inactivityTimer;
        const resetInactivity = () => {
            isEngaged = true;
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                isEngaged = false;
            }, 30000); // 30초 동안 활동 없으면 비활성
        };
        
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetInactivity, true);
        });
    }
}

// 전역 인스턴스 생성
const analytics = new Analytics();

// 페이지 로드 완료 시 성능 측정
window.addEventListener('load', () => {
    analytics.trackPerformance();
    analytics.trackScrollDepth();
    analytics.trackEngagement();
});

// 에러 추적
window.addEventListener('error', (event) => {
    analytics.trackError(event.error, {
        filename: event.filename,
        line: event.lineno,
        column: event.colno
    });
});

// 페이지 떠날 때 이벤트 전송
window.addEventListener('beforeunload', () => {
    analytics.flushEvents();
});