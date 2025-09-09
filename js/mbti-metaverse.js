// MBTI 메타버스 타운
const MBTIMetaverse = {
    // 16개 MBTI 구역 정의
    districts: {
        'INTJ': {
            name: '전략가의 성채',
            theme: 'dark-purple',
            emoji: '🏰',
            description: '완벽한 계획이 실현되는 곳',
            buildings: ['전략 도서관', '마스터플랜 타워', '분석 연구소'],
            activities: ['체스 대회', '전략 시뮬레이션', '미래 예측 세미나']
        },
        'INTP': {
            name: '사색가의 실험실',
            theme: 'blue-tech',
            emoji: '🔬',
            description: '논리와 창의성이 만나는 곳',
            buildings: ['논리 미로', '아이디어 팩토리', '패러독스 카페'],
            activities: ['논리 퍼즐', '발명품 전시회', '철학 토론']
        },
        'ENTJ': {
            name: '지휘관의 본부',
            theme: 'gold-black',
            emoji: '👑',
            description: '리더십과 야망의 중심지',
            buildings: ['리더십 아카데미', '성공 박물관', '전략 회의실'],
            activities: ['리더십 훈련', '비즈니스 게임', '목표 달성 워크샵']
        },
        'ENTP': {
            name: '토론가의 광장',
            theme: 'electric-orange',
            emoji: '💡',
            description: '아이디어와 논쟁이 불꽃 튀는 곳',
            buildings: ['토론 아레나', '혁신 허브', '아이디어 마켓'],
            activities: ['토론 배틀', '스타트업 피칭', '브레인스토밍']
        },
        'INFJ': {
            name: '예언자의 성소',
            theme: 'mystic-violet',
            emoji: '🔮',
            description: '직관과 통찰이 깃든 신비로운 곳',
            buildings: ['명상 정원', '예언의 탑', '공감 센터'],
            activities: ['타로 리딩', '명상 클래스', '심리 상담']
        },
        'INFP': {
            name: '몽상가의 정원',
            theme: 'pastel-rainbow',
            emoji: '🌈',
            description: '꿈과 이상이 피어나는 곳',
            buildings: ['드림 갤러리', '감성 도서관', '힐링 숲'],
            activities: ['시 낭독회', '예술 창작', '자아 탐색 여행']
        },
        'ENFJ': {
            name: '영웅의 광장',
            theme: 'warm-gold',
            emoji: '🌟',
            description: '희망과 영감을 주는 곳',
            buildings: ['멘토링 센터', '하모니 홀', '영감의 분수'],
            activities: ['동기부여 강연', '팀빌딩', '자선 이벤트']
        },
        'ENFP': {
            name: '활동가의 축제',
            theme: 'vibrant-multi',
            emoji: '🎪',
            description: '열정과 모험이 넘치는 곳',
            buildings: ['모험 놀이터', '창의력 서커스', '우정의 다리'],
            activities: ['즉흥 공연', '네트워킹 파티', '새로운 경험 투어']
        },
        'ISTJ': {
            name: '관리자의 요새',
            theme: 'steel-gray',
            emoji: '🏛️',
            description: '질서와 전통이 지켜지는 곳',
            buildings: ['역사 박물관', '규칙 도서관', '전통 보존소'],
            activities: ['역사 탐방', '체계 만들기', '전통 공예']
        },
        'ISFJ': {
            name: '수호자의 마을',
            theme: 'soft-green',
            emoji: '🏡',
            description: '따뜻함과 배려가 넘치는 곳',
            buildings: ['케어 센터', '추억 박물관', '요리 학교'],
            activities: ['봉사 활동', '요리 클래스', '가족 모임']
        },
        'ESTJ': {
            name: '경영자의 타워',
            theme: 'corporate-blue',
            emoji: '🏢',
            description: '효율과 성과가 만들어지는 곳',
            buildings: ['비즈니스 센터', '효율성 연구소', '리더십 홀'],
            activities: ['경영 시뮬레이션', '프로젝트 관리', '네트워킹']
        },
        'ESFJ': {
            name: '외교관의 살롱',
            theme: 'rose-gold',
            emoji: '🎭',
            description: '사교와 화합이 이루어지는 곳',
            buildings: ['소셜 클럽', '이벤트 홀', '환대 센터'],
            activities: ['파티 기획', '팀 이벤트', '커뮤니티 활동']
        },
        'ISTP': {
            name: '장인의 공방',
            theme: 'industrial',
            emoji: '🔧',
            description: '기술과 실용이 만나는 곳',
            buildings: ['메이커 스페이스', '도구 박물관', '엔지니어링 랩'],
            activities: ['DIY 워크샵', '기계 제작', '서바이벌 훈련']
        },
        'ISFP': {
            name: '예술가의 아틀리에',
            theme: 'artistic-palette',
            emoji: '🎨',
            description: '감성과 창작이 흐르는 곳',
            buildings: ['아트 스튜디오', '음악 홀', '자연 갤러리'],
            activities: ['미술 전시', '음악 잼', '자연 탐험']
        },
        'ESTP': {
            name: '모험가의 경기장',
            theme: 'action-red',
            emoji: '🏟️',
            description: '스릴과 액션이 가득한 곳',
            buildings: ['스포츠 아레나', '익스트림 파크', '레이싱 트랙'],
            activities: ['스포츠 경기', '번지점프', '레이싱 대회']
        },
        'ESFP': {
            name: '연예인의 무대',
            theme: 'glitter-pink',
            emoji: '🎤',
            description: '즐거움과 엔터테인먼트의 중심',
            buildings: ['공연장', '파티 홀', '스타 거리'],
            activities: ['라이브 공연', '댄스 배틀', '팬미팅']
        }
    },
    
    // 사용자 집 데이터
    userHomes: {},
    
    // 구역 방문 기록
    visitHistory: [],
    
    // 현재 위치
    currentLocation: null,
    
    // 메타버스 초기화
    initMetaverse(userMBTI) {
        this.currentLocation = userMBTI;
        
        // 사용자 집 생성
        if (!this.userHomes[userMBTI]) {
            this.userHomes[userMBTI] = this.createHome(userMBTI);
        }
        
        return {
            currentDistrict: this.districts[userMBTI],
            userHome: this.userHomes[userMBTI],
            availableDistricts: Object.keys(this.districts)
        };
    },
    
    // 집 생성
    createHome(mbtiType) {
        return {
            owner: mbtiType,
            level: 1,
            decorations: [],
            furniture: this.getDefaultFurniture(mbtiType),
            visitors: [],
            messages: [],
            exp: 0,
            coins: 100,
            items: [],
            achievements: []
        };
    },
    
    // 기본 가구 제공
    getDefaultFurniture(mbtiType) {
        const furnitureSet = {
            'INTJ': ['전략 책상', '체스판', '미니멀 소파'],
            'INTP': ['실험 테이블', '책장', '빈백'],
            'ENTJ': ['CEO 책상', '트로피 진열장', '가죽 소파'],
            'ENTP': ['화이트보드', '아이디어 보드', '회전 의자'],
            'INFJ': ['명상 쿠션', '크리스탈', '캔들'],
            'INFP': ['드림캐처', '동화책', '포근한 담요'],
            'ENFJ': ['원형 테이블', '사진 액자', '환영 매트'],
            'ENFP': ['컬러풀 쿠션', '파티 용품', '폴라로이드'],
            'ISTJ': ['정리함', '달력', '클래식 가구'],
            'ISFJ': ['가족 사진', '화분', '아늑한 소파'],
            'ESTJ': ['업무 책상', '시계', '정장 옷장'],
            'ESFJ': ['대형 식탁', '장식품', '게스트 의자'],
            'ISTP': ['공구함', '작업대', '실용적 선반'],
            'ISFP': ['이젤', '악기', '빈티지 가구'],
            'ESTP': ['운동기구', '게임기', '바 테이블'],
            'ESFP': ['무대 조명', '거울', '파티 소품']
        };
        
        return furnitureSet[mbtiType] || ['기본 책상', '기본 의자', '기본 침대'];
    },
    
    // 구역 방문
    visitDistrict(districtMBTI) {
        if (!this.districts[districtMBTI]) return null;
        
        const fromDistrict = this.currentLocation;
        this.currentLocation = districtMBTI;
        
        // 방문 기록
        this.visitHistory.push({
            from: fromDistrict,
            to: districtMBTI,
            timestamp: Date.now()
        });
        
        // 방문 보상
        const rewards = this.calculateVisitRewards(fromDistrict, districtMBTI);
        
        return {
            district: this.districts[districtMBTI],
            rewards: rewards,
            residents: this.getDistrictResidents(districtMBTI),
            events: this.getDistrictEvents(districtMBTI)
        };
    },
    
    // 방문 보상 계산
    calculateVisitRewards(from, to) {
        let coins = 10;
        let exp = 5;
        let items = [];
        
        // 첫 방문 보너스
        const firstVisit = !this.visitHistory.some(v => v.to === to);
        if (firstVisit) {
            coins += 50;
            exp += 20;
            items.push(`${to} 기념품`);
        }
        
        // 상성 보너스
        if (this.checkCompatibility(from, to)) {
            coins += 20;
            exp += 10;
        }
        
        return { coins, exp, items };
    },
    
    // 구역 주민 가져오기 (온라인 사용자)
    getDistrictResidents(district) {
        // 실제로는 Firebase에서 가져올 데이터
        return [
            { username: `${district}_lover`, level: 5, status: 'online' },
            { username: `${district}_master`, level: 10, status: 'busy' }
        ];
    },
    
    // 구역 이벤트 가져오기
    getDistrictEvents(district) {
        const now = new Date();
        const events = [];
        
        // 매일 이벤트
        events.push({
            name: `${this.districts[district].name} 일일 퀘스트`,
            type: 'daily',
            reward: { coins: 30, exp: 15 },
            description: `${district} 구역의 특별 활동 참여`
        });
        
        // 주간 이벤트
        if (now.getDay() === 0) { // 일요일
            events.push({
                name: `${district} 주간 페스티벌`,
                type: 'weekly',
                reward: { coins: 100, exp: 50, items: ['특별 가구'] },
                description: '일주일에 한 번 열리는 대규모 이벤트'
            });
        }
        
        return events;
    },
    
    // 집 꾸미기
    decorateHome(mbtiType, item, position) {
        const home = this.userHomes[mbtiType];
        if (!home) return false;
        
        home.decorations.push({
            item: item,
            position: position,
            placedAt: Date.now()
        });
        
        // 경험치 획득
        home.exp += 10;
        this.checkLevelUp(home);
        
        return true;
    },
    
    // 레벨업 체크
    checkLevelUp(home) {
        const requiredExp = home.level * 100;
        if (home.exp >= requiredExp) {
            home.level++;
            home.exp -= requiredExp;
            home.coins += home.level * 50;
            
            return {
                newLevel: home.level,
                reward: home.level * 50
            };
        }
        return null;
    },
    
    // 미니게임
    playMiniGame(gameType, district) {
        const games = {
            'puzzle': {
                name: 'MBTI 퍼즐',
                difficulty: Math.random(),
                maxReward: 50
            },
            'quiz': {
                name: 'MBTI 퀴즈',
                difficulty: Math.random(),
                maxReward: 30
            },
            'race': {
                name: 'MBTI 레이싱',
                difficulty: Math.random(),
                maxReward: 70
            }
        };
        
        const game = games[gameType];
        if (!game) return null;
        
        // 성공 확률 계산 (구역 보너스 포함)
        let successRate = 0.5;
        if (district === this.currentLocation) {
            successRate += 0.2; // 홈 어드밴티지
        }
        
        const success = Math.random() < successRate;
        const reward = success ? Math.floor(game.maxReward * (0.5 + Math.random() * 0.5)) : 0;
        
        return {
            game: game.name,
            success: success,
            reward: reward
        };
    },
    
    // 호환성 체크
    checkCompatibility(type1, type2) {
        // 간단한 호환성 규칙
        const compatible = {
            'INTJ': ['ENFP', 'ENTP'],
            'INTP': ['ENTJ', 'ENFJ'],
            'INFJ': ['ENTP', 'ENFP'],
            'INFP': ['ENFJ', 'ENTJ']
            // ... 나머지 타입들
        };
        
        return compatible[type1]?.includes(type2) || false;
    }
};

// 전역 사용 가능하도록 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MBTIMetaverse;
}