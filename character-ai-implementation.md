# Character.AI 스타일 구현 가이드

## 1. Pygmalion AI란?
- Character.AI의 오픈소스 대안
- 캐릭터 페르소나를 학습한 AI 모델
- 일관된 성격과 말투 유지
- **무료**로 사용 가능

## 2. 구현 방법

### 옵션 A: Hugging Face 사용 (가장 쉬움)
```javascript
// 무료 Hugging Face API 사용
async function callPygmalion(character, userInput, history) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/PygmalionAI/pygmalion-6b",
        {
            headers: { 
                Authorization: "Bearer YOUR_HF_TOKEN" // 무료 가입 후 발급
            },
            method: "POST",
            body: JSON.stringify({
                inputs: formatCharacterPrompt(character, userInput, history),
                parameters: {
                    max_new_tokens: 100,
                    temperature: 0.8,
                    repetition_penalty: 1.2
                }
            })
        }
    );
    return await response.json();
}
```

### 옵션 B: 로컬 실행 (완전 무료)
```bash
# 1. Oobabooga Text Generation WebUI 설치
git clone https://github.com/oobabooga/text-generation-webui
cd text-generation-webui
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 2. Pygmalion 모델 다운로드 (4GB~13GB)
python download-model.py PygmalionAI/pygmalion-6b

# 3. 실행
python server.py --model pygmalion-6b --api
```

### 옵션 C: Google Colab (무료 GPU)
```python
# Colab 노트북에서 실행
!pip install transformers
from transformers import AutoTokenizer, AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("PygmalionAI/pygmalion-6b")
tokenizer = AutoTokenizer.from_pretrained("PygmalionAI/pygmalion-6b")
```

## 3. 캐릭터 정의 파일 (Character Card)

### INTJ 캐릭터 예시:
```json
{
  "name": "윤서",
  "description": "차갑고 논리적인 INTJ 여성. 20대 초반. 전략적 사고를 하며 감정 표현을 잘 하지 않는다.",
  "personality": "analytical, independent, strategic, cold exterior but caring inside",
  "scenario": "대학 도서관에서 혼자 공부하던 윤서를 만났다.",
  "first_mes": "...방해하지 마. 지금 중요한 걸 읽고 있어.",
  "mes_example": [
    "{{user}}: 안녕? 뭐 읽어?\n{{char}}: ...굳이 알아야 해? 양자역학 관련 논문이야.",
    "{{user}}: 어렵겠다\n{{char}}: 너한테는 그렇겠지. 기초가 없으면 이해 못해.",
    "{{user}}: 가르쳐줄래?\n{{char}}: ...시간 낭비야. 하지만... 정 원한다면 기초부터 설명해줄게."
  ]
}
```

### ENFP 캐릭터 예시:
```json
{
  "name": "유나",
  "description": "밝고 열정적인 ENFP 여성. 상상력이 풍부하고 새로운 경험을 좋아한다.",
  "personality": "enthusiastic, creative, spontaneous, warm, empathetic",
  "scenario": "카페에서 우연히 만난 유나가 먼저 말을 걸어왔다.",
  "first_mes": "우와! 너 혼자야? 나랑 같이 앉을래? 심심했는데!!",
  "mes_example": [
    "{{user}}: 어... 괜찮아\n{{char}}: 진짜?? 야호! 나는 유나야! 너는? 이름 뭐야??",
    "{{user}}: 나는...\n{{char}}: 우와 좋은 이름이다! 우리 친구하자! 뭐 좋아해??"
  ]
}
```

## 4. 실제 구현 코드

```javascript
class CharacterAI {
    constructor(characterCard) {
        this.character = characterCard;
        this.conversationHistory = [];
        this.memoryLimit = 20; // 최근 20개 대화만 기억
    }
    
    formatPrompt(userInput) {
        // Pygmalion 형식
        let prompt = `${this.character.name}'s Persona: ${this.character.description}\n`;
        prompt += `Personality: ${this.character.personality}\n`;
        prompt += `Scenario: ${this.character.scenario}\n`;
        prompt += `<START>\n`;
        
        // 대화 히스토리 추가
        this.conversationHistory.slice(-this.memoryLimit).forEach(turn => {
            prompt += `{{user}}: ${turn.user}\n`;
            prompt += `{{char}}: ${turn.char}\n`;
        });
        
        prompt += `{{user}}: ${userInput}\n`;
        prompt += `{{char}}:`;
        
        return prompt;
    }
    
    async getResponse(userInput) {
        const prompt = this.formatPrompt(userInput);
        
        // Hugging Face API 호출
        const response = await fetch(
            "https://api-inference.huggingface.co/models/PygmalionAI/pygmalion-6b",
            {
                headers: { 
                    Authorization: "Bearer hf_YOUR_FREE_TOKEN"
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 150,
                        temperature: 0.9,
                        top_p: 0.95,
                        repetition_penalty: 1.1,
                        stop: ["{{user}}:", "\n{{user}}"]
                    }
                })
            }
        );
        
        const data = await response.json();
        const charResponse = data[0].generated_text.split("{{char}}:").pop().trim();
        
        // 대화 기록
        this.conversationHistory.push({
            user: userInput,
            char: charResponse
        });
        
        return charResponse;
    }
}
```

## 5. 무료로 사용하는 방법들

### 방법 1: Hugging Face Spaces
1. https://huggingface.co 가입 (무료)
2. Settings → Access Tokens → New Token
3. 매월 무료 크레딧으로 수천 번 호출 가능

### 방법 2: Replicate
1. https://replicate.com 가입
2. 무료 크레딧 $5 제공 (약 5000번 호출)
```javascript
const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
        "Authorization": "Token YOUR_REPLICATE_TOKEN",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        version: "pygmalion-6b",
        input: { prompt: characterPrompt }
    })
});
```

### 방법 3: Petals (P2P 분산 실행)
```python
# 여러 사용자가 GPU를 공유하는 방식
from petals import AutoDistributedModelForCausalLM

model = AutoDistributedModelForCausalLM.from_pretrained(
    "PygmalionAI/pygmalion-6b",
    initial_peers=["PEER_ADDRESS"]  # 공개 피어 사용
)
```

## 6. 장점
- ✅ **무료** (또는 매우 저렴)
- ✅ 일관된 캐릭터 성격 유지
- ✅ 대화 기억
- ✅ 커스터마이징 가능
- ✅ 한국어 지원 (프롬프트로)

## 7. 단점
- ❌ OpenAI보다 품질 낮음
- ❌ 가끔 엉뚱한 대답
- ❌ 초기 설정 필요
- ❌ 응답 속도 느림 (무료 티어)

## 8. 실제 사용 예시

```javascript
// MBTI별 캐릭터 카드 로드
const characters = {
    INTJ: {
        name: "윤서",
        description: "차갑지만 내면은 따뜻한 INTJ",
        personality: "analytical, strategic, independent",
        // ...
    },
    ENFP: {
        name: "유나", 
        description: "열정적이고 창의적인 ENFP",
        personality: "enthusiastic, creative, warm",
        // ...
    }
};

// 사용
const intjBot = new CharacterAI(characters.INTJ);
const response = await intjBot.getResponse("안녕, 오늘 뭐했어?");
// "...별로 중요한 건 아니야. 책 읽고 분석하느라 바빴어."
```

## 추천 조합
1. **간단한 대화**: 로컬 패턴 매칭
2. **복잡한 대화**: Pygmalion API
3. **중요한 순간**: OpenAI API

이렇게 하면 비용을 최소화하면서도 꽤 자연스러운 대화가 가능합니다!