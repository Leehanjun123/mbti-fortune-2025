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
    screens: ['loading', 'start', 'name', 'test', 'quickSelect', 'calculating', 'result'],
    
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
        
        // 프로그레스 업데이트
        const currentQEl = document.getElementById('currentQ');
        if (currentQEl) {
            currentQEl.textContent = current + 1;
        }
        
        // 진행률 점 업데이트
        const dots = document.querySelectorAll('.progress-dots .dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index <= Math.floor((current / this.questions.length) * 3));
        });
        
        if (container) {
            container.innerHTML = `
                <div class="chat-bubble">
                    <div class="chat-avatar">🔮</div>
                    <div class="chat-content">
                        <p class="question-text">${question.text}</p>
                    </div>
                </div>
                
                <div class="answer-container">
                    ${question.answers.map((answer, index) => `
                        <button class="answer-btn" onclick="selectAnswer('${answer.value}')">
                            ${answer.text}
                        </button>
                    `).join('')}
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
    
    skipQuestion() {
        // 랜덤 답변 선택
        const currentQ = this.questions[AppState.currentQuestion];
        if (currentQ) {
            const randomAnswer = currentQ.answers[Math.floor(Math.random() * currentQ.answers.length)];
            this.selectAnswer(randomAnswer.value);
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
        ScreenManager.show('calculating');
        
        // 계산 중 애니메이션 표시
        setTimeout(() => {
            FortuneManager.generate();
            ScreenManager.show('result');
        }, 2000);
    },
    
    skipQuestion() {
        // 임의의 답변을 선택하여 진행
        const randomAnswer = ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'][Math.floor(Math.random() * 8)];
        this.selectAnswer(randomAnswer);
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
        },
        'INFJ': {
            overall: "2025년은 당신의 직감과 통찰력이 특히 정확해지는 해입니다. 숨겨진 기회들을 발견할 수 있어요.",
            love: "진정한 소울메이트를 만날 수 있는 해. 깊은 감정적 연결을 경험하게 될 거예요.",
            money: "예상치 못한 곳에서 수익이 발생할 수 있어요. 투자보다는 저축에 집중하세요.",
            career: "창작 활동이나 상담 관련 분야에서 특별한 재능을 발휘할 것 같아요.",
            health: "감정적 웰빙이 신체 건강에 직접적인 영향을 미칩니다. 마음의 평화를 찾으세요."
        },
        'INFP': {
            overall: "2025년은 자아 발견의 해가 될 것 같아요. 진정한 꿈과 가치를 찾아가는 여정이 시작됩니다.",
            love: "영화 같은 로맨스가 기다리고 있어요. 예술적 감성을 공유할 수 있는 인연이 나타날 거예요.",
            money: "돈보다는 의미 있는 일에 투자하는 것이 결과적으로 더 큰 수익을 가져다줄 거예요.",
            career: "창의적인 분야에서 큰 성과를 거둘 수 있는 해. 당신만의 독특한 아이디어가 인정받을 거예요.",
            health: "규칙적인 운동보다는 자연과 함께하는 활동이 더 도움이 될 거예요."
        },
        'ENFJ': {
            overall: "2025년은 리더십을 발휘할 기회가 많은 해입니다. 많은 사람들이 당신을 따르게 될 거예요.",
            love: "주변 사람들의 중매가 성공할 가능성이 높아요. 친구들의 소개에 귀 기울여보세요.",
            money: "투자나 사업보다는 교육이나 인적 네트워크에 투자하는 것이 더 유리할 거예요.",
            career: "팀을 이끄는 역할에서 뛰어난 성과를 보일 거예요. 승진이나 새로운 직책 제의가 있을 수 있어요.",
            health: "스트레스 관리가 중요해요. 사람들을 돕느라 자신을 잊지 마세요."
        },
        'ENFP': {
            overall: "2025년은 모험과 새로운 경험이 가득한 해가 될 거예요. 예상치 못한 기회들이 연속으로 찾아올 거예요.",
            love: "여러 인연 중에서 선택해야 하는 행복한 고민이 생길 거예요. 직감을 믿고 선택하세요.",
            money: "다양한 수입원이 생길 수 있어요. 여러 분야에 관심을 가지는 것이 도움이 될 거예요.",
            career: "새로운 분야에 도전할 기회가 올 거예요. 변화를 두려워하지 말고 과감하게 도전하세요.",
            health: "활동적인 라이프스타일이 건강에 큰 도움이 될 거예요. 새로운 운동에 도전해보세요."
        },
        'ISTJ': {
            overall: "2025년은 꾸준함이 결실을 맺는 해입니다. 그동안의 노력이 인정받고 안정적인 성과를 거둘 거예요.",
            love: "신중하고 진실한 인연을 만날 수 있어요. 오랜 친구에서 연인으로 발전하는 경우가 많을 거예요.",
            money: "착실한 저축과 보수적인 투자가 좋은 결과를 가져다줄 거예요. 무리한 투자는 피하세요.",
            career: "성실함이 인정받아 중요한 프로젝트를 맡게 될 수 있어요. 꾸준히 노력한 분야에서 성과가 나타날 거예요.",
            health: "규칙적인 생활 습관이 건강의 열쇠예요. 꾸준한 운동과 충분한 휴식이 중요해요."
        },
        'ISFJ': {
            overall: "2025년은 주변 사람들로부터 큰 사랑을 받는 해가 될 거예요. 당신의 따뜻한 마음이 복으로 돌아올 거예요.",
            love: "헌신적인 사랑을 받게 될 거예요. 가족의 소개나 직장에서 좋은 인연을 만날 가능성이 높아요.",
            money: "안정적인 수입과 함께 보너스나 상여금 등 예상치 못한 돈이 들어올 수 있어요.",
            career: "동료들의 신뢰를 바탕으로 중요한 업무를 맡게 될 거예요. 서비스업이나 교육 분야에서 특히 좋은 성과를 거둘 거예요.",
            health: "스트레스보다는 과로를 조심해야 해요. 충분한 휴식과 영양 관리가 필요해요."
        },
        'ESTJ': {
            overall: "2025년은 리더십을 발휘할 기회가 많은 해입니다. 조직에서 중요한 역할을 맡게 될 거예요.",
            love: "든든하고 신뢰할 수 있는 파트너를 만날 수 있어요. 상호 존중하는 관계가 될 거예요.",
            money: "비즈니스나 투자에서 좋은 성과를 거둘 수 있어요. 계획적인 재정 관리가 큰 도움이 될 거예요.",
            career: "관리직이나 경영 분야에서 두각을 나타낼 거예요. 새로운 프로젝트를 성공적으로 이끌 수 있어요.",
            health: "적극적인 건강 관리가 필요해요. 정기 검진과 운동을 통해 체력을 유지하세요."
        },
        'ESFJ': {
            overall: "2025년은 인간관계에서 큰 만족을 얻는 해가 될 거예요. 많은 사람들과의 좋은 인연이 이어질 거예요.",
            love: "따뜻하고 안정적인 관계를 만들어갈 수 있어요. 결혼이나 약혼 등 좋은 소식이 있을 수 있어요.",
            money: "사람들과의 네트워크를 통해 좋은 기회가 올 수 있어요. 협력이나 파트너십에서 수익이 발생할 거예요.",
            career: "팀워크가 중요한 업무에서 뛰어난 성과를 보일 거예요. 고객 서비스나 HR 분야에서 특히 좋은 결과를 거둘 거예요.",
            health: "사회 활동이 정신 건강에 큰 도움이 될 거예요. 적절한 사교 활동을 유지하세요."
        },
        'ISTP': {
            overall: "2025년은 실무 능력이 빛을 발하는 해입니다. 손재주나 기술적 능력으로 좋은 기회를 만들 수 있어요.",
            love: "조용하지만 깊은 사랑을 경험하게 될 거예요. 취미나 관심사를 통해 특별한 인연을 만날 수 있어요.",
            money: "기술이나 전문성을 활용한 부수입이 생길 수 있어요. 실용적인 투자나 재테크가 도움이 될 거예요.",
            career: "문제 해결 능력이 인정받아 중요한 프로젝트에 참여하게 될 수 있어요. IT나 기술 분야에서 좋은 성과를 거둘 거예요.",
            health: "몸을 움직이는 활동이 건강에 큰 도움이 될 거예요. 등산이나 수영 등을 추천해요."
        },
        'ISFP': {
            overall: "2025년은 예술적 감성이 풍부해지는 해입니다. 창작 활동이나 예술 분야에서 새로운 발견이 있을 거예요.",
            love: "감성적이고 로맨틱한 사랑을 경험하게 될 거예요. 예술이나 문화 활동을 통해 인연을 만날 수 있어요.",
            money: "창의적인 활동이나 취미가 수익으로 연결될 수 있어요. 작은 투자로 시작해서 점진적으로 확장하세요.",
            career: "디자인, 예술, 상담 분야에서 특별한 재능을 발휘할 거예요. 개인의 창의성이 인정받을 거예요.",
            health: "스트레스 해소를 위한 창의적 활동이 필요해요. 그림 그리기나 음악 감상이 도움이 될 거예요."
        },
        'ESTP': {
            overall: "2025년은 액션과 모험이 가득한 해가 될 거예요. 즉석에서 기회를 포착하는 능력이 빛을 발할 거예요.",
            love: "활발하고 즐거운 연애를 할 수 있어요. 여행이나 스포츠 활동을 통해 멋진 인연을 만날 수 있어요.",
            money: "순간의 판단력으로 좋은 기회를 잡을 수 있어요. 단기 투자나 트레이딩에서 좋은 결과를 거둘 수 있어요.",
            career: "영업이나 마케팅 분야에서 뛰어난 성과를 보일 거예요. 사람들과의 소통 능력이 큰 장점이 될 거예요.",
            health: "활동적인 라이프스타일이 건강 유지에 큰 도움이 될 거예요. 다양한 스포츠에 도전해보세요."
        },
        'ESFP': {
            overall: "2025년은 인기와 매력이 최고조에 달하는 해입니다. 많은 사람들이 당신을 찾게 될 거예요.",
            love: "여러 인연 중에서 선택의 즐거움을 만끽할 수 있어요. 파티나 모임에서 운명적인 만남이 있을 거예요.",
            money: "엔터테인먼트나 서비스업에서 좋은 기회가 올 수 있어요. 인맥을 통한 수익 창출이 가능해요.",
            career: "대중과의 소통이 필요한 분야에서 큰 성공을 거둘 수 있어요. 방송, 연예, 교육 분야에서 특히 좋은 성과를 보일 거예요.",
            health: "사교 활동과 운동을 병행하면 최상의 컨디션을 유지할 수 있어요."
        },
        'INTP': {
            overall: "2025년은 지적 호기심이 실제 성과로 이어지는 해입니다. 연구나 학습에서 큰 발견이 있을 거예요.",
            love: "지적인 대화를 나눌 수 있는 특별한 사람을 만날 수 있어요. 온라인에서 시작된 인연이 발전할 가능성이 높아요.",
            money: "아이디어나 지식을 활용한 수익 모델을 만들 수 있어요. 특허나 저작권 등에서 수익이 발생할 수 있어요.",
            career: "연구개발이나 IT 분야에서 혁신적인 아이디어로 주목받을 수 있어요. 독립적인 업무에서 최고의 성과를 낼 거예요.",
            health: "정신적 자극과 충분한 휴식의 균형이 중요해요. 독서나 게임도 좋지만 적당한 운동도 필요해요."
        },
        'ENTP': {
            overall: "2025년은 혁신과 창의성이 폭발하는 해가 될 거예요. 기발한 아이디어들이 현실이 되기 시작할 거예요.",
            love: "예측 불가능하고 흥미진진한 연애를 할 수 있어요. 토론과 대화를 즐기는 파트너를 만날 수 있어요.",
            money: "새로운 비즈니스 모델이나 스타트업에서 큰 성공을 거둘 수 있어요. 다양한 분야의 투자가 도움이 될 거예요.",
            career: "기획이나 전략 분야에서 뛰어난 능력을 발휘할 거예요. 기존의 틀을 깨는 혁신적인 프로젝트를 주도하게 될 거예요.",
            health: "다양한 활동과 새로운 경험이 활력을 주지만, 과도한 자극은 피해야 해요."
        },
        'ENTJ': {
            overall: "2025년은 리더십의 해입니다. 큰 조직이나 프로젝트를 이끄는 중요한 역할을 맡게 될 거예요.",
            love: "파워 커플이 될 수 있는 강한 파트너를 만날 수 있어요. 서로의 목표를 지지하는 관계가 될 거예요.",
            money: "대규모 투자나 사업에서 큰 성공을 거둘 수 있어요. 전략적 사고와 실행력이 큰 수익을 가져다줄 거예요.",
            career: "CEO나 임원급 포지션으로의 승진 기회가 올 수 있어요. 조직 전체의 방향을 결정하는 중요한 의사결정에 참여하게 될 거예요.",
            health: "스트레스 관리와 충분한 휴식이 매우 중요해요. 성공 못지않게 건강도 챙기세요."
        }
    },
    
    generate() {
        const mbti = AppState.mbtiType || 'INTJ';
        const name = AppState.userName || '당신';
        const fortune = this.fortunes[mbti] || this.fortunes['INTJ'];
        
        console.log('운세 생성:', { mbti, name, fortune });
        
        // 안전하게 요소 업데이트
        const updateElement = (id, text) => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = text;
                console.log(`✅ ${id} 업데이트: ${text.substring(0, 30)}...`);
            } else {
                console.error(`❌ ${id} 요소를 찾을 수 없음`);
            }
        };
        
        updateElement('userName', name);
        updateElement('userMBTI', mbti);
        updateElement('overallFortune', fortune.overall);
        
        // innerHTML 사용하여 카테고리 운세 업데이트
        const updateCategory = (id, text) => {
            const el = document.getElementById(id);
            if (el) {
                el.innerHTML = text;
                console.log(`✅ ${id} 카테고리 업데이트`);
            }
        };
        
        updateCategory('loveFortune', fortune.love);
        updateCategory('moneyFortune', fortune.money);
        updateCategory('careerFortune', fortune.career);
        updateCategory('healthFortune', fortune.health);
        
        // 점수 애니메이션
        this.animateScores();
    },
    
    animateScores() {
        // 각 카테고리별 점수 (랜덤)
        const categories = ['love', 'money', 'career', 'health'];
        categories.forEach(category => {
            const score = 70 + Math.floor(Math.random() * 30); // 70-99점
            const scoreBar = document.querySelector(`#${category}Score .score-fill`);
            if (scoreBar) {
                setTimeout(() => {
                    scoreBar.style.width = score + '%';
                }, 500);
            }
            const scoreText = document.querySelector(`#${category}ScoreText`);
            if (scoreText) {
                scoreText.textContent = score + '점';
            }
        });
    }
};

// 광고 관리자 (Sundar Pichai 최적화)
const AdManager = {
    isReady: false,
    renderAttempts: 0,
    maxRenderAttempts: 5,
    
    init() {
        console.log('🎯 AdManager 초기화 시작');
        
        // 카카오 SDK 로드 확인
        if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
            try {
                Kakao.init(window.CONFIG?.KAKAO_APP_KEY || '48c0d88498f6ea2f7e8c8f87654321ab');
                console.log('✅ 카카오 SDK 초기화 성공');
            } catch(e) {
                console.log('❌ 카카오 SDK 초기화 실패:', e);
            }
        }
        
        // AdFit 스크립트 로드
        this.loadAdFitScript();
    },
    
    loadAdFitScript() {
        if (document.getElementById('kakao-adfit-script')) {
            console.log('AdFit 스크립트 이미 로드됨');
            this.isReady = true;
            return;
        }
        
        const script = document.createElement('script');
        script.id = 'kakao-adfit-script';
        script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
        script.async = true;
        script.onload = () => {
            this.isReady = true;
            console.log('✅ AdFit 스크립트 로드 완료');
            
            // 즉시 렌더링 시도
            setTimeout(() => this.render(), 100);
        };
        script.onerror = () => {
            console.log('❌ AdFit 스크립트 로드 실패');
            this.showFallbackAds();
        };
        document.body.appendChild(script);
    },
    
    render() {
        this.renderAttempts++;
        console.log(`🔄 광고 렌더링 시도 ${this.renderAttempts}/${this.maxRenderAttempts}`);
        
        if (!this.isReady && this.renderAttempts < this.maxRenderAttempts) {
            setTimeout(() => this.render(), 1000);
            return;
        }
        
        // 모든 광고 영역 찾기
        const adAreas = document.querySelectorAll('.kakao_ad_area');
        console.log(`📍 광고 영역 ${adAreas.length}개 발견`);
        
        if (adAreas.length === 0) {
            console.log('❌ 광고 영역을 찾을 수 없음');
            return;
        }
        
        // 각 광고 영역에 대해 렌더링 시도
        adAreas.forEach((adArea, index) => {
            // 광고 영역을 명시적으로 표시
            adArea.style.display = 'block';
            adArea.style.visibility = 'visible';
            adArea.style.opacity = '1';
            adArea.style.minHeight = '100px';
            adArea.style.width = '100%';
            
            // 컨테이너도 표시
            const container = adArea.closest('.ad-container');
            if (container) {
                container.style.display = 'flex';
                container.style.visibility = 'visible';
                container.style.opacity = '1';
                console.log(`✅ 광고 컨테이너 ${index + 1} 활성화`);
            }
        });
        
        // adsbykakao 객체 확인 및 렌더링
        try {
            if (typeof window.adsbykakao === 'undefined') {
                window.adsbykakao = [];
                console.log('🔧 adsbykakao 객체 수동 생성');
            }
            
            // 카카오 애드핏 렌더링
            window.adsbykakao.push({});
            console.log('🎉 카카오 애드핏 렌더링 완료!');
            
            // 2초 후 렌더링 확인
            setTimeout(() => this.verifyAdRendering(), 2000);
            
        } catch(e) {
            console.log('❌ 광고 렌더링 실패:', e);
            this.showFallbackAds();
        }
    },
    
    verifyAdRendering() {
        const adAreas = document.querySelectorAll('.kakao_ad_area');
        adAreas.forEach((area, index) => {
            const hasContent = area.children.length > 0 || area.innerHTML.trim().length > 0;
            if (hasContent) {
                console.log(`✅ 광고 ${index + 1} 렌더링 확인됨`);
            } else {
                console.log(`⚠️ 광고 ${index + 1} 렌더링 미확인 - 플레이스홀더 표시`);
                this.showPlaceholder(area);
            }
        });
    },
    
    showPlaceholder(adArea) {
        const placeholder = document.createElement('div');
        placeholder.className = 'ad-placeholder';
        placeholder.innerHTML = '🎯 광고 영역<br><small>로딩 중...</small>';
        
        const container = adArea.closest('.ad-container');
        if (container && container.children.length <= 1) {
            container.appendChild(placeholder);
        }
    },
    
    showFallbackAds() {
        console.log('🔄 대체 광고 시스템 활성화');
        const containers = document.querySelectorAll('.ad-container');
        containers.forEach(container => {
            if (!container.querySelector('.ad-placeholder')) {
                const fallback = document.createElement('div');
                fallback.className = 'ad-placeholder';
                fallback.innerHTML = '📢 광고 준비 중<br><small>잠시만 기다려주세요</small>';
                container.appendChild(fallback);
            }
        });
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
            console.log('이름 입력됨:', AppState.userName);
            console.log('skipTest:', AppState.skipTest);
            console.log('MBTI Type:', AppState.mbtiType);
            
            if (AppState.skipTest && AppState.mbtiType) {
                // MBTI를 이미 선택한 경우 바로 결과로
                FortuneManager.generate();
                ScreenManager.show('result');
            } else {
                // 테스트 진행
                ScreenManager.show('test');
            }
        }
    },
    
    // MBTI 직접 선택
    selectMBTI(mbti) {
        console.log('MBTI 선택됨:', mbti);
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
    
    // 공유 기능 (Mark Zuckerberg 바이럴 최적화)
    shareResult() {
        const mbti = AppState.mbtiType || 'UNKNOWN';
        const name = AppState.userName || '나';
        
        // 바이럴 메시지 최적화 - 호기심 유발
        const viralMessages = [
            `😱 ${name}의 2025년 ${mbti} 운세 결과가 충격적이야... 너도 확인해봐!`,
            `🔥 ${mbti}인 ${name}의 2025년이 대박날 예정! 너 운세는 어때?`,
            `✨ ${name}이 ${mbti}로 2025년 운세 봤는데... 진짜 신기하다 ㅋㅋ`,
            `🎯 ${name}(${mbti})의 2025년 운세가 이렇게 나왔어! 친구들아 같이 해보자~`,
            `💫 ${mbti} ${name}의 2025년... 이거 진짜 맞는 것 같은데? 너도 해봐!`
        ];
        
        const randomMessage = viralMessages[Math.floor(Math.random() * viralMessages.length)];
        
        // 소셜 증명 추가
        const userCount = AppState.userCount.toLocaleString();
        const socialProof = `\n\n📊 이미 ${userCount}명이 확인했어요!`;
        
        const fullMessage = randomMessage + socialProof;
        
        // 카카오톡 공유 (리치 미디어)
        if (typeof Kakao !== 'undefined') {
            try {
                Kakao.Share.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: `🔮 ${name}의 2025년 ${mbti} 운세`,
                        description: `${name}님의 특별한 운세가 공개되었어요! 2025년은 어떤 해가 될까요? 🌟`,
                        imageUrl: window.CONFIG?.OG_IMAGE || 'https://mbti-destiny.site/og-image.png',
                        link: {
                            mobileWebUrl: window.CONFIG?.APP_URL || 'https://mbti-destiny.site',
                            webUrl: window.CONFIG?.APP_URL || 'https://mbti-destiny.site'
                        }
                    },
                    buttons: [
                        {
                            title: '내 운세도 보기 ✨',
                            link: {
                                mobileWebUrl: window.CONFIG?.APP_URL || 'https://mbti-destiny.site',
                                webUrl: window.CONFIG?.APP_URL || 'https://mbti-destiny.site'
                            }
                        }
                    ]
                });
                
                // 공유 성공 피드백
                this.showShareSuccess();
                
            } catch(e) {
                console.log('카카오 공유 실패:', e);
                this.fallbackShare(fullMessage);
            }
        } else {
            this.fallbackShare(fullMessage);
        }
    },
    
    // 카카오톡 공유
    shareKakao() {
        this.shareResult();
    },
    
    // 공유 성공 피드백
    showShareSuccess() {
        // 간단한 토스트 메시지
        const toast = document.createElement('div');
        toast.className = 'share-toast';
        toast.innerHTML = '🎉 친구들에게 공유했어요!<br><small>친구가 확인하면 알림을 드릴게요</small>';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
        
        // 사용자 참여도 증가
        AppState.userCount += Math.floor(Math.random() * 3) + 1;
        const userCountEl = document.getElementById('userCount');
        if (userCountEl) {
            userCountEl.textContent = AppState.userCount.toLocaleString();
        }
    },
    
    // 카테고리별 운세 토글
    toggleCategory(element) {
        if (!element) return;
        
        const content = element.querySelector('.category-content');
        if (!content) return;
        
        const isExpanded = element.classList.contains('expanded');
        
        if (isExpanded) {
            element.classList.remove('expanded');
            content.style.maxHeight = '0';
        } else {
            // 다른 카테고리 닫기
            document.querySelectorAll('.category-card.expanded').forEach(card => {
                card.classList.remove('expanded');
                const cardContent = card.querySelector('.category-content');
                if (cardContent) cardContent.style.maxHeight = '0';
            });
            
            // 현재 카테고리 열기
            element.classList.add('expanded');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
        
        console.log('카테고리 토글:', element.querySelector('.category-title')?.textContent);
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
window.shareKakao = window.MBTIApp.shareKakao;
window.toggleCategory = window.MBTIApp.toggleCategory;

// 추가 필요한 함수들
window.skipQuestion = function() {
    console.log('질문 건너뛰기');
    TestManager.skipQuestion();
};

window.showPremium = function() {
    console.log('프리미엄 모달 표시 (Jeff Bezos 최적화)');
    const modal = document.getElementById('premiumModal');
    if (modal) {
        modal.style.display = 'flex';
        
        // 희소성 카운트다운 시작
        startCountdown();
        
        // 실시간 구매자 수 업데이트
        updateBuyerCount();
        
        // 재고 압박감 생성
        updateStockPressure();
        
        // 최근 구매자 알림
        showRecentBuyers();
    }
};

// Jeff Bezos 스타일 전환율 최적화 함수들
function startCountdown() {
    const countdownElements = document.querySelectorAll('#countdownTimer, #ctaCountdown');
    let timeLeft = 24 * 60 * 60; // 24시간
    
    const countdown = setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        countdownElements.forEach(el => {
            if (el) el.textContent = timeString;
        });
        
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(countdown);
            countdownElements.forEach(el => {
                if (el) el.textContent = '00:00:00';
            });
        }
    }, 1000);
}

function updateBuyerCount() {
    const buyerCountEl = document.getElementById('buyerCount');
    if (buyerCountEl) {
        setInterval(() => {
            const currentCount = parseInt(buyerCountEl.textContent.replace(',', ''));
            const newCount = currentCount + Math.floor(Math.random() * 3) + 1;
            buyerCountEl.textContent = newCount.toLocaleString();
        }, 15000); // 15초마다 업데이트
    }
}

function updateStockPressure() {
    const stockEl = document.getElementById('remainingStock');
    if (stockEl) {
        let remaining = 17;
        
        setInterval(() => {
            if (Math.random() < 0.3 && remaining > 3) { // 30% 확률로 감소
                remaining--;
                stockEl.textContent = remaining;
                
                // 5개 이하일 때 빨간색 경고
                if (remaining <= 5) {
                    stockEl.style.color = '#FF3B30';
                    stockEl.style.fontWeight = '800';
                }
            }
        }, 20000); // 20초마다 체크
    }
}

function showRecentBuyers() {
    const buyerAlert = document.querySelector('.buyer-alert');
    if (!buyerAlert) return;
    
    const names = ['김*영', '이*수', '박*민', '최*화', '정*우', '강*희', '윤*진', '장*영'];
    
    setInterval(() => {
        const randomName = names[Math.floor(Math.random() * names.length)];
        buyerAlert.innerHTML = `📢 ${randomName}님이 방금 구매하셨습니다!`;
        
        // 애니메이션 효과
        buyerAlert.style.animation = 'slideInRight 0.5s ease-out';
        setTimeout(() => {
            buyerAlert.style.animation = '';
        }, 500);
    }, 25000); // 25초마다 업데이트
}

window.closePremium = function() {
    console.log('프리미엄 모달 닫기');
    const modal = document.getElementById('premiumModal');
    if (modal) {
        modal.style.display = 'none';
    }
};

window.buyPremium = function() {
    console.log('프리미엄 구매');
    alert('프리미엄 기능은 준비 중입니다!');
};

window.giftPremium = function() {
    console.log('프리미엄 선물');
    alert('선물 기능은 준비 중입니다!');
};

window.openFeedback = function() {
    console.log('피드백 열기');
    alert('의견을 보내주세요: mbti2025@example.com');
};

// 나머지 누락된 함수들
window.copyInviteCode = function() {
    const code = 'MBTI2025';
    navigator.clipboard.writeText(code);
    alert('초대 코드가 복사되었습니다: ' + code);
};

window.shareKakaoInvite = function() {
    window.shareKakao();
};

window.shareLinkInvite = function() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('링크가 복사되었습니다!');
};

window.showTerms = function() {
    alert('이용약관 페이지');
};

window.showPrivacy = function() {
    alert('개인정보처리방침 페이지');
};

window.showContact = function() {
    alert('문의하기: mbti2025@example.com');
};

window.startTest = function() {
    AppState.skipTest = false;
    ScreenManager.show('name');
};

window.startFreeTrial = function() {
    console.log('무료체험 시작');
    alert('7일 무료체험이 시작됩니다! 🎉\n모든 프리미엄 기능을 무료로 체험해보세요.');
    window.closePremium();
};

window.showPremium = function() {
    console.log('프리미엄 모달 표시');
    // 프리미엄 모달 표시 로직
};

window.closePremium = function() {
    console.log('프리미엄 모달 닫기');
    // 프리미엄 모달 닫기 로직
};

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