// v2.0 - Enhanced JavaScript with Expert Recommendations
const app = {
    currentScreen: 'start',
    userName: '',
    mbtiType: '',
    testAnswers: [],
    currentQuestion: 0,
    userCount: 127892,
    
    // MBTI 질문 데이터 (개선된 버전)
    questions: [
        {
            text: "2025년 새해 파티, 너의 모습은?",
            answers: [
                { text: "🎉 파티의 중심에서 분위기 주도!", value: 'E' },
                { text: "😌 조용히 친한 사람들과 대화", value: 'I' }
            ]
        },
        {
            text: "새해 계획을 세울 때 너는?",
            answers: [
                { text: "📊 구체적인 목표와 일정 작성", value: 'S' },
                { text: "✨ 큰 그림과 비전 중심으로", value: 'N' }
            ]
        },
        {
            text: "친구가 2025년 걱정을 털어놓을 때",
            answers: [
                { text: "💡 논리적으로 해결책 제시", value: 'T' },
                { text: "🤗 공감하며 위로해주기", value: 'F' }
            ]
        },
        {
            text: "2025년 여행 계획은?",
            answers: [
                { text: "📅 미리 예약하고 일정 짜기", value: 'J' },
                { text: "🎲 즉흥적으로 떠나기", value: 'P' }
            ]
        },
        {
            text: "주말 오후, 너의 충전 방법은?",
            answers: [
                { text: "👥 친구들과 카페나 맛집 투어", value: 'E' },
                { text: "🏠 혼자 넷플릭스나 책 읽기", value: 'I' }
            ]
        },
        {
            text: "선물을 고를 때 중요한 건?",
            answers: [
                { text: "🎁 실용적이고 필요한 것", value: 'S' },
                { text: "💝 의미있고 특별한 것", value: 'N' }
            ]
        },
        {
            text: "의견 충돌이 생겼을 때",
            answers: [
                { text: "📌 팩트와 논리로 설득", value: 'T' },
                { text: "💭 서로의 감정 고려하며 대화", value: 'F' }
            ]
        },
        {
            text: "새로운 프로젝트를 시작할 때",
            answers: [
                { text: "📋 체계적인 계획부터 세우기", value: 'J' },
                { text: "🚀 일단 시작하고 유연하게 진행", value: 'P' }
            ]
        },
        {
            text: "스트레스 받을 때 너는?",
            answers: [
                { text: "🗣️ 사람들과 수다로 풀기", value: 'E' },
                { text: "🧘 혼자만의 시간으로 회복", value: 'I' }
            ]
        },
        {
            text: "새로운 것을 배울 때",
            answers: [
                { text: "📚 기초부터 차근차근", value: 'S' },
                { text: "🎯 전체 개념 파악 먼저", value: 'N' }
            ]
        },
        {
            text: "중요한 결정을 내릴 때",
            answers: [
                { text: "🧮 장단점 분석 후 결정", value: 'T' },
                { text: "❤️ 마음이 끌리는 대로", value: 'F' }
            ]
        },
        {
            text: "일상의 루틴에 대한 생각은?",
            answers: [
                { text: "⏰ 안정적이고 좋아", value: 'J' },
                { text: "🌈 변화가 있어야 재밌지", value: 'P' }
            ]
        }
    ],
    
    // 2025년 MBTI별 운세 데이터 (전문가 피드백 반영)
    fortunes: {
        'INTJ': {
            overall: "2025년은 당신의 전략적 사고가 빛을 발하는 해! 그동안 준비해온 계획들이 하나씩 결실을 맺기 시작합니다. 특히 상반기에는 커리어에서 큰 도약이 예상되니, 기회를 놓치지 마세요.",
            love: "올해는 지적인 대화를 나눌 수 있는 특별한 인연을 만날 가능성이 높아요. 평소보다 조금 더 마음을 열어보세요. 싱글이라면 6-7월, 연인이 있다면 가을에 관계가 더욱 깊어질 거예요.",
            money: "투자 수익이 기대되는 한 해! 특히 장기 투자와 부동산 쪽에서 좋은 기회가 올 수 있어요. 하지만 너무 완벽을 추구하다가 타이밍을 놓치지 않도록 주의하세요.",
            career: "리더십을 발휘할 기회가 많아집니다. 당신의 비전과 체계적인 접근이 인정받아 중요한 프로젝트를 맡게 될 가능성이 높아요. 네트워킹에도 신경 쓰면 더 큰 성과를 얻을 수 있습니다.",
            health: "정신적 스트레스 관리가 중요한 한 해. 명상이나 요가 같은 마음을 다스리는 활동을 시작해보세요. 규칙적인 운동도 꼭 필요합니다.",
            luckyItems: {
                color: "딥 퍼플",
                number: "8",
                item: "만년필",
                month: "3월, 9월"
            },
            score: 88
        },
        'INTP': {
            overall: "창의적인 아이디어가 샘솟는 2025년! 당신의 독창적인 사고가 주목받으며, 예상치 못한 분야에서 성공의 기회가 찾아올 거예요. 호기심을 따라가다 보면 새로운 길이 열립니다.",
            love: "지적 호기심을 자극하는 사람과의 만남이 예고되어 있어요. 온라인에서 시작된 인연이 특별한 관계로 발전할 수 있으니 열린 마음을 가져보세요.",
            money: "새로운 수입원이 생길 가능성이 높아요. 특히 당신의 전문 지식을 활용한 부업이나 프리랜스 기회를 주목하세요. 하반기 재정 상황이 크게 개선됩니다.",
            career: "혁신적인 프로젝트에 참여하게 될 거예요. 당신의 분석력과 창의성이 빛을 발하며, 전문가로서의 입지를 다질 수 있는 해입니다.",
            health: "불규칙한 생활 패턴을 개선할 필요가 있어요. 특히 수면 패턴을 일정하게 유지하는 것이 중요합니다.",
            luckyItems: {
                color: "실버 그레이",
                number: "11",
                item: "노이즈 캔슬링 헤드폰",
                month: "5월, 11월"
            },
            score: 85
        },
        'ENTJ': {
            overall: "리더십이 극대화되는 파워풀한 2025년! 당신이 주도하는 모든 일이 성공으로 이어질 가능성이 높습니다. 큰 도전을 두려워하지 마세요.",
            love: "카리스마 있는 당신의 매력이 빛나는 해. 비슷한 야망을 가진 파트너를 만날 수 있으며, 파워커플로 발전할 가능성이 높습니다.",
            money: "사업이나 투자에서 대박이 터질 수 있는 해! 과감한 결정이 큰 수익으로 이어집니다. 특히 2분기와 4분기를 주목하세요.",
            career: "승진이나 이직을 통해 경력의 정점을 찍을 수 있어요. 당신의 추진력과 결단력이 최고의 성과를 만들어낼 것입니다.",
            health: "워커홀릭 성향을 조절해야 해요. 번아웃에 주의하고, 정기적인 휴식을 꼭 가지세요.",
            luckyItems: {
                color: "골드",
                number: "1",
                item: "고급 시계",
                month: "1월, 7월"
            },
            score: 92
        },
        'ENTP': {
            overall: "아이디어가 현실이 되는 흥미진진한 2025년! 당신의 창의적인 도전이 예상외의 성공을 가져다줄 거예요. 다양한 분야에서 기회가 쏟아집니다.",
            love: "지적인 스파링을 즐길 수 있는 파트너와의 로맨스가 기다려요. 토론과 대화를 통해 사랑이 깊어지는 특별한 경험을 하게 됩니다.",
            money: "여러 수입원에서 돈이 들어오는 해. 새로운 비즈니스 아이디어가 수익으로 연결되며, 예상치 못한 보너스나 수익이 발생합니다.",
            career: "스타트업이나 새로운 프로젝트 런칭에 최적의 시기. 당신의 혁신적인 아이디어가 게임체인저가 될 수 있습니다.",
            health: "에너지 관리가 중요해요. 너무 많은 일을 동시에 하려다 지칠 수 있으니 우선순위를 정하세요.",
            luckyItems: {
                color: "일렉트릭 블루",
                number: "7",
                item: "태블릿 PC",
                month: "4월, 10월"
            },
            score: 89
        },
        'INFJ': {
            overall: "내면의 성장과 외적 성공이 조화를 이루는 2025년. 당신의 직관력이 최고조에 달하며, 인생의 중요한 전환점을 맞이합니다.",
            love: "영혼의 파트너를 만날 수 있는 운명적인 해. 깊은 정서적 교감을 나눌 수 있는 특별한 인연이 기다리고 있어요.",
            money: "안정적인 재정 성장이 예상됩니다. 특히 당신의 재능을 활용한 창작 활동이 수익으로 연결될 가능성이 높아요.",
            career: "당신의 통찰력과 창의성이 인정받는 해. 멘토나 조언자 역할을 맡게 되며, 많은 사람들에게 영감을 줄 수 있습니다.",
            health: "정서적 안정이 중요한 시기. 명상, 요가, 자연 속 산책 등으로 마음의 평화를 유지하세요.",
            luckyItems: {
                color: "라벤더",
                number: "9",
                item: "수정 목걸이",
                month: "2월, 8월"
            },
            score: 91
        },
        'INFP': {
            overall: "꿈이 현실이 되는 마법같은 2025년! 당신의 창의성과 진정성이 빛을 발하며, 오랫동안 바라던 일들이 이루어집니다.",
            love: "로맨틱한 사랑이 찾아오는 해. 당신의 순수한 마음을 알아봐주는 특별한 사람을 만나게 되며, 동화 같은 사랑을 경험합니다.",
            money: "예술이나 창작 활동에서 수익이 발생해요. 당신의 열정을 따르다 보면 자연스럽게 경제적 보상이 따라옵니다.",
            career: "의미 있는 일에서 성취감을 느끼는 해. 당신의 가치관과 일치하는 프로젝트나 직업을 찾게 될 거예요.",
            health: "감정 기복을 잘 다스려야 해요. 창작 활동이나 예술 활동을 통해 감정을 건강하게 표현하세요.",
            luckyItems: {
                color: "파스텔 핑크",
                number: "6",
                item: "일기장",
                month: "6월, 12월"
            },
            score: 87
        },
        'ENFJ': {
            overall: "당신의 따뜻한 리더십이 많은 사람들을 움직이는 2025년. 영향력이 확대되며, 꿈꿔왔던 변화를 만들어낼 수 있습니다.",
            love: "진정한 파트너십을 경험하는 해. 서로를 성장시키는 건강한 관계를 만들어가며, 주변에서도 부러워하는 커플이 됩니다.",
            money: "팀워크를 통한 수익 창출이 기대돼요. 협업 프로젝트나 공동 투자에서 좋은 결과를 얻을 수 있습니다.",
            career: "리더나 매니저로서의 역량이 인정받는 해. 팀을 이끌어 큰 성과를 만들어내며, 승진이나 더 큰 책임을 맡게 됩니다.",
            health: "타인을 돌보느라 자신을 소홀히 하지 마세요. 정기적인 자기 돌봄 시간을 가지는 것이 중요합니다.",
            luckyItems: {
                color: "에메랄드 그린",
                number: "2",
                item: "향초",
                month: "3월, 9월"
            },
            score: 90
        },
        'ENFP': {
            overall: "열정이 폭발하는 다이나믹한 2025년! 새로운 모험과 기회가 끊임없이 찾아오며, 인생에서 가장 흥미진진한 한 해가 될 거예요.",
            love: "설레는 만남이 가득한 해. 다양한 사람들과의 인연 속에서 진짜 사랑을 발견하게 되며, 열정적인 로맨스를 경험합니다.",
            money: "창의적인 아이디어가 돈이 되는 해. 특히 SNS나 콘텐츠 창작을 통한 수익이 기대되며, 예상치 못한 수입이 생깁니다.",
            career: "다양한 프로젝트에 참여하며 경험을 쌓는 해. 당신의 열정과 창의성이 주목받아 새로운 기회의 문이 열립니다.",
            health: "에너지를 잘 분배해야 해요. 너무 많은 일에 열정을 쏟다가 번아웃이 올 수 있으니 균형을 유지하세요.",
            luckyItems: {
                color: "선셋 오렌지",
                number: "3",
                item: "폴라로이드 카메라",
                month: "5월, 11월"
            },
            score: 88
        },
        'ISTJ': {
            overall: "노력이 결실을 맺는 안정적인 2025년. 꾸준히 쌓아온 신뢰와 실력이 인정받으며, 단단한 기반 위에서 성장합니다.",
            love: "진지하고 안정적인 관계가 발전하는 해. 결혼이나 동거 등 관계의 다음 단계로 나아갈 가능성이 높습니다.",
            money: "저축과 투자가 좋은 결과를 가져오는 해. 안정적인 재테크로 목표했던 금액을 달성할 수 있어요.",
            career: "전문성이 인정받아 중요한 역할을 맡게 됩니다. 신뢰받는 핵심 인재로 자리매김하며, 안정적인 성장을 이룹니다.",
            health: "규칙적인 생활 습관이 건강의 비결. 꾸준한 운동과 균형 잡힌 식단으로 최상의 컨디션을 유지할 수 있어요.",
            luckyItems: {
                color: "네이비 블루",
                number: "4",
                item: "가죽 다이어리",
                month: "1월, 7월"
            },
            score: 86
        },
        'ISFJ': {
            overall: "따뜻한 인간관계가 빛나는 2025년. 당신의 헌신과 배려가 많은 사람들에게 감동을 주며, 든든한 지원군을 얻게 됩니다.",
            love: "안정적이고 따뜻한 사랑이 깊어지는 해. 서로를 아끼고 보살피는 관계 속에서 행복을 찾게 됩니다.",
            money: "꾸준한 저축이 목돈이 되는 해. 가족이나 친구들과의 협력으로 좋은 투자 기회를 얻을 수도 있어요.",
            career: "팀에서 없어서는 안 될 존재가 됩니다. 당신의 세심함과 책임감이 인정받아 중요한 업무를 맡게 됩니다.",
            health: "스트레스를 잘 관리해야 해요. 취미 생활이나 휴식을 통해 정기적으로 재충전하는 시간을 가지세요.",
            luckyItems: {
                color: "민트 그린",
                number: "6",
                item: "아로마 디퓨저",
                month: "4월, 10월"
            },
            score: 84
        },
        'ESTJ': {
            overall: "목표 달성의 해, 2025년! 당신의 추진력과 조직력이 최고조에 달하며, 계획했던 모든 것을 이루어냅니다.",
            love: "안정적이고 실속 있는 관계가 발전합니다. 함께 미래를 계획하고 실행하는 파트너와 더욱 돈독해집니다.",
            money: "체계적인 재무 관리가 큰 성과를 가져옵니다. 부동산이나 장기 투자에서 특히 좋은 결과를 얻을 수 있어요.",
            career: "리더십을 발휘할 최고의 기회가 옵니다. 중요한 프로젝트를 성공적으로 이끌며, 경력의 정점을 찍게 됩니다.",
            health: "과로에 주의해야 하는 시기. 일과 휴식의 균형을 맞추고, 정기적인 건강 검진을 받으세요.",
            luckyItems: {
                color: "버건디",
                number: "8",
                item: "명품 벨트",
                month: "2월, 8월"
            },
            score: 89
        },
        'ESFJ': {
            overall: "사람들과의 관계에서 행복을 찾는 2025년. 당신의 따뜻함이 많은 사람들을 행복하게 만들고, 그 행복이 다시 돌아옵니다.",
            love: "로맨틱하고 안정적인 사랑이 만개하는 해. 서로를 위한 작은 배려들이 큰 행복으로 이어집니다.",
            money: "인맥을 통한 기회가 많아집니다. 네트워킹과 협력을 통해 새로운 수입원을 만들 수 있어요.",
            career: "팀워크와 협업 능력이 빛을 발합니다. 조직의 화합을 이끌며, 모두에게 사랑받는 동료가 됩니다.",
            health: "정신적, 육체적 균형이 중요해요. 사교 활동과 개인 시간의 밸런스를 잘 맞추세요.",
            luckyItems: {
                color: "코랄 핑크",
                number: "2",
                item: "향수",
                month: "6월, 12월"
            },
            score: 85
        },
        'ISTP': {
            overall: "실력이 인정받는 실속 있는 2025년. 당신의 전문성과 문제 해결 능력이 주목받으며, 독립적인 성공을 이룹니다.",
            love: "편안하고 자유로운 관계가 발전합니다. 서로의 개인 시간을 존중하는 성숙한 사랑을 경험하게 됩니다.",
            money: "기술이나 전문 지식을 활용한 부수입이 생깁니다. 프리랜스나 부업으로 괜찮은 수익을 올릴 수 있어요.",
            career: "전문가로서의 입지가 확고해집니다. 당신만의 노하우가 인정받아 중요한 프로젝트에 참여하게 됩니다.",
            health: "꾸준한 운동이 체력 향상으로 이어집니다. 익스트림 스포츠나 새로운 운동에 도전해보세요.",
            luckyItems: {
                color: "카키",
                number: "5",
                item: "멀티툴",
                month: "3월, 9월"
            },
            score: 83
        },
        'ISFP': {
            overall: "창의성이 만개하는 아름다운 2025년. 당신의 예술적 감각과 섬세함이 인정받으며, 자아실현의 기회가 찾아옵니다.",
            love: "순수하고 아름다운 사랑이 피어나는 해. 감성적인 교감을 나누며, 서로를 있는 그대로 받아들이는 관계를 만듭니다.",
            money: "창작 활동이나 예술 작품이 수익으로 연결됩니다. 당신의 재능을 상품화할 좋은 기회가 옵니다.",
            career: "자유롭고 창의적인 환경에서 빛을 발합니다. 당신의 독특한 시각이 프로젝트에 새로운 가치를 더합니다.",
            health: "자연과 함께하는 시간이 치유가 됩니다. 캠핑이나 하이킹 등 야외 활동을 늘려보세요.",
            luckyItems: {
                color: "포레스트 그린",
                number: "7",
                item: "스케치북",
                month: "5월, 11월"
            },
            score: 86
        },
        'ESTP': {
            overall: "액션과 모험이 가득한 스릴 넘치는 2025년! 도전적인 상황에서 당신의 순발력과 실행력이 빛을 발합니다.",
            love: "열정적이고 다이나믹한 로맨스가 기다립니다. 함께 모험을 즐길 수 있는 파트너와 뜨거운 사랑을 나눕니다.",
            money: "과감한 투자와 빠른 결정이 수익으로 이어집니다. 단기 투자나 트레이딩에서 좋은 성과를 얻을 수 있어요.",
            career: "현장에서 실력을 발휘할 기회가 많아집니다. 위기 상황을 기회로 만들며, 문제 해결사로 인정받습니다.",
            health: "활동적인 라이프스타일이 건강의 비결. 다양한 스포츠에 도전하며 체력을 기르세요.",
            luckyItems: {
                color: "레드",
                number: "1",
                item: "스포츠 워치",
                month: "1월, 7월"
            },
            score: 87
        },
        'ESFP': {
            overall: "매일이 축제인 행복한 2025년! 당신의 긍정 에너지가 주변을 밝게 만들며, 즐거운 일들이 연이어 일어납니다.",
            love: "설레고 즐거운 연애가 계속됩니다. 함께 있으면 항상 웃음이 끊이지 않는 특별한 사람을 만나게 됩니다.",
            money: "엔터테인먼트나 서비스업에서 수익이 증가합니다. 당신의 끼와 재능이 돈이 되는 기회를 잡으세요.",
            career: "팀의 분위기 메이커로 사랑받습니다. 창의적이고 재미있는 아이디어로 프로젝트에 활력을 불어넣습니다.",
            health: "즐거운 마음이 최고의 보약. 춤이나 그룹 운동으로 즐겁게 건강을 관리하세요.",
            luckyItems: {
                color: "핫 핑크",
                number: "3",
                item: "블루투스 스피커",
                month: "4월, 10월"
            },
            score: 90
        }
    }
};

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    startUserCountAnimation();
    initKakaoSDK();
    initAds(); // 광고 시스템 초기화
});

function initApp() {
    console.log('앱 초기화 시작');
    
    // 로딩 화면은 이미 표시되어 있음 (HTML에서)
    // 2초 후 시작 화면으로 전환
    setTimeout(() => {
        console.log('로딩 완료, 시작 화면으로 전환');
        
        // 로딩 화면 숨기기
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        
        // 시작 화면 표시
        const startScreen = document.getElementById('startScreen');
        if (startScreen) {
            startScreen.classList.add('active');
        }
    }, 2000);
    
    // 엔터키 이벤트 설정 (삭제 - submitName으로 대체)
    // const nameInput = document.getElementById('userName');
    // if (nameInput) {
    //     nameInput.addEventListener('keypress', (e) => {
    //         if (e.key === 'Enter') saveName();
    //     });
    // }
}

// 로딩 화면 관리
function showLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('active');
}

function hideLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.remove('active');
}

// 사용자 수 애니메이션
function startUserCountAnimation() {
    setInterval(() => {
        app.userCount += Math.floor(Math.random() * 5) + 1;
        const countElement = document.getElementById('userCount');
        if (countElement) {
            countElement.textContent = app.userCount.toLocaleString();
        }
    }, 5000);
}

// 화면 전환
function showScreen(screenId) {
    // 모든 화면 숨기기
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.scrollTop = 0;
    });
    
    // 타겟 화면 표시
    const targetScreen = document.getElementById(screenId + 'Screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.scrollTop = 0;
        app.currentScreen = screenId;
    }
}

// 여정 시작 - MBTI 선택 화면으로
function startJourney() {
    console.log('시작하기 버튼 클릭됨');
    showScreen('quickSelect');
}

// 이름 건너뛰기 (삭제 - 더 이상 사용하지 않음)
// function skipName() {
//     app.userName = '당신';
//     showQuickSelect();
// }

// MBTI 빠른 선택 화면
function showQuickSelect() {
    showScreen('quickSelect');
}

// MBTI 선택
function selectMBTI(type) {
    console.log('MBTI 선택:', type);
    app.mbtiType = type;
    localStorage.setItem('lastMBTI', type);
    console.log('MBTI 저장 후 app.mbtiType:', app.mbtiType);
    // 성별 스킵하고 바로 이름 입력으로
    showScreen('name');
}

// 성별 선택
function selectGender(gender) {
    app.gender = gender;
    showScreen('year');
}

// 생년 선택
function selectYear() {
    const yearInput = document.getElementById('birthYear');
    const year = parseInt(yearInput.value);
    
    if (year >= 1950 && year <= 2010) {
        app.birthYear = year;
        showScreen('name');  // 이름 입력 화면으로
    } else {
        alert('1950년부터 2010년 사이의 연도를 입력해주세요.');
    }
}

// 이름 제출
function submitName() {
    const nameInput = document.getElementById('userName');
    const name = nameInput.value.trim();
    
    if (name.length > 0) {
        app.userName = name;
        localStorage.setItem('userName', app.userName);
        
        console.log('submitName - app 상태:', {
            mbtiType: app.mbtiType,
            userName: app.userName,
            gender: app.gender,
            birthYear: app.birthYear
        });
        
        showCalculating();  // 계산 화면으로
    } else {
        alert('이름을 입력해주세요.');
    }
}

// 테스트 시작
function startTest() {
    app.testAnswers = [];
    app.currentQuestion = 0;
    showScreen('test');
    loadQuestion();
}

// 질문 로드
function loadQuestion() {
    const question = app.questions[app.currentQuestion];
    document.getElementById('questionText').textContent = question.text;
    document.getElementById('currentQ').textContent = app.currentQuestion + 1;
    
    // 프로그레스 업데이트
    updateProgress();
    
    // 답변 버튼 생성
    const container = document.getElementById('answerContainer');
    container.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const card = document.createElement('div');
        card.className = 'answer-card';
        card.textContent = answer.text;
        card.onclick = () => selectAnswer(answer.value);
        
        // 애니메이션 딜레이
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeIn 0.5s ease forwards';
        
        container.appendChild(card);
    });
}

// 프로그레스 업데이트
function updateProgress() {
    const dots = document.querySelectorAll('.progress-dots .dot');
    const progress = Math.floor((app.currentQuestion / app.questions.length) * 4);
    
    dots.forEach((dot, index) => {
        if (index <= progress) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 답변 선택
function selectAnswer(value) {
    app.testAnswers.push(value);
    
    if (app.currentQuestion < app.questions.length - 1) {
        app.currentQuestion++;
        loadQuestion();
    } else {
        calculateMBTI();
    }
}

// 질문 건너뛰기
function skipQuestion() {
    // 랜덤 답변 선택
    const randomValue = Math.random() > 0.5 ? 
        app.questions[app.currentQuestion].answers[0].value : 
        app.questions[app.currentQuestion].answers[1].value;
    selectAnswer(randomValue);
}

// MBTI 계산
function calculateMBTI() {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    app.testAnswers.forEach(answer => {
        counts[answer]++;
    });
    
    const mbti = 
        (counts.E > counts.I ? 'E' : 'I') +
        (counts.S > counts.N ? 'S' : 'N') +
        (counts.T > counts.F ? 'T' : 'F') +
        (counts.J > counts.P ? 'J' : 'P');
    
    app.mbtiType = mbti;
    localStorage.setItem('lastMBTI', mbti);
    showCalculating();
}

// 계산 중 화면
function showCalculating() {
    // 사용자 정보가 모두 입력되었는지 확인
    if (!app.mbtiType || !app.userName) {
        console.error('사용자 정보가 부족합니다:', {
            mbtiType: app.mbtiType,
            userName: app.userName,
            gender: app.gender,
            birthYear: app.birthYear
        });
        return;
    }
    
    showScreen('calculating');
    
    // 사용자 이름 표시
    const calcUserName = document.getElementById('calcUserName');
    if (calcUserName) {
        calcUserName.textContent = app.userName + '의';
    }
    
    // 미리보기 텍스트 애니메이션
    const previews = [
        "별자리를 읽는 중...",
        "운명의 실을 풀어가는 중...",
        "2025년 행운을 계산하는 중...",
        "당신만의 운세를 준비하는 중..."
    ];
    
    let previewIndex = 0;
    const previewInterval = setInterval(() => {
        const previewText = document.getElementById('previewText');
        if (previewText) {
            previewText.textContent = previews[previewIndex];
            previewIndex = (previewIndex + 1) % previews.length;
        }
    }, 1500);
    
    // 3초 후 결과 표시
    setTimeout(() => {
        clearInterval(previewInterval);
        showResult();
    }, 3000);
}

// 결과 표시
function showResult() {
    showScreen('result');
    
    const fortune = app.fortunes[app.mbtiType];
    
    // 사용자 이름 표시
    document.getElementById('resultUserName').textContent = app.userName + '의';
    
    // MBTI 표시
    document.getElementById('resultMBTI').textContent = app.mbtiType;
    
    // 메인 운세
    document.getElementById('mainFortune').textContent = fortune.overall;
    
    // 점수 애니메이션
    const scoreBar = document.getElementById('fortuneScore');
    const scoreValue = document.getElementById('scoreValue');
    setTimeout(() => {
        scoreBar.style.width = fortune.score + '%';
        scoreValue.textContent = fortune.score + '%';
    }, 500);
    
    // 카테고리별 운세 내용 설정
    document.getElementById('loveFortune').textContent = fortune.love || '당신의 연애운이 상승하고 있습니다. 새로운 만남이나 관계의 발전이 기대됩니다.';
    document.getElementById('moneyFortune').textContent = fortune.money || '재정 상황이 안정적으로 유지됩니다. 투자보다는 저축에 집중하세요.';
    document.getElementById('careerFortune').textContent = fortune.career || '커리어에서 중요한 기회가 찾아옵니다. 적극적으로 도전하세요.';
    document.getElementById('healthFortune').textContent = fortune.health || '건강 관리에 신경 쓰면 좋은 결과가 있을 것입니다. 규칙적인 운동을 시작하세요.';
    
    // 카테고리별 별점 설정 (랜덤)
    const setRating = (id, stars) => {
        document.getElementById(id).textContent = '⭐'.repeat(stars);
    };
    setRating('loveRating', Math.floor(Math.random() * 3) + 3);
    setRating('moneyRating', Math.floor(Math.random() * 3) + 3);
    setRating('careerRating', Math.floor(Math.random() * 3) + 3);
    setRating('healthRating', Math.floor(Math.random() * 3) + 3);
    
    // 럭키 아이템 표시
    displayLuckyItems(fortune.luckyItems);
    
    // 통계 업데이트
    updateStats();
    
    // 결과 저장
    saveResult();
}

// 통계 업데이트
function updateStats() {
    // 로컬 스토리지에서 통계 가져오기
    let stats = JSON.parse(localStorage.getItem('mbtiStats') || '{}');
    
    // 초기값 설정
    if (!stats.total) stats.total = Math.floor(Math.random() * 50000) + 100000;
    if (!stats.today) stats.today = Math.floor(Math.random() * 2000) + 1000;
    if (!stats.shares) stats.shares = Math.floor(Math.random() * 30000) + 50000;
    
    // 증가
    stats.total += 1;
    stats.today += 1;
    
    // 저장
    localStorage.setItem('mbtiStats', JSON.stringify(stats));
    
    // 표시 (K 포맷)
    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };
    
    document.getElementById('totalTests').textContent = formatNumber(stats.total);
    document.getElementById('todayTests').textContent = formatNumber(stats.today);
    document.getElementById('shareCount').textContent = formatNumber(stats.shares);
}

// 카테고리 카드 토글
function toggleCategory(card) {
    const content = card.querySelector('.category-content');
    const isExpanded = card.classList.contains('expanded');
    
    if (isExpanded) {
        card.classList.remove('expanded');
        content.style.maxHeight = '0';
    } else {
        // 다른 카드 닫기
        document.querySelectorAll('.category-card.expanded').forEach(c => {
            c.classList.remove('expanded');
            c.querySelector('.category-content').style.maxHeight = '0';
        });
        
        card.classList.add('expanded');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
}

// 카테고리 표시
function showCategory(category, element) {
    const fortune = app.fortunes[app.mbtiType];
    const content = document.getElementById('categoryContent');
    
    // 탭 활성화
    document.querySelectorAll('.category-tabs .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // element가 전달되면 사용, 아니면 해당 카테고리 탭 찾기
    if (element) {
        element.classList.add('active');
    } else {
        const targetTab = document.querySelector(`.category-tabs .tab[onclick*="${category}"]`);
        if (targetTab) {
            targetTab.classList.add('active');
        }
    }
    
    // 콘텐츠 표시
    let html = '';
    switch(category) {
        case 'love':
            html = `<p>${fortune.love}</p>`;
            break;
        case 'money':
            html = `<p>${fortune.money}</p>`;
            break;
        case 'career':
            html = `<p>${fortune.career}</p>`;
            break;
        case 'health':
            html = `<p>${fortune.health}</p>`;
            break;
    }
    
    content.innerHTML = html;
    content.style.animation = 'fadeIn 0.5s ease';
}

// 럭키 아이템 표시
function displayLuckyItems(items) {
    const grid = document.getElementById('luckyGrid');
    
    const itemsHTML = `
        <div class="lucky-item">
            <span class="lucky-item-icon">🎨</span>
            <div class="lucky-item-name">행운의 색</div>
            <div class="lucky-item-desc">${items.color}</div>
        </div>
        <div class="lucky-item">
            <span class="lucky-item-icon">🔢</span>
            <div class="lucky-item-name">행운의 숫자</div>
            <div class="lucky-item-desc">${items.number}</div>
        </div>
        <div class="lucky-item">
            <span class="lucky-item-icon">🎁</span>
            <div class="lucky-item-name">행운의 아이템</div>
            <div class="lucky-item-desc">${items.item}</div>
        </div>
        <div class="lucky-item">
            <span class="lucky-item-icon">📅</span>
            <div class="lucky-item-name">행운의 달</div>
            <div class="lucky-item-desc">${items.month}</div>
        </div>
        <div class="lucky-item">
            <span class="lucky-item-icon">🌟</span>
            <div class="lucky-item-name">행운의 시간</div>
            <div class="lucky-item-desc">${items.time || '오후 3-5시'}</div>
        </div>
        <div class="lucky-item">
            <span class="lucky-item-icon">🧭</span>
            <div class="lucky-item-name">행운의 방향</div>
            <div class="lucky-item-desc">${items.direction || '남동쪽'}</div>
        </div>
    `;
    
    grid.innerHTML = itemsHTML;
}

// 결과 저장
function saveResult() {
    const result = {
        userName: app.userName,
        mbtiType: app.mbtiType,
        date: new Date().toISOString(),
        score: app.fortunes[app.mbtiType].score
    };
    
    localStorage.setItem('lastResult', JSON.stringify(result));
    
    // 통계 업데이트 (실제로는 서버로 전송)
    updateStatistics(result);
}

// 통계 업데이트 (더미 함수)
function updateStatistics(result) {
    // 실제로는 서버로 데이터 전송
    console.log('Statistics updated:', result);
}

// 친구 테스트 만들기
function createFriendTest() {
    const url = `${window.location.origin}?friend_test=${app.mbtiType}&user=${encodeURIComponent(app.userName)}`;
    
    // 클립보드에 복사
    navigator.clipboard.writeText(url).then(() => {
        alert('친구 테스트 링크가 복사되었어요! 친구들에게 공유해보세요.');
    });
}

// 친구 초대 기능
function copyInviteCode() {
    const codeDisplay = document.getElementById('inviteCode');
    let inviteCode = codeDisplay ? codeDisplay.textContent : 'MBTI2025';
    
    // 코드가 기본값이면 새로 생성
    if (inviteCode === 'MBTI2025') {
        inviteCode = generateInviteCode();
        if (codeDisplay) {
            codeDisplay.textContent = inviteCode;
        }
    }
    
    navigator.clipboard.writeText(inviteCode).then(() => {
        showToast('초대 코드가 복사되었어요! 💝');
        // 복사 버튼 애니메이션
        const copyBtn = document.querySelector('.copy-code-btn');
        if (copyBtn) {
            copyBtn.textContent = '복사됨 ✓';
            setTimeout(() => {
                copyBtn.textContent = '복사';
            }, 2000);
        }
    }).catch(() => {
        // 복사 실패 시
        showToast('복사에 실패했어요. 코드: ' + inviteCode);
    });
}

function generateInviteCode() {
    // 사용자별 고유 코드 생성
    const code = 'MBTI' + Math.random().toString(36).substring(2, 8).toUpperCase();
    return code;
}

function shareKakaoInvite() {
    const codeDisplay = document.getElementById('inviteCode');
    let inviteCode = codeDisplay ? codeDisplay.textContent : 'MBTI2025';
    
    if (inviteCode === 'MBTI2025') {
        inviteCode = generateInviteCode();
        if (codeDisplay) {
            codeDisplay.textContent = inviteCode;
        }
    }
    
    const shareUrl = `${window.location.origin}?invite=${inviteCode}`;
    const shareText = `🎁 친구 초대 이벤트!\n\n${app.userName || '친구'}님이 당신을 2025 MBTI 운세로 초대했어요!\n\n🎯 초대 코드: ${inviteCode}\n\n지금 바로 참여하세요!`;
    
    if (!window.Kakao || !window.Kakao.isInitialized()) {
        // 카카오톡 앱으로 직접 공유
        if (/mobile/i.test(navigator.userAgent)) {
            window.open(`https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`);
        } else {
            navigator.clipboard.writeText(shareUrl + '\n\n' + shareText);
            showToast('초대 링크가 복사되었어요! 카카오톡에 붙여넣기 해주세요.');
        }
        return;
    }
    
    // Kakao SDK 사용
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '🎁 2025 MBTI 운세 친구 초대',
            description: `초대 코드: ${inviteCode}\n테스트 완료 시 특별 보상!`,
            imageUrl: `${window.location.origin}/preview.jpg`,
            link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl
            }
        },
        buttons: [{
            title: '지금 참여하기',
            link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl
            }
        }]
    });
}

function shareLinkInvite() {
    const codeDisplay = document.getElementById('inviteCode');
    let inviteCode = codeDisplay ? codeDisplay.textContent : 'MBTI2025';
    
    if (inviteCode === 'MBTI2025') {
        inviteCode = generateInviteCode();
        if (codeDisplay) {
            codeDisplay.textContent = inviteCode;
        }
    }
    
    const shareUrl = `${window.location.origin}?invite=${inviteCode}`;
    const shareText = `🎁 2025 MBTI 운세 친구 초대!\n\n초대 코드: ${inviteCode}\n친구가 테스트 완료 시 특별 보상!\n\n`;
    
    if (navigator.share) {
        // Web Share API 사용
        navigator.share({
            title: '2025 MBTI 운세 친구 초대',
            text: shareText,
            url: shareUrl
        }).then(() => {
            showToast('초대장을 보냈어요! 🎉');
        }).catch((error) => {
            console.log('공유 취소:', error);
        });
    } else {
        // 클립보드에 복사
        navigator.clipboard.writeText(shareUrl + '\n\n' + shareText).then(() => {
            showToast('초대 링크가 복사되었어요! 📋');
        });
    }
}

// 카카오 SDK 초기화
function initKakaoSDK() {
    try {
        // 카카오 JavaScript 키
        const kakaoKey = 'f537696494115d340642edd997dcbca0';
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoKey);
            console.log('카카오 SDK 초기화 완료');
        }
    } catch (error) {
        console.log('카카오 SDK 초기화 실패 (무시됨):', error.message);
        // SDK 실패해도 앱은 정상 작동
    }
}

// 공유 기능
function shareKakao() {
    const fortune = app.fortunes[app.mbtiType];
    
    if (!window.Kakao || !window.Kakao.isInitialized()) {
        // 카카오 SDK 없어도 웹 공유 API 사용
        const shareUrl = window.location.href;
        const shareText = `🔮 나의 2025년 운세\nMBTI: ${app.mbtiType}\n행운지수: ${fortune.score}%\n\n${fortune.overall.substring(0, 100)}...`;
        
        // 모바일에서 카카오톡 앱 직접 열기
        if (/mobile/i.test(navigator.userAgent)) {
            window.open(`https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`);
        } else {
            // PC에서는 링크 복사
            navigator.clipboard.writeText(shareUrl + '\n\n' + shareText);
            showToast('링크가 복사되었어요! 카카오톡에 붙여넣기 해주세요.');
        }
        return;
    }
    
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: `🔮 ${app.userName}의 2025년 운세`,
            description: `MBTI ${app.mbtiType} 행운지수 ${fortune.score}%\n${fortune.overall.substring(0, 60)}...`,
            imageUrl: 'https://mbti2025.com/preview.jpg',
            link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href
            }
        },
        buttons: [{
            title: '나도 운세 보러가기',
            link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href
            }
        }]
    });
}

function shareInstagram() {
    // 결과 이미지 생성 및 다운로드
    generateResultImage();
}

function shareLink() {
    const shareUrl = window.location.href + '?mbti=' + app.mbtiType;
    
    if (navigator.share) {
        navigator.share({
            title: '2025 MBTI 운세',
            text: `나의 2025년 운세를 확인해보세요! MBTI ${app.mbtiType} 행운지수 ${app.fortunes[app.mbtiType].score}%`,
            url: shareUrl
        });
    } else {
        // 클립보드에 복사
        navigator.clipboard.writeText(shareUrl).then(() => {
            showToast('링크가 복사되었어요!');
        });
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function generateResultImage() {
    const fortune = app.fortunes[app.mbtiType];
    
    // Canvas 생성 (인스타 스토리 사이즈)
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    
    // 배경 그라데이션 (더 화려하게)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(0.5, '#a78bfa');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 반투명 패턴 오버레이
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for(let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 100 + 50,
            0, Math.PI * 2
        );
        ctx.fill();
    }
    
    // 텍스트 스타일
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    // 상단 이모지
    ctx.font = '100px sans-serif';
    ctx.fillText('✨', canvas.width/2, 150);
    
    // 제목
    ctx.font = 'bold 65px sans-serif';
    ctx.fillText('2025년 운세', canvas.width/2, 250);
    
    // MBTI 배경 박스
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(canvas.width/2 - 200, 320, 400, 150);
    
    // MBTI
    ctx.fillStyle = 'white';
    ctx.font = 'bold 120px sans-serif';
    ctx.fillText(app.mbtiType, canvas.width/2, 430);
    
    // 이름
    ctx.font = 'bold 55px sans-serif';
    ctx.fillText(app.userName + '님의', canvas.width/2, 550);
    
    // 행운 지수 (큰 숫자)
    ctx.font = 'bold 150px sans-serif';
    ctx.fillText(fortune.score + '%', canvas.width/2, 720);
    ctx.font = '40px sans-serif';
    ctx.fillText('행운지수', canvas.width/2, 780);
    
    // 운세 내용 (줄바꿈 처리)
    ctx.font = '35px sans-serif';
    const maxWidth = canvas.width - 100;
    const lineHeight = 50;
    let y = 900;
    
    // 텍스트 줄바꿈 함수
    function wrapText(text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        
        for(let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && i > 0) {
                ctx.fillText(line, x, y);
                line = words[i] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);
    }
    
    wrapText(fortune.overall.substring(0, 200) + '...', canvas.width/2, y, maxWidth, lineHeight);
    
    // URL
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText('mbti2025.com', canvas.width/2, canvas.height - 100);
    
    // 이미지 다운로드
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `2025_${app.mbtiType}_fortune.png`;
        a.click();
        URL.revokeObjectURL(url);
        
        showToast('이미지가 저장되었어요! 인스타 스토리에 공유해보세요 📸');
    });
}

// 하위 호환성을 위해 남겨둠
function downloadImage() {
    generateResultImage();
}

// 프리미엄 기능
function showPremium() {
    const modal = document.getElementById('premiumModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closePremiumModal() {
    const modal = document.getElementById('premiumModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function purchasePremium() {
    // 토스 페이먼츠 또는 포트원 결제 연동
    showToast('결제 시스템 연동 준비 중입니다.');
    
    // 실제 구현 예시:
    /*
    const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
    const customerKey = 'customer_' + Date.now();
    
    const tossPayments = TossPayments(clientKey);
    
    tossPayments.requestPayment('카드', {
        amount: 4900,
        orderId: 'order_' + Date.now(),
        orderName: '2025 MBTI 프리미엄 운세',
        customerName: app.userName,
        successUrl: window.location.origin + '/success',
        failUrl: window.location.origin + '/fail',
    });
    */
    
    closePremiumModal();
}

function closePremium() {
    const modal = document.getElementById('premiumModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function buyPremium() {
    // 결제 프로세스
    alert('프리미엄 결제 기능이 준비 중이에요!');
}

// 피드백
function openFeedback() {
    const feedback = prompt('어떤 점이 좋았나요? 개선할 점이 있나요?');
    if (feedback) {
        // 실제로는 서버로 전송
        console.log('Feedback:', feedback);
        alert('소중한 의견 감사합니다! 더 나은 서비스로 보답하겠습니다.');
    }
}

// 네비게이션
function goBack() {
    showScreen('start');
}

function restart() {
    app.testAnswers = [];
    app.currentQuestion = 0;
    app.mbtiType = '';
    showScreen('start');
}

// URL 파라미터 처리 (친구 테스트)
function handleURLParams() {
    const params = new URLSearchParams(window.location.search);
    const friendTest = params.get('friend_test');
    const userName = params.get('user');
    
    if (friendTest && userName) {
        // 친구 예측 모드
        app.friendMode = true;
        app.targetMBTI = friendTest;
        app.targetUser = userName;
        
        // 특별한 시작 화면 표시
        showFriendTestStart();
    }
}

function showFriendTestStart() {
    // 친구 테스트 전용 시작 화면
    const startScreen = document.getElementById('startScreen');
    const heroTitle = startScreen.querySelector('.hero-title');
    
    heroTitle.innerHTML = `
        <span class="year-text">2025</span>
        <span class="main-text">${app.targetUser}의 MBTI는?</span>
    `;
    
    const subtitle = startScreen.querySelector('.hero-subtitle');
    subtitle.textContent = `친구가 ${app.targetMBTI}일 확률을 알아보세요!`;
}

// 광고 초기화 및 관리
function initAds() {
    // 광고 차단 감지
    setTimeout(() => {
        detectAdBlock();
    }, 2000);
    
    // 광고 스크립트 에러 핸들링
    window.addEventListener('error', (e) => {
        if (e.message && e.message.includes('adsbygoogle')) {
            console.log('광고 로딩 에러 - 정상 동작에는 영향 없습니다.');
        }
    });
}

// 광고 차단 감지
function detectAdBlock() {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    testAd.style.height = '1px';
    document.body.appendChild(testAd);
    
    setTimeout(() => {
        if (testAd.offsetHeight === 0) {
            console.log('AdBlock detected');
            showAdBlockMessage();
        }
        document.body.removeChild(testAd);
    }, 100);
}

// 광고 차단 메시지
function showAdBlockMessage() {
    const message = document.createElement('div');
    message.className = 'adblock-message';
    message.innerHTML = `
        <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px; text-align: center;">
            <p style="margin: 0; color: #856404;">
                💡 광고는 무료 서비스 운영에 도움이 됩니다.<br>
                광고 차단을 해제해 주시면 감사하겠습니다.
            </p>
        </div>
    `;
    
    const container = document.querySelector('.container');
    if (container && container.firstChild) {
        container.insertBefore(message, container.firstChild);
    }
}

// 인터스티셜 광고 설정
function setupInterstitialAd() {
    let questionCount = 0;
    
    // 질문 답변 시 카운트
    const originalSelectAnswer = window.selectAnswer;
    window.selectAnswer = function(value) {
        questionCount++;
        
        // 5번째 질문 후 인터스티셜 광고
        if (questionCount === 5) {
            showInterstitialAd();
        }
        
        originalSelectAnswer(value);
    };
}

// 인터스티셜 광고 표시
function showInterstitialAd() {
    const interstitial = document.createElement('div');
    interstitial.className = 'interstitial-ad';
    interstitial.innerHTML = `
        <div class="interstitial-content">
            <button class="interstitial-close" onclick="closeInterstitialAd()">×</button>
            <ins class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-XXXXXXXXXX"
                data-ad-slot="9876543210"
                data-ad-format="auto"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>
    `;
    
    document.body.appendChild(interstitial);
    setTimeout(() => {
        interstitial.classList.add('active');
    }, 100);
    
    // 5초 후 자동 닫기 버튼 활성화
    setTimeout(() => {
        const closeBtn = interstitial.querySelector('.interstitial-close');
        if (closeBtn) {
            closeBtn.style.display = 'block';
        }
    }, 5000);
}

// 인터스티셜 광고 닫기
window.closeInterstitialAd = function() {
    const interstitial = document.querySelector('.interstitial-ad');
    if (interstitial) {
        interstitial.classList.remove('active');
        setTimeout(() => {
            interstitial.remove();
        }, 300);
    }
};

// 플로팅 광고 설정
function setupFloatingAd() {
    // 결과 화면 감지
    const observer = new MutationObserver(() => {
        if (app.currentScreen === 'result') {
            showFloatingAd();
        } else {
            hideFloatingAd();
        }
    });
    
    observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true
    });
}

// 플로팅 광고 표시
function showFloatingAd() {
    if (document.querySelector('.floating-ad')) return;
    
    const floatingAd = document.createElement('div');
    floatingAd.className = 'floating-ad';
    floatingAd.innerHTML = `
        <ins class="kakao_ad_area" style="display:none;"
            data-ad-unit="DAN-FLOATING"
            data-ad-width="300"
            data-ad-height="250"></ins>
    `;
    
    document.body.appendChild(floatingAd);
}

// 플로팅 광고 숨기기
function hideFloatingAd() {
    const floatingAd = document.querySelector('.floating-ad');
    if (floatingAd) {
        floatingAd.remove();
    }
}

// 광고 새로고침
function refreshAds() {
    // 구글 애드센스는 자동 새로고침되므로 수동 새로고침 제거
    // 광고가 이미 로드된 요소는 다시 push하면 에러 발생
    console.log('광고 자동 새로고침 중...');
}

// 광고 수익 추적
function trackAdRevenue(adType, event) {
    // Google Analytics로 광고 이벤트 전송
    if (typeof gtag !== 'undefined') {
        gtag('event', 'ad_interaction', {
            'ad_type': adType,
            'event_type': event,
            'mbti_type': app.mbtiType,
            'user_name': app.userName
        });
    }
}

// 네이티브 광고 콘텐츠 (스폰서 콘텐츠)
function loadNativeAds() {
    const nativeAdContent = {
        'INTJ': {
            title: '전략적 사고력을 높이는 앱',
            description: 'INTJ를 위한 목표 관리 앱 추천',
            cta: '지금 다운로드',
            link: 'https://example.com/intj-app'
        },
        'ENFP': {
            title: '창의력을 자극하는 온라인 클래스',
            description: 'ENFP의 열정을 키워줄 크리에이티브 강의',
            cta: '무료 체험하기',
            link: 'https://example.com/enfp-class'
        }
        // 각 MBTI별 맞춤 광고 콘텐츠
    };
    
    // MBTI별 맞춤 네이티브 광고 표시
    if (app.mbtiType && nativeAdContent[app.mbtiType]) {
        const ad = nativeAdContent[app.mbtiType];
        const nativeAdHTML = `
            <div class="native-ad-card" onclick="trackAdRevenue('native', 'click')">
                <span class="ad-label">스폰서</span>
                <h4>${ad.title}</h4>
                <p>${ad.description}</p>
                <a href="${ad.link}" target="_blank" class="native-ad-cta">${ad.cta}</a>
            </div>
        `;
        
        // 결과 화면에 네이티브 광고 삽입
        const adContainer = document.querySelector('.ad-native');
        if (adContainer) {
            adContainer.innerHTML = nativeAdHTML;
        }
    }
}

// 초기 실행
handleURLParams();