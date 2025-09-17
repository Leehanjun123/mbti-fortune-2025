/**
 * MBTI Growth Platform - Core JavaScript
 * 성장 중심 MBTI 플랫폼 핵심 기능
 */

// MBTI 테스트 질문 (심리학적 검증된 질문)
const testQuestions = [
    {
        dimension: 'EI',
        question: "팀 프로젝트를 진행할 때, 당신은?",
        optionA: "브레인스토밍과 토론을 통해 아이디어를 발전시킨다",
        optionB: "혼자 깊이 생각한 후 완성된 아이디어를 제시한다"
    },
    {
        dimension: 'EI',
        question: "새로운 환경에 적응할 때, 당신은?",
        optionA: "적극적으로 사람들과 교류하며 정보를 얻는다",
        optionB: "조용히 관찰하며 상황을 파악한다"
    },
    {
        dimension: 'SN',
        question: "업무 계획을 세울 때, 당신은?",
        optionA: "구체적인 단계와 실행 가능한 목표에 집중한다",
        optionB: "큰 그림과 장기적인 비전을 먼저 그린다"
    },
    {
        dimension: 'SN',
        question: "문제를 해결할 때, 당신은?",
        optionA: "과거의 경험과 검증된 방법을 활용한다",
        optionB: "새롭고 창의적인 접근을 시도한다"
    },
    {
        dimension: 'TF',
        question: "팀원과 갈등이 생겼을 때, 당신은?",
        optionA: "객관적인 사실과 논리로 해결책을 찾는다",
        optionB: "상대방의 감정과 관계 회복을 우선시한다"
    },
    {
        dimension: 'TF',
        question: "중요한 결정을 내릴 때, 당신은?",
        optionA: "데이터와 분석을 기반으로 판단한다",
        optionB: "가치관과 사람들에게 미칠 영향을 고려한다"
    },
    {
        dimension: 'JP',
        question: "프로젝트를 진행할 때, 당신은?",
        optionA: "명확한 일정과 체계적인 계획을 선호한다",
        optionB: "유연하게 상황에 맞춰 조정하는 것을 선호한다"
    },
    {
        dimension: 'JP',
        question: "일상생활에서 당신은?",
        optionA: "계획된 일정을 따르는 것이 편안하다",
        optionB: "즉흥적이고 자유로운 것이 편안하다"
    }
];

// 현재 상태 관리
let currentState = {
    testProgress: 0,
    answers: [],
    mbtiType: null,
    user: null
};

// 테스트 시작
function startTest() {
    document.body.innerHTML = `
        <div class="test-container">
            <div class="test-header">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <span class="progress-text">0 / ${testQuestions.length}</span>
            </div>
            <div id="questionArea"></div>
        </div>
    `;
    
    showQuestion(0);
}

// 질문 표시
function showQuestion(index) {
    if (index >= testQuestions.length) {
        calculateResult();
        return;
    }
    
    const question = testQuestions[index];
    const progress = ((index + 1) / testQuestions.length) * 100;
    
    document.querySelector('.progress-fill').style.width = `${progress}%`;
    document.querySelector('.progress-text').textContent = `${index + 1} / ${testQuestions.length}`;
    
    document.getElementById('questionArea').innerHTML = `
        <div class="question-card">
            <h2 class="question-text">${question.question}</h2>
            <div class="options">
                <button class="option-btn" onclick="selectAnswer('${question.dimension}', 'A', ${index})">
                    ${question.optionA}
                </button>
                <button class="option-btn" onclick="selectAnswer('${question.dimension}', 'B', ${index})">
                    ${question.optionB}
                </button>
            </div>
        </div>
    `;
}

// 답변 선택
function selectAnswer(dimension, choice, index) {
    currentState.answers.push({ dimension, choice });
    
    // 애니메이션
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    setTimeout(() => {
        showQuestion(index + 1);
    }, 300);
}

// 결과 계산
function calculateResult() {
    const scores = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
    };
    
    currentState.answers.forEach(answer => {
        if (answer.dimension === 'EI') {
            answer.choice === 'A' ? scores.E++ : scores.I++;
        } else if (answer.dimension === 'SN') {
            answer.choice === 'A' ? scores.S++ : scores.N++;
        } else if (answer.dimension === 'TF') {
            answer.choice === 'A' ? scores.T++ : scores.F++;
        } else if (answer.dimension === 'JP') {
            answer.choice === 'A' ? scores.J++ : scores.P++;
        }
    });
    
    const mbti = 
        (scores.E > scores.I ? 'E' : 'I') +
        (scores.S > scores.N ? 'S' : 'N') +
        (scores.T > scores.F ? 'T' : 'F') +
        (scores.J > scores.P ? 'J' : 'P');
    
    currentState.mbtiType = mbti;
    showResult(mbti);
}

// 결과 표시
function showResult(mbti) {
    const profiles = getMBTIProfile(mbti);
    
    document.body.innerHTML = `
        <div class="result-container">
            <div class="result-header">
                <h1>당신의 MBTI 유형</h1>
                <div class="mbti-type">${mbti}</div>
                <h2>${profiles.title}</h2>
            </div>
            
            <div class="result-content">
                <div class="profile-section">
                    <h3>🎯 핵심 특징</h3>
                    <p>${profiles.description}</p>
                </div>
                
                <div class="strength-section">
                    <h3>💪 당신의 강점</h3>
                    <ul>
                        ${profiles.strengths.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="growth-section">
                    <h3>🌱 성장 포인트</h3>
                    <ul>
                        ${profiles.growthAreas.map(g => `<li>${g}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="career-section">
                    <h3>💼 추천 커리어</h3>
                    <ul>
                        ${profiles.careers.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="cta-section">
                <h2>이제 본격적인 성장을 시작하세요</h2>
                <p>매일 업데이트되는 ${mbti} 맞춤 콘텐츠와 함께 성장하세요</p>
                <button class="btn-primary" onclick="showSignup()">무료로 시작하기</button>
            </div>
        </div>
    `;
}

// MBTI 프로필 데이터
function getMBTIProfile(type) {
    const profiles = {
        'INTJ': {
            title: '전략가',
            description: '독립적이고 전략적인 사고를 가진 완벽주의자',
            strengths: ['체계적 사고', '장기 계획 수립', '효율성 추구', '독립적 문제해결'],
            growthAreas: ['감정 표현 연습', '팀워크 강화', '유연성 개발'],
            careers: ['전략 컨설턴트', '데이터 분석가', 'CTO', '연구원']
        },
        'ENFP': {
            title: '활동가',
            description: '열정적이고 창의적인 자유로운 영혼',
            strengths: ['창의적 발상', '대인관계', '열정과 에너지', '적응력'],
            growthAreas: ['집중력 향상', '체계적 실행', '일관성 유지'],
            careers: ['마케터', '기획자', '카운슬러', '크리에이터']
        }
        // ... 16개 유형 모두 추가
    };
    
    return profiles[type] || profiles['INTJ']; // 기본값
}

// 회원가입 표시
function showSignup() {
    document.querySelector('.cta-section').innerHTML = `
        <div class="signup-form">
            <h3>무료 계정 만들기</h3>
            <input type="email" placeholder="이메일" id="email">
            <input type="password" placeholder="비밀번호" id="password">
            <button class="btn-primary" onclick="createAccount()">계정 만들기</button>
            <p class="terms">가입 시 <a href="#">이용약관</a>과 <a href="#">개인정보처리방침</a>에 동의합니다</p>
        </div>
    `;
}

// 계정 생성
function createAccount() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('이메일과 비밀번호를 입력해주세요');
        return;
    }
    
    // 실제로는 서버 API 호출
    localStorage.setItem('user', JSON.stringify({
        email,
        mbti: currentState.mbtiType,
        joinDate: new Date().toISOString()
    }));
    
    window.location.href = '/dashboard';
}

// 콘텐츠 탭 전환
function showContent(type) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    const contents = {
        'daily': [
            { mbti: 'INTJ', title: '전략적 사고력을 실무에 활용하는 5가지 방법' },
            { mbti: 'ENFP', title: '열정을 지속가능한 성과로 만드는 법' }
        ],
        'guide': [
            { mbti: 'ISTP', title: '실용적 문제해결 능력 극대화 가이드' },
            { mbti: 'ENFJ', title: '리더십과 공감 능력 활용법' }
        ],
        'case': [
            { mbti: 'ENTJ', title: '스타트업 CEO가 된 ENTJ의 성장 스토리' },
            { mbti: 'ISFP', title: '예술가에서 UX 디자이너로, ISFP의 전환' }
        ]
    };
    
    const display = document.getElementById('contentDisplay');
    display.innerHTML = contents[type].map(item => `
        <div class="content-item">
            <span class="content-badge">${item.mbti}</span>
            <h4>${item.title}</h4>
            <button class="btn-read">읽기 →</button>
        </div>
    `).join('');
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.value-card, .community-card, .testimonial').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    
    // 숫자 카운트업 애니메이션
    const animateCount = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 20);
    };
    
    // 통계 숫자 애니메이션
    const stats = document.querySelector('.hero-stats span');
    if (stats && stats.textContent.includes('52,847')) {
        stats.textContent = '✨ 이미 0명이 성장중';
        setTimeout(() => {
            const span = document.createElement('span');
            stats.textContent = '✨ 이미 ';
            stats.appendChild(span);
            stats.appendChild(document.createTextNode('명이 성장중'));
            animateCount(span, 52847);
        }, 500);
    }
});