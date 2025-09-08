// 🔍 사용자 관점 수동 테스트 스크립트
// 브라우저 콘솔에서 실행하여 앱 상태 확인

console.log('🚀 사용자 테스트 시작...');

// 1. 초기 로딩 상태 확인
function testInitialState() {
    console.log('\n=== 1단계: 초기 로딩 상태 ===');
    
    // 로딩 화면 존재 확인
    const loadingScreen = document.getElementById('loadingScreen');
    console.log('로딩 화면 존재:', !!loadingScreen);
    console.log('로딩 화면 표시 중:', loadingScreen?.style.display !== 'none');
    
    // 시작 화면 존재 확인
    const startScreen = document.getElementById('startScreen');
    console.log('시작 화면 존재:', !!startScreen);
    
    // 현재 활성화된 화면 확인
    const activeScreens = document.querySelectorAll('.screen.active');
    console.log('활성화된 화면 수:', activeScreens.length);
    console.log('활성화된 화면:', Array.from(activeScreens).map(s => s.id));
}

// 2. 화면 전환 기능 테스트
function testScreenTransition() {
    console.log('\n=== 2단계: 화면 전환 테스트 ===');
    
    try {
        // 시작 화면으로 전환 시도
        if (typeof showScreen === 'function') {
            showScreen('start');
            console.log('✅ showScreen 함수 정상 작동');
            
            // 1초 후 상태 확인
            setTimeout(() => {
                const startScreen = document.getElementById('startScreen');
                const isVisible = startScreen && startScreen.style.display !== 'none';
                console.log('시작 화면 표시됨:', isVisible);
                
                const otherScreens = document.querySelectorAll('.screen:not(#startScreen)');
                const allHidden = Array.from(otherScreens).every(s => s.style.display === 'none');
                console.log('다른 화면들 숨겨짐:', allHidden);
            }, 1000);
            
        } else {
            console.log('❌ showScreen 함수가 정의되지 않음');
        }
    } catch (error) {
        console.log('❌ 화면 전환 오류:', error.message);
    }
}

// 3. 버튼 클릭 기능 테스트
function testButtonFunctionality() {
    console.log('\n=== 3단계: 버튼 기능 테스트 ===');
    
    // 시작하기 버튼 찾기
    const startButton = document.querySelector('button[onclick*="startJourney"], .main-button');
    console.log('시작하기 버튼 존재:', !!startButton);
    
    if (startButton) {
        console.log('버튼 텍스트:', startButton.textContent);
        console.log('버튼 클릭 가능:', !startButton.disabled);
        
        // 클릭 이벤트 시뮬레이션
        try {
            startButton.click();
            console.log('✅ 버튼 클릭 성공');
        } catch (error) {
            console.log('❌ 버튼 클릭 오류:', error.message);
        }
    }
}

// 4. 오류 처리 시스템 테스트
function testErrorHandling() {
    console.log('\n=== 4단계: 오류 처리 테스트 ===');
    
    // ErrorBoundary 존재 확인
    if (typeof ErrorBoundary !== 'undefined') {
        console.log('✅ ErrorBoundary 시스템 존재');
        
        try {
            // 테스트 오류 발생
            ErrorBoundary.handleError(new Error('테스트 오류'), '수동 테스트');
            console.log('✅ 오류 처리 시스템 정상 작동');
        } catch (error) {
            console.log('❌ 오류 처리 시스템 문제:', error.message);
        }
    } else {
        console.log('❌ ErrorBoundary 시스템 없음');
    }
}

// 5. 접근성 시스템 테스트
function testAccessibility() {
    console.log('\n=== 5단계: 접근성 테스트 ===');
    
    if (typeof AccessibilityManager !== 'undefined') {
        console.log('✅ AccessibilityManager 존재');
        
        // 스크린 리더 테스트
        try {
            AccessibilityManager.announceToScreenReader('테스트 메시지');
            console.log('✅ 스크린 리더 시스템 정상 작동');
        } catch (error) {
            console.log('❌ 접근성 시스템 오류:', error.message);
        }
    } else {
        console.log('❌ AccessibilityManager 없음');
    }
}

// 6. 광고 시스템 테스트
function testAdSystem() {
    console.log('\n=== 6단계: 광고 시스템 테스트 ===');
    
    console.log('adLoadState:', window.adLoadState);
    console.log('adsbykakao 객체:', typeof window.adsbykakao);
    
    // 광고 영역 확인
    const adAreas = document.querySelectorAll('.kakao_ad_area');
    console.log('카카오 광고 영역 수:', adAreas.length);
    
    if (typeof renderKakaoAds === 'function') {
        console.log('✅ renderKakaoAds 함수 존재');
        try {
            renderKakaoAds();
            console.log('✅ 광고 렌더링 함수 실행 성공');
        } catch (error) {
            console.log('❌ 광고 렌더링 오류:', error.message);
        }
    } else {
        console.log('❌ renderKakaoAds 함수 없음');
    }
}

// 전체 테스트 실행
function runAllTests() {
    console.log('🎯 전체 사용자 테스트 시작!');
    console.log('================================================');
    
    testInitialState();
    setTimeout(() => testScreenTransition(), 500);
    setTimeout(() => testButtonFunctionality(), 1000);
    setTimeout(() => testErrorHandling(), 1500);
    setTimeout(() => testAccessibility(), 2000);
    setTimeout(() => testAdSystem(), 2500);
    
    setTimeout(() => {
        console.log('\n================================================');
        console.log('🎉 전체 테스트 완료!');
        console.log('📊 결과를 위에서 확인하세요.');
    }, 3000);
}

// 자동으로 테스트 실행
setTimeout(runAllTests, 1000);

// 글로벌 함수로 등록하여 수동으로도 실행 가능
window.userTest = {
    runAll: runAllTests,
    initial: testInitialState,
    screen: testScreenTransition,
    button: testButtonFunctionality,
    error: testErrorHandling,
    accessibility: testAccessibility,
    ads: testAdSystem
};

console.log('💡 수동 테스트: userTest.runAll() 또는 개별 테스트 실행 가능');