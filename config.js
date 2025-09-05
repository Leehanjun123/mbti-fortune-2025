// 환경 설정 및 보안 설정
const CONFIG = {
    // 기본 설정
    APP_NAME: '2025 MBTI 운세',
    APP_VERSION: '2.1.0',
    APP_URL: 'https://mbti-destiny.site',
    
    // Google Analytics 
    GA_TRACKING_ID: process.env.GA_TRACKING_ID || 'G-XXXXXXXXXX',
    
    // 카카오 설정
    KAKAO_APP_KEY: '48c0d88498f6ea2f7e8c8f87654321ab', // JavaScript 키 (공개용)
    KAKAO_ADFIT_UNITS: {
        BANNER_TOP: 'DAN-cIOtsbRqKgkRvw1X',      // 상단 배너
        BANNER_MIDDLE: 'DAN-I87IJKlKm1SxmPvG',   // 중간 배너
        BANNER_BOTTOM: 'DAN-7yyU9mCDVMJTOAgA'    // 하단 배너
    },
    
    // Google AdSense
    ADSENSE_CLIENT: 'ca-pub-XXXXXXXXXX',
    ADSENSE_SLOTS: {
        DISPLAY: '1234567890',
        NATIVE: '0987654321'
    },
    
    // 보안 설정
    SECURITY: {
        CSP_HEADER: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://developers.kakao.com https://t1.daumcdn.net https://pagead2.googlesyndication.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://kapi.kakao.com",
        RATE_LIMIT: {
            WINDOW_MS: 15 * 60 * 1000, // 15분
            MAX_REQUESTS: 100
        }
    },
    
    // 성능 최적화
    PERFORMANCE: {
        LAZY_LOAD: true,
        IMAGE_OPTIMIZATION: true,
        CACHE_DURATION: 3600, // 1시간
        ENABLE_PWA: true
    },
    
    // A/B 테스트 설정
    AB_TESTS: {
        SHOW_PREMIUM_MODAL: {
            enabled: true,
            variants: ['control', 'immediate', 'delayed', 'exit_intent'],
            weights: [0.25, 0.25, 0.25, 0.25]
        },
        CTA_BUTTON_TEXT: {
            enabled: true,
            variants: ['시작하기', '운세 보기', '내 운명 확인', '3분 테스트 시작'],
            weights: [0.25, 0.25, 0.25, 0.25]
        }
    },
    
    // 데이터 수집 이벤트
    TRACKING_EVENTS: {
        PAGE_VIEW: 'page_view',
        TEST_START: 'test_start',
        TEST_COMPLETE: 'test_complete',
        RESULT_VIEW: 'result_view',
        SHARE_CLICK: 'share_click',
        PREMIUM_VIEW: 'premium_view',
        PREMIUM_PURCHASE: 'premium_purchase',
        AD_VIEW: 'ad_view',
        AD_CLICK: 'ad_click'
    },
    
    // 프리미엄 설정
    PREMIUM: {
        PRICE: 4900,
        ORIGINAL_PRICE: 9900,
        FEATURES: [
            '2025년 월별 상세 운세',
            'MBTI 궁합 분석',
            '행운의 날짜 & 시간대',
            'PDF 다운로드',
            '광고 제거'
        ]
    }
};

// 환경변수에서 실제 값 로드 (있으면)
if (typeof window !== 'undefined') {
    // 브라우저 환경
    window.CONFIG = CONFIG;
}

if (typeof module !== 'undefined' && module.exports) {
    // Node.js 환경
    module.exports = CONFIG;
}