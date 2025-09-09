// MBTI 이상형 월드컵
const MBTIWorldCup = {
    // 연예인/캐릭터 데이터베이스
    candidates: [
        // K-POP 아이돌
        { name: 'BTS RM', mbti: 'ENFP', image: '🎤', category: 'K-POP', description: '리더, 천재 래퍼' },
        { name: 'BTS 진', mbti: 'INTP', image: '🌟', category: 'K-POP', description: '월드와이드 핸섬' },
        { name: 'BTS 슈가', mbti: 'INTJ', image: '🎹', category: 'K-POP', description: '천재 프로듀서' },
        { name: 'BTS 제이홉', mbti: 'ESFJ', image: '🕺', category: 'K-POP', description: '희망, 메인댄서' },
        { name: 'BTS 지민', mbti: 'ENFJ', image: '💫', category: 'K-POP', description: '천사, 메인댄서' },
        { name: 'BTS V', mbti: 'INFP', image: '🎨', category: 'K-POP', description: '예술적 감성' },
        { name: 'BTS 정국', mbti: 'ISFP', image: '🐰', category: 'K-POP', description: '황금막내, 올라운더' },
        
        { name: '블랙핑크 지수', mbti: 'INFJ', image: '🌹', category: 'K-POP', description: '비주얼, 보컬' },
        { name: '블랙핑크 제니', mbti: 'INFP', image: '👑', category: 'K-POP', description: '힙합 퀸' },
        { name: '블랙핑크 로제', mbti: 'ISFP', image: '🎸', category: 'K-POP', description: '유니크 보이스' },
        { name: '블랙핑크 리사', mbti: 'ESFP', image: '💃', category: 'K-POP', description: '댄스 머신' },
        
        { name: '아이유', mbti: 'INFJ', image: '🎵', category: 'K-POP', description: '국민 여동생' },
        { name: '태연', mbti: 'INFJ', image: '🎤', category: 'K-POP', description: '보컬 퀸' },
        
        // 배우
        { name: '송강', mbti: 'ISFP', image: '🎭', category: '배우', description: '넷플릭스 프린스' },
        { name: '차은우', mbti: 'INFJ', image: '✨', category: '배우', description: '얼굴 천재' },
        { name: '박서준', mbti: 'ENFJ', image: '💪', category: '배우', description: '로코킹' },
        { name: '김수현', mbti: 'INFP', image: '🌙', category: '배우', description: '연기 천재' },
        { name: '이종석', mbti: 'INFP', image: '📚', category: '배우', description: '모범생 비주얼' },
        
        { name: '김태리', mbti: 'INFP', image: '🎬', category: '배우', description: '연기파 배우' },
        { name: '한소희', mbti: 'ISTP', image: '🖤', category: '배우', description: '매혹적인 매력' },
        { name: '수지', mbti: 'INFP', image: '🌸', category: '배우', description: '국민 첫사랑' },
        { name: '아이린', mbti: 'ISFJ', image: '👸', category: '배우', description: '여신 비주얼' },
        
        // 애니메이션 캐릭터
        { name: '나루토', mbti: 'ENFP', image: '🍥', category: '애니', description: '닌자의 길' },
        { name: '사스케', mbti: 'INTJ', image: '⚡', category: '애니', description: '복수자' },
        { name: '루피', mbti: 'ESFP', image: '👒', category: '애니', description: '해적왕' },
        { name: '조로', mbti: 'ISTP', image: '⚔️', category: '애니', description: '삼도류 검사' },
        { name: '에렌', mbti: 'ISFP', image: '🔥', category: '애니', description: '자유를 향한 진격' },
        { name: '레비', mbti: 'ISTP', image: '🗡️', category: '애니', description: '인류 최강' },
        { name: '고죠', mbti: 'ENTP', image: '👁️', category: '애니', description: '최강의 주술사' },
        { name: '이타도리', mbti: 'ESFP', image: '👊', category: '애니', description: '스쿠나의 그릇' },
        
        { name: '네즈코', mbti: 'ISFJ', image: '🎋', category: '애니', description: '귀멸의 칼날' },
        { name: '제로투', mbti: 'ESTP', image: '🦖', category: '애니', description: '달링 인 더 프랑키스' },
        { name: '미카사', mbti: 'ISTJ', image: '🧣', category: '애니', description: '에렌을 지키는 자' },
        { name: '히나타', mbti: 'ISFJ', image: '🌻', category: '애니', description: '백안의 공주' },
        
        // 게임 캐릭터
        { name: '클라우드', mbti: 'INTJ', image: '🗡️', category: '게임', description: 'FF7 주인공' },
        { name: '티파', mbti: 'ISFJ', image: '🥊', category: '게임', description: 'FF7 히로인' },
        { name: '2B', mbti: 'ISTJ', image: '🤖', category: '게임', description: '니어 오토마타' },
        { name: '젤다', mbti: 'INFJ', image: '👸', category: '게임', description: '하이랄의 공주' },
        { name: '링크', mbti: 'ISFP', image: '🛡️', category: '게임', description: '용사' },
        { name: '전여옥', mbti: 'ENTJ', image: '⚔️', category: '게임', description: '리그 오브 레전드' },
        { name: '아리', mbti: 'ENFP', image: '🦊', category: '게임', description: '구미호' },
        { name: 'D.Va', mbti: 'ESTP', image: '🎮', category: '게임', description: '오버워치 프로게이머' }
    ],
    
    // 월드컵 상태
    currentTournament: null,
    currentRound: [],
    nextRound: [],
    currentMatch: 0,
    history: [],
    
    // 토너먼트 시작
    startTournament(category = 'all', rounds = 16) {
        let pool = [...this.candidates];
        
        // 카테고리 필터링
        if (category !== 'all') {
            pool = pool.filter(c => c.category === category);
        }
        
        // 랜덤 섞기
        pool = this.shuffle(pool);
        
        // 라운드 수에 맞게 선택
        pool = pool.slice(0, rounds);
        
        this.currentTournament = {
            totalRounds: Math.log2(rounds),
            currentRoundNumber: 1,
            category: category,
            startTime: Date.now()
        };
        
        this.currentRound = pool;
        this.nextRound = [];
        this.currentMatch = 0;
        this.history = [];
        
        return this.getCurrentMatch();
    },
    
    // 현재 매치 가져오기
    getCurrentMatch() {
        if (this.currentMatch >= this.currentRound.length) {
            // 라운드 종료
            if (this.nextRound.length === 1) {
                // 우승자 결정
                return {
                    type: 'winner',
                    winner: this.nextRound[0],
                    history: this.history
                };
            } else if (this.nextRound.length > 1) {
                // 다음 라운드로
                this.currentRound = this.nextRound;
                this.nextRound = [];
                this.currentMatch = 0;
                this.currentTournament.currentRoundNumber++;
            }
        }
        
        if (this.currentMatch < this.currentRound.length - 1) {
            return {
                type: 'match',
                left: this.currentRound[this.currentMatch],
                right: this.currentRound[this.currentMatch + 1],
                round: this.currentTournament.currentRoundNumber,
                totalRounds: this.currentTournament.totalRounds,
                matchNumber: Math.floor(this.currentMatch / 2) + 1,
                totalMatches: Math.floor(this.currentRound.length / 2)
            };
        }
        
        return null;
    },
    
    // 선택하기
    makeChoice(choice) {
        const match = this.getCurrentMatch();
        if (!match || match.type !== 'match') return null;
        
        const winner = choice === 'left' ? match.left : match.right;
        const loser = choice === 'left' ? match.right : match.left;
        
        this.nextRound.push(winner);
        this.history.push({
            round: match.round,
            winner: winner,
            loser: loser,
            timestamp: Date.now()
        });
        
        this.currentMatch += 2;
        
        return this.getCurrentMatch();
    },
    
    // MBTI 궁합 분석
    analyzeCompatibility(userMBTI, winnerMBTI) {
        const compatibility = this.calculateCompatibility(userMBTI, winnerMBTI);
        
        return {
            score: compatibility.score,
            level: compatibility.level,
            description: compatibility.description,
            advice: this.getRelationshipAdvice(userMBTI, winnerMBTI)
        };
    },
    
    // 궁합 점수 계산
    calculateCompatibility(type1, type2) {
        let score = 50; // 기본 점수
        
        // 같은 글자마다 +10점
        for (let i = 0; i < 4; i++) {
            if (type1[i] === type2[i]) {
                score += 10;
            }
        }
        
        // 특별 궁합 (골든 페어)
        const goldenPairs = {
            'INTJ': ['ENFP', 'ENTP'],
            'INTP': ['ENTJ', 'ENFJ'],
            'INFJ': ['ENTP', 'ENFP'],
            'INFP': ['ENFJ', 'ENTJ'],
            'ENTJ': ['INTP', 'INFP'],
            'ENTP': ['INFJ', 'INTJ'],
            'ENFJ': ['INFP', 'INTP'],
            'ENFP': ['INFJ', 'INTJ'],
            'ISTJ': ['ESFP', 'ESTP'],
            'ISFJ': ['ESFP', 'ESTP'],
            'ESTJ': ['ISFP', 'ISTP'],
            'ESFJ': ['ISFP', 'ISTP'],
            'ISTP': ['ESFJ', 'ESTJ'],
            'ISFP': ['ESFJ', 'ESTJ'],
            'ESTP': ['ISFJ', 'ISTJ'],
            'ESFP': ['ISFJ', 'ISTJ']
        };
        
        if (goldenPairs[type1]?.includes(type2)) {
            score += 20;
        }
        
        // 레벨 결정
        let level, description;
        if (score >= 90) {
            level = '천생연분';
            description = '운명적인 만남! 서로를 완벽하게 이해하고 보완합니다.';
        } else if (score >= 70) {
            level = '환상의 짝꿍';
            description = '매우 좋은 궁합! 서로 다른 매력이 시너지를 만듭니다.';
        } else if (score >= 50) {
            level = '좋은 친구';
            description = '편안한 관계! 노력하면 더 깊은 관계로 발전 가능합니다.';
        } else {
            level = '도전적 관계';
            description = '서로 다른 점이 많지만, 그만큼 배울 점도 많습니다.';
        }
        
        return { score, level, description };
    },
    
    // 관계 조언
    getRelationshipAdvice(userMBTI, partnerMBTI) {
        const advice = [];
        
        // E/I 차이
        if (userMBTI[0] !== partnerMBTI[0]) {
            if (userMBTI[0] === 'E') {
                advice.push('상대방의 혼자만의 시간을 존중해주세요.');
            } else {
                advice.push('상대방과 함께하는 활동적인 시간을 만들어보세요.');
            }
        }
        
        // N/S 차이
        if (userMBTI[1] !== partnerMBTI[1]) {
            if (userMBTI[1] === 'N') {
                advice.push('구체적이고 실용적인 대화를 시도해보세요.');
            } else {
                advice.push('상대방의 상상력과 아이디어를 경청해주세요.');
            }
        }
        
        // T/F 차이
        if (userMBTI[2] !== partnerMBTI[2]) {
            if (userMBTI[2] === 'T') {
                advice.push('감정적인 공감과 따뜻한 말을 더 표현해보세요.');
            } else {
                advice.push('논리적인 관점도 이해하려고 노력해보세요.');
            }
        }
        
        // J/P 차이
        if (userMBTI[3] !== partnerMBTI[3]) {
            if (userMBTI[3] === 'J') {
                advice.push('유연하고 즉흥적인 계획도 즐겨보세요.');
            } else {
                advice.push('함께 계획을 세우고 지키는 연습을 해보세요.');
            }
        }
        
        return advice;
    },
    
    // 배열 섞기
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
};

// 전역 사용 가능하도록 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MBTIWorldCup;
}