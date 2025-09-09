// 📊 고급 분석 및 성능 모니터링 시스템
const AdvancedAnalytics = {
    // 사용자 행동 추적
    userBehavior: {
        sessionStart: Date.now(),
        interactions: [],
        scrollDepth: 0,
        timeOnPage: 0,
        
        trackInteraction(type, element, details = {}) {
            this.interactions.push({
                type,
                element: element?.tagName || 'unknown',
                timestamp: Date.now() - this.sessionStart,
                details
            });
            
            // 중요한 상호작용 로깅
            if (type === 'mbti_selection' || type === 'premium_click') {
                console.log(`🎯 중요 상호작용: ${type}`, details);
            }
        },
        
        trackScrollDepth() {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > this.scrollDepth) {
                this.scrollDepth = scrollPercent;
                
                // 25%, 50%, 75%, 100% 마일스톤
                if (scrollPercent >= 25 && scrollPercent < 50 && this.scrollDepth < 25) {
                    this.trackInteraction('scroll_25', null, { depth: scrollPercent });
                } else if (scrollPercent >= 50 && scrollPercent < 75 && this.scrollDepth < 50) {
                    this.trackInteraction('scroll_50', null, { depth: scrollPercent });
                } else if (scrollPercent >= 75 && scrollPercent < 100 && this.scrollDepth < 75) {
                    this.trackInteraction('scroll_75', null, { depth: scrollPercent });
                } else if (scrollPercent === 100 && this.scrollDepth < 100) {
                    this.trackInteraction('scroll_100', null, { depth: scrollPercent });
                }
            }
        }
    },
    
    // 성능 메트릭 수집
    performance: {
        metrics: {},
        
        collectWebVitals() {
            // Core Web Vitals 측정
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    switch (entry.entryType) {
                        case 'paint':
                            if (entry.name === 'first-contentful-paint') {
                                this.metrics.fcp = Math.round(entry.startTime);
                            }
                            break;
                        case 'largest-contentful-paint':
                            this.metrics.lcp = Math.round(entry.startTime);
                            break;
                        case 'layout-shift':
                            if (!this.metrics.cls) this.metrics.cls = 0;
                            if (!entry.hadRecentInput) {
                                this.metrics.cls += entry.value;
                            }
                            break;
                    }
                }
            });
            
            try {
                observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
            } catch (e) {
                console.warn('Performance Observer not fully supported');
            }
            
            // First Input Delay (FID)
            const fidObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'first-input') {
                        this.metrics.fid = Math.round(entry.processingStart - entry.startTime);
                    }
                }
            });
            
            try {
                fidObserver.observe({ entryTypes: ['first-input'], buffered: true });
            } catch (e) {
                console.warn('FID measurement not supported');
            }
        },
        
        measureCustomMetrics() {
            // DOM 준비 시간
            if (document.readyState === 'complete') {
                this.metrics.domReady = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
                this.metrics.windowLoad = performance.timing.loadEventEnd - performance.timing.navigationStart;
            }
            
            // 이미지 로딩 성능
            const images = document.querySelectorAll('img');
            let loadedImages = 0;
            const startTime = Date.now();
            
            images.forEach(img => {
                if (img.complete) {
                    loadedImages++;
                } else {
                    img.addEventListener('load', () => {
                        loadedImages++;
                        if (loadedImages === images.length) {
                            this.metrics.allImagesLoaded = Date.now() - startTime;
                        }
                    });
                }
            });
            
            if (loadedImages === images.length) {
                this.metrics.allImagesLoaded = 0; // 이미 모든 이미지 로드됨
            }
        },
        
        generateReport() {
            const report = {
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                connection: navigator.connection ? {
                    effectiveType: navigator.connection.effectiveType,
                    downlink: navigator.connection.downlink
                } : null,
                metrics: this.metrics,
                userBehavior: {
                    timeOnPage: Date.now() - AdvancedAnalytics.userBehavior.sessionStart,
                    interactions: AdvancedAnalytics.userBehavior.interactions.length,
                    scrollDepth: AdvancedAnalytics.userBehavior.scrollDepth
                }
            };
            
            return report;
        }
    },
    
    // 수익 분석
    revenueAnalytics: {
        adViews: 0,
        adClicks: 0,
        premiumViews: 0,
        premiumClicks: 0,
        conversionFunnel: {
            landingPage: 0,
            mbtiTest: 0,
            resultView: 0,
            premiumView: 0,
            premiumPurchase: 0
        },
        
        trackAdPerformance() {
            // 광고 노출 추적
            document.querySelectorAll('.adsbygoogle').forEach(ad => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.adViews++;
                            AdvancedAnalytics.userBehavior.trackInteraction('ad_view', entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(ad);
            });
        },
        
        trackConversionFunnel(step) {
            if (this.conversionFunnel.hasOwnProperty(step)) {
                this.conversionFunnel[step]++;
                AdvancedAnalytics.userBehavior.trackInteraction('funnel_step', null, { step });
            }
        },
        
        calculateROI() {
            const metrics = {
                adRevenue: this.adViews * 0.001, // 예상 RPM
                premiumRevenue: this.conversionFunnel.premiumPurchase * 9900, // 평균 가격
                conversionRate: this.conversionFunnel.premiumPurchase / this.conversionFunnel.landingPage,
                adClickRate: this.adClicks / this.adViews,
                revenuePerUser: (this.adViews * 0.001 + this.conversionFunnel.premiumPurchase * 9900) / this.conversionFunnel.landingPage
            };
            
            return metrics;
        }
    },
    
    // A/B 테스트 분석
    abTestAnalysis: {
        collectResults() {
            const results = {};
            
            // A/B 테스트 결과 수집
            if (window.ABTestingSystem) {
                Object.keys(window.ABTestingSystem.results).forEach(testName => {
                    const test = window.ABTestingSystem.results[testName];
                    results[testName] = {
                        variants: test.variants,
                        totalParticipants: Object.values(test.variants).reduce((sum, variant) => 
                            sum + variant.participants, 0
                        ),
                        conversionRates: {}
                    };
                    
                    // 전환율 계산
                    Object.keys(test.variants).forEach(variant => {
                        const data = test.variants[variant];
                        results[testName].conversionRates[variant] = 
                            data.participants > 0 ? (data.conversions / data.participants) : 0;
                    });
                });
            }
            
            return results;
        },
        
        findWinningVariant(testName) {
            const results = this.collectResults();
            if (!results[testName]) return null;
            
            const test = results[testName];
            let bestVariant = null;
            let bestRate = -1;
            
            Object.keys(test.conversionRates).forEach(variant => {
                if (test.conversionRates[variant] > bestRate) {
                    bestRate = test.conversionRates[variant];
                    bestVariant = variant;
                }
            });
            
            return { variant: bestVariant, conversionRate: bestRate };
        }
    },
    
    // 실시간 대시보드
    dashboard: {
        create() {
            if (document.querySelector('#analytics-dashboard')) return;
            
            const dashboard = document.createElement('div');
            dashboard.id = 'analytics-dashboard';
            dashboard.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                width: 300px;
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 15px;
                border-radius: 10px;
                font-size: 12px;
                z-index: 10000;
                max-height: 400px;
                overflow-y: auto;
                display: none;
            `;
            
            document.body.appendChild(dashboard);
            
            // 토글 버튼
            const toggleButton = document.createElement('button');
            toggleButton.textContent = '📊';
            toggleButton.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: none;
                background: #667eea;
                color: white;
                font-size: 20px;
                cursor: pointer;
                z-index: 10001;
            `;
            
            toggleButton.addEventListener('click', () => {
                dashboard.style.display = dashboard.style.display === 'none' ? 'block' : 'none';
                this.updateDisplay();
            });
            
            document.body.appendChild(toggleButton);
        },
        
        updateDisplay() {
            const dashboard = document.querySelector('#analytics-dashboard');
            if (!dashboard || dashboard.style.display === 'none') return;
            
            const performance = AdvancedAnalytics.performance.generateReport();
            const revenue = AdvancedAnalytics.revenueAnalytics.calculateROI();
            
            dashboard.innerHTML = `
                <h3>📊 실시간 분석</h3>
                
                <h4>🚀 성능</h4>
                <div>FCP: ${performance.metrics.fcp || 'N/A'}ms</div>
                <div>LCP: ${performance.metrics.lcp || 'N/A'}ms</div>
                <div>CLS: ${performance.metrics.cls ? performance.metrics.cls.toFixed(3) : 'N/A'}</div>
                
                <h4>👤 사용자 행동</h4>
                <div>페이지 시간: ${Math.round(performance.userBehavior.timeOnPage / 1000)}초</div>
                <div>상호작용: ${performance.userBehavior.interactions}회</div>
                <div>스크롤 깊이: ${performance.userBehavior.scrollDepth}%</div>
                
                <h4>💰 수익</h4>
                <div>광고 노출: ${AdvancedAnalytics.revenueAnalytics.adViews}회</div>
                <div>전환율: ${(revenue.conversionRate * 100).toFixed(2)}%</div>
                <div>사용자당 수익: ₩${revenue.revenuePerUser.toFixed(0)}</div>
                
                <button onclick="AdvancedAnalytics.exportData()" style="margin-top: 10px; padding: 5px 10px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    📄 데이터 내보내기
                </button>
            `;
        }
    },
    
    // 데이터 내보내기
    exportData() {
        const fullReport = {
            performance: this.performance.generateReport(),
            revenue: this.revenueAnalytics.calculateROI(),
            abTests: this.abTestAnalysis.collectResults(),
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(fullReport, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `mbti-analytics-${Date.now()}.json`;
        link.click();
        
        console.log('📊 분석 데이터 내보내기 완료');
    },
    
    // 초기화
    init() {
        console.log('📊 고급 분석 시스템 시작');
        
        // 기본 추적 설정
        this.userBehavior.trackInteraction('page_load', document.body, {
            url: window.location.href,
            referrer: document.referrer
        });
        
        // 방문자 추적
        this.revenueAnalytics.trackConversionFunnel('landingPage');
        
        // 성능 모니터링 시작
        this.performance.collectWebVitals();
        this.performance.measureCustomMetrics();
        
        // 수익 추적 시작
        this.revenueAnalytics.trackAdPerformance();
        
        // 대시보드 생성 (개발 모드에서만)
        if (localStorage.getItem('showAnalytics') === 'true') {
            this.dashboard.create();
            
            // 주기적 업데이트
            setInterval(() => {
                this.dashboard.updateDisplay();
            }, 5000);
        }
        
        // 이벤트 리스너 등록
        this.setupEventListeners();
        
        // 페이지 이탈 시 데이터 전송
        window.addEventListener('beforeunload', () => {
            this.sendAnalyticsData();
        });
    },
    
    // 이벤트 리스너 설정
    setupEventListeners() {
        // 스크롤 추적
        const scrollHandler = this.performance.throttle(() => {
            this.userBehavior.trackScrollDepth();
        }, 1000);
        window.addEventListener('scroll', scrollHandler, { passive: true });
        
        // 클릭 추적
        document.addEventListener('click', (e) => {
            const element = e.target;
            
            // MBTI 선택 추적
            if (element.classList.contains('mbti-btn')) {
                this.userBehavior.trackInteraction('mbti_selection', element, {
                    mbtiType: element.dataset.mbti
                });
                this.revenueAnalytics.trackConversionFunnel('mbtiTest');
            }
            
            // 프리미엄 클릭 추적
            if (element.classList.contains('premium-btn') || element.textContent.includes('프리미엄')) {
                this.userBehavior.trackInteraction('premium_click', element);
                this.revenueAnalytics.trackConversionFunnel('premiumView');
                this.revenueAnalytics.premiumClicks++;
            }
            
            // 광고 클릭 추적
            if (element.closest('.adsbygoogle')) {
                this.revenueAnalytics.adClicks++;
                this.userBehavior.trackInteraction('ad_click', element);
            }
        });
        
        // 결과 화면 표시 추적
        const resultObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node.classList && node.classList.contains('result')) {
                            this.revenueAnalytics.trackConversionFunnel('resultView');
                        }
                    });
                }
            });
        });
        
        resultObserver.observe(document.body, { childList: true, subtree: true });
    },
    
    // 분석 데이터 전송 (실제 서비스에서는 서버로)
    sendAnalyticsData() {
        const data = this.performance.generateReport();
        
        // 로컬 스토리지에 저장
        const existingData = JSON.parse(localStorage.getItem('analyticsData') || '[]');
        existingData.push(data);
        
        // 최대 100개 세션만 유지
        if (existingData.length > 100) {
            existingData.splice(0, existingData.length - 100);
        }
        
        localStorage.setItem('analyticsData', JSON.stringify(existingData));
        
        console.log('📊 분석 데이터 저장 완료');
    },
    
    // 성능 최적화 도우미
    optimizationSuggestions() {
        const metrics = this.performance.metrics;
        const suggestions = [];
        
        if (metrics.lcp > 2500) {
            suggestions.push('LCP가 느림: 주요 이미지 최적화 필요');
        }
        
        if (metrics.fcp > 1800) {
            suggestions.push('FCP가 느림: CSS 및 JS 최적화 필요');
        }
        
        if (metrics.cls > 0.1) {
            suggestions.push('레이아웃 시프트 발생: 이미지 크기 고정 필요');
        }
        
        if (this.userBehavior.scrollDepth < 50) {
            suggestions.push('스크롤 깊이 낮음: 콘텐츠 개선 필요');
        }
        
        return suggestions;
    }
};

// 자동 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AdvancedAnalytics.init());
} else {
    AdvancedAnalytics.init();
}

// 개발자 도구에서 분석 대시보드 활성화
// localStorage.setItem('showAnalytics', 'true'); 를 콘솔에서 실행

// 전역 접근
window.AdvancedAnalytics = AdvancedAnalytics;