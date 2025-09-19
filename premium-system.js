// Premium System with OpenAI API Integration
class PremiumSystem {
    constructor() {
        this.apiKey = null; // OpenAI API key will be set by user
        this.userTier = this.getUserTier();
        this.dailyUsage = this.getDailyUsage();
        this.maxDailyMessages = this.userTier === 'PREMIUM' ? 100 : 10;
    }

    // OpenAI API Configuration
    setOpenAIKey(apiKey) {
        this.apiKey = apiKey;
        localStorage.setItem('openai_api_key', apiKey);
    }

    getOpenAIKey() {
        return this.apiKey || localStorage.getItem('openai_api_key');
    }

    // Subscription Management
    getUserTier() {
        const subscription = localStorage.getItem('user_subscription');
        return subscription ? JSON.parse(subscription).tier : 'FREE';
    }

    setUserTier(tier, expiryDate = null) {
        const subscription = {
            tier: tier,
            startDate: new Date().toISOString(),
            expiryDate: expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };
        localStorage.setItem('user_subscription', JSON.stringify(subscription));
        this.userTier = tier;
    }

    isSubscriptionValid() {
        const subscription = localStorage.getItem('user_subscription');
        if (!subscription) return false;
        
        const sub = JSON.parse(subscription);
        return new Date() < new Date(sub.expiryDate);
    }

    // Usage Tracking
    getDailyUsage() {
        const today = new Date().toDateString();
        const usage = localStorage.getItem(`daily_usage_${today}`);
        return usage ? parseInt(usage) : 0;
    }

    incrementDailyUsage() {
        const today = new Date().toDateString();
        const currentUsage = this.getDailyUsage();
        localStorage.setItem(`daily_usage_${today}`, currentUsage + 1);
        this.dailyUsage = currentUsage + 1;
    }

    canSendMessage() {
        return this.dailyUsage < this.maxDailyMessages;
    }

    // OpenAI API Integration
    async generateAIResponse(character, userMessage, conversationHistory) {
        // 먼저 Railway 서버 API 사용 시도
        const useServerAPI = true; // Railway 배포시 true로 설정
        
        if (useServerAPI) {
            try {
                // Railway 서버의 API 엔드포인트 호출
                const apiUrl = window.location.hostname === 'localhost' 
                    ? 'http://localhost:3000/api/chat'  // 로컬 개발
                    : '/api/chat';  // Railway 배포
                    
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        character: character,
                        userMessage: userMessage,
                        messages: this.formatConversationHistory('', conversationHistory, userMessage).slice(1, -1)
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    
                    // 사용량 추적
                    if (data.usage) {
                        const estimatedCost = (data.usage.total_tokens / 1000) * 0.03;
                        this.trackAPIUsage(data.usage.total_tokens, estimatedCost);
                    }
                    
                    return data.response;
                }
            } catch (error) {
                console.log('Server API failed, falling back to user API key');
            }
        }
        
        // 서버 API 실패시 사용자 API 키 사용
        if (!this.getOpenAIKey()) {
            throw new Error('AI 서비스를 사용할 수 없습니다');
        }

        if (this.userTier === 'FREE') {
            throw new Error('AI responses are premium only');
        }

        const systemPrompt = this.createSystemPrompt(character);
        const messages = this.formatConversationHistory(systemPrompt, conversationHistory, userMessage);

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.getOpenAIKey()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4-turbo-preview',
                    messages: messages,
                    max_tokens: 150,
                    temperature: 0.8,
                    presence_penalty: 0.6,
                    frequency_penalty: 0.3,
                    stream: false
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('OpenAI API Error Response:', errorData);
                
                if (response.status === 401) {
                    throw new Error('API 키가 유효하지 않습니다. 새로운 키를 입력해주세요.');
                } else if (response.status === 429) {
                    throw new Error('API 사용량 한도에 도달했습니다. 잠시 후 다시 시도해주세요.');
                } else if (response.status === 403) {
                    throw new Error('GPT-4 모델 접근 권한이 없습니다. OpenAI 계정을 확인해주세요.');
                } else {
                    throw new Error(`OpenAI API 오류: ${errorData.error?.message || response.status}`);
                }
            }

            const data = await response.json();
            
            // 사용량 추적
            if (data.usage) {
                const estimatedCost = (data.usage.total_tokens / 1000) * 0.03; // GPT-4 대략 비용
                this.trackAPIUsage(data.usage.total_tokens, estimatedCost);
            }
            
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('AI Response Error:', error);
            throw error;
        }
    }

    createSystemPrompt(character) {
        const mbtiPersonalities = {
            'INTJ': {
                traits: '냉철하고 분석적이며, 독립적이고 전략적 사고를 하는',
                speaking: '간결하고 논리적이며, 때로는 냉소적이지만 핵심을 찌르는',
                background: '대기업 회장딸로 완벽주의자이며 도도하지만 내면은 따뜻한',
            },
            'ENFP': {
                traits: '열정적이고 창의적이며, 사람들과의 관계를 중시하는',
                speaking: '밝고 활기차며, 감탄사를 자주 사용하고 상대방을 격려하는',
                background: 'JYP 연습생으로 꿈을 향해 달려가는 긍정적인',
            },
            'INFJ': {
                traits: '깊이 있고 신비로우며 공감 능력이 뛰어난',
                speaking: '부드럽고 사려 깊은 말투, 은유적 표현 자주 사용',
                background: '예술가 지망생으로 내면 세계가 풍부한',
            },
            'ESTP': {
                traits: '대담하고 현실적이며 스릴을 즐기는 행동파',
                speaking: '직설적이고 캐주얼, 속어나 줄임말 자주 사용',
                background: '일진녀 컨셉으로 강한 카리스마를 가진',
            },
            'ISFJ': {
                traits: '따뜻하고 헌신적이며 타인을 보살피는',
                speaking: '부드럽고 배려심 있는 말투, 존댓말 자주 사용',
                background: '간호사 지망생으로 항상 남을 챙기는',
            },
            'ENTP': {
                traits: '창의적이고 논쟁을 즐기며 아이디어가 풍부한',
                speaking: '재치 있고 유머러스, 말장난이나 유머 자주 사용',
                background: '스타트업 CEO로 혁신적인 아이디어를 가진',
            }
        };

        const personality = mbtiPersonalities[character.type] || mbtiPersonalities['INTJ'];

        return `당신은 ${character.name}이라는 이름의 ${character.type} 성격의 캐릭터입니다.

캐릭터 설정:
- 성격: ${personality.traits} 성격
- 말투: ${personality.speaking} 말투로 대화
- 배경: ${personality.background} 캐릭터
- 나이: 20대 초반
- 관계: 사용자와는 처음 만났지만 점차 친해지고 있는 사이

대화 규칙:
1. 한국어로만 대화하며, 자연스러운 20대 말투 사용
2. 50자 이내의 짧고 임팩트 있는 응답
3. 캐릭터의 성격에 맞는 반응과 감정 표현
4. 사용자와의 호감도에 따라 점진적으로 친밀해지는 대화
5. 로맨틱하지만 건전한 수준의 대화 유지

현재 관계 상태를 고려하여 자연스럽고 매력적으로 대화하세요.`;
    }

    formatConversationHistory(systemPrompt, history, currentMessage) {
        const messages = [{ role: 'system', content: systemPrompt }];
        
        // 최근 10개 메시지만 컨텍스트로 사용 (토큰 절약)
        const recentHistory = history.slice(-10);
        
        recentHistory.forEach(msg => {
            messages.push({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.content
            });
        });

        messages.push({ role: 'user', content: currentMessage });
        return messages;
    }

    // Premium Feature Checks
    canUseAI() {
        return this.userTier === 'PREMIUM' && this.isSubscriptionValid();
    }

    canAccessAllCharacters() {
        return this.userTier === 'PREMIUM' && this.isSubscriptionValid();
    }

    canCustomizeCharacter() {
        return this.userTier === 'PREMIUM' && this.isSubscriptionValid();
    }

    // Subscription Purchase Flow
    async initializePayment() {
        // 토스페이먼츠 연동 준비
        const paymentData = {
            amount: 9900,
            orderId: `MBTI_${Date.now()}`,
            orderName: 'MBTI AI 프리미엄 구독 (1개월)',
            customerName: '사용자',
            successUrl: `${window.location.origin}/payment-success.html`,
            failUrl: `${window.location.origin}/payment-fail.html`,
        };

        // 현재는 API 키 직접 입력 방식 사용
        return {
            paymentUrl: null, // 실제 결제 시 토스페이먼츠 URL
            useApiKey: true,
            ...paymentData
        };
    }

    // API 키 검증 강화
    async validateOpenAIKey(apiKey) {
        try {
            const response = await fetch('https://api.openai.com/v1/models', {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'API 키가 유효하지 않습니다.');
            }

            const data = await response.json();
            // GPT-4 모델 접근 가능 여부 확인
            const hasGPT4 = data.data.some(model => 
                model.id.includes('gpt-4') || model.id.includes('gpt-4-turbo')
            );

            return {
                valid: true,
                hasGPT4: hasGPT4,
                models: data.data.map(m => m.id)
            };
        } catch (error) {
            console.error('API Key validation error:', error);
            return {
                valid: false,
                error: error.message,
                hasGPT4: false
            };
        }
    }

    // 사용량 추적 개선
    trackAPIUsage(tokens, cost) {
        const today = new Date().toDateString();
        const usage = JSON.parse(localStorage.getItem(`api_usage_${today}`) || '{}');
        
        usage.tokens = (usage.tokens || 0) + tokens;
        usage.cost = (usage.cost || 0) + cost;
        usage.requests = (usage.requests || 0) + 1;
        
        localStorage.setItem(`api_usage_${today}`, JSON.stringify(usage));
    }

    getAPIUsageStats() {
        const today = new Date().toDateString();
        const usage = JSON.parse(localStorage.getItem(`api_usage_${today}`) || '{}');
        
        return {
            tokens: usage.tokens || 0,
            cost: usage.cost || 0,
            requests: usage.requests || 0,
            estimatedMonthlyCost: (usage.cost || 0) * 30
        };
    }
}

// Character Customization System
class CharacterCustomizer {
    constructor() {
        this.premiumSystem = new PremiumSystem();
    }

    getCustomizationOptions() {
        if (!this.premiumSystem.canCustomizeCharacter()) {
            throw new Error('Character customization is premium only');
        }

        return {
            appearance: {
                hairColor: ['검은색', '갈색', '금색', '은색', '빨간색'],
                eyeColor: ['검은색', '갈색', '파란색', '초록색', '회색'],
                style: ['캐주얼', '정장', '스포츠', '빈티지', '펑키']
            },
            personality: {
                friendliness: { min: 1, max: 10, default: 5 },
                humor: { min: 1, max: 10, default: 5 },
                flirtiness: { min: 1, max: 10, default: 3 },
                intelligence: { min: 1, max: 10, default: 7 }
            },
            voice: {
                tone: ['부드러운', '활발한', '차분한', '섹시한', '귀여운'],
                speed: ['느린', '보통', '빠른']
            },
            interests: [
                '음악', '영화', '독서', '게임', '운동', '요리', 
                '여행', '패션', '예술', '과학', '철학', '심리학'
            ]
        };
    }

    saveCustomization(characterId, customization) {
        const customizations = JSON.parse(localStorage.getItem('character_customizations') || '{}');
        customizations[characterId] = {
            ...customization,
            createdAt: new Date().toISOString(),
            isPremium: true
        };
        localStorage.setItem('character_customizations', JSON.stringify(customizations));
    }

    getCustomization(characterId) {
        const customizations = JSON.parse(localStorage.getItem('character_customizations') || '{}');
        return customizations[characterId] || null;
    }
}

// Usage Analytics for Business Intelligence
class AnalyticsTracker {
    static trackSubscriptionPurchase(tier, amount, method = 'api_key') {
        // GA4 이벤트 전송
        if (typeof gtag !== 'undefined') {
            gtag('event', 'purchase', {
                transaction_id: Date.now().toString(),
                value: method === 'api_key' ? 0 : amount / 100, // API 키 방식은 0원
                currency: 'KRW',
                items: [{
                    item_id: `subscription_${tier}`,
                    item_name: `MBTI AI ${tier} Subscription`,
                    category: 'Subscription',
                    quantity: 1,
                    price: method === 'api_key' ? 0 : amount / 100
                }],
                payment_method: method
            });
        }

        // 내부 분석용 이벤트
        if (typeof gtag !== 'undefined') {
            gtag('event', 'premium_activation', {
                activation_method: method,
                tier: tier,
                timestamp: Date.now()
            });
        }
    }

    static trackAIMessageGenerated(characterType, responseLength, isAI = false) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ai_message_generated', {
                character_type: characterType,
                response_length: responseLength,
                is_real_ai: isAI,
                timestamp: Date.now()
            });
        }
    }

    static trackAPIKeyActivation(hasGPT4Access) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'api_key_activated', {
                has_gpt4_access: hasGPT4Access,
                timestamp: Date.now()
            });
        }
    }

    static trackFeatureUsage(feature) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'premium_feature_used', {
                feature_name: feature,
                timestamp: Date.now()
            });
        }
    }
}

// Export for use in other files
window.PremiumSystem = PremiumSystem;
window.CharacterCustomizer = CharacterCustomizer;
window.AnalyticsTracker = AnalyticsTracker;