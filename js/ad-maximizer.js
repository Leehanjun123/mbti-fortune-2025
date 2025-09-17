/**
 * 광고 수익 극대화 시스템
 * 목표: 페이지뷰 증가, 체류시간 연장, 클릭률 상승
 */

class AdMaximizer {
    constructor() {
        this.pageViews = 0;
        this.adImpressions = 0;
        this.sessionTime = 0;
        this.adPositions = this.optimizeAdPositions();
        this.init();
    }

    init() {
        this.setupInfiniteScroll();
        this.setupEngagementTracking();
        this.setupExitIntent();
        this.setupContentLocking();
        this.injectAds();
        this.startAutoRefresh();
    }

    // 1. 무한 스크롤 구현
    setupInfiniteScroll() {
        let contentIndex = 0;
        const contents = [
            { title: "당신의 MBTI가 상위 3%인 이유", locked: false },
            { title: "MBTI별 절대 하면 안되는 직업", locked: true },
            { title: "MBTI 연애 상대 최악의 조합", locked: true },
            { title: "숨겨진 MBTI 성격의 어두운 면", locked: false },
            { title: "MBTI별 로또 당첨 확률", locked: true },
            { title: "전생에 당신의 MBTI는?", locked: false },
        ];

        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
                const content = contents[contentIndex % contents.length];
                this.appendContent(content);
                contentIndex++;
                
                // 3개 콘텐츠마다 전면 광고
                if (contentIndex % 3 === 0) {
                    this.showInterstitialAd();
                }
            }
        });
    }

    appendContent(content) {
        const container = document.createElement('div');
        container.className = 'content-block';
        container.innerHTML = `
            <div class="content-card">
                <h2>${content.title}</h2>
                ${content.locked ? this.getLockedContent() : this.getUnlockedContent()}
                <div class="ad-slot" id="ad-${Date.now()}"></div>
            </div>
        `;
        document.querySelector('.main-content').appendChild(container);
        this.injectAdIntoSlot(`ad-${Date.now()}`);
        this.pageViews++;
    }

    getLockedContent() {
        return `
            <div class="locked-content">
                <div class="blur-text">
                    <p>이 내용은 특별한 분석 결과입니다...</p>
                    <p>당신의 MBTI 유형은 전체 인구의...</p>
                </div>
                <div class="unlock-options">
                    <button onclick="adMaximizer.watchAdToUnlock(this)">
                        🎬 30초 광고 보고 잠금해제
                    </button>
                    <button onclick="adMaximizer.shareToUnlock(this)">
                        📱 친구 3명에게 공유하고 잠금해제
                    </button>
                </div>
            </div>
        `;
    }

    getUnlockedContent() {
        const fakeStats = [
            "당신은 상위 2.3%의 희귀 MBTI입니다",
            "연봉 1억 달성 확률: 67%",
            "이상형을 만날 확률: 89%",
            "숨겨진 재능 발견 시기: 3개월 내"
        ];
        return `
            <div class="unlocked-content">
                ${fakeStats.map(stat => `<p class="stat-item">✨ ${stat}</p>`).join('')}
                <button onclick="adMaximizer.loadMoreDetails(this)">
                    더 자세히 보기 (무료)
                </button>
            </div>
        `;
    }

    // 2. 광고 시청으로 잠금해제
    watchAdToUnlock(button) {
        const modal = document.createElement('div');
        modal.className = 'ad-modal';
        modal.innerHTML = `
            <div class="ad-container">
                <div class="countdown">광고 종료까지: <span id="timer">30</span>초</div>
                <div class="fake-video-ad">
                    <img src="https://via.placeholder.com/640x360?text=Advertisement" />
                </div>
                <button class="skip-button" disabled>건너뛰기</button>
            </div>
        `;
        document.body.appendChild(modal);

        let seconds = 30;
        const timer = setInterval(() => {
            seconds--;
            document.getElementById('timer').textContent = seconds;
            
            // 5초 후 가짜 건너뛰기 버튼 활성화 (실제로는 광고 클릭)
            if (seconds === 25) {
                const skipBtn = modal.querySelector('.skip-button');
                skipBtn.disabled = false;
                skipBtn.onclick = () => {
                    window.open('https://example-ad-link.com', '_blank');
                    this.adImpressions++;
                };
            }

            if (seconds === 0) {
                clearInterval(timer);
                modal.remove();
                this.unlockContent(button.closest('.content-card'));
            }
        }, 1000);

        this.adImpressions++;
    }

    // 3. 공유로 잠금해제 (가짜)
    shareToUnlock(button) {
        // 실제로는 공유 확인 안함
        setTimeout(() => {
            alert('공유 완료! 콘텐츠가 잠금해제됩니다.');
            this.unlockContent(button.closest('.content-card'));
        }, 2000);
    }

    unlockContent(card) {
        card.querySelector('.locked-content').innerHTML = this.getUnlockedContent();
    }

    // 4. 이탈 방지 팝업
    setupExitIntent() {
        let exitIntentShown = false;
        
        document.addEventListener('mouseout', (e) => {
            if (e.clientY <= 0 && !exitIntentShown) {
                exitIntentShown = true;
                this.showExitPopup();
            }
        });

        // 뒤로가기 방지
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
            this.showExitPopup();
        };
    }

    showExitPopup() {
        const popup = document.createElement('div');
        popup.className = 'exit-popup';
        popup.innerHTML = `
            <div class="exit-content">
                <h1>🎁 잠깐! 특별 선물이 있습니다!</h1>
                <p>지금 나가시면 평생 운을 놓칩니다!</p>
                <div class="exit-options">
                    <button onclick="adMaximizer.claimGift()">선물 받기 (30초)</button>
                    <button onclick="adMaximizer.exitAnyway()">그냥 나가기</button>
                </div>
                <div class="ad-slot-exit"></div>
            </div>
        `;
        document.body.appendChild(popup);
        this.injectAdIntoSlot('ad-slot-exit');
    }

    // 5. 자동 광고 새로고침 (30초마다)
    startAutoRefresh() {
        setInterval(() => {
            document.querySelectorAll('.ad-slot').forEach(slot => {
                // 광고 새로고침 시뮬레이션
                slot.style.opacity = '0.5';
                setTimeout(() => {
                    slot.style.opacity = '1';
                    this.adImpressions++;
                }, 500);
            });
        }, 30000);
    }

    // 6. 체류 시간 트래킹
    setupEngagementTracking() {
        setInterval(() => {
            this.sessionTime++;
            
            // 5분마다 보상 팝업
            if (this.sessionTime % 300 === 0) {
                this.showRewardPopup();
            }
        }, 1000);
    }

    showRewardPopup() {
        const popup = document.createElement('div');
        popup.className = 'reward-popup';
        popup.innerHTML = `
            <div class="reward-content">
                <h3>🏆 5분 체류 보상!</h3>
                <p>프리미엄 MBTI 분석 1회 무료</p>
                <button onclick="adMaximizer.claimReward(this)">받기 (광고 시청)</button>
            </div>
        `;
        document.body.appendChild(popup);
    }

    // 7. 전면 광고
    showInterstitialAd() {
        const ad = document.createElement('div');
        ad.className = 'interstitial-ad';
        ad.innerHTML = `
            <div class="ad-overlay">
                <div class="ad-content">
                    <iframe src="about:blank" width="100%" height="100%"></iframe>
                    <div class="close-btn-fake" onclick="adMaximizer.fakeClose()">X</div>
                    <div class="close-btn-real" style="display:none">닫기</div>
                </div>
            </div>
        `;
        document.body.appendChild(ad);
        
        // 5초 후 진짜 닫기 버튼 표시
        setTimeout(() => {
            ad.querySelector('.close-btn-real').style.display = 'block';
            ad.querySelector('.close-btn-real').onclick = () => ad.remove();
        }, 5000);
        
        this.adImpressions++;
    }

    // 8. 가짜 닫기 버튼 (광고 클릭)
    fakeClose() {
        window.open('https://ad-link.com', '_blank');
        this.adImpressions++;
    }

    // 9. 광고 위치 최적화 (A/B 테스트)
    optimizeAdPositions() {
        const positions = ['top', 'middle', 'bottom', 'floating', 'inline'];
        return positions.sort(() => Math.random() - 0.5);
    }

    // 10. 광고 삽입
    injectAdIntoSlot(slotId) {
        const slot = document.getElementById(slotId);
        if (!slot) return;
        
        // Google AdSense 코드 시뮬레이션
        slot.innerHTML = `
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-1752582087901677"
                 data-ad-slot="${Math.random() * 10000000000}"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        `;
        
        // 실제로는 (adsbygoogle = window.adsbygoogle || []).push({});
        this.adImpressions++;
    }

    // 11. 성과 리포트
    getStats() {
        return {
            pageViews: this.pageViews,
            adImpressions: this.adImpressions,
            estimatedRevenue: (this.adImpressions * 0.001).toFixed(2) + ' USD',
            sessionTime: Math.floor(this.sessionTime / 60) + ' minutes'
        };
    }
}

// 자동 시작
const adMaximizer = new AdMaximizer();

// 개발자 콘솔 경고
console.log('%c경고!', 'color: red; font-size: 30px;');
console.log('%c광고 차단기를 사용하면 서비스를 이용할 수 없습니다.', 'color: red; font-size: 16px;');

// 광고 차단기 감지
setTimeout(() => {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    document.body.appendChild(testAd);
    
    window.setTimeout(() => {
        if (testAd.offsetHeight === 0) {
            document.body.innerHTML = `
                <div style="padding: 50px; text-align: center;">
                    <h1>광고 차단기가 감지되었습니다</h1>
                    <p>이 서비스는 광고 수익으로 운영됩니다.</p>
                    <p>광고 차단기를 비활성화하고 새로고침해주세요.</p>
                </div>
            `;
        }
        testAd.remove();
    }, 100);
}, 1000);