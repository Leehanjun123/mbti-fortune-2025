// MBTI 핵심 테스트 시스템 - 업계 표준 기반
class MBTITestCore {
    constructor() {
        this.questions = this.loadQuestions();
        this.currentQuestion = 0;
        this.answers = [];
        this.dimensions = {
            E: 0, I: 0,  // Extraversion vs Introversion
            S: 0, N: 0,  // Sensing vs Intuition
            T: 0, F: 0,  // Thinking vs Feeling
            J: 0, P: 0   // Judging vs Perceiving
        };
    }

    loadQuestions() {
        return [
            // E/I 차원 (외향/내향)
            {
                id: 1,
                text: "파티나 모임에서 당신은",
                options: [
                    { text: "많은 사람과 대화를 나누며 에너지를 얻는다", value: "E", weight: 2 },
                    { text: "많은 사람과 대화하는 것이 즐겁다", value: "E", weight: 1 },
                    { text: "중립적이다", value: null, weight: 0 },
                    { text: "소수의 친한 사람과만 대화한다", value: "I", weight: 1 },
                    { text: "조용히 관찰하며 혼자만의 시간을 갖는다", value: "I", weight: 2 }
                ]
            },
            {
                id: 2,
                text: "주말 계획을 세울 때",
                options: [
                    { text: "친구들과 활발한 활동을 계획한다", value: "E", weight: 2 },
                    { text: "사람들과 만나는 것을 선호한다", value: "E", weight: 1 },
                    { text: "상황에 따라 다르다", value: null, weight: 0 },
                    { text: "혼자만의 시간을 갖는 것을 선호한다", value: "I", weight: 1 },
                    { text: "집에서 조용히 쉬는 것이 최고다", value: "I", weight: 2 }
                ]
            },
            {
                id: 3,
                text: "새로운 사람을 만날 때",
                options: [
                    { text: "먼저 다가가서 대화를 시작한다", value: "E", weight: 2 },
                    { text: "쉽게 친해질 수 있다", value: "E", weight: 1 },
                    { text: "보통이다", value: null, weight: 0 },
                    { text: "상대방이 먼저 다가오기를 기다린다", value: "I", weight: 1 },
                    { text: "친해지는데 시간이 오래 걸린다", value: "I", weight: 2 }
                ]
            },

            // S/N 차원 (감각/직관)
            {
                id: 4,
                text: "문제를 해결할 때",
                options: [
                    { text: "구체적인 사실과 경험에 기반한다", value: "S", weight: 2 },
                    { text: "실용적인 방법을 선호한다", value: "S", weight: 1 },
                    { text: "상황에 따라 다르다", value: null, weight: 0 },
                    { text: "창의적인 아이디어를 시도한다", value: "N", weight: 1 },
                    { text: "혁신적이고 새로운 방법을 찾는다", value: "N", weight: 2 }
                ]
            },
            {
                id: 5,
                text: "새로운 것을 배울 때",
                options: [
                    { text: "단계별로 차근차근 배운다", value: "S", weight: 2 },
                    { text: "실습을 통해 배우는 것을 선호한다", value: "S", weight: 1 },
                    { text: "방법은 중요하지 않다", value: null, weight: 0 },
                    { text: "전체적인 개념을 먼저 이해한다", value: "N", weight: 1 },
                    { text: "이론과 원리를 파악하는 것이 중요하다", value: "N", weight: 2 }
                ]
            },
            {
                id: 6,
                text: "대화를 나눌 때",
                options: [
                    { text: "구체적이고 실제적인 주제를 선호한다", value: "S", weight: 2 },
                    { text: "현실적인 이야기를 주로 한다", value: "S", weight: 1 },
                    { text: "다양한 주제를 다룬다", value: null, weight: 0 },
                    { text: "추상적인 아이디어를 논의하길 좋아한다", value: "N", weight: 1 },
                    { text: "미래의 가능성과 비전을 이야기한다", value: "N", weight: 2 }
                ]
            },

            // T/F 차원 (사고/감정)
            {
                id: 7,
                text: "결정을 내릴 때",
                options: [
                    { text: "논리와 객관적 분석을 최우선으로 한다", value: "T", weight: 2 },
                    { text: "합리적인 판단을 중시한다", value: "T", weight: 1 },
                    { text: "균형을 맞춘다", value: null, weight: 0 },
                    { text: "사람들의 감정을 고려한다", value: "F", weight: 1 },
                    { text: "인간관계와 화합을 최우선으로 한다", value: "F", weight: 2 }
                ]
            },
            {
                id: 8,
                text: "비판을 받았을 때",
                options: [
                    { text: "객관적으로 받아들이고 개선점을 찾는다", value: "T", weight: 2 },
                    { text: "논리적으로 타당한지 분석한다", value: "T", weight: 1 },
                    { text: "상황에 따라 다르다", value: null, weight: 0 },
                    { text: "감정적으로 상처받기 쉽다", value: "F", weight: 1 },
                    { text: "인간관계에 미칠 영향을 걱정한다", value: "F", weight: 2 }
                ]
            },
            {
                id: 9,
                text: "친구가 고민을 털어놓을 때",
                options: [
                    { text: "해결책과 조언을 제시한다", value: "T", weight: 2 },
                    { text: "문제를 분석하고 대안을 찾아준다", value: "T", weight: 1 },
                    { text: "상황에 맞게 대응한다", value: null, weight: 0 },
                    { text: "공감하고 위로한다", value: "F", weight: 1 },
                    { text: "감정을 이해하고 지지해준다", value: "F", weight: 2 }
                ]
            },

            // J/P 차원 (판단/인식)
            {
                id: 10,
                text: "일상생활에서",
                options: [
                    { text: "계획을 세우고 그대로 실행한다", value: "J", weight: 2 },
                    { text: "일정을 미리 정하는 것을 선호한다", value: "J", weight: 1 },
                    { text: "때에 따라 다르다", value: null, weight: 0 },
                    { text: "유연하게 대처하는 것을 선호한다", value: "P", weight: 1 },
                    { text: "즉흥적이고 자유로운 것이 좋다", value: "P", weight: 2 }
                ]
            },
            {
                id: 11,
                text: "프로젝트를 진행할 때",
                options: [
                    { text: "마감일 훨씬 전에 완료한다", value: "J", weight: 2 },
                    { text: "체계적으로 진행한다", value: "J", weight: 1 },
                    { text: "적당히 진행한다", value: null, weight: 0 },
                    { text: "마감일에 임박해서 집중한다", value: "P", weight: 1 },
                    { text: "압박감 속에서 더 창의적이 된다", value: "P", weight: 2 }
                ]
            },
            {
                id: 12,
                text: "여행을 갈 때",
                options: [
                    { text: "세부 일정을 모두 계획한다", value: "J", weight: 2 },
                    { text: "대략적인 계획을 세운다", value: "J", weight: 1 },
                    { text: "반반 섞는다", value: null, weight: 0 },
                    { text: "현지에서 즉흥적으로 정한다", value: "P", weight: 1 },
                    { text: "계획 없이 떠나는 것이 진정한 여행이다", value: "P", weight: 2 }
                ]
            },

            // 추가 심화 질문들
            {
                id: 13,
                text: "에너지를 충전하는 방법은",
                options: [
                    { text: "사람들과 어울리며 활동한다", value: "E", weight: 2 },
                    { text: "외부 활동을 통해 충전한다", value: "E", weight: 1 },
                    { text: "상황에 따라 다르다", value: null, weight: 0 },
                    { text: "혼자만의 시간을 갖는다", value: "I", weight: 1 },
                    { text: "조용한 곳에서 휴식을 취한다", value: "I", weight: 2 }
                ]
            },
            {
                id: 14,
                text: "책을 읽을 때",
                options: [
                    { text: "실용서나 자기계발서를 선호한다", value: "S", weight: 2 },
                    { text: "현실적인 내용을 좋아한다", value: "S", weight: 1 },
                    { text: "장르를 가리지 않는다", value: null, weight: 0 },
                    { text: "판타지나 SF를 좋아한다", value: "N", weight: 1 },
                    { text: "철학이나 이론서를 즐긴다", value: "N", weight: 2 }
                ]
            },
            {
                id: 15,
                text: "팀 프로젝트에서",
                options: [
                    { text: "효율성과 성과를 최우선으로 한다", value: "T", weight: 2 },
                    { text: "목표 달성에 집중한다", value: "T", weight: 1 },
                    { text: "균형을 중시한다", value: null, weight: 0 },
                    { text: "팀워크와 분위기를 중시한다", value: "F", weight: 1 },
                    { text: "구성원 모두의 만족을 추구한다", value: "F", weight: 2 }
                ]
            },
            {
                id: 16,
                text: "변화에 대한 태도는",
                options: [
                    { text: "안정적이고 예측 가능한 것을 선호한다", value: "J", weight: 2 },
                    { text: "계획된 변화는 괜찮다", value: "J", weight: 1 },
                    { text: "상황에 따라 다르다", value: null, weight: 0 },
                    { text: "새로운 변화를 즐긴다", value: "P", weight: 1 },
                    { text: "예측 불가능한 상황이 흥미롭다", value: "P", weight: 2 }
                ]
            }
        ];
    }

    startTest() {
        this.currentQuestion = 0;
        this.answers = [];
        this.dimensions = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        return this.questions[0];
    }

    answerQuestion(optionIndex) {
        const question = this.questions[this.currentQuestion];
        const option = question.options[optionIndex];
        
        this.answers.push({
            questionId: question.id,
            answer: option
        });

        // 점수 계산
        if (option.value) {
            this.dimensions[option.value] += option.weight;
        }

        this.currentQuestion++;
        
        if (this.currentQuestion < this.questions.length) {
            return this.questions[this.currentQuestion];
        } else {
            return this.calculateResult();
        }
    }

    calculateResult() {
        const type = 
            (this.dimensions.E > this.dimensions.I ? 'E' : 'I') +
            (this.dimensions.S > this.dimensions.N ? 'S' : 'N') +
            (this.dimensions.T > this.dimensions.F ? 'T' : 'F') +
            (this.dimensions.J > this.dimensions.P ? 'J' : 'P');

        const percentages = {
            E: Math.round((this.dimensions.E / (this.dimensions.E + this.dimensions.I)) * 100) || 50,
            I: Math.round((this.dimensions.I / (this.dimensions.E + this.dimensions.I)) * 100) || 50,
            S: Math.round((this.dimensions.S / (this.dimensions.S + this.dimensions.N)) * 100) || 50,
            N: Math.round((this.dimensions.N / (this.dimensions.S + this.dimensions.N)) * 100) || 50,
            T: Math.round((this.dimensions.T / (this.dimensions.T + this.dimensions.F)) * 100) || 50,
            F: Math.round((this.dimensions.F / (this.dimensions.T + this.dimensions.F)) * 100) || 50,
            J: Math.round((this.dimensions.J / (this.dimensions.J + this.dimensions.P)) * 100) || 50,
            P: Math.round((this.dimensions.P / (this.dimensions.J + this.dimensions.P)) * 100) || 50
        };

        return {
            type: type,
            percentages: percentages,
            details: this.getTypeDetails(type)
        };
    }

    getTypeDetails(type) {
        const types = {
            'INTJ': {
                title: '전략가',
                description: '상상력이 풍부하며 철두철미한 계획을 세우는 전략가',
                strengths: ['전략적 사고', '독립적', '결단력', '높은 기준'],
                weaknesses: ['오만할 수 있음', '감정 표현 부족', '지나치게 비판적'],
                careers: ['과학자', '엔지니어', 'CEO', '전략 컨설턴트'],
                compatibility: ['ENFP', 'ENTP'],
                famous: ['일론 머스크', '마크 저커버그', '아이작 뉴턴']
            },
            'INTP': {
                title: '논리술사',
                description: '끊임없이 새로운 지식을 갈망하는 혁신적인 발명가',
                strengths: ['분석적', '객관적', '창의적', '논리적'],
                weaknesses: ['사회성 부족', '무감각', '의심이 많음'],
                careers: ['프로그래머', '수학자', '연구원', '철학자'],
                compatibility: ['ENTJ', 'ESTJ'],
                famous: ['빌 게이츠', '알버트 아인슈타인']
            },
            'ENTJ': {
                title: '통솔자',
                description: '대담하고 상상력이 풍부하며 의지가 강력한 지도자',
                strengths: ['카리스마', '자신감', '전략적', '효율적'],
                weaknesses: ['고집', '무자비함', '참을성 부족'],
                careers: ['CEO', '변호사', '정치인', '사업가'],
                compatibility: ['INTP', 'ISTP'],
                famous: ['스티브 잡스', '마거릿 대처']
            },
            'ENTP': {
                title: '변론가',
                description: '지적 도전을 즐기는 똑똑하고 호기심 많은 사색가',
                strengths: ['빠른 사고', '창의적', '카리스마', '적응력'],
                weaknesses: ['논쟁적', '무감각', '집중력 부족'],
                careers: ['기업가', '변호사', '과학자', '마케터'],
                compatibility: ['INFJ', 'INTJ'],
                famous: ['토마스 에디슨', '마크 트웨인']
            },
            'INFJ': {
                title: '옹호자',
                description: '선의의 옹호자로 조용하고 신비로우며 영감을 주는 이상주의자',
                strengths: ['통찰력', '원칙주의', '열정적', '이타적'],
                weaknesses: ['완벽주의', '극도로 사적', '예민함'],
                careers: ['상담사', '작가', '심리학자', '의사'],
                compatibility: ['ENTP', 'ENFP'],
                famous: ['마틴 루터 킹', '넬슨 만델라']
            },
            'INFP': {
                title: '중재자',
                description: '항상 선을 추구하는 부드럽고 친절한 이타주의자',
                strengths: ['이상주의', '창의적', '열정적', '헌신적'],
                weaknesses: ['비현실적', '감정적', '자기비판적'],
                careers: ['작가', '심리상담사', '교사', '예술가'],
                compatibility: ['ENFJ', 'ENTJ'],
                famous: ['윌리엄 셰익스피어', 'J.R.R. 톨킨']
            },
            'ENFJ': {
                title: '선도자',
                description: '카리스마 있고 영감을 주는 타고난 지도자',
                strengths: ['카리스마', '이타적', '자신감', '영향력'],
                weaknesses: ['지나치게 이상주의적', '너무 이타적', '예민함'],
                careers: ['교사', 'HR 매니저', '이벤트 기획자', '정치인'],
                compatibility: ['INFP', 'ISFP'],
                famous: ['오프라 윈프리', '바락 오바마']
            },
            'ENFP': {
                title: '활동가',
                description: '열정적이고 창의적이며 사교적인 자유로운 영혼',
                strengths: ['열정적', '창의적', '사교적', '낙관적'],
                weaknesses: ['집중력 부족', '스트레스 관리', '지나치게 감정적'],
                careers: ['마케터', '이벤트 기획자', '상담사', '기자'],
                compatibility: ['INFJ', 'INTJ'],
                famous: ['로빈 윌리엄스', '월트 디즈니']
            },
            'ISTJ': {
                title: '물류전문가',
                description: '사실을 중시하는 믿음직한 현실주의자',
                strengths: ['책임감', '정직', '실용적', '헌신적'],
                weaknesses: ['고집', '무감각', '변화 거부'],
                careers: ['회계사', '관리자', '경찰', '군인'],
                compatibility: ['ESFP', 'ESTP'],
                famous: ['워런 버핏', '조지 워싱턴']
            },
            'ISFJ': {
                title: '수호자',
                description: '주변 사람을 보호하고 돌보는 헌신적이고 따뜻한 수호자',
                strengths: ['지원적', '신뢰할 수 있는', '인내심', '상상력'],
                weaknesses: ['지나치게 이타적', '변화 거부', '억압된 감정'],
                careers: ['간호사', '교사', '사회복지사', '상담사'],
                compatibility: ['ESFP', 'ESTP'],
                famous: ['마더 테레사', '케이트 미들턴']
            },
            'ESTJ': {
                title: '경영자',
                description: '사물과 사람을 관리하는데 탁월한 현실적인 관리자',
                strengths: ['조직적', '헌신적', '직설적', '충성스러운'],
                weaknesses: ['융통성 부족', '완고함', '판단적'],
                careers: ['매니저', '판사', '금융 분석가', '경찰'],
                compatibility: ['ISFP', 'ISTP'],
                famous: ['미셸 오바마', '프랭클린 D. 루즈벨트']
            },
            'ESFJ': {
                title: '집정관',
                description: '매우 협조적이고 배려 깊으며 사교적인 사람',
                strengths: ['충성스러운', '따뜻한', '조직적', '실용적'],
                weaknesses: ['지나치게 이타적', '융통성 부족', '비판에 약함'],
                careers: ['교사', '의료진', '이벤트 기획자', 'HR'],
                compatibility: ['ISFP', 'ISTP'],
                famous: ['테일러 스위프트', '빌 클린턴']
            },
            'ISTP': {
                title: '장인',
                description: '대담하고 실용적인 실험정신을 가진 거장',
                strengths: ['실용적', '창의적', '침착한', '우선순위'],
                weaknesses: ['고집', '무감각', '위험 추구'],
                careers: ['엔지니어', '정비사', '조종사', '법의학자'],
                compatibility: ['ESTJ', 'ENTJ'],
                famous: ['클린트 이스트우드', '톰 크루즈']
            },
            'ISFP': {
                title: '모험가',
                description: '유연하고 매력적인 예술가',
                strengths: ['창의적', '열정적', '친절한', '예술적'],
                weaknesses: ['지나치게 경쟁적', '예측 불가능', '스트레스 처리'],
                careers: ['예술가', '디자이너', '셰프', '음악가'],
                compatibility: ['ESFJ', 'ESTJ'],
                famous: ['밥 딜런', '프리다 칼로']
            },
            'ESTP': {
                title: '사업가',
                description: '모든 종류의 도구를 다루는 대담하고 실용적인 사람',
                strengths: ['대담한', '실용적', '직설적', '사교적'],
                weaknesses: ['무감각', '참을성 없는', '위험 추구'],
                careers: ['기업가', '마케터', '경찰', '구급대원'],
                compatibility: ['ISFJ', 'ISTJ'],
                famous: ['어니스트 헤밍웨이', '마돈나']
            },
            'ESFP': {
                title: '연예인',
                description: '즉흥적이고 열정적이며 매력적인 사람',
                strengths: ['대담한', '독창적', '실용적', '관찰력'],
                weaknesses: ['예민한', '갈등 회피', '쉽게 지루해함'],
                careers: ['배우', '이벤트 기획자', '판매원', '여행 가이드'],
                compatibility: ['ISFJ', 'ISTJ'],
                famous: ['마릴린 먼로', '제이미 폭스']
            }
        };

        return types[type] || types['INTJ']; // 기본값
    }

    getProgress() {
        return Math.round((this.currentQuestion / this.questions.length) * 100);
    }
}

// 전역 인스턴스
window.MBTITestCore = MBTITestCore;