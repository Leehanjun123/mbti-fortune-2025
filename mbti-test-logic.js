// MBTI 테스트 로직 - 정교한 알고리즘
const MBTITestSystem = {
    // 확장된 질문 데이터베이스
    questions: {
        quick: [
            // 5문항 빠른 테스트
            {
                id: 'q1',
                dimension: 'EI',
                text: "새로운 사람들과 만날 때 나는...",
                options: [
                    { text: "먼저 다가가서 대화를 시작한다", value: 'E', weight: 2 },
                    { text: "상대방이 먼저 다가올 때까지 기다린다", value: 'I', weight: 2 }
                ]
            },
            {
                id: 'q2',
                dimension: 'SN',
                text: "일을 처리할 때 나는...",
                options: [
                    { text: "구체적인 사실과 세부사항을 중시한다", value: 'S', weight: 2 },
                    { text: "전체적인 패턴과 가능성을 본다", value: 'N', weight: 2 }
                ]
            },
            {
                id: 'q3',
                dimension: 'TF',
                text: "결정을 내릴 때 나는...",
                options: [
                    { text: "논리와 일관성을 우선시한다", value: 'T', weight: 2 },
                    { text: "사람과 감정을 우선시한다", value: 'F', weight: 2 }
                ]
            },
            {
                id: 'q4',
                dimension: 'JP',
                text: "일상생활에서 나는...",
                options: [
                    { text: "계획을 세우고 그대로 실행한다", value: 'J', weight: 2 },
                    { text: "상황에 따라 유연하게 대처한다", value: 'P', weight: 2 }
                ]
            },
            {
                id: 'q5',
                dimension: 'EI',
                text: "주말을 보낼 때 나는...",
                options: [
                    { text: "친구들과 활발하게 시간을 보낸다", value: 'E', weight: 1 },
                    { text: "혼자만의 시간을 충분히 갖는다", value: 'I', weight: 1 }
                ]
            }
        ],
        
        detailed: [
            // 20문항 상세 테스트
            // E/I 차원 (5문항)
            {
                dimension: 'EI',
                text: "파티나 모임에서 나는...",
                options: [
                    { text: "많은 사람과 어울리며 에너지를 얻는다", value: 'E', weight: 2 },
                    { text: "조용한 곳에서 소수와 대화하는 것을 선호한다", value: 'I', weight: 2 }
                ]
            },
            {
                dimension: 'EI',
                text: "생각을 정리할 때 나는...",
                options: [
                    { text: "말하면서 생각을 정리한다", value: 'E', weight: 1 },
                    { text: "혼자 조용히 생각을 정리한다", value: 'I', weight: 1 }
                ]
            },
            {
                dimension: 'EI',
                text: "새로운 프로젝트를 시작할 때...",
                options: [
                    { text: "팀과 브레인스토밍하며 시작한다", value: 'E', weight: 1 },
                    { text: "혼자 계획을 세운 후 공유한다", value: 'I', weight: 1 }
                ]
            },
            {
                dimension: 'EI',
                text: "스트레스를 받으면...",
                options: [
                    { text: "친구들과 만나 이야기를 나눈다", value: 'E', weight: 2 },
                    { text: "혼자만의 시간을 갖는다", value: 'I', weight: 2 }
                ]
            },
            {
                dimension: 'EI',
                text: "회의나 토론에서...",
                options: [
                    { text: "적극적으로 의견을 제시한다", value: 'E', weight: 1 },
                    { text: "신중하게 듣고 필요시 발언한다", value: 'I', weight: 1 }
                ]
            },
            
            // S/N 차원 (5문항)
            {
                dimension: 'SN',
                text: "새로운 것을 배울 때...",
                options: [
                    { text: "실습과 예제를 통해 배운다", value: 'S', weight: 2 },
                    { text: "이론과 개념을 먼저 이해한다", value: 'N', weight: 2 }
                ]
            },
            {
                dimension: 'SN',
                text: "문제를 해결할 때...",
                options: [
                    { text: "검증된 방법을 활용한다", value: 'S', weight: 1 },
                    { text: "새로운 방법을 시도해본다", value: 'N', weight: 1 }
                ]
            },
            {
                dimension: 'SN',
                text: "대화할 때 나는...",
                options: [
                    { text: "구체적인 사실과 경험을 이야기한다", value: 'S', weight: 1 },
                    { text: "아이디어와 가능성을 이야기한다", value: 'N', weight: 1 }
                ]
            },
            {
                dimension: 'SN',
                text: "미래를 생각할 때...",
                options: [
                    { text: "현실적이고 달성 가능한 목표를 세운다", value: 'S', weight: 2 },
                    { text: "큰 비전과 꿈을 그린다", value: 'N', weight: 2 }
                ]
            },
            {
                dimension: 'SN',
                text: "설명서를 볼 때...",
                options: [
                    { text: "단계별로 차근차근 따라간다", value: 'S', weight: 1 },
                    { text: "전체적으로 훑어본 후 필요한 부분만 본다", value: 'N', weight: 1 }
                ]
            },
            
            // T/F 차원 (5문항)
            {
                dimension: 'TF',
                text: "비판을 받았을 때...",
                options: [
                    { text: "객관적으로 받아들이고 개선점을 찾는다", value: 'T', weight: 2 },
                    { text: "감정적으로 상처받고 관계를 걱정한다", value: 'F', weight: 2 }
                ]
            },
            {
                dimension: 'TF',
                text: "누군가를 도울 때...",
                options: [
                    { text: "문제를 해결하는 방법을 알려준다", value: 'T', weight: 1 },
                    { text: "공감하고 위로를 먼저 한다", value: 'F', weight: 1 }
                ]
            },
            {
                dimension: 'TF',
                text: "의견 충돌이 있을 때...",
                options: [
                    { text: "논리적으로 옳고 그름을 따진다", value: 'T', weight: 2 },
                    { text: "관계 유지를 위해 타협점을 찾는다", value: 'F', weight: 2 }
                ]
            },
            {
                dimension: 'TF',
                text: "칭찬을 할 때...",
                options: [
                    { text: "구체적인 성과를 인정한다", value: 'T', weight: 1 },
                    { text: "노력과 마음을 인정한다", value: 'F', weight: 1 }
                ]
            },
            {
                dimension: 'TF',
                text: "팀 프로젝트에서...",
                options: [
                    { text: "효율성과 결과를 중시한다", value: 'T', weight: 1 },
                    { text: "팀워크와 분위기를 중시한다", value: 'F', weight: 1 }
                ]
            },
            
            // J/P 차원 (5문항)
            {
                dimension: 'JP',
                text: "여행을 갈 때...",
                options: [
                    { text: "세부 일정을 미리 계획한다", value: 'J', weight: 2 },
                    { text: "대략적인 계획만 세우고 즉흥적으로 움직인다", value: 'P', weight: 2 }
                ]
            },
            {
                dimension: 'JP',
                text: "일을 마감할 때...",
                options: [
                    { text: "미리미리 준비해서 여유있게 끝낸다", value: 'J', weight: 2 },
                    { text: "마감이 임박해서 집중력을 발휘한다", value: 'P', weight: 2 }
                ]
            },
            {
                dimension: 'JP',
                text: "작업 공간은...",
                options: [
                    { text: "정리정돈이 잘 되어 있다", value: 'J', weight: 1 },
                    { text: "창의적인 무질서가 있다", value: 'P', weight: 1 }
                ]
            },
            {
                dimension: 'JP',
                text: "변화가 생겼을 때...",
                options: [
                    { text: "불안하고 계획을 다시 세운다", value: 'J', weight: 1 },
                    { text: "흥미롭고 새로운 기회로 본다", value: 'P', weight: 1 }
                ]
            },
            {
                dimension: 'JP',
                text: "주말 계획은...",
                options: [
                    { text: "미리 정해두고 실행한다", value: 'J', weight: 1 },
                    { text: "그날의 기분에 따라 정한다", value: 'P', weight: 1 }
                ]
            }
        ]
    },
    
    // 점수 계산 알고리즘
    calculateMBTI(answers) {
        const scores = {
            E: 0, I: 0,
            S: 0, N: 0,
            T: 0, F: 0,
            J: 0, P: 0
        };
        
        // 가중치를 적용한 점수 계산
        answers.forEach(answer => {
            scores[answer.value] += answer.weight || 1;
        });
        
        // 백분율 계산
        const percentages = {
            E: Math.round((scores.E / (scores.E + scores.I)) * 100),
            I: Math.round((scores.I / (scores.E + scores.I)) * 100),
            S: Math.round((scores.S / (scores.S + scores.N)) * 100),
            N: Math.round((scores.N / (scores.S + scores.N)) * 100),
            T: Math.round((scores.T / (scores.T + scores.F)) * 100),
            F: Math.round((scores.F / (scores.T + scores.F)) * 100),
            J: Math.round((scores.J / (scores.J + scores.P)) * 100),
            P: Math.round((scores.P / (scores.J + scores.P)) * 100)
        };
        
        // MBTI 타입 결정
        const mbtiType = 
            (scores.E >= scores.I ? 'E' : 'I') +
            (scores.S >= scores.N ? 'S' : 'N') +
            (scores.T >= scores.F ? 'T' : 'F') +
            (scores.J >= scores.P ? 'J' : 'P');
        
        return {
            type: mbtiType,
            scores: scores,
            percentages: percentages,
            dominantFunction: this.getDominantFunction(mbtiType),
            cognitiveStack: this.getCognitiveStack(mbtiType)
        };
    },
    
    // 주도 기능 분석
    getDominantFunction(mbtiType) {
        const dominantFunctions = {
            'INTJ': 'Ni (내향 직관)',
            'INTP': 'Ti (내향 사고)',
            'ENTJ': 'Te (외향 사고)',
            'ENTP': 'Ne (외향 직관)',
            'INFJ': 'Ni (내향 직관)',
            'INFP': 'Fi (내향 감정)',
            'ENFJ': 'Fe (외향 감정)',
            'ENFP': 'Ne (외향 직관)',
            'ISTJ': 'Si (내향 감각)',
            'ISFJ': 'Si (내향 감각)',
            'ESTJ': 'Te (외향 사고)',
            'ESFJ': 'Fe (외향 감정)',
            'ISTP': 'Ti (내향 사고)',
            'ISFP': 'Fi (내향 감정)',
            'ESTP': 'Se (외향 감각)',
            'ESFP': 'Se (외향 감각)'
        };
        
        return dominantFunctions[mbtiType];
    },
    
    // 인지 기능 스택
    getCognitiveStack(mbtiType) {
        const cognitiveStacks = {
            'INTJ': ['Ni', 'Te', 'Fi', 'Se'],
            'INTP': ['Ti', 'Ne', 'Si', 'Fe'],
            'ENTJ': ['Te', 'Ni', 'Se', 'Fi'],
            'ENTP': ['Ne', 'Ti', 'Fe', 'Si'],
            'INFJ': ['Ni', 'Fe', 'Ti', 'Se'],
            'INFP': ['Fi', 'Ne', 'Si', 'Te'],
            'ENFJ': ['Fe', 'Ni', 'Se', 'Ti'],
            'ENFP': ['Ne', 'Fi', 'Te', 'Si'],
            'ISTJ': ['Si', 'Te', 'Fi', 'Ne'],
            'ISFJ': ['Si', 'Fe', 'Ti', 'Ne'],
            'ESTJ': ['Te', 'Si', 'Ne', 'Fi'],
            'ESFJ': ['Fe', 'Si', 'Ne', 'Ti'],
            'ISTP': ['Ti', 'Se', 'Ni', 'Fe'],
            'ISFP': ['Fi', 'Se', 'Ni', 'Te'],
            'ESTP': ['Se', 'Ti', 'Fe', 'Ni'],
            'ESFP': ['Se', 'Fi', 'Te', 'Ni']
        };
        
        return cognitiveStacks[mbtiType];
    },
    
    // 호환성 분석
    getCompatibility(type1, type2) {
        // 인지 기능 기반 호환성 점수
        const stack1 = this.getCognitiveStack(type1);
        const stack2 = this.getCognitiveStack(type2);
        
        let compatibilityScore = 0;
        
        // 주도 기능 보완성 체크
        if (stack1[0] !== stack2[0]) {
            compatibilityScore += 30;
        }
        
        // 보조 기능 호환성
        if (stack1[1] === stack2[2] || stack1[2] === stack2[1]) {
            compatibilityScore += 25;
        }
        
        // 같은 인식 기능 (S/N) 공유
        const perception1 = type1[1];
        const perception2 = type2[1];
        if (perception1 === perception2) {
            compatibilityScore += 20;
        }
        
        // 판단 기능 균형
        const judging1 = type1[2];
        const judging2 = type2[2];
        if (judging1 !== judging2) {
            compatibilityScore += 15;
        }
        
        // 생활 스타일 호환
        const lifestyle1 = type1[3];
        const lifestyle2 = type2[3];
        if (lifestyle1 === lifestyle2) {
            compatibilityScore += 10;
        }
        
        return Math.min(compatibilityScore, 95);
    },
    
    // 성장 조언 생성
    getGrowthAdvice(mbtiType) {
        const growthPaths = {
            'INTJ': {
                strengths: ['전략적 사고', '독립성', '결단력'],
                challenges: ['감정 표현', '유연성', '인내심'],
                advice: '감정 지능을 개발하고, 타인의 관점을 더 고려해보세요.'
            },
            'INTP': {
                strengths: ['논리적 분석', '창의성', '객관성'],
                challenges: ['감정 이해', '실행력', '사회성'],
                advice: '아이디어를 실행에 옮기는 연습을 하고, 대인관계 기술을 향상시키세요.'
            },
            'ENTJ': {
                strengths: ['리더십', '효율성', '목표 지향'],
                challenges: ['공감', '인내', '세부사항'],
                advice: '타인의 감정을 더 고려하고, 과정도 결과만큼 중요함을 인식하세요.'
            },
            'ENTP': {
                strengths: ['혁신성', '적응력', '토론 능력'],
                challenges: ['완수', '감정 배려', '일관성'],
                advice: '프로젝트를 끝까지 완성하는 습관을 기르고, 타인의 감정을 존중하세요.'
            },
            'INFJ': {
                strengths: ['통찰력', '공감', '창의성'],
                challenges: ['경계 설정', '완벽주의', '갈등 대처'],
                advice: '자신의 니즈도 중요시하고, 완벽하지 않아도 괜찮다는 것을 받아들이세요.'
            },
            'INFP': {
                strengths: ['이상주의', '창의성', '진정성'],
                challenges: ['현실성', '비판 수용', '결단력'],
                advice: '이상과 현실의 균형을 찾고, 건설적인 비판을 성장의 기회로 삼으세요.'
            },
            'ENFJ': {
                strengths: ['카리스마', '공감', '조직력'],
                challenges: ['자기 관리', '비판 수용', '경계'],
                advice: '남을 돕는 것만큼 자신을 돌보는 것도 중요함을 기억하세요.'
            },
            'ENFP': {
                strengths: ['열정', '창의성', '대인관계'],
                challenges: ['집중력', '일관성', '현실성'],
                advice: '한 가지에 집중하는 연습을 하고, 꿈을 현실로 만드는 구체적 계획을 세우세요.'
            },
            'ISTJ': {
                strengths: ['신뢰성', '체계성', '책임감'],
                challenges: ['유연성', '혁신', '감정 표현'],
                advice: '변화를 기회로 받아들이고, 감정을 표현하는 것도 중요함을 인식하세요.'
            },
            'ISFJ': {
                strengths: ['헌신', '세심함', '신뢰성'],
                challenges: ['자기주장', '변화 수용', '자기 관리'],
                advice: '자신의 의견을 표현하는 연습을 하고, 때로는 아니라고 말하는 것도 필요합니다.'
            },
            'ESTJ': {
                strengths: ['리더십', '조직력', '실행력'],
                challenges: ['감정 이해', '유연성', '인내'],
                advice: '타인의 감정과 의견을 더 고려하고, 모든 것을 통제할 수 없음을 받아들이세요.'
            },
            'ESFJ': {
                strengths: ['협조성', '책임감', '사교성'],
                challenges: ['비판 수용', '자기주장', '변화'],
                advice: '모든 사람을 만족시킬 수 없음을 인정하고, 자신의 니즈도 중요시하세요.'
            },
            'ISTP': {
                strengths: ['실용성', '논리성', '독립성'],
                challenges: ['감정 표현', '장기 계획', '대인관계'],
                advice: '감정을 인정하고 표현하는 연습을 하고, 미래를 위한 계획도 세워보세요.'
            },
            'ISFP': {
                strengths: ['예술성', '진정성', '유연성'],
                challenges: ['자기주장', '비판 대처', '계획성'],
                advice: '자신의 가치를 표현하는 용기를 갖고, 구조화된 접근도 때로는 도움이 됩니다.'
            },
            'ESTP': {
                strengths: ['행동력', '현실성', '적응력'],
                challenges: ['장기 계획', '감정 고려', '인내'],
                advice: '행동하기 전에 결과를 고려하고, 장기적 목표도 설정해보세요.'
            },
            'ESFP': {
                strengths: ['열정', '사교성', '현재 집중'],
                challenges: ['장기 계획', '비판 수용', '심각한 주제'],
                advice: '미래를 위한 계획도 중요하고, 깊이 있는 대화도 가치 있음을 인식하세요.'
            }
        };
        
        return growthPaths[mbtiType];
    },
    
    // 커리어 추천
    getCareerSuggestions(mbtiType) {
        const careers = {
            'INTJ': ['전략 컨설턴트', '데이터 과학자', '시스템 설계자', 'CEO', '투자 분석가'],
            'INTP': ['연구원', '소프트웨어 개발자', '철학자', '건축가', '데이터 분석가'],
            'ENTJ': ['경영자', '기업가', '변호사', '컨설턴트', '투자 은행가'],
            'ENTP': ['기업가', '마케팅 전략가', '제품 매니저', '벤처 투자가', '크리에이티브 디렉터'],
            'INFJ': ['상담사', '작가', 'UX 디자이너', '교육자', '사회사업가'],
            'INFP': ['작가', '심리상담사', '예술가', '인권 활동가', '콘텐츠 크리에이터'],
            'ENFJ': ['교사', 'HR 매니저', '라이프 코치', '이벤트 기획자', '정치인'],
            'ENFP': ['마케터', '이벤트 기획자', '저널리스트', '배우', '스타트업 창업자'],
            'ISTJ': ['회계사', '프로젝트 매니저', '법무사', '데이터베이스 관리자', '품질 관리자'],
            'ISFJ': ['간호사', '교사', '행정 관리자', '사서', '사회복지사'],
            'ESTJ': '관리자', '재무 분석가', '판사', '부동산 개발자', '군 장교'],
            'ESFJ': ['교사', '의료진', '이벤트 코디네이터', '영업 매니저', 'PR 전문가'],
            'ISTP': ['엔지니어', '파일럿', '법의학자', '정비사', '프로그래머'],
            'ISFP': ['그래픽 디자이너', '사진작가', '인테리어 디자이너', '요리사', '수의사'],
            'ESTP': ['영업 전문가', '스포츠 코치', '경찰관', '기업가', '증권 트레이더'],
            'ESFP': ['배우', '이벤트 기획자', '영업 사원', '피트니스 트레이너', '여행 가이드']
        };
        
        return careers[mbtiType] || [];
    },
    
    // 일일 운세 생성 (MBTI 특성 기반)
    getDailyFortune(mbtiType) {
        const date = new Date();
        const seed = date.getDate() + date.getMonth() + mbtiType.charCodeAt(0);
        
        const fortunes = {
            love: [
                '오늘은 특별한 인연을 만날 수 있는 날입니다.',
                '기존 관계가 더욱 깊어질 수 있는 기회가 찾아옵니다.',
                '솔직한 대화가 관계를 발전시킬 것입니다.',
                '자신을 먼저 사랑하는 시간을 가져보세요.',
                '예상치 못한 곳에서 로맨스가 시작될 수 있습니다.'
            ],
            career: [
                '새로운 프로젝트가 당신의 능력을 발휘할 기회가 됩니다.',
                '동료와의 협업이 큰 성과를 가져올 것입니다.',
                '리더십을 발휘할 절호의 기회가 찾아옵니다.',
                '창의적인 아이디어가 인정받을 때입니다.',
                '꾸준한 노력이 결실을 맺는 날입니다.'
            ],
            health: [
                '충분한 휴식이 필요한 시기입니다.',
                '새로운 운동을 시작하기 좋은 날입니다.',
                '정신적 스트레스 관리에 신경 쓰세요.',
                '균형 잡힌 식단이 활력을 더해줄 것입니다.',
                '야외 활동이 에너지를 충전시켜 줄 것입니다.'
            ],
            wealth: [
                '예상치 못한 수입이 발생할 수 있습니다.',
                '투자에 신중을 기하되 기회를 놓치지 마세요.',
                '절약의 습관이 미래의 부를 만듭니다.',
                '새로운 수익원을 발견할 수 있는 날입니다.',
                '재정 계획을 재검토하기 좋은 시기입니다.'
            ]
        };
        
        const luckyNumber = (seed % 100) + 1;
        const luckyColor = ['빨강', '파랑', '초록', '노랑', '보라', '주황', '분홍', '하늘색'][seed % 8];
        
        return {
            love: fortunes.love[seed % fortunes.love.length],
            career: fortunes.career[seed % fortunes.career.length],
            health: fortunes.health[seed % fortunes.health.length],
            wealth: fortunes.wealth[seed % fortunes.wealth.length],
            luckyNumber: luckyNumber,
            luckyColor: luckyColor,
            overallScore: 60 + (seed % 40)
        };
    },
    
    // 테스트 결과 저장
    saveTestResult(result) {
        const testHistory = JSON.parse(localStorage.getItem('mbtiTestHistory') || '[]');
        
        const newResult = {
            ...result,
            timestamp: new Date().toISOString(),
            id: Date.now().toString()
        };
        
        testHistory.unshift(newResult);
        
        // 최대 10개까지만 저장
        if (testHistory.length > 10) {
            testHistory.pop();
        }
        
        localStorage.setItem('mbtiTestHistory', JSON.stringify(testHistory));
        localStorage.setItem('currentMBTI', result.type);
        
        return newResult;
    },
    
    // 테스트 히스토리 조회
    getTestHistory() {
        return JSON.parse(localStorage.getItem('mbtiTestHistory') || '[]');
    },
    
    // 통계 데이터 생성
    generateStatistics(mbtiType) {
        // 실제 통계 데이터 (근사치)
        const population = {
            'INTJ': 2.1, 'INTP': 3.3, 'ENTJ': 1.8, 'ENTP': 3.2,
            'INFJ': 1.5, 'INFP': 4.4, 'ENFJ': 2.5, 'ENFP': 8.1,
            'ISTJ': 11.6, 'ISFJ': 13.8, 'ESTJ': 8.7, 'ESFJ': 12.0,
            'ISTP': 5.4, 'ISFP': 8.8, 'ESTP': 4.3, 'ESFP': 8.5
        };
        
        const genderRatio = {
            'INTJ': { male: 67, female: 33 },
            'INTP': { male: 73, female: 27 },
            'ENTJ': { male: 70, female: 30 },
            'ENTP': { male: 60, female: 40 },
            'INFJ': { male: 28, female: 72 },
            'INFP': { male: 35, female: 65 },
            'ENFJ': { male: 33, female: 67 },
            'ENFP': { male: 35, female: 65 },
            'ISTJ': { male: 62, female: 38 },
            'ISFJ': { male: 29, female: 71 },
            'ESTJ': { male: 63, female: 37 },
            'ESFJ': { male: 30, female: 70 },
            'ISTP': { male: 75, female: 25 },
            'ISFP': { male: 40, female: 60 },
            'ESTP': { male: 70, female: 30 },
            'ESFP': { male: 35, female: 65 }
        };
        
        return {
            populationPercentage: population[mbtiType],
            genderRatio: genderRatio[mbtiType],
            rarity: population[mbtiType] < 3 ? '희귀' : population[mbtiType] < 6 ? '보통' : '흔함'
        };
    }
};

// 전역 객체로 내보내기
if (typeof window !== 'undefined') {
    window.MBTITestSystem = MBTITestSystem;
}

// Node.js 환경 지원
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MBTITestSystem;
}