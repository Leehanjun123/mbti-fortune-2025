# 🚀 네이버/구글 사이트 등록 가이드

## 📌 Google Search Console 등록

### 1단계: Google Search Console 접속
1. https://search.google.com/search-console 접속
2. Google 계정으로 로그인

### 2단계: 속성 추가
1. "속성 추가" 클릭
2. URL 접두사 선택
3. `https://mbti-destiny.site` 입력

### 3단계: 소유권 확인
**방법 1: HTML 태그 (추천)**
```html
<!-- index.html의 <head>에 추가 -->
<meta name="google-site-verification" content="여기에_구글이_주는_코드" />
```

**방법 2: HTML 파일 업로드**
- 구글이 제공하는 HTML 파일을 다운로드
- 루트 디렉토리에 업로드

### 4단계: 사이트맵 제출
1. 왼쪽 메뉴에서 "Sitemaps" 클릭
2. `sitemap.xml` 입력
3. "제출" 클릭

### 5단계: 색인 요청
1. URL 검사 도구 사용
2. 주요 페이지 URL 입력
3. "색인 생성 요청" 클릭

---

## 📌 네이버 서치어드바이저 등록

### 1단계: 네이버 서치어드바이저 접속
1. https://searchadvisor.naver.com 접속
2. 네이버 계정으로 로그인

### 2단계: 사이트 등록
1. "사이트 등록" 클릭
2. `https://mbti-destiny.site` 입력

### 3단계: 소유권 확인
**방법 1: HTML 태그**
```html
<!-- index.html의 <head>에 추가 -->
<meta name="naver-site-verification" content="네이버가_주는_코드" />
```

**방법 2: HTML 파일**
- `naver1234567890.html` 파일 다운로드
- 루트에 업로드

### 4단계: 사이트맵 제출
1. 왼쪽 메뉴 "요청" → "사이트맵 제출"
2. `https://mbti-destiny.site/sitemap.xml` 입력
3. "확인" 클릭

### 5단계: 웹페이지 수집
1. "요청" → "웹페이지 수집"
2. 주요 URL 입력 (하루 최대 10개)
3. 제출

---

## 📌 추가 최적화 작업

### 1. RSS 피드 제출
```xml
<!-- rss.xml 파일 생성 -->
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>MBTI 연애 궁합</title>
    <link>https://mbti-destiny.site</link>
    <description>MBTI별 연애 궁합과 시뮬레이터</description>
  </channel>
</rss>
```

### 2. 구조화된 데이터 확인
```javascript
// Google Rich Results Test
https://search.google.com/test/rich-results

// 테스트할 URL 입력
https://mbti-destiny.site
```

### 3. 페이지 속도 최적화
```bash
# Lighthouse 테스트
https://pagespeed.web.dev/

# 개선 사항
- 이미지 최적화
- CSS/JS 압축
- 캐시 설정
```

---

## 📌 바로 할 수 있는 작업들

### 즉시 실행 명령어:
```bash
# 1. Vercel에 파일 배포
vercel --prod

# 2. 배포 확인
open https://mbti-destiny.site/sitemap.xml
open https://mbti-destiny.site/robots.txt
```

### 메타 태그 추가 (index.html):
```html
<head>
    <!-- Google Search Console -->
    <meta name="google-site-verification" content="구글_인증_코드" />
    
    <!-- Naver Search Advisor -->
    <meta name="naver-site-verification" content="네이버_인증_코드" />
    
    <!-- SEO 메타 태그 -->
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
    <link rel="canonical" href="https://mbti-destiny.site/" />
</head>
```

---

## 📌 체크리스트

### Google Search Console
- [ ] 사이트 등록
- [ ] 소유권 확인
- [ ] 사이트맵 제출
- [ ] 주요 페이지 색인 요청
- [ ] 성능 리포트 확인

### 네이버 서치어드바이저
- [ ] 사이트 등록
- [ ] 소유권 확인
- [ ] 사이트맵 제출
- [ ] 웹페이지 수집 요청
- [ ] 사이트 진단 확인

### 추가 작업
- [ ] Bing Webmaster Tools 등록
- [ ] Daum 검색 등록
- [ ] 구조화된 데이터 테스트
- [ ] 모바일 친화성 테스트
- [ ] 페이지 속도 최적화

---

## 📌 예상 일정

- **즉시**: 사이트 등록 및 인증
- **1-3일**: 크롤링 시작
- **3-7일**: 첫 페이지 색인
- **1-2주**: 주요 페이지 검색 노출
- **2-4주**: 전체 사이트 색인 완료

---

## 📌 트래픽 모니터링

### Google Analytics 확인
```javascript
// 실시간 트래픽 확인
https://analytics.google.com

// 주요 지표
- 사용자 수
- 페이지뷰
- 평균 체류 시간
- 이탈률
```

### Search Console 리포트
- 검색 실적
- 색인 상태
- 사이트맵 상태
- 모바일 사용성

---

## 💡 Pro Tips

1. **키워드 최적화**
   - "MBTI 연애 궁합"
   - "MBTI 연애 테스트"
   - "성격 유형별 궁합"
   - "[MBTI] [MBTI] 궁합"

2. **백링크 구축**
   - MBTI 관련 커뮤니티에 공유
   - 블로그 포스팅
   - SNS 공유

3. **콘텐츠 업데이트**
   - 정기적으로 새 콘텐츠 추가
   - 기존 콘텐츠 개선
   - 사용자 피드백 반영

**다음 단계: 위 가이드대로 Google Search Console과 네이버 서치어드바이저에 등록하시면 됩니다!**