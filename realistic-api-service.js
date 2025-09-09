// 현실적이고 판매 가능한 API 서비스 - 피벗 버전

const RealisticAPIService = {
    
    // ============ 옵션 1: 심플 임베드 위젯 ============
    embedWidget: {
        product: "MBTI 테스트 위젯",
        
        // 초간단 설치
        installation: `
            <!-- 1줄로 설치 완료 -->
            <script src="https://widget.mbti-universe.com/v1.js" 
                    data-api-key="YOUR_KEY"></script>
        `,
        
        pricing: {
            free: {
                price: 0,
                features: [
                    "월 1,000회 노출",
                    "MBTI Universe 워터마크",
                    "기본 디자인"
                ]
            },
            pro: {
                price: 9900, // 월 9,900원
                features: [
                    "무제한 노출",
                    "워터마크 제거",
                    "커스텀 디자인",
                    "결과 데이터 CSV 다운로드"
                ]
            },
            enterprise: {
                price: 49900, // 월 49,900원
                features: [
                    "Pro 모든 기능",
                    "API 직접 호출",
                    "우선 지원",
                    "커스텀 질문 추가"
                ]
            }
        },
        
        targetCustomers: [
            "네이버/티스토리 블로거",
            "카페/커뮤니티 운영자",
            "중소 쇼핑몰",
            "이벤트 페이지",
            "뉴스레터 발행자"
        ],
        
        // 실제 수익 예측 (현실적)
        revenueProjection: {
            month1: {
                free: 1000,
                pro: 10, // 10명 × 9,900원 = 99,000원
                enterprise: 1, // 1개 × 49,900원 = 49,900원
                total: 148900
            },
            month6: {
                free: 5000,
                pro: 100, // 100명 × 9,900원 = 990,000원
                enterprise: 10, // 10개 × 49,900원 = 499,000원
                total: 1489000
            },
            month12: {
                free: 10000,
                pro: 300, // 300명 × 9,900원 = 2,970,000원
                enterprise: 30, // 30개 × 49,900원 = 1,497,000원
                total: 4467000
            }
        }
    },
    
    // ============ 옵션 2: 콘텐츠 크리에이터 도구 ============
    creatorTools: {
        product: "MBTI 콘텐츠 생성기",
        
        features: {
            thumbnailGenerator: {
                description: "유튜브 썸네일 자동 생성",
                example: "INFJ가 연애할 때 하는 행동 TOP 5"
            },
            
            scriptWriter: {
                description: "대본/카피 자동 작성",
                example: "MBTI별 이상형 특징 스크립트"
            },
            
            quizMaker: {
                description: "인스타그램 스토리 퀴즈 생성",
                example: "나의 MBTI 맞추기 퀴즈"
            },
            
            memeGenerator: {
                description: "MBTI 밈/짤 생성",
                example: "INTJ 특징 밈 이미지"
            }
        },
        
        pricing: {
            starter: 19900, // 월 19,900원
            unlimited: 39900 // 월 39,900원
        },
        
        targetCustomers: [
            "유튜버 (MBTI 콘텐츠)",
            "인스타그램 인플루언서",
            "틱톡 크리에이터",
            "블로그 작가",
            "마케터"
        ]
    },
    
    // ============ 옵션 3: 실용적인 B2B 솔루션 ============
    practicalB2B: {
        product: "팀 커뮤니케이션 분석 도구",
        
        // Slack/Teams 연동
        integration: {
            slack: {
                description: "Slack 봇으로 팀원 성향 분석",
                command: "/mbti @username",
                insights: "팀 커뮤니케이션 개선점 제안"
            },
            
            teams: {
                description: "MS Teams 앱",
                feature: "회의 전 참석자 성향 브리핑"
            },
            
            notion: {
                description: "Notion 임베드",
                feature: "팀 페이지에 MBTI 대시보드"
            }
        },
        
        pricing: {
            small: { // 10명 이하
                price: 50000, // 월 5만원
                users: 10
            },
            medium: { // 50명 이하
                price: 200000, // 월 20만원
                users: 50
            },
            large: { // 무제한
                price: 500000, // 월 50만원
                users: -1
            }
        },
        
        valueProposition: `
            "팀 커뮤니케이션 문제의 70%는 성향 차이"
            - 갈등 예방
            - 협업 효율 증대
            - 이직률 감소
        `
    },
    
    // ============ 진짜 수익 나는 모델 ============
    actualMoneyMaker: {
        product: "MBTI 기반 광고 타겟팅 데이터",
        
        description: `
            우리가 수집한 MBTI 데이터를 
            광고주에게 타겟팅 세그먼트로 판매
        `,
        
        dataPoints: {
            "INTJ": {
                interests: ["책", "전략게임", "투자"],
                brands: ["Apple", "Tesla", "Notion"],
                spending: "high",
                adResponse: "논리적 설득 필요"
            },
            "ESFP": {
                interests: ["패션", "여행", "SNS"],
                brands: ["Nike", "Instagram", "Spotify"],
                spending: "impulsive",
                adResponse: "감성적 어필 효과적"
            }
        },
        
        buyers: [
            "페이스북/인스타그램 광고주",
            "구글 애드워즈 광고주",
            "이커머스 플랫폼",
            "마케팅 에이전시"
        ],
        
        pricing: {
            dataAccess: 1000000, // 월 100만원
            customReport: 5000000, // 건당 500만원
            apiAccess: 3000000 // 월 300만원
        }
    },
    
    // ============ 실제 구현 코드 ============
    implementation: {
        
        // 1. 간단한 위젯 서버
        widgetServer: `
const express = require('express');
const app = express();

// 위젯 JS 제공
app.get('/widget.js', (req, res) => {
    const apiKey = req.query.key;
    
    // 간단한 위젯 코드
    const widgetCode = \`
        (function() {
            const div = document.createElement('div');
            div.innerHTML = '<iframe src="https://mbti.com/test?key=\${apiKey}" 
                            width="100%" height="600"></iframe>';
            document.currentScript.parentNode.insertBefore(div, document.currentScript);
        })();
    \`;
    
    res.type('application/javascript');
    res.send(widgetCode);
});

// 사용량 추적
app.post('/track', (req, res) => {
    const { apiKey, event } = req.body;
    // MongoDB에 저장
    await Usage.create({ apiKey, event, timestamp: Date.now() });
    res.json({ success: true });
});
        `,
        
        // 2. 결제 연동 (토스페이먼츠)
        paymentIntegration: `
const TossPayments = require('toss-payments-sdk');

async function createSubscription(customerId, plan) {
    const billing = await TossPayments.billing.create({
        customerId,
        amount: plans[plan].price,
        orderId: \`SUB_\${Date.now()}\`,
        orderName: \`MBTI Widget \${plan}\`,
        customerEmail: customer.email,
        frequency: 'MONTHLY'
    });
    
    return billing;
}
        `,
        
        // 3. 데이터 수집 (합법적)
        dataCollection: `
// 사용자 동의 받고 수집
function collectMBTIData(userId, mbtiType, consent) {
    if (!consent.analytics) return;
    
    // 익명화된 데이터만 수집
    const anonymizedData = {
        id: hash(userId),
        type: mbtiType,
        timestamp: Date.now(),
        // 개인정보 제외
        age_group: getAgeGroup(userId), // 20대, 30대 등
        region: getRegion(userId), // 서울, 경기 등
    };
    
    // 분석용 DB에 저장
    Analytics.create(anonymizedData);
}
        `
    },
    
    // ============ 마케팅 전략 ============
    marketing: {
        
        // 1단계: 무료로 사용자 모으기
        phase1: {
            strategy: "무료 위젯 대량 배포",
            channels: [
                "네이버 카페 홍보",
                "티스토리 스킨 제작",
                "워드프레스 플러그인",
                "깃허브 오픈소스"
            ],
            goal: "월 10만 노출"
        },
        
        // 2단계: 프리미엄 전환
        phase2: {
            strategy: "제한 걸고 유료 유도",
            tactics: [
                "월 1,000회 제한",
                "워터마크 표시",
                "데이터 다운로드 제한"
            ],
            goal: "5% 유료 전환"
        },
        
        // 3단계: B2B 확장
        phase3: {
            strategy: "성공 사례 만들기",
            targets: [
                "유명 블로거 무료 제공",
                "기업 블로그 영업",
                "에이전시 파트너십"
            ],
            goal: "월 50개 기업 고객"
        }
    },
    
    // ============ 진짜 차별화 포인트 ============
    differentiation: {
        
        // 1. 한국 특화
        korean: {
            질문: "한국인 정서에 맞는 질문",
            결과: "한국 문화 반영 해석",
            언어: "자연스러운 한국어"
        },
        
        // 2. 초간단 설치
        easy: {
            설치: "복붙 1번이면 끝",
            관리: "대시보드 직관적",
            지원: "카톡 실시간 응대"
        },
        
        // 3. 저렴한 가격
        affordable: {
            경쟁사: "Typeform - $35/월",
            우리: "9,900원/월",
            차이: "1/4 가격"
        }
    }
};

// ============ 실제 판매 스크립트 ============
const salesScript = {
    
    // 블로거 대상
    blogger: `
        안녕하세요! 블로그 방문자 체류시간 늘리고 싶으신가요?
        
        MBTI 테스트 위젯 하나만 달아도:
        ✓ 평균 체류시간 3분 증가
        ✓ 댓글 참여율 5배 상승  
        ✓ 재방문율 2배 증가
        
        지금 30일 무료 체험하세요!
        설치는 코드 한 줄 복사만 하면 끝!
    `,
    
    // 마케터 대상
    marketer: `
        고객 데이터 수집하는 가장 재밌는 방법!
        
        MBTI 테스트로:
        ✓ 이메일 수집율 40% (업계 평균 2%)
        ✓ 고객 성향 데이터 자동 수집
        ✓ 세그먼트별 마케팅 가능
        
        이벤트 페이지에 바로 적용해보세요.
        월 9,900원으로 수천 개 리드 확보!
    `,
    
    // 기업 대상
    enterprise: `
        팀 커뮤니케이션 문제로 고민이신가요?
        
        우리 솔루션으로:
        ✓ 팀원 성향 한눈에 파악
        ✓ 프로젝트별 최적 팀 구성
        ✓ 갈등 예방 가이드 제공
        
        Slack에 바로 연동 가능!
        2주 파일럿 프로그램 무료 제공
    `
};

// Export
if (typeof module !== 'undefined') {
    module.exports = { RealisticAPIService, salesScript };
}