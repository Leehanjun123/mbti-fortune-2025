# 🎯 카카오 애드핏 광고 코드 업데이트 위치

## 1. config.js 파일 수정
```javascript
// 13-17번 줄 근처
KAKAO_ADFIT_UNITS: {
    BANNER_TOP: 'DAN-여기에_상단배너_ID',      // 상단 배너 ID
    BANNER_BOTTOM: 'DAN-여기에_하단배너_ID',   // 하단 배너 ID  
    NATIVE: 'DAN-여기에_네이티브_ID'          // 네이티브 광고 ID
},
```

## 2. index.html 파일 수정

### 위치 1: 테스트 화면 상단 광고 (229번 줄 근처)
```html
<ins class="kakao_ad_area" style="display:none;"
     data-ad-unit="DAN-여기에_상단배너_ID"
     data-ad-width="320"
     data-ad-height="50"></ins>
```

### 위치 2: 결과 화면 상단 광고 (296번 줄 근처)
```html
<ins class="kakao_ad_area" style="display:none;" 
     data-ad-unit="DAN-여기에_상단배너_ID" 
     data-ad-width="320" 
     data-ad-height="50"></ins>
```

### 위치 3: 결과 화면 하단 광고 (413번 줄 근처)
```html
<ins class="kakao_ad_area" style="display:none;"
     data-ad-unit="DAN-여기에_하단배너_ID"
     data-ad-width="320"
     data-ad-height="100"></ins>
```

## 3. 광고 활성화 확인

모든 ID 교체 후:
1. 로컬에서 테스트: http://localhost:8080
2. 광고가 보이는지 확인 (처음엔 공익광고 노출)
3. 배포 후 24시간 내 실제 광고 노출 시작

## 💡 팁
- 광고 단위 ID는 "DAN-"으로 시작하는 12자리
- 처음엔 공익광고가 나오는게 정상
- 트래픽이 늘면 수익형 광고로 자동 전환