# API 보안 가이드

## ⚠️ 중요: API 키 보안

**절대 하지 말아야 할 것:**
- GitHub에 API 키 업로드
- 프론트엔드 코드에 직접 입력
- 공개 채팅/포럼에 공유

## 안전한 구현 방법

### 1. Vercel Functions 사용 (추천)
```javascript
// /api/chat.js
export default async function handler(req, res) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    // ...
  });
}
```

### 2. Netlify Functions 사용
```javascript
// /.netlify/functions/chat.js
exports.handler = async (event, context) => {
  // API 키는 환경 변수에서
  const apiKey = process.env.OPENAI_API_KEY;
}
```

### 3. 자체 백엔드 서버 (Node.js)
```javascript
// server.js
const express = require('express');
const app = express();

app.post('/api/chat', async (req, res) => {
  // 서버에서만 API 키 접근
  const apiKey = process.env.OPENAI_API_KEY;
});
```

## 환경 변수 설정

### Vercel
1. 프로젝트 설정 → Environment Variables
2. `OPENAI_API_KEY` 추가
3. 값 입력 후 저장

### 로컬 개발
`.env.local` 파일 생성:
```
OPENAI_API_KEY=sk-...
```

## 무료 대안

### 1. 하드코딩된 시나리오 사용
- 현재 `visual-novel-dating.html` 방식
- API 키 불필요
- 제한적이지만 안전

### 2. 로컬 스토리지 활용
- 사용자가 자신의 키 입력
- 브라우저에만 저장
- 공유되지 않음

## 현재 노출된 키 처리

1. **즉시 OpenAI 대시보드 접속**
   - https://platform.openai.com/api-keys

2. **해당 키 Revoke (무효화)**

3. **새 키 생성**

4. **사용 한도 설정**
   - Usage limits 설정
   - 월 $10 등으로 제한

5. **알림 설정**
   - 이상 사용시 이메일 알림

## 피해 최소화

- API 사용 내역 확인
- 이상 요금 발생시 OpenAI 지원팀 연락
- 신용카드 한도 설정

---

**중요**: 프로덕션 환경에서는 반드시 서버사이드에서 API 키를 관리하세요!