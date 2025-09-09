// 프리미엄 구독 시스템
const PremiumSystem = {
    // 프리미엄 플랜 설정
    plans: {
        basic: {
            name: '베이직',
            price: 4900,
            originalPrice: 9900,
            duration: 30,
            features: [
                '🔮 2025년 월별 상세 운세',
                '💕 MBTI 궁합 무제한 분석',
                '📊 일일 운세 알림',
                '🎯 맞춤형 행운 아이템',
                '📄 PDF 다운로드'
            ],
            popular: false
        },
        premium: {
            name: '프리미엄',
            price: 9900,
            originalPrice: 19900,
            duration: 90,
            features: [
                '✨ 베이직 플랜 모든 기능',
                '💼 직업/연봉 상세 컨설팅',
                '💰 투자 포트폴리오 분석',
                '✈️ 맞춤 여행 일정 생성',
                '🎓 1:1 MBTI 상담 (월 1회)',
                '🚫 모든 광고 제거'
            ],
            popular: true
        },
        vip: {
            name: 'VIP',
            price: 19900,
            originalPrice: 49900,
            duration: 365,
            features: [
                '👑 프리미엄 플랜 모든 기능',
                '🌟 평생 업데이트',
                '📱 우선 고객 지원',
                '💎 VIP 전용 콘텐츠',
                '🎁 친구 초대 혜택',
                '📈 비즈니스 MBTI 분석'
            ],
            popular: false
        }
    },
    
    // 결제 수단
    paymentMethods: {
        card: { name: '신용/체크카드', icon: '💳' },
        kakao: { name: '카카오페이', icon: '🟡' },
        naver: { name: '네이버페이', icon: '🟢' },
        toss: { name: '토스', icon: '💙' },
        paypal: { name: 'PayPal', icon: '🔵' }
    },
    
    // 초기화
    init() {
        this.checkPremiumStatus();
        this.setupEventListeners();
        this.injectPremiumButtons();
        // 이벤트 추적 메서드가 정의되어 있을 때만 호출
        if (typeof this.trackPremiumEvents === 'function') {
            this.trackPremiumEvents();
        }
    },
    
    // 프리미엄 이벤트 추적 메서드 추가
    trackPremiumEvents() {
        // 프리미엄 관련 이벤트 추적
        console.log('프리미엄 시스템 이벤트 추적 시작');
    },
    
    // 프리미엄 상태 확인
    checkPremiumStatus() {
        const premiumData = localStorage.getItem('premiumStatus');
        if (premiumData) {
            const status = JSON.parse(premiumData);
            const expiryDate = new Date(status.expiryDate);
            const now = new Date();
            
            if (expiryDate > now) {
                this.activatePremiumFeatures(status.plan);
                return true;
            } else {
                this.deactivatePremiumFeatures();
                localStorage.removeItem('premiumStatus');
            }
        }
        return false;
    },
    
    // 프리미엄 모달 표시
    showPremiumModal(trigger = 'manual') {
        const modalHTML = `
            <div id="premiumModal" class="premium-modal">
                <div class="premium-modal-content">
                    <button class="modal-close" onclick="PremiumSystem.closeModal()">&times;</button>
                    
                    <div class="premium-header">
                        <h2>🌟 프리미엄으로 업그레이드</h2>
                        <p>모든 MBTI 콘텐츠를 무제한으로 즐기세요!</p>
                        <div class="limited-offer">
                            <span class="offer-badge">⏰ 한정 특가</span>
                            <span class="offer-timer" id="offerTimer">23:59:59</span>
                        </div>
                    </div>
                    
                    <div class="plans-container">
                        ${Object.entries(this.plans).map(([key, plan]) => `
                            <div class="plan-card ${plan.popular ? 'popular' : ''}" data-plan="${key}">
                                ${plan.popular ? '<div class="popular-badge">🔥 인기</div>' : ''}
                                <h3>${plan.name}</h3>
                                <div class="price-section">
                                    <span class="original-price">₩${plan.originalPrice.toLocaleString()}</span>
                                    <span class="current-price">₩${plan.price.toLocaleString()}</span>
                                    <span class="duration">/${plan.duration}일</span>
                                </div>
                                <ul class="features-list">
                                    ${plan.features.map(feature => `
                                        <li>${feature}</li>
                                    `).join('')}
                                </ul>
                                <button class="select-plan-btn" onclick="PremiumSystem.selectPlan('${key}')">
                                    선택하기
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="payment-section" id="paymentSection" style="display: none;">
                        <h3>결제 수단 선택</h3>
                        <div class="payment-methods">
                            ${Object.entries(this.paymentMethods).map(([key, method]) => `
                                <button class="payment-method" data-method="${key}">
                                    <span class="method-icon">${method.icon}</span>
                                    <span class="method-name">${method.name}</span>
                                </button>
                            `).join('')}
                        </div>
                        <div class="terms-agreement">
                            <label>
                                <input type="checkbox" id="termsCheck">
                                <span>이용약관 및 결제 정보 처리 방침에 동의합니다</span>
                            </label>
                        </div>
                        <button class="payment-btn" onclick="PremiumSystem.processPayment()">
                            결제하기
                        </button>
                    </div>
                    
                    <div class="guarantee-section">
                        <p>💯 30일 100% 환불 보장</p>
                        <p>🔒 안전한 결제 시스템</p>
                        <p>📱 모든 기기에서 이용 가능</p>
                    </div>
                </div>
            </div>
        `;
        
        // 스타일 추가
        if (!document.getElementById('premium-styles')) {
            const styles = `
                <style id="premium-styles">
                    .premium-modal {
                        display: none;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.8);
                        z-index: 10000;
                        overflow-y: auto;
                        animation: fadeIn 0.3s;
                    }
                    
                    .premium-modal.active {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .premium-modal-content {
                        background: white;
                        border-radius: 20px;
                        padding: 40px;
                        max-width: 1200px;
                        width: 90%;
                        max-height: 90vh;
                        overflow-y: auto;
                        position: relative;
                        animation: slideUp 0.3s;
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    @keyframes slideUp {
                        from { transform: translateY(50px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    
                    .modal-close {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        font-size: 2em;
                        background: none;
                        border: none;
                        cursor: pointer;
                        color: #999;
                        transition: color 0.3s;
                    }
                    
                    .modal-close:hover {
                        color: #333;
                    }
                    
                    .premium-header {
                        text-align: center;
                        margin-bottom: 40px;
                    }
                    
                    .premium-header h2 {
                        font-size: 2.5em;
                        font-weight: 900;
                        color: #333;
                        margin-bottom: 10px;
                    }
                    
                    .premium-header p {
                        font-size: 1.2em;
                        color: #666;
                    }
                    
                    .limited-offer {
                        display: inline-flex;
                        align-items: center;
                        gap: 15px;
                        margin-top: 20px;
                        padding: 10px 20px;
                        background: linear-gradient(135deg, #ff6b6b, #ff8787);
                        color: white;
                        border-radius: 30px;
                    }
                    
                    .offer-badge {
                        font-weight: 700;
                    }
                    
                    .offer-timer {
                        font-family: monospace;
                        font-size: 1.2em;
                        font-weight: 700;
                    }
                    
                    .plans-container {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 30px;
                        margin-bottom: 40px;
                    }
                    
                    .plan-card {
                        background: #f8f9fa;
                        border-radius: 15px;
                        padding: 30px;
                        position: relative;
                        transition: all 0.3s;
                        border: 2px solid transparent;
                    }
                    
                    .plan-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                    }
                    
                    .plan-card.popular {
                        border-color: #667eea;
                        transform: scale(1.05);
                    }
                    
                    .popular-badge {
                        position: absolute;
                        top: -15px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        padding: 5px 20px;
                        border-radius: 20px;
                        font-weight: 700;
                    }
                    
                    .plan-card h3 {
                        font-size: 1.5em;
                        font-weight: 700;
                        color: #333;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    
                    .price-section {
                        text-align: center;
                        margin-bottom: 25px;
                    }
                    
                    .original-price {
                        text-decoration: line-through;
                        color: #999;
                        font-size: 1em;
                        display: block;
                    }
                    
                    .current-price {
                        font-size: 2em;
                        font-weight: 900;
                        color: #667eea;
                    }
                    
                    .duration {
                        color: #666;
                        font-size: 0.9em;
                    }
                    
                    .features-list {
                        list-style: none;
                        margin-bottom: 25px;
                    }
                    
                    .features-list li {
                        padding: 10px 0;
                        border-bottom: 1px solid #e0e0e0;
                    }
                    
                    .select-plan-btn {
                        width: 100%;
                        padding: 15px;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        border: none;
                        border-radius: 10px;
                        font-size: 1.1em;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    
                    .select-plan-btn:hover {
                        transform: scale(1.05);
                        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
                    }
                    
                    .payment-section {
                        background: #f8f9fa;
                        border-radius: 15px;
                        padding: 30px;
                        margin-bottom: 30px;
                    }
                    
                    .payment-section h3 {
                        font-size: 1.3em;
                        font-weight: 700;
                        color: #333;
                        margin-bottom: 20px;
                    }
                    
                    .payment-methods {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                        gap: 15px;
                        margin-bottom: 25px;
                    }
                    
                    .payment-method {
                        padding: 15px;
                        background: white;
                        border: 2px solid #e0e0e0;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: all 0.3s;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 8px;
                    }
                    
                    .payment-method:hover {
                        border-color: #667eea;
                        transform: translateY(-3px);
                    }
                    
                    .payment-method.selected {
                        border-color: #667eea;
                        background: #f0f4ff;
                    }
                    
                    .method-icon {
                        font-size: 2em;
                    }
                    
                    .method-name {
                        font-weight: 600;
                        color: #333;
                    }
                    
                    .terms-agreement {
                        margin-bottom: 20px;
                    }
                    
                    .terms-agreement label {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        cursor: pointer;
                    }
                    
                    .payment-btn {
                        width: 100%;
                        padding: 18px;
                        background: linear-gradient(135deg, #28a745, #20c997);
                        color: white;
                        border: none;
                        border-radius: 10px;
                        font-size: 1.2em;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    
                    .payment-btn:hover {
                        transform: scale(1.02);
                        box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
                    }
                    
                    .payment-btn:disabled {
                        background: #ccc;
                        cursor: not-allowed;
                    }
                    
                    .guarantee-section {
                        display: flex;
                        justify-content: center;
                        gap: 30px;
                        flex-wrap: wrap;
                        color: #666;
                        font-size: 0.95em;
                    }
                    
                    .premium-cta-banner {
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        padding: 20px;
                        border-radius: 15px;
                        text-align: center;
                        margin: 30px 0;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    
                    .premium-cta-banner:hover {
                        transform: scale(1.02);
                        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
                    }
                    
                    @media (max-width: 768px) {
                        .premium-modal-content {
                            padding: 20px;
                            width: 95%;
                        }
                        
                        .plans-container {
                            grid-template-columns: 1fr;
                        }
                        
                        .plan-card.popular {
                            transform: scale(1);
                        }
                        
                        .payment-methods {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        
                        .guarantee-section {
                            flex-direction: column;
                            gap: 10px;
                        }
                    }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', styles);
        }
        
        // 모달 추가
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // 모달 표시
        setTimeout(() => {
            document.getElementById('premiumModal').classList.add('active');
            this.startCountdown();
        }, 100);
        
        // 트리거 이벤트 추적
        this.trackEvent('premium_modal_shown', { trigger });
    },
    
    // 카운트다운 타이머
    startCountdown() {
        const endTime = new Date();
        endTime.setHours(23, 59, 59);
        
        const updateTimer = () => {
            const now = new Date();
            const diff = endTime - now;
            
            if (diff > 0) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                const timerElement = document.getElementById('offerTimer');
                if (timerElement) {
                    timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                }
            }
        };
        
        updateTimer();
        this.timerInterval = setInterval(updateTimer, 1000);
    },
    
    // 플랜 선택
    selectPlan(planKey) {
        this.selectedPlan = planKey;
        
        // 플랜 카드 하이라이트
        document.querySelectorAll('.plan-card').forEach(card => {
            card.classList.remove('selected');
            if (card.dataset.plan === planKey) {
                card.classList.add('selected');
            }
        });
        
        // 결제 섹션 표시
        document.getElementById('paymentSection').style.display = 'block';
        document.getElementById('paymentSection').scrollIntoView({ behavior: 'smooth' });
        
        // 이벤트 추적
        this.trackEvent('plan_selected', { plan: planKey });
    },
    
    // 결제 처리
    processPayment() {
        const termsChecked = document.getElementById('termsCheck').checked;
        const selectedMethod = document.querySelector('.payment-method.selected');
        
        if (!termsChecked) {
            alert('이용약관에 동의해주세요.');
            return;
        }
        
        if (!selectedMethod) {
            alert('결제 수단을 선택해주세요.');
            return;
        }
        
        // 결제 처리 시뮬레이션
        const plan = this.plans[this.selectedPlan];
        const paymentData = {
            plan: this.selectedPlan,
            price: plan.price,
            duration: plan.duration,
            method: selectedMethod.dataset.method,
            timestamp: new Date().toISOString()
        };
        
        // 로딩 표시
        const payBtn = document.querySelector('.payment-btn');
        payBtn.textContent = '처리 중...';
        payBtn.disabled = true;
        
        // 시뮬레이션: 2초 후 성공
        setTimeout(() => {
            this.activatePremium(paymentData);
            this.closeModal();
            this.showSuccessMessage();
        }, 2000);
        
        // 이벤트 추적
        this.trackEvent('payment_initiated', paymentData);
    },
    
    // 프리미엄 활성화
    activatePremium(paymentData) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + paymentData.duration);
        
        const premiumStatus = {
            active: true,
            plan: paymentData.plan,
            startDate: new Date().toISOString(),
            expiryDate: expiryDate.toISOString(),
            paymentMethod: paymentData.method,
            price: paymentData.price
        };
        
        localStorage.setItem('premiumStatus', JSON.stringify(premiumStatus));
        this.activatePremiumFeatures(paymentData.plan);
        
        // 이벤트 추적
        this.trackEvent('premium_activated', premiumStatus);
    },
    
    // 프리미엄 기능 활성화
    activatePremiumFeatures(plan) {
        // 광고 제거
        document.querySelectorAll('.ad-container, .kakao_ad_area').forEach(ad => {
            ad.style.display = 'none';
        });
        
        // 프리미엄 배지 추가
        const badge = `<span class="premium-badge" style="
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #333;
            padding: 5px 10px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 0.9em;
            margin-left: 10px;
        ">👑 프리미엄</span>`;
        
        const userDisplay = document.getElementById('userMBTIDisplay');
        if (userDisplay && !userDisplay.querySelector('.premium-badge')) {
            userDisplay.insertAdjacentHTML('beforeend', badge);
        }
        
        // 프리미엄 콘텐츠 잠금 해제
        document.querySelectorAll('.premium-locked').forEach(el => {
            el.classList.remove('premium-locked');
        });
    },
    
    // 프리미엄 기능 비활성화
    deactivatePremiumFeatures() {
        // 광고 복원
        document.querySelectorAll('.ad-container, .kakao_ad_area').forEach(ad => {
            ad.style.display = '';
        });
        
        // 프리미엄 배지 제거
        document.querySelectorAll('.premium-badge').forEach(badge => {
            badge.remove();
        });
    },
    
    // 성공 메시지 표시
    showSuccessMessage() {
        const successHTML = `
            <div class="premium-success" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                z-index: 10001;
                text-align: center;
                animation: bounceIn 0.5s;
            ">
                <div style="font-size: 4em; margin-bottom: 20px;">🎉</div>
                <h2 style="font-size: 1.8em; font-weight: 900; color: #333; margin-bottom: 10px;">
                    프리미엄 활성화 완료!
                </h2>
                <p style="color: #666; margin-bottom: 20px;">
                    이제 모든 프리미엄 기능을 이용하실 수 있습니다.
                </p>
                <button onclick="this.parentElement.remove()" style="
                    padding: 12px 30px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    border-radius: 25px;
                    font-weight: 700;
                    cursor: pointer;
                ">확인</button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', successHTML);
        
        setTimeout(() => {
            document.querySelector('.premium-success')?.remove();
        }, 5000);
    },
    
    // 모달 닫기
    closeModal() {
        const modal = document.getElementById('premiumModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    },
    
    // 프리미엄 버튼 주입
    injectPremiumButtons() {
        // 각 페이지에 프리미엄 CTA 추가
        const ctaHTML = `
            <div class="premium-cta-banner" onclick="PremiumSystem.showPremiumModal('cta_banner')">
                <h3>🌟 프리미엄으로 더 많은 기능을 즐기세요!</h3>
                <p>광고 제거 + 무제한 분석 + 맞춤 컨설팅</p>
                <span style="
                    display: inline-block;
                    margin-top: 10px;
                    padding: 8px 20px;
                    background: white;
                    color: #667eea;
                    border-radius: 20px;
                    font-weight: 700;
                ">지금 업그레이드 →</span>
            </div>
        `;
        
        // 적절한 위치에 CTA 삽입
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            if (!container.querySelector('.premium-cta-banner')) {
                const targetElement = container.querySelector('.share-section') || 
                                    container.querySelector('h2') || 
                                    container.lastElementChild;
                if (targetElement) {
                    targetElement.insertAdjacentHTML('afterend', ctaHTML);
                }
            }
        });
    },
    
    // 이벤트 리스너 설정
    setupEventListeners() {
        // 결제 수단 선택
        document.addEventListener('click', (e) => {
            if (e.target.closest('.payment-method')) {
                document.querySelectorAll('.payment-method').forEach(m => {
                    m.classList.remove('selected');
                });
                e.target.closest('.payment-method').classList.add('selected');
            }
        });
        
        // ESC 키로 모달 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('premiumModal')) {
                this.closeModal();
            }
        });
        
        // 모달 외부 클릭 시 닫기
        document.addEventListener('click', (e) => {
            if (e.target.id === 'premiumModal') {
                this.closeModal();
            }
        });
    },
    
    // 이벤트 추적
    trackEvent(eventName, eventData) {
        // Google Analytics 이벤트
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'Premium',
                event_label: JSON.stringify(eventData),
                value: eventData.price || 0
            });
        }
        
        // 로컬 저장
        const events = JSON.parse(localStorage.getItem('premiumEvents') || '[]');
        events.push({
            name: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('premiumEvents', JSON.stringify(events));
    },
    
    // 자동 팝업 트리거
    setupAutoTriggers() {
        // 페이지 체류 시간 기반
        setTimeout(() => {
            if (!this.checkPremiumStatus() && !sessionStorage.getItem('premiumModalShown')) {
                this.showPremiumModal('time_trigger');
                sessionStorage.setItem('premiumModalShown', 'true');
            }
        }, 30000); // 30초 후
        
        // 스크롤 기반
        let scrollTriggered = false;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 70 && !scrollTriggered && !this.checkPremiumStatus()) {
                scrollTriggered = true;
                if (!sessionStorage.getItem('premiumModalShown')) {
                    this.showPremiumModal('scroll_trigger');
                    sessionStorage.setItem('premiumModalShown', 'true');
                }
            }
        });
        
        // 이탈 의도 감지
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !this.checkPremiumStatus() && !sessionStorage.getItem('exitIntentShown')) {
                this.showPremiumModal('exit_intent');
                sessionStorage.setItem('exitIntentShown', 'true');
            }
        });
    }
};

// 자동 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        PremiumSystem.init();
        PremiumSystem.setupAutoTriggers();
    });
} else {
    PremiumSystem.init();
    PremiumSystem.setupAutoTriggers();
}

// 전역 접근 가능하도록 설정
window.PremiumSystem = PremiumSystem;