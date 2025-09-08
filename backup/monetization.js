// Monetization Module - 수익화 전략 구현
class MonetizationManager {
    constructor() {
        this.revenueStreams = {
            ads: { enabled: true, revenue: 0 },
            premium: { enabled: true, revenue: 0 },
            affiliate: { enabled: true, revenue: 0 },
            donation: { enabled: true, revenue: 0 }
        };
        
        this.premiumFeatures = {
            detailed_fortune: false,
            monthly_forecast: false,
            compatibility_check: false,
            lucky_dates: false,
            pdf_download: false,
            ad_free: false,
            priority_support: false,
            exclusive_content: false
        };
        
        this.adPlacements = new Map();
        this.conversionFunnels = [];
        this.userSegments = new Map();
        
        this.init();
    }
    
    init() {
        this.setupAdOptimization();
        this.setupPremiumFlow();
        this.setupAffiliateTracking();
        this.setupDonationSystem();
        this.trackRevenue();
        this.optimizeConversion();
    }
    
    // 광고 최적화
    setupAdOptimization() {
        // 광고 배치 전략
        this.adPlacements.set('header_banner', {
            id: 'ad-header',
            type: 'banner',
            size: '320x50',
            provider: 'kakao',
            refresh: 30000, // 30초
            viewability: 0,
            cpm: 0.5
        });
        
        this.adPlacements.set('result_native', {
            id: 'ad-result',
            type: 'native',
            size: 'fluid',
            provider: 'google',
            refresh: 0,
            viewability: 0,
            cpm: 2.0
        });
        
        this.adPlacements.set('interstitial', {
            id: 'ad-interstitial',
            type: 'interstitial',
            size: 'fullscreen',
            provider: 'kakao',
            frequency: 3, // 3회 결과 조회마다
            viewability: 0,
            cpm: 5.0
        });
        
        // 광고 가시성 추적
        this.trackAdViewability();
        
        // 광고 새로고침 관리
        this.manageAdRefresh();
        
        // 광고 차단기 감지
        this.detectAdBlocker();
    }
    
    // 광고 가시성 추적
    trackAdViewability() {
        if (!('IntersectionObserver' in window)) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const adId = entry.target.id;
                const placement = this.getPlacementById(adId);
                
                if (!placement) return;
                
                if (entry.isIntersecting) {
                    placement.viewability = entry.intersectionRatio;
                    
                    // 50% 이상 보이고 1초 이상 노출시 과금
                    if (entry.intersectionRatio > 0.5) {
                        setTimeout(() => {
                            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                                this.recordAdImpression(placement);
                            }
                        }, 1000);
                    }
                }
            });
        }, {
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });
        
        // 모든 광고 요소 관찰
        document.querySelectorAll('.ad-container').forEach(ad => {
            observer.observe(ad);
        });
    }
    
    // 광고 노출 기록
    recordAdImpression(placement) {
        const revenue = placement.cpm / 1000;
        this.revenueStreams.ads.revenue += revenue;
        
        if (window.analytics) {
            window.analytics.track('ad_impression', {
                placement: placement.id,
                provider: placement.provider,
                cpm: placement.cpm,
                revenue: revenue
            });
        }
        
        console.log(`Ad revenue: +${revenue.toFixed(3)} KRW`);
    }
    
    // 광고 새로고침 관리
    manageAdRefresh() {
        this.adPlacements.forEach((placement, key) => {
            if (placement.refresh > 0) {
                setInterval(() => {
                    // 광고가 화면에 보이는 경우에만 새로고침
                    const adElement = document.getElementById(placement.id);
                    if (adElement && this.isElementVisible(adElement)) {
                        this.refreshAd(placement);
                    }
                }, placement.refresh);
            }
        });
    }
    
    // 광고 새로고침
    refreshAd(placement) {
        const adElement = document.getElementById(placement.id);
        if (!adElement) return;
        
        // 카카오 애드핏
        if (placement.provider === 'kakao' && window.kakaoAdFit) {
            window.kakaoAdFit.render();
        }
        
        // 구글 애드센스
        if (placement.provider === 'google' && window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }
    
    // 광고 차단기 감지
    detectAdBlocker() {
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox ad-test';
        testAd.style.cssText = 'width:1px;height:1px;position:absolute;left:-999px;top:-999px;';
        document.body.appendChild(testAd);
        
        setTimeout(() => {
            const adBlocked = testAd.offsetHeight === 0;
            document.body.removeChild(testAd);
            
            if (adBlocked) {
                this.handleAdBlocker();
            }
        }, 100);
    }
    
    // 광고 차단기 대응
    handleAdBlocker() {
        console.log('Ad blocker detected');
        
        // 부드러운 메시지 표시
        const message = document.createElement('div');
        message.className = 'adblock-message';
        message.innerHTML = `
            <div class="adblock-content">
                <h3>🙏 광고가 우리를 운영하게 해줘요</h3>
                <p>무료로 운세를 제공하기 위해 광고 수익이 필요해요.</p>
                <button onclick="monetization.showPremiumOffer()">광고 없는 프리미엄</button>
            </div>
        `;
        
        // 프리미엄 유도
        this.showPremiumOffer();
    }
    
    // 프리미엄 플로우 설정
    setupPremiumFlow() {
        // 프리미엄 트리거 포인트
        this.premiumTriggers = [
            { event: 'result_view', count: 2, delay: 3000 },
            { event: 'share_complete', count: 1, delay: 0 },
            { event: 'scroll_depth', value: 75, delay: 5000 },
            { event: 'time_on_site', value: 120, delay: 0 },
            { event: 'exit_intent', count: 1, delay: 0 }
        ];
        
        // 가격 전략
        this.pricingStrategy = {
            regular: 9900,
            discount: 4900,
            flash: 2900,
            bundle: 7900
        };
        
        // 결제 옵션
        this.paymentMethods = [
            'kakaopay',
            'naverpay', 
            'toss',
            'card',
            'phone'
        ];
        
        this.trackPremiumTriggers();
    }
    
    // 프리미엄 트리거 추적
    trackPremiumTriggers() {
        // 결과 조회 횟수
        let resultViews = 0;
        document.addEventListener('resultView', () => {
            resultViews++;
            const trigger = this.premiumTriggers.find(t => t.event === 'result_view');
            if (resultViews >= trigger.count) {
                setTimeout(() => this.showPremiumOffer('result_trigger'), trigger.delay);
            }
        });
        
        // Exit Intent 감지
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0) {
                this.showPremiumOffer('exit_intent');
            }
        });
        
        // 시간 기반 트리거
        setTimeout(() => {
            this.showPremiumOffer('time_trigger');
        }, 120000); // 2분 후
    }
    
    // 프리미엄 제안 표시
    showPremiumOffer(trigger = 'manual') {
        // A/B 테스트로 최적 오퍼 선택
        const offers = [
            {
                title: '🎊 새해 특가 50% 할인!',
                price: this.pricingStrategy.discount,
                original: this.pricingStrategy.regular,
                urgency: '오늘만 특가!',
                cta: '지금 구매하기'
            },
            {
                title: '⚡ 플래시 세일 70% 할인',
                price: this.pricingStrategy.flash,
                original: this.pricingStrategy.regular,
                urgency: '10분 남음',
                cta: '놓치지 마세요!'
            },
            {
                title: '💎 프리미엄 올인원 패키지',
                price: this.pricingStrategy.bundle,
                original: 19900,
                urgency: '한정 수량',
                cta: '프리미엄 시작하기'
            }
        ];
        
        const selectedOffer = offers[Math.floor(Math.random() * offers.length)];
        
        // 모달 생성
        const modal = document.createElement('div');
        modal.className = 'premium-modal animated';
        modal.innerHTML = `
            <div class="premium-modal-content">
                <button class="close" onclick="monetization.closePremiumOffer()">×</button>
                
                <div class="offer-header">
                    <h2>${selectedOffer.title}</h2>
                    <div class="countdown" id="offerCountdown"></div>
                </div>
                
                <div class="features-grid">
                    <div class="feature">📅 2025년 월별 상세 운세</div>
                    <div class="feature">💑 MBTI 궁합 분석</div>
                    <div class="feature">🍀 매일 행운 알림</div>
                    <div class="feature">📊 인생 그래프 분석</div>
                    <div class="feature">🎯 맞춤 조언</div>
                    <div class="feature">🚫 광고 제거</div>
                </div>
                
                <div class="price-section">
                    <div class="original-price">₩${selectedOffer.original.toLocaleString()}</div>
                    <div class="sale-price">₩${selectedOffer.price.toLocaleString()}</div>
                    <div class="urgency">${selectedOffer.urgency}</div>
                </div>
                
                <button class="purchase-btn" onclick="monetization.startPurchase('${trigger}')">
                    ${selectedOffer.cta}
                </button>
                
                <div class="payment-methods">
                    <img src="kakaopay.png" alt="카카오페이">
                    <img src="naverpay.png" alt="네이버페이">
                    <img src="toss.png" alt="토스">
                </div>
                
                <div class="guarantee">
                    ✅ 100% 환불 보장 · 안전한 결제
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 카운트다운 타이머
        if (selectedOffer.urgency.includes('분')) {
            this.startCountdown('offerCountdown', 600); // 10분
        }
        
        // 이벤트 추적
        if (window.analytics) {
            window.analytics.track('premium_offer_shown', {
                trigger: trigger,
                offer: selectedOffer.title,
                price: selectedOffer.price
            });
        }
    }
    
    // 카운트다운 타이머
    startCountdown(elementId, seconds) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const interval = setInterval(() => {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            element.textContent = `${minutes}:${secs.toString().padStart(2, '0')}`;
            
            seconds--;
            
            if (seconds < 0) {
                clearInterval(interval);
                element.textContent = '종료됨';
            }
        }, 1000);
    }
    
    // 결제 시작
    async startPurchase(trigger) {
        console.log('Starting purchase flow:', trigger);
        
        // 결제 방법 선택 UI
        const paymentModal = document.createElement('div');
        paymentModal.className = 'payment-modal';
        paymentModal.innerHTML = `
            <div class="payment-content">
                <h3>결제 방법 선택</h3>
                <div class="payment-options">
                    ${this.paymentMethods.map(method => `
                        <button class="payment-method" onclick="monetization.processPayment('${method}')">
                            ${this.getPaymentMethodName(method)}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(paymentModal);
        
        // 전환 추적
        if (window.analytics) {
            window.analytics.track('payment_initiated', {
                trigger: trigger,
                price: this.pricingStrategy.discount
            });
        }
    }
    
    // 결제 처리
    async processPayment(method) {
        console.log('Processing payment:', method);
        
        try {
            // 실제 결제 연동 (예시)
            const paymentResult = await this.executePayment(method);
            
            if (paymentResult.success) {
                this.activatePremium();
                this.showSuccessMessage();
                
                // 매출 기록
                this.revenueStreams.premium.revenue += this.pricingStrategy.discount;
                
                // 전환 추적
                if (window.analytics) {
                    window.analytics.trackConversion('premium_purchase', this.pricingStrategy.discount);
                }
            }
        } catch (error) {
            console.error('Payment failed:', error);
            this.showErrorMessage();
        }
    }
    
    // 프리미엄 활성화
    activatePremium() {
        // 모든 프리미엄 기능 활성화
        Object.keys(this.premiumFeatures).forEach(feature => {
            this.premiumFeatures[feature] = true;
        });
        
        // 로컬 스토리지에 저장
        localStorage.setItem('premium_user', 'true');
        localStorage.setItem('premium_activated', Date.now());
        
        // 광고 제거
        document.querySelectorAll('.ad-container').forEach(ad => {
            ad.style.display = 'none';
        });
        
        // UI 업데이트
        document.body.classList.add('premium-user');
    }
    
    // 제휴 마케팅 추적
    setupAffiliateTracking() {
        // 제휴 링크 관리
        this.affiliateLinks = {
            'book_recommendation': {
                url: 'https://example.com/book?ref=mbti2025',
                commission: 0.05,
                category: 'books'
            },
            'personality_test': {
                url: 'https://example.com/test?ref=mbti2025',
                commission: 0.10,
                category: 'tests'
            },
            'dating_app': {
                url: 'https://example.com/dating?ref=mbti2025',
                commission: 0.15,
                category: 'dating'
            }
        };
        
        // 제휴 링크 클릭 추적
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-affiliate]');
            if (link) {
                const affiliateId = link.dataset.affiliate;
                this.trackAffiliateClick(affiliateId);
            }
        });
    }
    
    // 제휴 클릭 추적
    trackAffiliateClick(affiliateId) {
        const affiliate = this.affiliateLinks[affiliateId];
        if (!affiliate) return;
        
        // 예상 수익 계산
        const estimatedRevenue = 1000 * affiliate.commission; // 평균 구매액 가정
        
        if (window.analytics) {
            window.analytics.track('affiliate_click', {
                affiliate_id: affiliateId,
                category: affiliate.category,
                commission_rate: affiliate.commission,
                estimated_revenue: estimatedRevenue
            });
        }
    }
    
    // 후원 시스템 설정
    setupDonationSystem() {
        this.donationTiers = [
            { amount: 1000, title: '☕ 커피 한잔', perks: ['감사 메시지'] },
            { amount: 5000, title: '🍰 케이크 한조각', perks: ['감사 메시지', '후원자 명단'] },
            { amount: 10000, title: '🍕 피자 한판', perks: ['감사 메시지', '후원자 명단', '특별 뱃지'] },
            { amount: 50000, title: '🎁 특별 후원', perks: ['모든 프리미엄 기능', 'VIP 지원'] }
        ];
        
        // Buy Me a Coffee 스타일 위젯
        this.createDonationWidget();
    }
    
    // 후원 위젯 생성
    createDonationWidget() {
        const widget = document.createElement('div');
        widget.className = 'donation-widget';
        widget.innerHTML = `
            <button class="donation-button" onclick="monetization.showDonationModal()">
                ☕ 커피 한잔 사주기
            </button>
        `;
        
        // 결과 페이지에 추가
        const resultScreen = document.getElementById('resultScreen');
        if (resultScreen) {
            resultScreen.appendChild(widget);
        }
    }
    
    // 후원 모달 표시
    showDonationModal() {
        const modal = document.createElement('div');
        modal.className = 'donation-modal';
        modal.innerHTML = `
            <div class="donation-content">
                <h3>💖 개발자를 응원해주세요!</h3>
                <p>여러분의 후원이 더 나은 서비스를 만듭니다</p>
                
                <div class="donation-tiers">
                    ${this.donationTiers.map(tier => `
                        <div class="tier" onclick="monetization.processDonation(${tier.amount})">
                            <div class="tier-title">${tier.title}</div>
                            <div class="tier-amount">₩${tier.amount.toLocaleString()}</div>
                            <ul class="tier-perks">
                                ${tier.perks.map(perk => `<li>${perk}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                
                <button class="close" onclick="this.parentElement.parentElement.remove()">나중에</button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // 매출 추적
    trackRevenue() {
        // 실시간 매출 대시보드 (개발자용)
        if (window.location.hostname === 'localhost') {
            setInterval(() => {
                const totalRevenue = Object.values(this.revenueStreams)
                    .reduce((sum, stream) => sum + stream.revenue, 0);
                
                console.log('💰 Revenue Dashboard:');
                console.log('- Ads:', this.revenueStreams.ads.revenue.toFixed(2), 'KRW');
                console.log('- Premium:', this.revenueStreams.premium.revenue.toFixed(2), 'KRW');
                console.log('- Affiliate:', this.revenueStreams.affiliate.revenue.toFixed(2), 'KRW');
                console.log('- Donation:', this.revenueStreams.donation.revenue.toFixed(2), 'KRW');
                console.log('- Total:', totalRevenue.toFixed(2), 'KRW');
            }, 30000); // 30초마다
        }
    }
    
    // 전환 최적화
    optimizeConversion() {
        // 사용자 세분화
        this.segmentUsers();
        
        // 다이나믹 프라이싱
        this.implementDynamicPricing();
        
        // 이탈 방지
        this.preventChurn();
    }
    
    // 사용자 세분화
    segmentUsers() {
        const userData = {
            visits: parseInt(localStorage.getItem('visit_count') || 0),
            lastVisit: localStorage.getItem('last_visit'),
            mbtiType: localStorage.getItem('mbti_type'),
            premiumViews: parseInt(localStorage.getItem('premium_views') || 0),
            shares: parseInt(localStorage.getItem('share_count') || 0)
        };
        
        // 세그먼트 결정
        let segment = 'new';
        if (userData.visits > 5) segment = 'engaged';
        if (userData.premiumViews > 2) segment = 'interested';
        if (userData.shares > 0) segment = 'evangelist';
        
        this.userSegments.set('current', segment);
        
        // 세그먼트별 전략 적용
        this.applySegmentStrategy(segment);
    }
    
    // 세그먼트별 전략 적용
    applySegmentStrategy(segment) {
        const strategies = {
            'new': {
                premiumDelay: 120000, // 2분
                discount: 0.5,
                adFrequency: 'low'
            },
            'engaged': {
                premiumDelay: 60000, // 1분
                discount: 0.3,
                adFrequency: 'medium'
            },
            'interested': {
                premiumDelay: 0, // 즉시
                discount: 0.4,
                adFrequency: 'low'
            },
            'evangelist': {
                premiumDelay: 180000, // 3분
                discount: 0.6,
                adFrequency: 'minimal'
            }
        };
        
        const strategy = strategies[segment];
        this.currentStrategy = strategy;
    }
    
    // 다이나믹 프라이싱
    implementDynamicPricing() {
        // 시간대별 가격 조정
        const hour = new Date().getHours();
        let priceMultiplier = 1;
        
        if (hour >= 20 && hour <= 23) {
            priceMultiplier = 0.9; // 저녁 할인
        } else if (hour >= 0 && hour <= 6) {
            priceMultiplier = 0.8; // 심야 할인
        }
        
        // 요일별 조정
        const day = new Date().getDay();
        if (day === 0 || day === 6) {
            priceMultiplier *= 0.95; // 주말 할인
        }
        
        // 가격 업데이트
        Object.keys(this.pricingStrategy).forEach(key => {
            this.pricingStrategy[key] = Math.round(this.pricingStrategy[key] * priceMultiplier);
        });
    }
    
    // 이탈 방지
    preventChurn() {
        // 이탈 징후 감지
        let inactivityTimer;
        let lastActivity = Date.now();
        
        const checkInactivity = () => {
            if (Date.now() - lastActivity > 30000) { // 30초 비활동
                this.showRetentionMessage();
            }
        };
        
        ['mousedown', 'touchstart', 'scroll'].forEach(event => {
            document.addEventListener(event, () => {
                lastActivity = Date.now();
                clearTimeout(inactivityTimer);
                inactivityTimer = setTimeout(checkInactivity, 30000);
            });
        });
    }
    
    // 리텐션 메시지
    showRetentionMessage() {
        const messages = [
            '🎁 지금 가입하면 50% 할인!',
            '⏰ 10분 안에 결정하면 추가 할인!',
            '💫 오늘의 특별 운세가 기다리고 있어요!'
        ];
        
        const toast = document.createElement('div');
        toast.className = 'retention-toast';
        toast.textContent = messages[Math.floor(Math.random() * messages.length)];
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 5000);
    }
    
    // 헬퍼 함수들
    getPlacementById(id) {
        for (let [key, placement] of this.adPlacements) {
            if (placement.id === id) return placement;
        }
        return null;
    }
    
    isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
    
    getPaymentMethodName(method) {
        const names = {
            'kakaopay': '카카오페이',
            'naverpay': '네이버페이',
            'toss': '토스',
            'card': '신용/체크카드',
            'phone': '휴대폰 결제'
        };
        return names[method] || method;
    }
    
    async executePayment(method) {
        // 실제 결제 API 연동 부분 (예시)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, transactionId: 'TXN' + Date.now() });
            }, 2000);
        });
    }
    
    showSuccessMessage() {
        alert('🎉 프리미엄 활성화 완료! 모든 기능을 이용하실 수 있습니다.');
    }
    
    showErrorMessage() {
        alert('결제 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
    
    closePremiumOffer() {
        document.querySelector('.premium-modal')?.remove();
    }
}

// 전역 인스턴스
const monetization = new MonetizationManager();
window.monetization = monetization;