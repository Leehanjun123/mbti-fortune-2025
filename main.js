// 2025 MBTI 운세 - 완벽하게 리팩토링된 메인 스크립트
'use strict';

// 전역 네임스페이스
window.MBTIApp = window.MBTIApp || {};

// 앱 상태 관리
const AppState = {
    currentScreen: 'loading',
    userName: '',
    mbtiType: '',
    testAnswers: [],
    currentQuestion: 0,
    userCount: 127892,
    skipTest: false,
    isInitialized: false
};

// 화면 관리자
const ScreenManager = {
    screens: ['loading', 'start', 'name', 'test', 'quickSelect', 'result'],
    
    init() {
        // 모든 화면을 초기 상태로 설정
        this.screens.forEach(screenId => {
            const screen = document.getElementById(screenId + 'Screen');
            if (screen) {
                screen.style.display = 'none';
                screen.style.position = 'fixed';
                screen.style.top = '0';
                screen.style.left = '0';
                screen.style.width = '100vw';
                screen.style.height = '100vh';
                screen.style.overflow = 'hidden';
                screen.classList.remove('active');
            }
        });
        
        // body와 html에 스크롤 방지 적용
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100vh';
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.body.style.position = 'fixed';
        document.body.style.width = '100vw';
    },
    
    show(screenId) {
        console.log(`화면 전환: ${AppState.currentScreen} → ${screenId}`);
        
        // 모든 화면 숨기기
        this.screens.forEach(id => {
            const screen = document.getElementById(id + 'Screen');
            if (screen) {
                screen.style.display = 'none';
                screen.classList.remove('active');
            }
        });
        
        // 대상 화면 표시
        const targetScreen = document.getElementById(screenId + 'Screen');
        if (targetScreen) {
            targetScreen.style.display = 'block';
            targetScreen.classList.add('active');
            
            // 내부 컨테이너 스크롤 허용
            const container = targetScreen.querySelector('.container');
            if (container) {
                container.style.overflowY = 'auto';
                container.style.height = '100vh';
                container.style.webkitOverflowScrolling = 'touch';
            }
            
            AppState.currentScreen = screenId;
            
            // 화면별 후처리
            this.onScreenChange(screenId);
        }
    },
    
    onScreenChange(screenId) {
        // 화면별 특별 처리
        switch(screenId) {
            case 'result':
                setTimeout(() => AdManager.render(), 500);
                break;
            case 'test':
                TestManager.renderQuestion();
                break;
        }
    }
};

// 테스트 관리자
const TestManager = {
    questions: [
        {
            text: "2025년 첫날 아침, 가장 끌리는 선택은?",
            answers: [
                { text: "🎉 친구들과 시끌벅적 브런치", value: 'E' },
                { text: "🌅 혼자 조용히 일출 감상", value: 'I' }
            ]
        },
        {
            text: "올해 가장 이루고 싶은 꿈은?",
            answers: [
                { text: "📊 구체적 목표와 실행 계획", value: 'S' },
                { text: "✨ 큰 비전과 무한한 가능성", value: 'N' }
            ]
        },
        {
            text: "소중한 사람이 힘들어할 때",
            answers: [
                { text: "💡 실질적인 해결책 제시", value: 'T' },
                { text: "🤗 따뜻한 공감과 위로", value: 'F' }
            ]
        },
        {
            text: "2025년 특별한 여행을 간다면?",
            answers: [
                { text: "📅 완벽한 일정과 예약", value: 'J' },
                { text: "🎲 즉흥적인 모험 여행", value: 'P' }
            ]
        },
        {
            text: "에너지 충전하는 방법은?",
            answers: [
                { text: "👥 사람들과 신나게 놀기", value: 'E' },
                { text: "🏠 혼자만의 힐링 타임", value: 'I' }
            ]
        },
        {
            text: "미래를 그려볼 때 나는?",
            answers: [
                { text: "🎯 현실적으로 가능한 목표", value: 'S' },
                { text: "🌟 상상력 가득한 큰 꿈", value: 'N' }
            ]
        },
        {
            text: "중요한 선택의 순간에는?",
            answers: [
                { text: "📊 논리와 데이터로 판단", value: 'T' },
                { text: "❤️ 마음의 소리를 따라", value: 'F' }
            ]
        },
        {
            text: "일상의 행복을 찾는 방법은?",
            answers: [
                { text: "✅ 계획대로 완수하는 성취감", value: 'J' },
                { text: "🌈 예상 못한 즐거운 순간", value: 'P' }
            ]
        }
    ],
    
    renderQuestion() {
        const current = AppState.currentQuestion;
        if (current >= this.questions.length) {
            this.calculateResult();
            return;
        }
        
        const question = this.questions[current];
        const container = document.getElementById('questionContainer');
        
        if (container) {
            container.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${((current + 1) / this.questions.length) * 100}%"></div>
                </div>
                <div class="question-number">질문 ${current + 1}/${this.questions.length}</div>
                <div class="question-card">
                    <h2 class="question-text">${question.text}</h2>
                    <div class="answer-options">
                        ${question.answers.map((answer, index) => `
                            <button class="answer-btn" onclick="MBTIApp.selectAnswer('${answer.value}')">
                                ${answer.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    },
    
    selectAnswer(value) {
        AppState.testAnswers.push(value);
        AppState.currentQuestion++;
        
        if (AppState.currentQuestion >= this.questions.length) {
            this.calculateResult();
        } else {
            this.renderQuestion();
        }
    },
    
    calculateResult() {
        const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        
        AppState.testAnswers.forEach(answer => {
            counts[answer]++;
        });
        
        AppState.mbtiType = 
            (counts.E >= counts.I ? 'E' : 'I') +
            (counts.S >= counts.N ? 'S' : 'N') +
            (counts.T >= counts.F ? 'T' : 'F') +
            (counts.J >= counts.P ? 'J' : 'P');
        
        this.showResult();
    },
    
    showResult() {
        FortuneManager.generate();
        ScreenManager.show('result');
    }
};

// 운세 관리자
const FortuneManager = {
    fortunes: {
        'INTJ': {
            overall: "2025년은 당신의 전략적 사고가 빛을 발하는 해! 그동안 준비해온 계획들이 하나씩 결실을 맺기 시작합니다.",
            love: "올해는 지적인 대화를 나눌 수 있는 특별한 인연을 만날 가능성이 높아요.",
            money: "투자 수익이 기대되는 한 해! 특히 장기 투자와 부동산 쪽에서 좋은 기회가 올 수 있어요.",
            career: "리더십을 발휘할 기회가 많아집니다. 당신의 비전과 체계적인 접근이 인정받을 거예요.",
            health: "정신적 스트레스 관리가 중요한 한 해. 명상이나 요가를 시작해보세요."
        }
        // 다른 MBTI 타입들도 추가...
    },
    
    generate() {
        const mbti = AppState.mbtiType;
        const name = AppState.userName || '당신';
        const fortune = this.fortunes[mbti] || this.fortunes['INTJ'];
        
        document.getElementById('userName').textContent = name;
        document.getElementById('userMBTI').textContent = mbti;
        document.getElementById('overallFortune').textContent = fortune.overall;
        document.getElementById('loveFortune').textContent = fortune.love;
        document.getElementById('moneyFortune').textContent = fortune.money;
        document.getElementById('careerFortune').textContent = fortune.career;
        document.getElementById('healthFortune').textContent = fortune.health;
    }
};

// 광고 관리자
const AdManager = {
    isReady: false,
    
    init() {
        // 카카오 SDK 로드 확인
        if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
            try {
                Kakao.init(window.CONFIG?.KAKAO_APP_KEY || '48c0d88498f6ea2f7e8c8f87654321ab');
                console.log('카카오 SDK 초기화 성공');
            } catch(e) {
                console.log('카카오 SDK 초기화 실패:', e);
            }
        }
        
        // AdFit 스크립트 로드
        this.loadAdFitScript();
    },
    
    loadAdFitScript() {
        if (document.getElementById('kakao-adfit-script')) return;
        
        const script = document.createElement('script');
        script.id = 'kakao-adfit-script';
        script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
        script.async = true;
        script.onload = () => {
            this.isReady = true;
            console.log('AdFit 스크립트 로드 완료');
        };
        document.body.appendChild(script);
    },
    
    render() {
        if (!this.isReady) {
            setTimeout(() => this.render(), 500);
            return;
        }
        
        // adsbykakao 객체 확인 및 렌더링
        if (typeof window.adsbykakao !== 'undefined') {
            try {
                window.adsbykakao.push({});
                console.log('광고 렌더링 성공');
            } catch(e) {
                console.log('광고 렌더링 실패:', e);
            }
        }
    }
};

// 전역 함수 노출
window.MBTIApp = {
    // 시작 화면 함수들
    startMagicalJourney() {
        console.log('마법같은 여정 시작!');
        ScreenManager.show('name');
    },
    
    showMBTISelect() {
        console.log('MBTI 선택 경로');
        ScreenManager.show('quickSelect');
    },
    
    showQuickSelect() {
        console.log('MBTI 빠른 선택');
        ScreenManager.show('quickSelect');
    },
    
    goBack() {
        console.log('처음으로 돌아가기');
        ScreenManager.show('start');
    },
    
    // 이름 입력
    submitName() {
        const nameInput = document.getElementById('nameInput');
        if (nameInput && nameInput.value.trim()) {
            AppState.userName = nameInput.value.trim();
            
            if (AppState.skipTest) {
                ScreenManager.show('result');
            } else {
                ScreenManager.show('test');
            }
        }
    },
    
    // MBTI 직접 선택
    selectMBTI(mbti) {
        AppState.mbtiType = mbti;
        AppState.skipTest = true;
        ScreenManager.show('name');
    },
    
    // 테스트 답변 선택
    selectAnswer(value) {
        TestManager.selectAnswer(value);
    },
    
    // 다시 시작
    restart() {
        AppState.currentScreen = 'start';
        AppState.userName = '';
        AppState.mbtiType = '';
        AppState.testAnswers = [];
        AppState.currentQuestion = 0;
        AppState.skipTest = false;
        
        ScreenManager.show('start');
    },
    
    // 공유 기능
    shareResult() {
        const text = `2025년 나의 운세는? ${AppState.mbtiType}의 운명을 확인해보세요!`;
        
        if (typeof Kakao !== 'undefined') {
            try {
                Kakao.Share.sendDefault({
                    objectType: 'text',
                    text: text,
                    link: {
                        mobileWebUrl: window.CONFIG?.APP_URL || 'https://mbti-destiny.site',
                        webUrl: window.CONFIG?.APP_URL || 'https://mbti-destiny.site'
                    }
                });
            } catch(e) {
                console.log('카카오 공유 실패:', e);
                this.fallbackShare(text);
            }
        } else {
            this.fallbackShare(text);
        }
    },
    
    fallbackShare(text) {
        if (navigator.share) {
            navigator.share({
                title: '2025 MBTI 운세',
                text: text,
                url: window.location.href
            });
        } else {
            // 클립보드 복사
            navigator.clipboard.writeText(text + ' ' + window.location.href);
            alert('링크가 복사되었습니다!');
        }
    }
};

// 전역 함수로도 접근 가능하도록 설정
window.startMagicalJourney = window.MBTIApp.startMagicalJourney;
window.showMBTISelect = window.MBTIApp.showMBTISelect;
window.showQuickSelect = window.MBTIApp.showQuickSelect;
window.goBack = window.MBTIApp.goBack;
window.submitName = window.MBTIApp.submitName;
window.selectMBTI = window.MBTIApp.selectMBTI;
window.selectAnswer = window.MBTIApp.selectAnswer;
window.restart = window.MBTIApp.restart;
window.shareResult = window.MBTIApp.shareResult;

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 MBTI 운세 앱 초기화 시작');
    
    // 화면 관리자 초기화
    ScreenManager.init();
    
    // 광고 관리자 초기화
    AdManager.init();
    
    // 로딩 화면 표시
    ScreenManager.show('loading');
    
    // 2초 후 시작 화면으로 전환
    setTimeout(() => {
        ScreenManager.show('start');
        AppState.isInitialized = true;
        console.log('✅ 앱 초기화 완료');
    }, 2000);
    
    // 사용자 수 애니메이션
    const userCountEl = document.getElementById('userCount');
    if (userCountEl) {
        setInterval(() => {
            AppState.userCount += Math.floor(Math.random() * 3) + 1;
            userCountEl.textContent = AppState.userCount.toLocaleString();
        }, 5000);
    }
});

// 에러 핸들링
window.addEventListener('error', function(e) {
    console.error('전역 에러:', e.error);
    // 에러가 발생해도 앱은 계속 작동
    return true;
});

console.log('✅ main.js 로드 완료');