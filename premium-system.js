// 프리미엄 시스템 - 실제 수익화 구현

const PremiumSystem = {
    // 가격 플랜
    plans: {
        free: {
            id: 'free',
            name: 'Free',
            price: 0,
            features: {
                basicTest: true,
                dailyFortune: 1,
                simpleResult: true,
                testLimit: 3,
                detailedAnalysis: false,
                unlimitedTests: false,
                relationshipAnalysis: false,
                careerGuidance: false,
                personalGrowthPlan: false,
                adFree: false
            }
        },
        premium: {
            id: 'premium',
            name: 'Premium',
            price: 9900,
            priceDisplay: '₩9,900',
            features: {
                basicTest: true,
                dailyFortune: -1, // unlimited
                simpleResult: true,
                testLimit: -1, // unlimited
                detailedAnalysis: true,
                unlimitedTests: true,
                relationshipAnalysis: true,
                careerGuidance: true,
                personalGrowthPlan: true,
                adFree: true
            },
            benefits: [
                '상세 성격 분석 리포트',
                '무제한 테스트',
                '관계 호환성 분석',
                '맞춤형 커리어 가이드',
                '개인 성장 로드맵',
                '광고 없는 경험',
                '우선 고객 지원'
            ]
        },
        team: {
            id: 'team',
            name: 'Team',
            price: 49900,
            priceDisplay: '₩49,900',
            features: {
                basicTest: true,
                dailyFortune: -1,
                simpleResult: true,
                testLimit: -1,
                detailedAnalysis: true,
                unlimitedTests: true,
                relationshipAnalysis: true,
                careerGuidance: true,
                personalGrowthPlan: true,
                adFree: true,
                teamAnalytics: true,
                apiAccess: true,
                dedicatedSupport: true
            },
            benefits: [
                '모든 Premium 기능',
                '팀 분석 대시보드',
                '팀빌딩 가이드',
                'API 액세스',
                '전담 계정 매니저',
                '맞춤형 워크샵',
                '우선 기능 요청'
            ]
        }
    },

    // 현재 구독 상태
    subscription: {
        status: 'free',
        expiresAt: null,
        autoRenew: false,
        paymentMethod: null
    },

    // 초기화
    init() {
        this.loadSubscription();
        this.setupPaymentHandlers();
        this.checkTrialEligibility();
    },

    // 구독 정보 로드
    loadSubscription() {
        const saved = localStorage.getItem('premiumSubscription');
        if (saved) {
            this.subscription = JSON.parse(saved);
            this.checkExpiration();
        }
    },

    // 만료 체크
    checkExpiration() {
        if (this.subscription.expiresAt) {
            const now = new Date();
            const expires = new Date(this.subscription.expiresAt);
            if (now > expires) {
                this.subscription.status = 'free';
                this.saveSubscription();
            }
        }
    },

    // 구독 저장
    saveSubscription() {
        localStorage.setItem('premiumSubscription', JSON.stringify(this.subscription));
    },

    // 무료 체험 자격 확인
    checkTrialEligibility() {
        const trialUsed = localStorage.getItem('trialUsed');
        if (!trialUsed) {
            return true;
        }
        return false;
    },

    // 무료 체험 시작
    startFreeTrial() {
        if (!this.checkTrialEligibility()) {
            return {
                success: false,
                message: '이미 무료 체험을 사용하셨습니다.'
            };
        }

        const now = new Date();
        const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7일

        this.subscription = {
            status: 'premium_trial',
            expiresAt: expires.toISOString(),
            autoRenew: false,
            paymentMethod: null
        };

        localStorage.setItem('trialUsed', 'true');
        this.saveSubscription();

        return {
            success: true,
            message: '7일 무료 체험이 시작되었습니다!',
            expiresAt: expires
        };
    },

    // 결제 처리
    async processPurchase(planId, paymentMethod) {
        const plan = this.plans[planId];
        if (!plan || plan.price === 0) {
            return {
                success: false,
                message: '유효하지 않은 플랜입니다.'
            };
        }

        // 실제 결제 게이트웨이 연동 (토스페이먼츠, 아임포트 등)
        try {
            const paymentResult = await this.processPaymentGateway({
                amount: plan.price,
                planId: planId,
                method: paymentMethod,
                customerInfo: this.getCustomerInfo()
            });

            if (paymentResult.success) {
                const now = new Date();
                const expires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30일

                this.subscription = {
                    status: planId,
                    expiresAt: expires.toISOString(),
                    autoRenew: true,
                    paymentMethod: paymentMethod,
                    purchasedAt: now.toISOString(),
                    transactionId: paymentResult.transactionId
                };

                this.saveSubscription();
                this.trackPurchase(planId, plan.price);

                return {
                    success: true,
                    message: `${plan.name} 플랜 구독이 완료되었습니다!`,
                    subscription: this.subscription
                };
            }
        } catch (error) {
            console.error('Payment error:', error);
            return {
                success: false,
                message: '결제 처리 중 오류가 발생했습니다.'
            };
        }
    },

    // 결제 게이트웨이 연동 (실제 구현 시 교체 필요)
    async processPaymentGateway(paymentData) {
        // 토스페이먼츠 예시
        if (window.TossPayments) {
            const tossPayments = window.TossPayments('CLIENT_KEY');
            
            return await tossPayments.requestPayment('카드', {
                amount: paymentData.amount,
                orderId: `ORDER_${Date.now()}`,
                orderName: `MBTI Universe ${paymentData.planId}`,
                customerName: paymentData.customerInfo.name,
                successUrl: window.location.origin + '/payment/success',
                failUrl: window.location.origin + '/payment/fail'
            });
        }

        // 개발 환경에서는 모의 결제
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    transactionId: `TXN_${Date.now()}`
                });
            }, 1000);
        });
    },

    // 고객 정보 가져오기
    getCustomerInfo() {
        return {
            name: localStorage.getItem('userName') || 'Guest',
            email: localStorage.getItem('userEmail') || '',
            mbtiType: localStorage.getItem('currentMBTI') || 'UNKNOWN'
        };
    },

    // 구매 추적
    trackPurchase(planId, amount) {
        // Google Analytics
        if (window.gtag) {
            window.gtag('event', 'purchase', {
                transaction_id: this.subscription.transactionId,
                value: amount,
                currency: 'KRW',
                items: [{
                    item_id: planId,
                    item_name: this.plans[planId].name,
                    price: amount,
                    quantity: 1
                }]
            });
        }

        // Facebook Pixel
        if (window.fbq) {
            window.fbq('track', 'Purchase', {
                value: amount,
                currency: 'KRW',
                content_name: planId
            });
        }
    },

    // 기능 접근 권한 확인
    hasAccess(feature) {
        const currentPlan = this.plans[this.subscription.status] || this.plans.free;
        return currentPlan.features[feature] === true || currentPlan.features[feature] === -1;
    },

    // 일일 제한 확인
    checkDailyLimit(feature) {
        const currentPlan = this.plans[this.subscription.status] || this.plans.free;
        const limit = currentPlan.features[feature];
        
        if (limit === -1) return { allowed: true }; // 무제한
        if (limit === false) return { allowed: false, message: '프리미엄 기능입니다.' };
        
        const today = new Date().toDateString();
        const usage = JSON.parse(localStorage.getItem(`usage_${feature}`) || '{}');
        
        if (usage.date !== today) {
            usage.date = today;
            usage.count = 0;
        }
        
        if (usage.count >= limit) {
            return {
                allowed: false,
                message: `일일 제한(${limit}회)을 초과했습니다.`,
                upgradeNeeded: true
            };
        }
        
        usage.count++;
        localStorage.setItem(`usage_${feature}`, JSON.stringify(usage));
        
        return { allowed: true, remaining: limit - usage.count };
    },

    // 결제 핸들러 설정
    setupPaymentHandlers() {
        // 결제 버튼 클릭 처리
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('upgrade-btn')) {
                const planId = e.target.dataset.plan;
                this.showPaymentModal(planId);
            }
        });
    },

    // 결제 모달 표시
    showPaymentModal(planId) {
        const plan = this.plans[planId];
        if (!plan) return;

        const modal = document.createElement('div');
        modal.className = 'payment-modal';
        modal.innerHTML = `
            <div class="payment-modal-content">
                <div class="payment-header">
                    <h2>${plan.name} 플랜 구독</h2>
                    <button class="close-modal" onclick="PremiumSystem.closePaymentModal()">×</button>
                </div>
                <div class="payment-body">
                    <div class="plan-summary">
                        <div class="plan-price">${plan.priceDisplay}/월</div>
                        <ul class="plan-benefits">
                            ${plan.benefits.map(b => `<li>✓ ${b}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="payment-methods">
                        <h3>결제 수단 선택</h3>
                        <button class="payment-method" data-method="card">
                            💳 신용/체크카드
                        </button>
                        <button class="payment-method" data-method="kakao">
                            <img src="kakao-pay.png" alt="카카오페이">
                        </button>
                        <button class="payment-method" data-method="toss">
                            <img src="toss.png" alt="토스">
                        </button>
                        <button class="payment-method" data-method="paypal">
                            PayPal
                        </button>
                    </div>
                    <div class="payment-terms">
                        <label>
                            <input type="checkbox" id="agreeTerms">
                            <span>이용약관 및 정기결제에 동의합니다</span>
                        </label>
                    </div>
                    <button class="confirm-payment" onclick="PremiumSystem.confirmPayment('${planId}')">
                        구독 시작하기
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 결제 수단 선택 이벤트
        modal.querySelectorAll('.payment-method').forEach(btn => {
            btn.addEventListener('click', (e) => {
                modal.querySelectorAll('.payment-method').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                modal.dataset.selectedMethod = btn.dataset.method;
            });
        });
    },

    // 결제 모달 닫기
    closePaymentModal() {
        const modal = document.querySelector('.payment-modal');
        if (modal) {
            modal.remove();
        }
    },

    // 결제 확인
    async confirmPayment(planId) {
        const modal = document.querySelector('.payment-modal');
        const agreeTerms = document.getElementById('agreeTerms').checked;
        const selectedMethod = modal.dataset.selectedMethod;
        
        if (!agreeTerms) {
            alert('이용약관에 동의해주세요.');
            return;
        }
        
        if (!selectedMethod) {
            alert('결제 수단을 선택해주세요.');
            return;
        }
        
        // 로딩 표시
        const confirmBtn = modal.querySelector('.confirm-payment');
        confirmBtn.disabled = true;
        confirmBtn.textContent = '처리 중...';
        
        const result = await this.processPurchase(planId, selectedMethod);
        
        if (result.success) {
            this.closePaymentModal();
            this.showSuccessMessage(result.message);
            // 페이지 새로고침 또는 UI 업데이트
            this.updateUIForPremium();
        } else {
            confirmBtn.disabled = false;
            confirmBtn.textContent = '구독 시작하기';
            alert(result.message);
        }
    },

    // 성공 메시지 표시
    showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.innerHTML = `
            <div class="success-icon">✅</div>
            <div class="success-message">${message}</div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.remove();
        }, 5000);
    },

    // UI 업데이트
    updateUIForPremium() {
        // 광고 제거
        document.querySelectorAll('.ad-container').forEach(ad => ad.remove());
        
        // 프리미엄 배지 추가
        const badge = document.createElement('div');
        badge.className = 'premium-badge';
        badge.innerHTML = '⭐ Premium';
        document.querySelector('.nav-header').appendChild(badge);
        
        // 제한 해제
        document.querySelectorAll('.locked-feature').forEach(feature => {
            feature.classList.remove('locked-feature');
            feature.querySelector('.lock-icon')?.remove();
        });
    },

    // 구독 취소
    async cancelSubscription() {
        if (confirm('정말 구독을 취소하시겠습니까?')) {
            this.subscription.autoRenew = false;
            this.saveSubscription();
            
            // 서버에 취소 요청
            try {
                const response = await fetch('/api/subscription/cancel', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        subscriptionId: this.subscription.transactionId
                    })
                });
                
                if (response.ok) {
                    this.showSuccessMessage('구독이 취소되었습니다. 만료일까지 이용 가능합니다.');
                }
            } catch (error) {
                console.error('Cancellation error:', error);
            }
        }
    },

    // 사용량 통계
    getUsageStats() {
        const stats = {
            testsToday: 0,
            totalTests: 0,
            fortunesViewed: 0,
            reportsGenerated: 0
        };
        
        // localStorage에서 통계 수집
        const today = new Date().toDateString();
        const usage = JSON.parse(localStorage.getItem('usageStats') || '{}');
        
        if (usage.date === today) {
            stats.testsToday = usage.testsToday || 0;
        }
        
        stats.totalTests = parseInt(localStorage.getItem('totalTests') || '0');
        stats.fortunesViewed = parseInt(localStorage.getItem('fortunesViewed') || '0');
        stats.reportsGenerated = parseInt(localStorage.getItem('reportsGenerated') || '0');
        
        return stats;
    }
};

// 페이지 로드 시 초기화
if (typeof window !== 'undefined') {
    window.PremiumSystem = PremiumSystem;
    
    document.addEventListener('DOMContentLoaded', () => {
        PremiumSystem.init();
    });
}

// 프리미엄 기능 게이트
function requirePremium(feature, callback) {
    if (PremiumSystem.hasAccess(feature)) {
        callback();
    } else {
        PremiumSystem.showPaymentModal('premium');
    }
}

// 내보내기
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PremiumSystem;
}