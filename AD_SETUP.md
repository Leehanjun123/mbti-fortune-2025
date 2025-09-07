# 광고 설정 가이드

## 카카오 애드핏 설정

### 1. 카카오 애드핏 가입
1. [카카오 애드핏](https://adfit.kakao.com/) 접속
2. 카카오 계정으로 로그인
3. 사이트 등록

### 2. 광고 단위 생성
1. 대시보드에서 "광고 단위 만들기" 클릭
2. 다음 3개의 광고 단위 생성:
   - 테스트 화면 상단 배너 (320x50)
   - 결과 화면 상단 배너 (320x50)  
   - 결과 화면 하단 네이티브 (320x100)

### 3. 광고 단위 ID 적용
index.html 파일에서 다음 부분의 `data-ad-unit` 값을 실제 광고 단위 ID로 교체:

```html
<!-- 테스트 화면 광고 (235번 줄 근처) -->
<ins class="kakao_ad_area" style="display:none;"
    data-ad-unit="실제_광고_단위_ID_1"
    data-ad-width="320"
    data-ad-height="50"></ins>

<!-- 결과 화면 상단 광고 (302번 줄 근처) -->
<ins class="kakao_ad_area" style="display:none;" 
    data-ad-unit="실제_광고_단위_ID_2" 
    data-ad-width="320" 
    data-ad-height="50"></ins>

<!-- 결과 화면 하단 광고 (432번 줄 근처) -->
<ins class="kakao_ad_area" style="display:none;"
    data-ad-unit="실제_광고_단위_ID_3"
    data-ad-width="320"
    data-ad-height="100"></ins>
```

### 4. 테스트
1. 로컬 서버 실행: `python3 -m http.server 8080`
2. 브라우저에서 http://localhost:8080 접속
3. 3초 후 광고가 로드되는지 확인
4. 콘솔에서 "카카오 애드핏 광고 렌더링 완료" 메시지 확인

## 구글 애드센스 설정 (선택사항)

### 1. 구글 애드센스 승인 후
index.html 67번 줄의 주석을 해제하고 실제 클라이언트 ID로 교체:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-실제_클라이언트_ID"
    crossorigin="anonymous"></script>
```

### 2. 광고 단위 코드 적용
421번 줄의 애드센스 코드에 실제 광고 단위 ID 적용:

```html
<ins class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-실제_클라이언트_ID"
    data-ad-slot="실제_광고_슬롯_ID"
    data-ad-format="auto"></ins>
```

## 문제 해결

### 광고가 표시되지 않는 경우
1. 광고 차단 확장 프로그램 비활성화
2. 개발자 콘솔에서 에러 메시지 확인
3. 광고 단위 ID가 올바른지 확인
4. 사이트가 카카오 애드핏에 승인되었는지 확인

### 성능 최적화
- 광고 스크립트는 3초 지연 로드로 설정되어 있음
- 초기 페이지 로딩 성능에 영향을 주지 않음
- 필요시 지연 시간 조정 가능 (index.html 75번 줄)

## 수익 확인
- 카카오 애드핏: https://adfit.kakao.com/
- 구글 애드센스: https://www.google.com/adsense/