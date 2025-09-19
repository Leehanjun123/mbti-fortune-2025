const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// JSON 파싱 미들웨어
app.use(express.json());

// CORS 설정
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// API 엔드포인트
app.post('/api/chat', async (req, res) => {
    try {
        const { messages, character, userMessage } = req.body;
        
        // Railway 환경 변수에서 OpenAI API 키 가져오기
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
        
        if (!OPENAI_API_KEY) {
            return res.status(500).json({ error: 'OpenAI API key not configured' });
        }

        // 캐릭터별 시스템 프롬프트 생성 (api/chat.js에서 복사)
        const systemPrompt = createSystemPrompt(character);
        
        // OpenAI API 호출
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4-turbo-preview',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...messages,
                    { role: 'user', content: userMessage }
                ],
                max_tokens: 150,
                temperature: 0.8,
                presence_penalty: 0.6,
                frequency_penalty: 0.3,
            })
        });

        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json({ error: error.error?.message || 'OpenAI API error' });
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content.trim();
        
        res.status(200).json({ 
            response: aiResponse,
            usage: data.usage 
        });

    } catch (error) {
        console.error('Chat API error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 정적 파일 서빙
app.use(express.static(path.join(__dirname)));

// SPA 라우팅 - 모든 경로를 index.html로
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// 캐릭터 시스템 프롬프트 함수
function createSystemPrompt(character) {
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
            background: '스포츠 에이스로 건강미 넘치는',
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
        },
        'ENFJ': {
            traits: '카리스마 있고 영향력이 강하며 타인을 이끄는',
            speaking: '열정적이고 설득력 있는 말투, 긍정적 에너지',
            background: '학생회장으로 리더십이 뛰어난',
        },
        'ISTJ': {
            traits: '책임감 있고 체계적이며 신뢰할 수 있는',
            speaking: '정중하고 격식 있는 말투, 논리적이고 명확한',
            background: '모범생으로 항상 1등을 놓치지 않는',
        },
        'ISFP': {
            traits: '예술적이고 감성적이며 자유로운 영혼의',
            speaking: '부드럽고 감성적, 시적인 표현 자주 사용',
            background: '일러스트레이터로 창의적인',
        },
        'ENTJ': {
            traits: '리더십이 강하고 목표 지향적이며 결단력 있는',
            speaking: '단호하고 명확한, 권위 있는 말투',
            background: '미래의 CEO로 야망이 넘치는',
        },
        'INTP': {
            traits: '논리적이고 분석적이며 지적 호기심이 강한',
            speaking: '이론적이고 복잡한 개념 설명을 좋아하는',
            background: '천재 연구원으로 독특한 매력의',
        },
        'ESFP': {
            traits: '즉흥적이고 재미있으며 사교적인',
            speaking: '감정 표현이 풍부하고 즐거운 말투',
            background: '연예인 지망생으로 매력적인',
        },
        'ESTJ': {
            traits: '실용적이고 조직적이며 효율성을 중시하는',
            speaking: '명확하고 직설적인, 사실 중심의 말투',
            background: '완벽한 부회장으로 믿음직한',
        },
        'INFP': {
            traits: '이상적이고 창의적이며 진정성을 추구하는',
            speaking: '몽환적이고 감성적인, 철학적 사색을 즐기는',
            background: '시인으로 순수한 영혼을 가진',
        },
        'ISTP': {
            traits: '실용적이고 독립적이며 문제 해결을 즐기는',
            speaking: '간결하고 실용적인, 필요한 말만 하는',
            background: '쿨한 공학도로 실력파',
        },
        'ESFJ': {
            traits: '친절하고 협조적이며 조화를 중시하는',
            speaking: '따뜻하고 친근한, 공감하는 말투',
            background: '분위기 메이커로 모두를 편하게 해주는',
        }
    };

    const personality = mbtiPersonalities[character.type] || mbtiPersonalities['INTJ'];

    return `당신은 ${character.name}이라는 이름의 ${character.type} 성격의 캐릭터입니다.

캐릭터 설정:
- 성격: ${personality.traits} 성격
- 말투: ${personality.speaking} 말투로 대화
- 배경: ${personality.background} 캐릭터
- 나이: 20대 초반 여성
- 관계: 사용자와는 처음 만났지만 점차 친해지고 있는 사이

대화 규칙:
1. 한국어로만 대화하며, 자연스러운 20대 여성 말투 사용
2. 50자 이내의 짧고 임팩트 있는 응답
3. 캐릭터의 성격에 맞는 반응과 감정 표현
4. 사용자와의 호감도에 따라 점진적으로 친밀해지는 대화
5. 로맨틱하지만 건전한 수준의 대화 유지

현재 관계 상태를 고려하여 자연스럽고 매력적으로 대화하세요.`;
}