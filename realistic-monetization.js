// 현실적인 수익화 전략 - 광고 중심 + 일회성 결제

const RealisticMonetization = {
    
    // 1. 광고 수익 극대화 전략
    adStrategy: {
        // 전면 광고 (인터스티셜)
        showInterstitialAd() {
            // 테스트 완료 후 결과 보기 전 전면 광고
            // 가장 효과적인 수익 포인트
            if (typeof adsbygoogle !== 'undefined') {
                // 전면 광고 표시
                return true;
            }
            return false;
        },
        
        // 보상형 광고
        showRewardedAd(callback) {
            // "광고 보고 추가 기능 잠금 해제"
            // 예: 오늘의 상세 운세, 추가 테스트 기회
            const modal = `
                <div class="reward-ad-modal">
                    <h3>추가 콘텐츠 잠금 해제</h3>
                    <p>짧은 광고를 시청하고 오늘의 상세 운세를 확인하세요!</p>
                    <button onclick="watchAd()">광고 보기 (15초)</button>
                </div>
            `;
            // 광고 시청 후 callback 실행
        },
        
        // 네이티브 광고
        injectNativeAds() {
            // 콘텐츠 사이사이에 자연스럽게 삽입
            // 결과 카드들 사이, 피드 형태로
        }
    },
    
    // 2. 일회성 결제 상품 (충동구매 유도)
    oneTimeProducts: {
        // 2025년 전체 운세 (₩3,900)
        yearlyFortune: {
            price: 3900,
            title: "2025년 나의 MBTI 운세 리포트",
            description: "365일 전체 운세 + 월별 가이드",
            trigger: "결과 화면에서 '2025년 전체 운세 보기' 버튼"
        },
        
        // MBTI 궁합 분석 (₩1,900)
        compatibility: {
            price: 1900,
            title: "MBTI 궁합 완벽 분석",
            description: "좋아하는 사람과의 궁합 상세 분석",
            trigger: "결과 화면에서 '궁합 보기' 클릭"
        },
        
        // PDF 리포트 (₩2,900)
        pdfReport: {
            price: 2900,
            title: "나만의 MBTI 분석서 PDF",
            description: "30페이지 상세 분석 리포트",
            trigger: "이메일로 PDF 받기"
        },
        
        // 광고 제거 (₩990)
        removeAds24h: {
            price: 990,
            title: "24시간 광고 제거",
            description: "하루 동안 깔끔한 경험",
            trigger: "광고가 거슬릴 때"
        }
    },
    
    // 3. 카카오톡 공유 수익
    kakaoShare: {
        // 공유 시 리워드 포인트 지급
        shareReward: 100,
        
        // 친구 초대 보너스
        inviteBonus: 500,
        
        // 포인트로 구매 가능한 아이템
        pointShop: {
            100: "오늘의 행운 아이템",
            300: "이번 주 상세 운세",
            500: "광고 1일 제거권",
            1000: "프리미엄 테스트 1회"
        }
    },
    
    // 4. 제휴 마케팅
    affiliateMarketing: {
        // MBTI 관련 상품 추천
        products: [
            {
                type: "INTJ",
                amazon: "전략 보드게임",
                coupang: "독서대, 플래너"
            },
            {
                type: "ENFP",
                amazon: "DIY 키트",
                coupang: "여행 용품"
            }
        ],
        
        // 커미션 수익
        commission: "구매 금액의 3-5%"
    },
    
    // 5. 실제 구현 코드
    implementation: {
        // 페이지뷰 기반 수익 계산
        calculateRevenue() {
            const dailyUsers = 10000;
            const adsPerUser = 3;
            const cpm = 500; // ₩500 per 1000 impressions (한국 평균)
            const clickRate = 0.02;
            const cpc = 100; // ₩100 per click
            
            const dailyAdRevenue = (dailyUsers * adsPerUser * cpm / 1000) + 
                                   (dailyUsers * adsPerUser * clickRate * cpc);
            
            const conversionRate = 0.005; // 0.5% 구매 전환
            const avgPurchase = 2900;
            const dailyPurchaseRevenue = dailyUsers * conversionRate * avgPurchase;
            
            return {
                daily: dailyAdRevenue + dailyPurchaseRevenue,
                monthly: (dailyAdRevenue + dailyPurchaseRevenue) * 30,
                breakdown: {
                    ads: dailyAdRevenue * 30,
                    purchases: dailyPurchaseRevenue * 30
                }
            };
        },
        
        // 광고 타이밍 최적화
        optimizeAdTiming() {
            const adPoints = [
                "테스트 시작 전", // 스킵 가능
                "테스트 중간 (3문항 후)", // 배너
                "결과 보기 직전", // 전면 광고 (필수)
                "결과 화면", // 네이티브 광고
                "공유 후" // 보상형 광고
            ];
            return adPoints;
        },
        
        // A/B 테스트 가격
        priceOptimization() {
            const tests = [
                { product: "yearlyFortune", priceA: 3900, priceB: 2900 },
                { product: "compatibility", priceA: 1900, priceB: 990 },
                { product: "pdfReport", priceA: 2900, priceB: 3900 }
            ];
            // 전환율 측정 후 최적 가격 선택
        }
    },
    
    // 6. 간편 결제 통합
    paymentMethods: {
        // 카카오페이 (가장 쉬움)
        kakaoPay: {
            setup: "간편 결제 1클릭",
            fee: "3.3%"
        },
        
        // 토스페이
        tossPay: {
            setup: "QR 결제",
            fee: "2.9%"
        },
        
        // 휴대폰 소액결제
        phoneBilling: {
            setup: "통신사 결제",
            fee: "5-7%",
            advantage: "가장 쉬운 결제"
        }
    },
    
    // 7. 심리적 트리거
    psychologicalTriggers: {
        // 희소성
        scarcity: "오늘만 50% 할인!",
        
        // 사회적 증명
        socialProof: "1,234명이 구매했어요",
        
        // 손실 회피
        lossAversion: "지금 안 보면 다시 테스트해야 해요",
        
        // 호기심
        curiosity: "당신의 숨겨진 성격은?",
        
        // 즉시 만족
        instantGratification: "바로 확인 가능!"
    },
    
    // 8. 실제 수익 예상
    revenueProjection: {
        conservative: {
            dailyUsers: 5000,
            adRevenue: 7500, // ₩7,500/일
            purchaseRevenue: 14500, // ₩14,500/일
            monthly: 660000 // ₩660,000/월
        },
        
        realistic: {
            dailyUsers: 10000,
            adRevenue: 15000,
            purchaseRevenue: 29000,
            monthly: 1320000 // ₩1,320,000/월
        },
        
        optimistic: {
            dailyUsers: 50000,
            adRevenue: 75000,
            purchaseRevenue: 145000,
            monthly: 6600000 // ₩6,600,000/월
        }
    }
};

// 실제 구현 함수들
function showInterstitialBeforeResult() {
    // 결과 보기 전 전면 광고
    const adContainer = document.createElement('div');
    adContainer.className = 'interstitial-ad';
    adContainer.innerHTML = `
        <div class="ad-overlay">
            <div class="ad-content">
                <div class="countdown">광고 후 결과 확인 (5초)</div>
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-1752582087901677"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
            </div>
        </div>
    `;
    
    document.body.appendChild(adContainer);
    
    let countdown = 5;
    const timer = setInterval(() => {
        countdown--;
        document.querySelector('.countdown').textContent = 
            `광고 후 결과 확인 (${countdown}초)`;
        
        if (countdown === 0) {
            clearInterval(timer);
            document.querySelector('.countdown').innerHTML = 
                '<button onclick="closeAd()">결과 보기 ></button>';
        }
    }, 1000);
}

function showOneTimePurchase(product) {
    const modal = document.createElement('div');
    modal.className = 'purchase-modal';
    modal.innerHTML = `
        <div class="purchase-content">
            <button class="close-modal" onclick="this.parentElement.parentElement.remove()">×</button>
            <div class="product-image">🔮</div>
            <h2>${RealisticMonetization.oneTimeProducts[product].title}</h2>
            <p class="product-desc">${RealisticMonetization.oneTimeProducts[product].description}</p>
            
            <div class="price-tag">
                <span class="original-price">₩7,900</span>
                <span class="sale-price">₩${RealisticMonetization.oneTimeProducts[product].price}</span>
                <span class="discount-badge">한정 특가</span>
            </div>
            
            <div class="social-proof">
                <span>⭐⭐⭐⭐⭐</span>
                <span>2,341명이 구매</span>
            </div>
            
            <div class="payment-buttons">
                <button class="pay-kakao" onclick="payWithKakao('${product}')">
                    <img src="kakao-pay.png" alt="카카오페이">
                    카카오페이로 구매
                </button>
                <button class="pay-toss" onclick="payWithToss('${product}')">
                    토스로 구매
                </button>
                <button class="pay-phone" onclick="payWithPhone('${product}')">
                    휴대폰 결제
                </button>
            </div>
            
            <p class="guarantee">✓ 즉시 확인 가능 · 100% 환불 보장</p>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function trackConversion(product, price) {
    // Google Analytics 전환 추적
    if (window.gtag) {
        gtag('event', 'purchase', {
            value: price,
            currency: 'KRW',
            items: [{
                item_name: product,
                price: price,
                quantity: 1
            }]
        });
    }
    
    // 수익 대시보드 업데이트
    updateRevenueDashboard(price);
}

function updateRevenueDashboard(amount) {
    const revenue = JSON.parse(localStorage.getItem('revenue') || '{}');
    const today = new Date().toDateString();
    
    if (revenue.date !== today) {
        revenue.date = today;
        revenue.daily = 0;
    }
    
    revenue.daily += amount;
    revenue.total = (revenue.total || 0) + amount;
    
    localStorage.setItem('revenue', JSON.stringify(revenue));
    
    console.log(`오늘 수익: ₩${revenue.daily}, 총 수익: ₩${revenue.total}`);
}

// Export
if (typeof window !== 'undefined') {
    window.RealisticMonetization = RealisticMonetization;
}