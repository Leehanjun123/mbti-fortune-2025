# 🚀 MBTI 운세 2025 - 설정 가이드

## 📋 필수 설정 체크리스트

### 1. 카카오 개발자 설정 ✅
```
✅ 완료: JavaScript 키 이미 설정됨
- 키: 48c0d88498f6ea2f7e8c8f87654321ab
- 위치: config.js

추가 설정:
1. https://developers.kakao.com 접속
2. 앱 > 플랫폼 > Web 플랫폼 등록
3. 사이트 도메인: https://mbti2025.vercel.app 추가
4. 카카오 로그인 > 동의항목 설정 (선택사항)
```

### 2. 구글 애널리틱스 (GA4) 🔴
```
필수 설정:
1. https://analytics.google.com 접속
2. 관리 > 계정 만들기 > 속성 생성
3. 데이터 스트림 > 웹 > URL 입력
4. 측정 ID 복사 (G-XXXXXXXXXX 형식)

설정할 파일:
- config.js의 GA_TRACKING_ID 교체
```

### 3. 카카오 애드핏 (광고) 🔴
```
필수 설정:
1. https://adfit.kakao.com 접속
2. 회원가입 및 사업자 정보 입력
3. 광고단위 만들기:
   - 배너 광고 (320x50)
   - 네이티브 광고
4. 광고단위 ID 복사 (DAN-XXXXXXXXXX 형식)

설정할 파일:
- config.js의 KAKAO_ADFIT_UNITS 교체
- index.html의 data-ad-unit 값 교체
```

### 4. 구글 애드센스 🔴
```
필수 설정 (승인 필요):
1. https://www.google.com/adsense 접속
2. 사이트 추가 및 승인 대기 (1-14일)
3. 승인 후 광고 코드 생성
4. ca-pub-XXXXXXXXXX 형식의 ID 복사

설정할 파일:
- config.js의 ADSENSE_CLIENT 교체
- index.html의 data-ad-client 교체
```

### 5. Facebook Pixel 🟡
```
선택 설정 (마케팅용):
1. https://business.facebook.com 접속
2. 이벤트 관리자 > 픽셀 생성
3. 픽셀 ID 복사

설정할 파일:
- index.html의 fbq('init', 'YOUR_PIXEL_ID') 교체
```

### 6. 결제 시스템 🔴
```
다음 중 선택:

[카카오페이]
1. https://developers.kakao.com/docs/kakaopay
2. 가맹점 가입 필요
3. Admin Key 발급

[네이버페이]
1. https://developer.pay.naver.com
2. 가맹점 가입
3. Client ID/Secret 발급

[토스페이먼츠]
1. https://www.tosspayments.com
2. 가맹점 가입 (개인/사업자)
3. 클라이언트 키 발급
```

### 7. Vercel 환경변수 설정 🔴
```bash
# Vercel 대시보드에서 설정
# Settings > Environment Variables

GA_TRACKING_ID=G-XXXXXXXXXX
KAKAO_APP_KEY=48c0d88498f6ea2f7e8c8f87654321ab
KAKAO_ADFIT_BANNER=DAN-XXXXXXXXXX
KAKAO_ADFIT_NATIVE=DAN-YYYYYYYYYY
ADSENSE_CLIENT=ca-pub-XXXXXXXXXX
FB_PIXEL_ID=XXXXXXXXXX
PAYMENT_CLIENT_KEY=pk_live_XXXXXXXXXX
```

### 8. 도메인 설정 (선택) 🟡
```
커스텀 도메인 사용시:
1. 도메인 구매 (Godaddy, Namecheap 등)
2. Vercel > Settings > Domains
3. Add Domain > 도메인 입력
4. DNS 설정:
   - A Record: 76.76.21.21
   - CNAME: cname.vercel-dns.com
```

## 📊 우선순위별 설정

### 🔥 즉시 설정 (수익화 필수)
1. **구글 애널리틱스** - 데이터 수집 시작
2. **카카오 애드핏** - 즉시 광고 수익 가능
3. **카카오 SDK** - 공유 기능 활성화

### 📅 1주일 내 설정
4. **구글 애드센스** - 승인 대기 시간 필요
5. **결제 시스템** - 사업자 등록 필요할 수 있음
6. **커스텀 도메인** - SEO 향상

### 💡 선택 설정
7. **Facebook Pixel** - 페이스북 광고 운영시
8. **네이버 서치어드바이저** - 네이버 SEO
9. **PWA 인증서** - 앱스토어 등록시

## 🎯 예상 수익 (MAU 10만 기준)

| 수익원 | 예상 월 수익 | 설정 난이도 |
|--------|-------------|------------|
| 카카오 애드핏 | 200-300만원 | ⭐⭐ |
| 구글 애드센스 | 100-200만원 | ⭐⭐⭐ |
| 프리미엄 구독 | 150-250만원 | ⭐⭐⭐⭐ |
| 제휴 마케팅 | 50-100만원 | ⭐⭐ |

## 🚨 주의사항

1. **개인정보처리방침** 작성 필수
2. **이용약관** 페이지 추가 필요
3. **사업자등록** - 월 수익 일정액 초과시
4. **세금신고** - 수익 발생시 종합소득세

## 📞 지원 링크

- [카카오 개발자](https://developers.kakao.com)
- [구글 애널리틱스](https://support.google.com/analytics)
- [애드센스 도움말](https://support.google.com/adsense)
- [Vercel 문서](https://vercel.com/docs)

---
*마지막 업데이트: 2025년 1월*