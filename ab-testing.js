// A/B 테스트 시스템
const ABTestingSystem = {
    // 테스트 설정
    tests: {
        // 광고 위치 테스트
        adPlacement: {
            enabled: true,
            variants: {
                control: {
                    name: '기본 위치',
                    weight: 0.33,
                    config: {
                        position: 'between-content',
                        frequency: 3
                    }
                },
                topHeavy: {
                    name: '상단 집중',
                    weight: 0.33,
                    config: {
                        position: 'top-focused',
                        frequency: 2
                    }
                },
                floating: {
                    name: '플로팅 광고',
                    weight: 0.34,
                    config: {
                        position: 'floating',
                        frequency: 1
                    }
                }
            }
        },
        
        // CTA 버튼 텍스트 테스트
        ctaText: {
            enabled: true,
            variants: {
                start: {
                    name: '시작하기',
                    weight: 0.25,
                    text: '시작하기'
                },
                fortune: {
                    name: '운세 보기',
                    weight: 0.25,
                    text: '운세 보기'
                },
                destiny: {
                    name: '내 운명 확인',
                    weight: 0.25,
                    text: '내 운명 확인'
                },
                quick: {
                    name: '3분 테스트',
                    weight: 0.25,
                    text: '3분 테스트 시작'
                }
            }
        },
        
        // 프리미엄 팝업 타이밍
        premiumTiming: {
            enabled: true,
            variants: {
                immediate: {
                    name: '즉시',
                    weight: 0.25,
                    delay: 0
                },
                quick: {
                    name: '10초',
                    weight: 0.25,
                    delay: 10000
                },
                medium: {
                    name: '30초',
                    weight: 0.25,
                    delay: 30000
                },
                delayed: {
                    name: '60초',
                    weight: 0.25,
                    delay: 60000
                }
            }
        },
        
        // 색상 테마 테스트
        colorTheme: {
            enabled: true,
            variants: {
                purple: {
                    name: '보라색',
                    weight: 0.25,
                    colors: {
                        primary: '#667eea',
                        secondary: '#764ba2'
                    }
                },
                blue: {
                    name: '파란색',
                    weight: 0.25,
                    colors: {
                        primary: '#4285f4',
                        secondary: '#1a73e8'
                    }
                },
                green: {
                    name: '초록색',
                    weight: 0.25,
                    colors: {
                        primary: '#34a853',
                        secondary: '#0d652d'
                    }
                },
                gradient: {
                    name: '그라디언트',
                    weight: 0.25,
                    colors: {
                        primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                    }
                }
            }
        },
        
        // 콘텐츠 순서 테스트
        contentOrder: {
            enabled: true,
            variants: {
                standard: {
                    name: '표준 순서',
                    weight: 0.5,
                    order: ['test', 'daily', 'compatibility', 'reactions']
                },
                engagement: {
                    name: '참여도 순서',
                    weight: 0.5,
                    order: ['reactions', 'compatibility', 'test', 'daily']
                }
            }
        }
    },
    
    // 사용자 할당 정보
    userAssignments: {},
    
    // 초기화
    init() {
        this.loadUserAssignments();
        this.assignUserToTests();
        this.applyTestVariants();
        this.setupEventTracking();
        this.initializeDashboard();
    },
    
    // 사용자 할당 정보 로드
    loadUserAssignments() {
        const saved = localStorage.getItem('abTestAssignments');
        if (saved) {
            this.userAssignments = JSON.parse(saved);
        }
    },
    
    // 사용자를 테스트에 할당
    assignUserToTests() {
        let userId = localStorage.getItem('abTestUserId');
        if (!userId) {
            userId = this.generateUserId();
            localStorage.setItem('abTestUserId', userId);
        }
        
        Object.keys(this.tests).forEach(testKey => {
            const test = this.tests[testKey];
            if (test.enabled && !this.userAssignments[testKey]) {
                const variant = this.selectVariant(test.variants);
                this.userAssignments[testKey] = {
                    variant: variant,
                    assignedAt: new Date().toISOString(),
                    userId: userId
                };
            }
        });
        
        localStorage.setItem('abTestAssignments', JSON.stringify(this.userAssignments));
    },
    
    // 변형 선택 (가중치 기반)
    selectVariant(variants) {
        const random = Math.random();
        let cumulative = 0;
        
        for (const [key, variant] of Object.entries(variants)) {
            cumulative += variant.weight;
            if (random < cumulative) {
                return key;
            }
        }
        
        return Object.keys(variants)[0];
    },
    
    // 테스트 변형 적용
    applyTestVariants() {
        Object.keys(this.userAssignments).forEach(testKey => {
            const assignment = this.userAssignments[testKey];
            const test = this.tests[testKey];
            
            if (test && test.enabled) {
                const variant = test.variants[assignment.variant];
                this.applyVariant(testKey, variant);
            }
        });
    },
    
    // 개별 변형 적용
    applyVariant(testKey, variant) {
        switch (testKey) {
            case 'adPlacement':
                this.applyAdPlacement(variant);
                break;
            case 'ctaText':
                this.applyCTAText(variant);
                break;
            case 'premiumTiming':
                this.applyPremiumTiming(variant);
                break;
            case 'colorTheme':
                this.applyColorTheme(variant);
                break;
            case 'contentOrder':
                this.applyContentOrder(variant);
                break;
        }
    },
    
    // 광고 위치 적용
    applyAdPlacement(variant) {
        const config = variant.config;
        
        if (config.position === 'floating') {
            // 플로팅 광고 스타일
            const style = `
                <style id="ab-floating-ad">
                    .ad-container {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        z-index: 1000;
                        max-width: 320px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                        border-radius: 10px;
                        background: white;
                    }
                    
                    @media (max-width: 768px) {
                        .ad-container {
                            bottom: 60px;
                            left: 50%;
                            right: auto;
                            transform: translateX(-50%);
                        }
                    }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', style);
        } else if (config.position === 'top-focused') {
            // 상단 집중 배치
            const ads = document.querySelectorAll('.ad-container');
            ads.forEach((ad, index) => {
                if (index > 1) {
                    ad.style.display = 'none';
                }
            });
        }
    },
    
    // CTA 텍스트 적용
    applyCTAText(variant) {
        document.querySelectorAll('.btn-primary, .cta-button').forEach(btn => {
            if (btn.textContent.includes('시작') || btn.textContent.includes('운세') || 
                btn.textContent.includes('테스트') || btn.textContent.includes('운명')) {
                btn.textContent = variant.text;
            }
        });
    },
    
    // 프리미엄 팝업 타이밍 적용
    applyPremiumTiming(variant) {
        if (typeof PremiumSystem !== 'undefined') {
            setTimeout(() => {
                if (!PremiumSystem.checkPremiumStatus() && !sessionStorage.getItem('abTestPremiumShown')) {
                    PremiumSystem.showPremiumModal('ab_test_timing');
                    sessionStorage.setItem('abTestPremiumShown', 'true');
                }
            }, variant.delay);
        }
    },
    
    // 색상 테마 적용
    applyColorTheme(variant) {
        const style = `
            <style id="ab-color-theme">
                :root {
                    --primary-color: ${variant.colors.primary};
                    --secondary-color: ${variant.colors.secondary};
                }
                
                .btn-primary,
                .cta-button {
                    background: var(--primary-color) !important;
                }
                
                .btn-primary:hover,
                .cta-button:hover {
                    background: var(--secondary-color) !important;
                }
                
                body {
                    background: var(--primary-color) !important;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', style);
    },
    
    // 콘텐츠 순서 적용
    applyContentOrder(variant) {
        // 네비게이션 메뉴 순서 재배치
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const items = Array.from(navMenu.children);
            const newOrder = variant.order;
            
            // 순서에 따라 재배치
            newOrder.forEach(contentType => {
                const item = items.find(el => 
                    el.querySelector('a')?.href?.includes(contentType)
                );
                if (item) {
                    navMenu.appendChild(item);
                }
            });
        }
    },
    
    // 이벤트 추적 설정
    setupEventTracking() {
        // 클릭 이벤트 추적
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            // CTA 버튼 클릭
            if (target.matches('.btn-primary, .cta-button')) {
                this.trackEvent('cta_click', {
                    text: target.textContent,
                    variant: this.userAssignments.ctaText?.variant
                });
            }
            
            // 광고 클릭
            if (target.closest('.ad-container')) {
                this.trackEvent('ad_click', {
                    placement: this.userAssignments.adPlacement?.variant
                });
            }
            
            // 프리미엄 버튼 클릭
            if (target.closest('.premium-cta-banner') || target.closest('.select-plan-btn')) {
                this.trackEvent('premium_click', {
                    timing: this.userAssignments.premiumTiming?.variant
                });
            }
        });
        
        // 페이지 체류 시간 추적
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const duration = Date.now() - startTime;
            this.trackEvent('page_duration', {
                duration: duration,
                variants: this.userAssignments
            });
        });
        
        // 스크롤 깊이 추적
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll > 25 && maxScroll <= 30) {
                    this.trackEvent('scroll_25', this.userAssignments);
                } else if (maxScroll > 50 && maxScroll <= 55) {
                    this.trackEvent('scroll_50', this.userAssignments);
                } else if (maxScroll > 75 && maxScroll <= 80) {
                    this.trackEvent('scroll_75', this.userAssignments);
                } else if (maxScroll > 95) {
                    this.trackEvent('scroll_100', this.userAssignments);
                }
            }
        });
    },
    
    // 이벤트 추적
    trackEvent(eventName, eventData) {
        // Google Analytics로 전송
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'AB_Test',
                event_label: JSON.stringify(eventData),
                custom_dimensions: eventData
            });
        }
        
        // 로컬 저장소에 저장
        const events = JSON.parse(localStorage.getItem('abTestEvents') || '[]');
        events.push({
            name: eventName,
            data: eventData,
            timestamp: new Date().toISOString(),
            userId: localStorage.getItem('abTestUserId')
        });
        
        // 최대 1000개 이벤트만 유지
        if (events.length > 1000) {
            events.splice(0, events.length - 1000);
        }
        
        localStorage.setItem('abTestEvents', JSON.stringify(events));
    },
    
    // 사용자 ID 생성
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // A/B 테스트 대시보드 초기화
    initializeDashboard() {
        // 개발자 콘솔 명령어 추가
        window.showABTestDashboard = () => this.showDashboard();
        window.resetABTests = () => this.resetTests();
        window.getABTestResults = () => this.getResults();
        
        console.log('%c🧪 A/B Testing Active', 'color: #667eea; font-size: 14px; font-weight: bold');
        console.log('Commands: showABTestDashboard(), resetABTests(), getABTestResults()');
    },
    
    // 대시보드 표시
    showDashboard() {
        const events = JSON.parse(localStorage.getItem('abTestEvents') || '[]');
        const results = this.calculateResults(events);
        
        const dashboardHTML = `
            <div id="abTestDashboard" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                z-index: 10000;
                max-width: 800px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <h2 style="margin-bottom: 20px; color: #333;">📊 A/B Test Dashboard</h2>
                
                <div style="margin-bottom: 20px;">
                    <h3>Current Assignments:</h3>
                    <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto;">
${JSON.stringify(this.userAssignments, null, 2)}
                    </pre>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3>Test Results:</h3>
                    ${Object.entries(results).map(([testKey, testResults]) => `
                        <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                            <h4 style="color: #667eea; margin-bottom: 10px;">${testKey}</h4>
                            ${Object.entries(testResults).map(([variant, data]) => `
                                <div style="margin-bottom: 8px;">
                                    <strong>${variant}:</strong>
                                    <span>Events: ${data.count}</span>
                                    <span style="margin-left: 15px;">Conv: ${data.conversion.toFixed(2)}%</span>
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="document.getElementById('abTestDashboard').remove()" style="
                        padding: 10px 20px;
                        background: #667eea;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Close</button>
                    <button onclick="ABTestingSystem.exportResults()" style="
                        padding: 10px 20px;
                        background: #28a745;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Export CSV</button>
                    <button onclick="ABTestingSystem.resetTests()" style="
                        padding: 10px 20px;
                        background: #dc3545;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Reset Tests</button>
                </div>
            </div>
        `;
        
        // 기존 대시보드 제거
        const existing = document.getElementById('abTestDashboard');
        if (existing) existing.remove();
        
        // 새 대시보드 추가
        document.body.insertAdjacentHTML('beforeend', dashboardHTML);
    },
    
    // 결과 계산
    calculateResults(events) {
        const results = {};
        
        Object.keys(this.tests).forEach(testKey => {
            results[testKey] = {};
            const test = this.tests[testKey];
            
            Object.keys(test.variants).forEach(variantKey => {
                const variantEvents = events.filter(e => 
                    e.data?.variants?.[testKey]?.variant === variantKey ||
                    e.data?.variant === variantKey
                );
                
                const conversions = variantEvents.filter(e => 
                    e.name === 'premium_click' || 
                    e.name === 'payment_initiated'
                ).length;
                
                results[testKey][variantKey] = {
                    count: variantEvents.length,
                    conversion: variantEvents.length > 0 ? (conversions / variantEvents.length) * 100 : 0
                };
            });
        });
        
        return results;
    },
    
    // 결과 가져오기
    getResults() {
        const events = JSON.parse(localStorage.getItem('abTestEvents') || '[]');
        return this.calculateResults(events);
    },
    
    // 결과 내보내기
    exportResults() {
        const events = JSON.parse(localStorage.getItem('abTestEvents') || '[]');
        const csv = this.convertToCSV(events);
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ab-test-results-${Date.now()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    },
    
    // CSV 변환
    convertToCSV(events) {
        const headers = ['Timestamp', 'Event', 'User ID', 'Data'];
        const rows = events.map(e => [
            e.timestamp,
            e.name,
            e.userId,
            JSON.stringify(e.data)
        ]);
        
        return [headers, ...rows]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');
    },
    
    // 테스트 초기화
    resetTests() {
        if (confirm('정말로 모든 A/B 테스트 데이터를 초기화하시겠습니까?')) {
            localStorage.removeItem('abTestAssignments');
            localStorage.removeItem('abTestEvents');
            localStorage.removeItem('abTestUserId');
            this.userAssignments = {};
            location.reload();
        }
    }
};

// 자동 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ABTestingSystem.init());
} else {
    ABTestingSystem.init();
}

// 전역 접근
window.ABTestingSystem = ABTestingSystem;