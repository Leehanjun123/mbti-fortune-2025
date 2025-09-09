// MBTI API 서비스 - B2B 수익 모델

const MBTIAPIService = {
    
    // API 엔드포인트 정의
    endpoints: {
        // 1. 기본 MBTI 분석 API
        analyze: {
            url: '/api/v1/analyze',
            method: 'POST',
            description: 'MBTI 유형 분석',
            pricing: '100 KRW per request',
            example: {
                request: {
                    answers: [
                        { dimension: 'EI', value: 'E', weight: 2 },
                        { dimension: 'SN', value: 'N', weight: 1 },
                        { dimension: 'TF', value: 'T', weight: 2 },
                        { dimension: 'JP', value: 'J', weight: 1 }
                    ]
                },
                response: {
                    type: 'ENTJ',
                    title: '지휘관',
                    description: '대담하고 상상력이 풍부한 지도자',
                    percentages: { E: 65, I: 35, N: 55, S: 45, T: 70, F: 30, J: 60, P: 40 },
                    confidence: 0.87
                }
            }
        },
        
        // 2. 호환성 분석 API
        compatibility: {
            url: '/api/v1/compatibility',
            method: 'POST',
            description: '두 MBTI 유형 간 호환성 분석',
            pricing: '150 KRW per request',
            example: {
                request: {
                    type1: 'INTJ',
                    type2: 'ENFP',
                    category: 'romantic' // romantic, friendship, work
                },
                response: {
                    score: 82,
                    dynamics: {
                        strengths: ['보완적 성격', '성장 가능성'],
                        challenges: ['의사소통 방식 차이'],
                        advice: '서로의 차이를 인정하고 존중하세요'
                    }
                }
            }
        },
        
        // 3. 일일 운세/인사이트 API
        dailyInsight: {
            url: '/api/v1/daily-insight',
            method: 'GET',
            description: 'MBTI별 일일 인사이트 제공',
            pricing: '50 KRW per request',
            example: {
                request: {
                    type: 'INFJ',
                    date: '2025-01-09',
                    category: 'all' // all, love, career, health
                },
                response: {
                    fortune: {
                        overall: 85,
                        love: '새로운 인연이 찾아올 수 있는 날',
                        career: '창의적인 아이디어가 빛을 발할 때',
                        health: '충분한 휴식이 필요한 시기'
                    },
                    advice: '오늘은 직관을 믿고 행동하세요',
                    luckyItem: '보라색 소품',
                    luckyNumber: 7
                }
            }
        },
        
        // 4. 팀 분석 API (기업용)
        teamAnalysis: {
            url: '/api/v1/team-analysis',
            method: 'POST',
            description: '팀 구성원 MBTI 분석 및 최적화',
            pricing: '1000 KRW per request',
            example: {
                request: {
                    members: [
                        { id: '001', type: 'ENTJ', role: 'leader' },
                        { id: '002', type: 'ISTJ', role: 'developer' },
                        { id: '003', type: 'ENFP', role: 'designer' }
                    ]
                },
                response: {
                    teamBalance: {
                        diversity: 0.78,
                        efficiency: 0.82,
                        creativity: 0.71
                    },
                    recommendations: [
                        '분석적 사고가 강한 INTP/INTJ 추가 고려',
                        'ENFP의 창의성을 프로젝트 초기에 활용'
                    ],
                    conflictPoints: [
                        { between: ['001', '003'], issue: '의사결정 속도' }
                    ]
                }
            }
        },
        
        // 5. AI 맞춤 콘텐츠 생성 API
        generateContent: {
            url: '/api/v1/generate-content',
            method: 'POST',
            description: 'MBTI 맞춤형 콘텐츠 자동 생성',
            pricing: '200 KRW per request',
            example: {
                request: {
                    type: 'ISFP',
                    contentType: 'motivation', // motivation, advice, dating-tips
                    tone: 'friendly',
                    length: 'short'
                },
                response: {
                    content: '당신의 예술적 감각은 특별해요. 오늘은 작은 창작 활동으로 마음을 표현해보세요.',
                    hashtags: ['#ISFP', '#예술가', '#창의성'],
                    engagement: 'high'
                }
            }
        },
        
        // 6. 질문 생성 API
        generateQuestions: {
            url: '/api/v1/generate-questions',
            method: 'GET',
            description: 'MBTI 테스트 질문 자동 생성',
            pricing: '80 KRW per request',
            example: {
                request: {
                    count: 5,
                    difficulty: 'easy',
                    language: 'ko'
                },
                response: {
                    questions: [
                        {
                            id: 'q1',
                            text: '주말 계획을 세울 때 당신은?',
                            options: [
                                { text: '세부 일정을 미리 정한다', dimension: 'J' },
                                { text: '대략적인 계획만 세운다', dimension: 'P' }
                            ]
                        }
                    ]
                }
            }
        }
    },
    
    // API 키 관리 시스템
    apiKeyManagement: {
        tiers: {
            free: {
                name: 'Free Trial',
                price: 0,
                requests: 100,
                rateLimit: '10 req/min',
                endpoints: ['analyze', 'dailyInsight'],
                support: 'community'
            },
            
            starter: {
                name: 'Starter',
                price: 49000, // 월 49,000원
                requests: 10000,
                rateLimit: '100 req/min',
                endpoints: ['all'],
                support: 'email'
            },
            
            growth: {
                name: 'Growth',
                price: 199000, // 월 199,000원
                requests: 100000,
                rateLimit: '1000 req/min',
                endpoints: ['all'],
                support: 'priority',
                features: ['webhook', 'batch-processing']
            },
            
            enterprise: {
                name: 'Enterprise',
                price: 'custom',
                requests: 'unlimited',
                rateLimit: 'custom',
                endpoints: ['all'],
                support: 'dedicated',
                features: ['sla', 'custom-endpoints', 'white-label']
            }
        }
    },
    
    // 실제 API 구현
    implementation: {
        // Express.js 서버 설정
        serverSetup: `
const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');

// API 키 검증 미들웨어
const authenticateAPI = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
        return res.status(401).json({ error: 'API key required' });
    }
    
    // DB에서 API 키 검증
    const account = validateAPIKey(apiKey);
    
    if (!account) {
        return res.status(401).json({ error: 'Invalid API key' });
    }
    
    // 사용량 체크
    if (account.requests >= account.limit) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
    }
    
    req.account = account;
    next();
};

// Rate limiting
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1분
    max: (req) => req.account.rateLimit,
    message: 'Too many requests'
});

app.use(authenticateAPI);
app.use(limiter);

// MBTI 분석 엔드포인트
app.post('/api/v1/analyze', async (req, res) => {
    try {
        const { answers } = req.body;
        const result = MBTITestSystem.calculateMBTI(answers);
        
        // 사용량 기록
        await recordUsage(req.account.id, 'analyze', 100);
        
        res.json({
            success: true,
            data: result,
            usage: {
                used: req.account.requests + 1,
                remaining: req.account.limit - req.account.requests - 1
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
        `,
        
        // 클라이언트 SDK
        clientSDK: `
// JavaScript SDK
class MBTIClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.mbti-universe.com/v1';
    }
    
    async analyze(answers) {
        const response = await fetch(\`\${this.baseURL}/analyze\`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.apiKey
            },
            body: JSON.stringify({ answers })
        });
        
        return response.json();
    }
    
    async getCompatibility(type1, type2) {
        const response = await fetch(\`\${this.baseURL}/compatibility\`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.apiKey
            },
            body: JSON.stringify({ type1, type2 })
        });
        
        return response.json();
    }
}

// 사용 예시
const client = new MBTIClient('your-api-key');
const result = await client.analyze(userAnswers);
console.log(\`당신의 MBTI는 \${result.type}입니다\`);
        `
    },
    
    // 타겟 고객
    targetCustomers: {
        // 1. 데이팅 앱
        datingApps: {
            useCase: '매칭 알고리즘에 MBTI 호환성 추가',
            value: '매칭 정확도 향상',
            examples: ['틴더', '블라인드', '아만다']
        },
        
        // 2. HR 테크
        hrTech: {
            useCase: '채용 및 팀빌딩에 활용',
            value: '팀 효율성 증대',
            examples: ['원티드', '사람인', '잡코리아']
        },
        
        // 3. 교육 플랫폼
        eduTech: {
            useCase: '학습 스타일 맞춤형 추천',
            value: '학습 효과 향상',
            examples: ['클래스101', '인프런', '패스트캠퍼스']
        },
        
        // 4. 웰니스 앱
        wellness: {
            useCase: '성격별 맞춤 명상/운동 추천',
            value: '사용자 만족도 증가',
            examples: ['캐시워크', '마보', '닥터나우']
        },
        
        // 5. 콘텐츠 플랫폼
        content: {
            useCase: 'MBTI별 콘텐츠 추천',
            value: '체류 시간 증가',
            examples: ['왓챠', '웨이브', '브런치']
        }
    },
    
    // 수익 예측
    revenueProjection: {
        year1: {
            customers: 50,
            avgPrice: 99000, // 월 평균
            monthlyRevenue: 4950000, // 495만원
            yearlyRevenue: 59400000 // 5,940만원
        },
        
        year2: {
            customers: 200,
            avgPrice: 149000,
            monthlyRevenue: 29800000, // 2,980만원
            yearlyRevenue: 357600000 // 3.5억
        },
        
        year3: {
            customers: 500,
            avgPrice: 199000,
            monthlyRevenue: 99500000, // 9,950만원
            yearlyRevenue: 1194000000 // 11.9억
        }
    },
    
    // API 문서 페이지
    documentation: {
        landingPage: `
<!DOCTYPE html>
<html>
<head>
    <title>MBTI Universe API - 성격 분석 API 서비스</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            margin: 0;
            padding: 0;
        }
        
        .hero {
            padding: 100px 20px;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        
        .code-example {
            background: rgba(0,0,0,0.5);
            border-radius: 10px;
            padding: 20px;
            margin: 40px auto;
            max-width: 600px;
            text-align: left;
        }
        
        .pricing-cards {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin: 50px 20px;
        }
        
        .pricing-card {
            background: white;
            color: #333;
            padding: 30px;
            border-radius: 10px;
            width: 250px;
        }
        
        .price {
            font-size: 2rem;
            font-weight: bold;
            color: #667eea;
        }
        
        .cta-button {
            background: #667eea;
            color: white;
            padding: 15px 40px;
            border: none;
            border-radius: 50px;
            font-size: 1.2rem;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="hero">
        <h1>MBTI Universe API</h1>
        <p>성격 분석을 당신의 서비스에 통합하세요</p>
        
        <div class="code-example">
            <pre><code>
// 3줄로 시작하기
const mbti = new MBTIClient('your-api-key');
const result = await mbti.analyze(answers);
console.log(result.type); // "INTJ"
            </code></pre>
        </div>
        
        <div class="pricing-cards">
            <div class="pricing-card">
                <h3>Starter</h3>
                <div class="price">₩49,000/월</div>
                <ul>
                    <li>10,000 요청/월</li>
                    <li>모든 엔드포인트</li>
                    <li>이메일 지원</li>
                </ul>
            </div>
            
            <div class="pricing-card">
                <h3>Growth</h3>
                <div class="price">₩199,000/월</div>
                <ul>
                    <li>100,000 요청/월</li>
                    <li>웹훅 지원</li>
                    <li>우선 지원</li>
                </ul>
            </div>
            
            <div class="pricing-card">
                <h3>Enterprise</h3>
                <div class="price">맞춤 견적</div>
                <ul>
                    <li>무제한 요청</li>
                    <li>커스텀 엔드포인트</li>
                    <li>전담 지원</li>
                </ul>
            </div>
        </div>
        
        <button class="cta-button">무료로 시작하기 (100 요청)</button>
    </div>
</body>
</html>
        `
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MBTIAPIService;
}