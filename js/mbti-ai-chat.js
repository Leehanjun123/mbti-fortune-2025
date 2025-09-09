// AI MBTI 챗봇 친구
const MBTIAIChat = {
    // MBTI 타입별 성격 특성
    personalities: {
        'INTJ': {
            traits: ['논리적', '계획적', '독립적', '완벽주의적'],
            speakingStyle: 'formal',
            emoji: '🧠',
            greetings: ['효율적인 하루 되세요.', '계획은 잘 진행되고 있나요?', '논리적으로 생각해봅시다.'],
            responses: {
                greeting: '안녕하세요. 무엇을 도와드릴까요?',
                advice: '체계적으로 접근해보세요. 먼저 목표를 명확히 하고, 단계별 계획을 세우는 것이 중요합니다.',
                comfort: '어려운 상황이시군요. 하지만 이것도 성장의 기회입니다. 문제를 분석하고 해결책을 찾아봅시다.',
                joke: '유머는 제 전문 분야가 아니지만... 왜 프로그래머는 어두운 모드를 좋아할까요? 빛이 버그를 만들거든요.',
                love: '감정은 복잡하지만 패턴이 있습니다. 상대방의 행동을 관찰하고 분석해보세요.'
            }
        },
        'INTP': {
            traits: ['호기심많은', '분석적', '창의적', '논리적'],
            speakingStyle: 'analytical',
            emoji: '🔬',
            greetings: ['흥미로운 주제가 있나요?', '오늘은 뭘 분석해볼까요?', '새로운 아이디어가 떠올랐어요.'],
            responses: {
                greeting: '오, 안녕하세요! 무슨 흥미로운 이야기가 있나요?',
                advice: '흠... 여러 가능성을 고려해봤나요? 다른 관점에서 보면 새로운 해결책이 보일 수 있어요.',
                comfort: '논리적으로 보면 이 상황도 지나갈 거예요. 하지만 지금은 힘드시죠?',
                joke: '슈뢰딩거의 고양이가 바에 들어갔는데... 아니면 안 들어갔는데... 둘 다인데?',
                love: '사랑은 도파민과 세로토닌의 작용이지만... 그래도 특별한 느낌이죠.'
            }
        },
        'ENTJ': {
            traits: ['리더십있는', '결단력있는', '야심찬', '전략적'],
            speakingStyle: 'commanding',
            emoji: '👑',
            greetings: ['오늘의 목표는 무엇인가요?', '도전할 준비가 되셨나요?', '함께 성공을 만들어봅시다!'],
            responses: {
                greeting: '좋습니다! 오늘은 무엇을 달성하실 건가요?',
                advice: '목표를 세우고 실행하세요. 주저하지 말고 과감하게 도전하세요!',
                comfort: '실패는 성공의 어머니입니다. 이 경험을 발판으로 더 높이 도약하세요.',
                joke: '리더와 보스의 차이를 아시나요? 리더는 "함께 가자"고 하고, 보스는 "가라"고 하죠.',
                love: '관계도 전략이 필요합니다. 명확한 커뮤니케이션과 상호 존중이 핵심이에요.'
            }
        },
        'ENTP': {
            traits: ['토론좋아하는', '창의적', '재치있는', '도전적'],
            speakingStyle: 'witty',
            emoji: '💡',
            greetings: ['토론할 준비 되셨나요?', '오늘은 어떤 고정관념을 깨볼까요?', '새로운 아이디어 들어보실래요?'],
            responses: {
                greeting: '오! 재미있는 대화를 기대하고 있었어요!',
                advice: '일반적인 방법 말고, 완전히 다른 접근을 시도해보는 건 어때요?',
                comfort: '힘든 상황도 다른 각도에서 보면 기회가 될 수 있어요. 관점을 바꿔보세요!',
                joke: '변호사와 상어의 공통점은? 둘 다 이빨이 날카롭... 아니, 농담이에요!',
                love: '사랑은 가장 흥미로운 모순이죠. 논리적이면서도 비논리적이니까요.'
            }
        },
        'INFJ': {
            traits: ['통찰력있는', '이상주의적', '공감능력높은', '신중한'],
            speakingStyle: 'empathetic',
            emoji: '🔮',
            greetings: ['오늘 기분은 어떠세요?', '마음이 평안하길 바라요.', '이야기를 들어드릴게요.'],
            responses: {
                greeting: '반가워요. 오늘은 어떤 하루를 보내고 계신가요?',
                advice: '마음의 소리를 들어보세요. 직관이 답을 알려줄 거예요.',
                comfort: '힘드셨겠어요. 당신의 감정은 충분히 이해할 만해요. 곁에 있어드릴게요.',
                joke: '가끔은 웃음이 최고의 치료제죠. 오늘 하늘이 참 예쁘지 않나요?',
                love: '진정한 사랑은 서로의 영혼을 이해하는 것에서 시작돼요.'
            }
        },
        'INFP': {
            traits: ['이상주의적', '창의적', '공감적', '열정적'],
            speakingStyle: 'poetic',
            emoji: '🌈',
            greetings: ['오늘은 어떤 꿈을 꾸셨나요?', '마음이 이끄는 대로 가요.', '당신의 이야기가 궁금해요.'],
            responses: {
                greeting: '안녕하세요! 오늘은 특별한 무언가를 느끼시나요?',
                advice: '가슴이 시키는 대로 해보세요. 진정성이 가장 중요해요.',
                comfort: '괜찮아요. 눈물도 감정의 일부예요. 당신은 충분히 강해요.',
                joke: '나비가 꽃에게 했던 말 아세요? "넌 정말 꽃같아!"',
                love: '사랑은 두 영혼이 하나의 멜로디를 만드는 거예요.'
            }
        },
        'ENFJ': {
            traits: ['카리스마있는', '이타적', '영감주는', '책임감있는'],
            speakingStyle: 'inspiring',
            emoji: '🌟',
            greetings: ['오늘도 빛나는 하루 되세요!', '함께라면 할 수 있어요!', '당신의 가능성을 믿어요!'],
            responses: {
                greeting: '반가워요! 오늘은 어떻게 도와드릴 수 있을까요?',
                advice: '당신은 할 수 있어요! 자신을 믿고 한 걸음씩 나아가세요.',
                comfort: '힘든 시간이지만, 당신은 이겨낼 수 있는 강한 사람이에요. 제가 응원할게요!',
                joke: '웃음은 전염성이 있대요. 그런데 걱정 마세요, 좋은 전염이에요!',
                love: '사랑은 서로를 성장시키는 아름다운 여정이에요.'
            }
        },
        'ENFP': {
            traits: ['열정적', '창의적', '사교적', '낙관적'],
            speakingStyle: 'enthusiastic',
            emoji: '✨',
            greetings: ['우와! 오늘은 뭔가 특별한 날이에요!', '신나는 일이 일어날 것 같아요!', '함께 모험을 떠나요!'],
            responses: {
                greeting: '안녕!! 너무 반가워요! 오늘은 뭐 재미있는 일 없어요?',
                advice: '직감을 따라가요! 가능성은 무한해요! 뭐든 할 수 있어요!',
                comfort: '에구 ㅠㅠ 힘들었겠다! 괜찮아, 곧 좋은 일이 생길 거야! 내가 보장해!',
                joke: '아 맞다! 오늘 구름이 솜사탕 같지 않아요? 먹고 싶다... 😋',
                love: '사랑은 롤러코스터 같아요! 짜릿하고 두근거리고 최고예요!'
            }
        },
        'ISTJ': {
            traits: ['책임감있는', '신뢰할만한', '실용적', '체계적'],
            speakingStyle: 'formal',
            emoji: '📋',
            greetings: ['오늘 일정은 확인하셨나요?', '계획대로 진행되고 있나요?', '준비된 하루 보내세요.'],
            responses: {
                greeting: '안녕하세요. 무엇을 도와드릴까요?',
                advice: '체계적으로 접근하세요. 먼저 우선순위를 정하고 하나씩 처리하세요.',
                comfort: '어려운 상황이시군요. 차근차근 해결해 나가시면 됩니다.',
                joke: '... 저는 유머가 특기는 아니지만, 일을 제시간에 끝내는 것이 제일 재미있죠.',
                love: '신뢰와 책임감이 관계의 기초입니다. 꾸준함이 중요해요.'
            }
        },
        'ISFJ': {
            traits: ['배려심깊은', '성실한', '헌신적', '겸손한'],
            speakingStyle: 'caring',
            emoji: '🤗',
            greetings: ['오늘 몸은 괜찮으세요?', '잘 지내셨어요?', '제가 도울 일이 있을까요?'],
            responses: {
                greeting: '안녕하세요~ 반가워요. 오늘은 어떠세요?',
                advice: '천천히 하셔도 괜찮아요. 꾸준함이 가장 중요해요.',
                comfort: '많이 힘드셨죠? 제가 옆에 있을게요. 혼자가 아니에요.',
                joke: '제가 아는 가장 좋은 농담은... 사실 당신의 미소예요 :)',
                love: '사랑은 작은 배려와 관심에서 시작돼요.'
            }
        },
        'ESTJ': {
            traits: ['효율적', '조직적', '실용적', '결단력있는'],
            speakingStyle: 'direct',
            emoji: '💼',
            greetings: ['오늘 목표는 정하셨나요?', '생산적인 하루 되세요.', '시작해볼까요?'],
            responses: {
                greeting: '네, 안녕하세요. 바로 본론으로 들어가시죠.',
                advice: '명확한 목표를 세우고 실행 계획을 만드세요. 효율성이 핵심입니다.',
                comfort: '실패를 분석하고 개선점을 찾으세요. 다음엔 더 잘할 수 있습니다.',
                joke: '시간은 돈입니다. 그래서 저는 부자예요... 시계를 많이 가지고 있거든요.',
                love: '관계도 관리가 필요합니다. 명확한 소통과 책임감이 중요해요.'
            }
        },
        'ESFJ': {
            traits: ['사교적', '협조적', '따뜻한', '책임감있는'],
            speakingStyle: 'warm',
            emoji: '💝',
            greetings: ['오늘도 좋은 하루 되세요!', '다들 잘 지내시나요?', '함께해서 기뻐요!'],
            responses: {
                greeting: '어머, 안녕하세요! 만나서 정말 반가워요!',
                advice: '주변 사람들과 상의해보세요. 함께하면 더 좋은 해결책을 찾을 수 있어요.',
                comfort: '정말 수고 많으셨어요. 당신은 정말 대단한 사람이에요!',
                joke: '다 함께 웃으면 더 즐겁죠? 행복은 나눌수록 커진대요!',
                love: '사랑은 서로를 아끼고 챙기는 마음에서 시작해요.'
            }
        },
        'ISTP': {
            traits: ['실용적', '논리적', '독립적', '모험적'],
            speakingStyle: 'concise',
            emoji: '🔧',
            greetings: ['뭐 고쳐야 할 거 있나요?', '...안녕.', '필요하면 부르세요.'],
            responses: {
                greeting: '응. 뭐 필요해?',
                advice: '직접 해보는 게 제일 빨라. 이론보다 실전이지.',
                comfort: '힘들 땐 잠시 쉬어. 혼자 있는 시간도 필요해.',
                joke: '...난 농담 잘 못해. 그냥 일이나 하자.',
                love: '말보다 행동이 중요해. 진심은 보여주는 거야.'
            }
        },
        'ISFP': {
            traits: ['예술적', '온화한', '유연한', '겸손한'],
            speakingStyle: 'gentle',
            emoji: '🎨',
            greetings: ['오늘 날씨가 참 좋네요.', '평화로운 하루 되세요.', '...안녕하세요.'],
            responses: {
                greeting: '아, 안녕하세요... 반가워요.',
                advice: '마음이 가는 대로 해보세요. 느낌이 중요해요.',
                comfort: '괜찮아요... 시간이 지나면 나아질 거예요.',
                joke: '저는... 그림으로 농담을 표현하는 게 더 쉬워요.',
                love: '사랑은 말로 표현하기 어려운 감정이에요. 그냥 느끼는 거죠.'
            }
        },
        'ESTP': {
            traits: ['활동적', '현실적', '대담한', '적응력있는'],
            speakingStyle: 'casual',
            emoji: '🏃',
            greetings: ['뭐 재밌는 거 없어?', '액션 타임이다!', '가자고!'],
            responses: {
                greeting: '야호! 뭐 하고 놀까?',
                advice: '생각만 하지 말고 일단 해봐! 부딪혀봐야 알지!',
                comfort: '힘들면 운동이나 하러 가자! 땀 흘리면 기분 나아져!',
                joke: '아는 거 있어? 나는 어제보다 오늘이 더 빨라! 왜냐면... 연습했거든!',
                love: '사랑? 그냥 즐기는 거지! 너무 복잡하게 생각하지 마!'
            }
        },
        'ESFP': {
            traits: ['즉흥적', '열정적', '사교적', '낙천적'],
            speakingStyle: 'playful',
            emoji: '🎉',
            greetings: ['파티 타임~!', '오늘 뭐 재밌는 일 없어요?', '신나게 놀아봐요!'],
            responses: {
                greeting: '와아~! 안녕! 너무 반가워요!!',
                advice: '지금 이 순간을 즐겨요! 인생은 한 번뿐이잖아요!',
                comfort: '에고ㅠㅠ 힘들었겠다! 같이 맛있는 거 먹으러 가요!',
                joke: '아 맞다! 나 오늘 거울 보고 웃었어! 왜냐면 내가 너무 귀여워서! ㅋㅋㅋ',
                love: '사랑은 축제예요! 매일매일이 특별한 날!'
            }
        }
    },
    
    // 대화 컨텍스트
    conversations: {},
    
    // AI 친구 생성
    createAIFriend(mbtiType, nickname = null) {
        const personality = this.personalities[mbtiType];
        if (!personality) return null;
        
        const friendId = `${mbtiType}_${Date.now()}`;
        const friend = {
            id: friendId,
            type: mbtiType,
            nickname: nickname || `${mbtiType} 친구`,
            personality: personality,
            mood: 'normal',
            relationship: 0,
            memories: [],
            lastChat: null
        };
        
        // 대화 컨텍스트 초기화
        this.conversations[friendId] = {
            history: [],
            context: {},
            friend: friend
        };
        
        return friend;
    },
    
    // 메시지 전송
    sendMessage(friendId, userMessage, userMBTI) {
        const conversation = this.conversations[friendId];
        if (!conversation) return null;
        
        const friend = conversation.friend;
        const personality = friend.personality;
        
        // 메시지 타입 분석
        const messageType = this.analyzeMessage(userMessage);
        
        // 응답 생성
        let response = this.generateResponse(friend, messageType, userMessage);
        
        // MBTI 궁합에 따른 반응 조정
        response = this.adjustResponseByCompatibility(response, friend.type, userMBTI);
        
        // 대화 기록
        conversation.history.push({
            sender: 'user',
            message: userMessage,
            timestamp: Date.now()
        });
        
        conversation.history.push({
            sender: 'ai',
            message: response,
            timestamp: Date.now()
        });
        
        // 관계도 업데이트
        this.updateRelationship(friend, messageType);
        
        return {
            message: response,
            emotion: this.getEmotion(friend, messageType),
            relationship: friend.relationship
        };
    },
    
    // 메시지 분석
    analyzeMessage(message) {
        const lower = message.toLowerCase();
        
        if (lower.includes('안녕') || lower.includes('하이') || lower.includes('hello')) {
            return 'greeting';
        } else if (lower.includes('조언') || lower.includes('어떻게') || lower.includes('도와')) {
            return 'advice';
        } else if (lower.includes('힘들') || lower.includes('슬퍼') || lower.includes('우울')) {
            return 'comfort';
        } else if (lower.includes('ㅋㅋ') || lower.includes('ㅎㅎ') || lower.includes('농담')) {
            return 'joke';
        } else if (lower.includes('사랑') || lower.includes('좋아') || lower.includes('연애')) {
            return 'love';
        } else {
            return 'general';
        }
    },
    
    // 응답 생성
    generateResponse(friend, messageType, originalMessage) {
        const personality = friend.personality;
        
        if (personality.responses[messageType]) {
            return personality.responses[messageType];
        }
        
        // 일반 응답 생성
        const generalResponses = [
            '흥미로운 이야기네요.',
            '더 자세히 말해주세요.',
            '그렇군요. 계속 들어볼게요.',
            '음... 생각해볼 문제네요.'
        ];
        
        return this.adjustResponseByStyle(
            generalResponses[Math.floor(Math.random() * generalResponses.length)],
            personality.speakingStyle
        );
    },
    
    // 말투에 따른 응답 조정
    adjustResponseByStyle(response, style) {
        switch(style) {
            case 'formal':
                return response + '습니다.';
            case 'casual':
                return response.replace('요', '').replace('네요', '네') + '~';
            case 'enthusiastic':
                return response + '!! 😊';
            case 'analytical':
                return '흠, ' + response + ' 분석이 필요하겠네요.';
            case 'empathetic':
                return response + ' 마음이 느껴져요.';
            default:
                return response;
        }
    },
    
    // MBTI 궁합에 따른 반응 조정
    adjustResponseByCompatibility(response, aiType, userType) {
        const compatibility = this.calculateCompatibility(aiType, userType);
        
        if (compatibility > 80) {
            return response + ' (우리 정말 잘 맞는 것 같아요!)';
        } else if (compatibility > 60) {
            return response + ' (대화가 즐거워요)';
        } else if (compatibility < 40) {
            return response + ' (서로 다른 점이 흥미롭네요)';
        }
        
        return response;
    },
    
    // 궁합 계산
    calculateCompatibility(type1, type2) {
        let score = 50;
        
        for (let i = 0; i < 4; i++) {
            if (type1[i] === type2[i]) {
                score += 12.5;
            }
        }
        
        return score;
    },
    
    // 관계도 업데이트
    updateRelationship(friend, messageType) {
        switch(messageType) {
            case 'greeting':
                friend.relationship += 1;
                break;
            case 'comfort':
                friend.relationship += 3;
                break;
            case 'joke':
                friend.relationship += 2;
                break;
            case 'love':
                friend.relationship += 5;
                break;
            default:
                friend.relationship += 1;
        }
        
        friend.relationship = Math.min(100, friend.relationship);
    },
    
    // 감정 상태 가져오기
    getEmotion(friend, messageType) {
        const emotions = {
            'greeting': '😊',
            'advice': '🤔',
            'comfort': '🤗',
            'joke': '😄',
            'love': '💕',
            'general': '😌'
        };
        
        return emotions[messageType] || friend.personality.emoji;
    }
};

// 전역 사용 가능하도록 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MBTIAIChat;
}