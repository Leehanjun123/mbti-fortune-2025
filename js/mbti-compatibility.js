// MBTI 궁합 테스트 (커플/친구)
const MBTICompatibility = {
    // 궁합 데이터베이스
    compatibilityMatrix: {
        // 각 MBTI 타입별 최고/최악 궁합
        'INTJ': {
            perfect: ['ENFP', 'ENTP'],
            great: ['INFJ', 'INFP', 'ENTJ'],
            good: ['INTJ', 'INTP', 'ENFJ'],
            neutral: ['ISTJ', 'ISFJ', 'ESTP', 'ESFP'],
            challenging: ['ESTJ', 'ESFJ', 'ISTP', 'ISFP']
        },
        'INTP': {
            perfect: ['ENTJ', 'ESTJ'],
            great: ['INTJ', 'INTP', 'ENTP'],
            good: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
            neutral: ['ISTJ', 'ISFJ', 'ISTP'],
            challenging: ['ESFJ', 'ISFP', 'ESTP', 'ESFP']
        },
        'ENTJ': {
            perfect: ['INTP', 'INFP'],
            great: ['INTJ', 'ENTJ', 'ENTP'],
            good: ['INFJ', 'ENFJ', 'ENFP'],
            neutral: ['ISTJ', 'ESTJ', 'ISTP', 'ESTP'],
            challenging: ['ISFJ', 'ESFJ', 'ISFP', 'ESFP']
        },
        'ENTP': {
            perfect: ['INFJ', 'INTJ'],
            great: ['ENTJ', 'ENTP', 'ENFP'],
            good: ['INTP', 'INFP', 'ENFJ'],
            neutral: ['ISTJ', 'ESTJ', 'ISTP', 'ESTP'],
            challenging: ['ISFJ', 'ESFJ', 'ISFP', 'ESFP']
        },
        'INFJ': {
            perfect: ['ENTP', 'ENFP'],
            great: ['INTJ', 'INFJ', 'INFP'],
            good: ['INTP', 'ENTJ', 'ENFJ'],
            neutral: ['ISFJ', 'ISFP'],
            challenging: ['ISTJ', 'ESTJ', 'ISTP', 'ESTP', 'ESFJ', 'ESFP']
        },
        'INFP': {
            perfect: ['ENFJ', 'ENTJ'],
            great: ['INFJ', 'INFP', 'ENFP'],
            good: ['INTJ', 'INTP', 'ENTP'],
            neutral: ['ISFJ', 'ISFP', 'ESFP'],
            challenging: ['ISTJ', 'ESTJ', 'ISTP', 'ESTP', 'ESFJ']
        },
        'ENFJ': {
            perfect: ['INFP', 'ISFP'],
            great: ['INFJ', 'ENFJ', 'ENFP'],
            good: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
            neutral: ['ISFJ', 'ESFJ', 'ESFP'],
            challenging: ['ISTJ', 'ESTJ', 'ISTP', 'ESTP']
        },
        'ENFP': {
            perfect: ['INFJ', 'INTJ'],
            great: ['INFP', 'ENFJ', 'ENFP'],
            good: ['INTP', 'ENTJ', 'ENTP'],
            neutral: ['ISFP', 'ESFP'],
            challenging: ['ISTJ', 'ESTJ', 'ISTP', 'ESTP', 'ISFJ', 'ESFJ']
        },
        'ISTJ': {
            perfect: ['ESFP', 'ESTP'],
            great: ['ISTJ', 'ESTJ', 'ISFJ'],
            good: ['ESFJ', 'ISTP'],
            neutral: ['INTJ', 'INTP', 'ISFP'],
            challenging: ['INFJ', 'INFP', 'ENTJ', 'ENTP', 'ENFJ', 'ENFP']
        },
        'ISFJ': {
            perfect: ['ESFP', 'ESTP'],
            great: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
            good: ['ISFP'],
            neutral: ['INTJ', 'INTP', 'INFJ', 'INFP'],
            challenging: ['ENTJ', 'ENTP', 'ENFJ', 'ENFP', 'ISTP']
        },
        'ESTJ': {
            perfect: ['ISFP', 'ISTP'],
            great: ['ISTJ', 'ESTJ', 'ESFJ'],
            good: ['ISFJ', 'ESTP', 'ESFP'],
            neutral: ['INTJ', 'INTP', 'ENTJ'],
            challenging: ['INFJ', 'INFP', 'ENTP', 'ENFJ', 'ENFP']
        },
        'ESFJ': {
            perfect: ['ISFP', 'ISTP'],
            great: ['ISFJ', 'ESTJ', 'ESFJ'],
            good: ['ISTJ', 'ESFP'],
            neutral: ['ESTP', 'ENFJ'],
            challenging: ['INTJ', 'INTP', 'INFJ', 'INFP', 'ENTJ', 'ENTP', 'ENFP']
        },
        'ISTP': {
            perfect: ['ESFJ', 'ESTJ'],
            great: ['ISTP', 'ESTP'],
            good: ['ISTJ', 'ISFP'],
            neutral: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'ESFP'],
            challenging: ['INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISFJ']
        },
        'ISFP': {
            perfect: ['ENFJ', 'ESFJ', 'ESTJ'],
            great: ['ISFP', 'ESFP'],
            good: ['ISFJ', 'ISTP', 'ESTP'],
            neutral: ['INTJ', 'INFP', 'ISTJ'],
            challenging: ['INTP', 'INFJ', 'ENTJ', 'ENTP', 'ENFP']
        },
        'ESTP': {
            perfect: ['ISFJ', 'ISTJ'],
            great: ['ISTP', 'ESTP', 'ESFP'],
            good: ['ESTJ', 'ISFP'],
            neutral: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'ESFJ'],
            challenging: ['INFJ', 'INFP', 'ENFJ', 'ENFP']
        },
        'ESFP': {
            perfect: ['ISFJ', 'ISTJ'],
            great: ['ESTP', 'ESFP'],
            good: ['ESTJ', 'ESFJ', 'ISFP'],
            neutral: ['INTJ', 'INFP', 'ENFP', 'ISTP'],
            challenging: ['INTP', 'INFJ', 'ENTJ', 'ENTP', 'ENFJ']
        }
    },
    
    // 테스트 세션
    testSession: null,
    
    // 궁합 테스트 시작
    startCompatibilityTest(user1MBTI, testType = 'love') {
        this.testSession = {
            user1: {
                mbti: user1MBTI,
                name: '',
                answers: []
            },
            user2: {
                mbti: null,
                name: '',
                answers: []
            },
            testType: testType, // 'love', 'friendship', 'work'
            shareCode: this.generateShareCode(),
            status: 'waiting',
            createdAt: Date.now()
        };
        
        return this.testSession;
    },
    
    // 공유 코드 생성
    generateShareCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    },
    
    // 파트너 참여
    joinTest(shareCode, user2MBTI) {
        if (!this.testSession || this.testSession.shareCode !== shareCode) {
            return { error: '유효하지 않은 코드입니다.' };
        }
        
        this.testSession.user2.mbti = user2MBTI;
        this.testSession.status = 'ready';
        
        return this.testSession;
    },
    
    // 궁합 계산
    calculateCompatibility(mbti1, mbti2, testType = 'love') {
        const matrix = this.compatibilityMatrix[mbti1];
        if (!matrix) return null;
        
        let baseScore = 50;
        let category = '';
        
        // 카테고리별 점수
        if (matrix.perfect.includes(mbti2)) {
            baseScore = 95;
            category = 'perfect';
        } else if (matrix.great.includes(mbti2)) {
            baseScore = 80;
            category = 'great';
        } else if (matrix.good.includes(mbti2)) {
            baseScore = 65;
            category = 'good';
        } else if (matrix.neutral.includes(mbti2)) {
            baseScore = 50;
            category = 'neutral';
        } else if (matrix.challenging.includes(mbti2)) {
            baseScore = 35;
            category = 'challenging';
        }
        
        // 테스트 타입별 보정
        let finalScore = baseScore;
        if (testType === 'friendship') {
            finalScore += 10; // 친구는 좀 더 관대하게
        } else if (testType === 'work') {
            // 업무는 T/F, J/P가 중요
            if (mbti1[2] === mbti2[2]) finalScore += 5;
            if (mbti1[3] === mbti2[3]) finalScore += 5;
        }
        
        // 최종 점수 범위 조정
        finalScore = Math.min(100, Math.max(20, finalScore));
        
        return {
            score: finalScore,
            category: category,
            level: this.getCompatibilityLevel(finalScore),
            description: this.getDescription(category, testType),
            advice: this.getAdvice(mbti1, mbti2, category, testType)
        };
    },
    
    // 궁합 레벨
    getCompatibilityLevel(score) {
        if (score >= 90) return '💯 완벽한 궁합';
        if (score >= 75) return '💕 환상의 궁합';
        if (score >= 60) return '💚 좋은 궁합';
        if (score >= 45) return '💛 노력이 필요한 궁합';
        return '💔 도전적인 궁합';
    },
    
    // 설명 생성
    getDescription(category, testType) {
        const descriptions = {
            love: {
                perfect: '운명적인 만남! 서로를 완벽하게 이해하고 보완하는 천생연분입니다.',
                great: '매우 좋은 궁합! 서로의 차이가 매력이 되고 함께 성장할 수 있습니다.',
                good: '안정적인 관계! 서로를 존중하며 편안한 사랑을 만들어갈 수 있습니다.',
                neutral: '노력이 필요한 관계! 서로를 이해하려는 노력으로 좋은 관계를 만들 수 있습니다.',
                challenging: '도전적인 관계! 하지만 서로에게서 많은 것을 배울 수 있습니다.'
            },
            friendship: {
                perfect: '베스트 프렌드! 평생 함께할 수 있는 최고의 친구입니다.',
                great: '환상의 콤비! 서로를 완벽하게 이해하는 찰떡 친구입니다.',
                good: '좋은 친구! 편안하고 즐거운 우정을 나눌 수 있습니다.',
                neutral: '괜찮은 친구! 서로 다른 점이 있지만 좋은 친구가 될 수 있습니다.',
                challenging: '색다른 친구! 서로에게 새로운 관점을 제공할 수 있습니다.'
            },
            work: {
                perfect: '최고의 파트너! 완벽한 시너지로 놀라운 성과를 만들 수 있습니다.',
                great: '훌륭한 동료! 서로의 강점을 살려 great한 팀워크를 발휘합니다.',
                good: '좋은 협력! 원활한 소통으로 목표를 달성할 수 있습니다.',
                neutral: '일반적인 관계! 전문적인 관계를 유지하며 협력할 수 있습니다.',
                challenging: '도전적인 협업! 하지만 다양성이 혁신을 만들 수 있습니다.'
            }
        };
        
        return descriptions[testType]?.[category] || '특별한 관계입니다!';
    },
    
    // 조언 생성
    getAdvice(mbti1, mbti2, category, testType) {
        const advice = [];
        
        // 공통 조언
        if (mbti1[0] !== mbti2[0]) {
            advice.push(mbti1[0] === 'E' ? 
                '상대방의 혼자만의 시간을 존중해주세요.' : 
                '함께하는 활동을 늘려보세요.');
        }
        
        if (mbti1[1] !== mbti2[1]) {
            advice.push(mbti1[1] === 'N' ? 
                '구체적이고 현실적인 대화를 시도해보세요.' : 
                '상대방의 상상력과 비전을 이해해주세요.');
        }
        
        if (mbti1[2] !== mbti2[2]) {
            advice.push(mbti1[2] === 'T' ? 
                '감정적인 공감을 더 표현해주세요.' : 
                '논리적인 관점도 고려해보세요.');
        }
        
        if (mbti1[3] !== mbti2[3]) {
            advice.push(mbti1[3] === 'J' ? 
                '유연하고 즉흥적인 것도 즐겨보세요.' : 
                '계획을 세우고 지키는 연습을 해보세요.');
        }
        
        // 카테고리별 특별 조언
        if (category === 'perfect') {
            advice.push('이미 완벽한 궁합! 서로를 더욱 아껴주세요.');
        } else if (category === 'challenging') {
            advice.push('차이를 인정하고 서로에게서 배우려고 노력하세요.');
        }
        
        return advice;
    },
    
    // 상세 분석
    getDetailedAnalysis(mbti1, mbti2) {
        const analysis = {
            communication: this.analyzeCommunication(mbti1, mbti2),
            values: this.analyzeValues(mbti1, mbti2),
            lifestyle: this.analyzeLifestyle(mbti1, mbti2),
            conflict: this.analyzeConflict(mbti1, mbti2),
            growth: this.analyzeGrowth(mbti1, mbti2)
        };
        
        return analysis;
    },
    
    // 소통 방식 분석
    analyzeCommunication(mbti1, mbti2) {
        const score = (mbti1[0] === mbti2[0] ? 25 : 15) + 
                     (mbti1[1] === mbti2[1] ? 25 : 15);
        
        return {
            score: score,
            description: score >= 40 ? 
                '소통이 원활합니다. 서로를 잘 이해할 수 있어요.' :
                '소통 방식이 달라 노력이 필요해요.'
        };
    },
    
    // 가치관 분석
    analyzeValues(mbti1, mbti2) {
        const score = (mbti1[2] === mbti2[2] ? 30 : 10) + 
                     (mbti1[1] === mbti2[1] ? 20 : 10);
        
        return {
            score: score,
            description: score >= 40 ? 
                '비슷한 가치관을 공유합니다.' :
                '가치관의 차이가 있지만 서로 배울 수 있어요.'
        };
    },
    
    // 라이프스타일 분석
    analyzeLifestyle(mbti1, mbti2) {
        const score = (mbti1[3] === mbti2[3] ? 30 : 10) + 
                     (mbti1[0] === mbti2[0] ? 20 : 10);
        
        return {
            score: score,
            description: score >= 40 ? 
                '비슷한 라이프스타일로 편안한 관계예요.' :
                '다른 라이프스타일이 새로움을 줄 수 있어요.'
        };
    },
    
    // 갈등 해결 분석
    analyzeConflict(mbti1, mbti2) {
        const score = (mbti1[2] === mbti2[2] ? 25 : 15) + 
                     (mbti1[3] === mbti2[3] ? 25 : 15);
        
        return {
            score: score,
            description: score >= 40 ? 
                '갈등을 건설적으로 해결할 수 있어요.' :
                '갈등 해결 방식이 달라 이해가 필요해요.'
        };
    },
    
    // 성장 가능성 분석
    analyzeGrowth(mbti1, mbti2) {
        // 다른 타입일수록 성장 가능성이 높다고 봄
        let differences = 0;
        for (let i = 0; i < 4; i++) {
            if (mbti1[i] !== mbti2[i]) differences++;
        }
        
        const score = differences * 12.5 + 50;
        
        return {
            score: Math.min(100, score),
            description: differences >= 2 ? 
                '서로에게서 많은 것을 배우며 성장할 수 있어요.' :
                '편안한 관계 속에서 안정적으로 성장해요.'
        };
    },
    
    // 결과 공유 URL 생성
    generateShareURL(result) {
        const data = {
            mbti1: result.mbti1,
            mbti2: result.mbti2,
            score: result.score,
            level: result.level
        };
        
        const encoded = btoa(JSON.stringify(data));
        return `https://mbti-fortune-2025.com/compatibility?result=${encoded}`;
    }
};

// 전역 사용 가능하도록 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MBTICompatibility;
}