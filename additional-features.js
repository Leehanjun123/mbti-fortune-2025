// 추가 기능들 - 체류시간 & 광고 수익 극대화

const AdditionalFeatures = {
    
    // ============ 1. 댓글 시스템 (Disqus 연동) ============
    comments: {
        description: "결과 화면에 댓글 달기 - 체류시간 증가",
        
        implementation: `
            <!-- Disqus 댓글 -->
            <div id="disqus_thread"></div>
            <script>
                var disqus_config = function () {
                    this.page.url = window.location.href;
                    this.page.identifier = 'mbti-' + currentMBTI;
                };
                
                (function() {
                    var d = document, s = d.createElement('script');
                    s.src = 'https://mbti-test.disqus.com/embed.js';
                    s.setAttribute('data-timestamp', +new Date());
                    (d.head || d.body).appendChild(s);
                })();
            </script>
        `,
        
        benefits: [
            "평균 체류시간 3분 → 8분",
            "댓글 읽으며 광고 노출 증가",
            "SEO 효과 (사용자 생성 콘텐츠)",
            "재방문율 증가 (답글 알림)"
        ]
    },
    
    // ============ 2. 연애 궁합 계산기 ============
    loveCompatibility: {
        description: "나와 상대방 MBTI 궁합 보기",
        
        ui: `
            <div class="compatibility-section">
                <h3>💕 연애 궁합 계산기</h3>
                <p>좋아하는 사람과의 궁합을 확인해보세요!</p>
                
                <div class="compatibility-inputs">
                    <div class="my-mbti">
                        나의 MBTI: <strong>INTJ</strong>
                    </div>
                    <div class="partner-select">
                        <label>상대방 MBTI:</label>
                        <select id="partnerMBTI">
                            <option>선택하세요</option>
                            <option value="INTJ">INTJ - 전략가</option>
                            <option value="INTP">INTP - 논리학자</option>
                            <!-- 16개 타입 -->
                        </select>
                    </div>
                </div>
                
                <button class="check-compatibility" onclick="checkCompatibility()">
                    궁합 확인하기 💘
                </button>
                
                <!-- 광고 삽입 -->
                <div class="ad-container">
                    <ins class="adsbygoogle"></ins>
                </div>
                
                <div class="compatibility-result" style="display:none;">
                    <div class="compatibility-score">
                        <span class="score-number">87%</span>
                        <span class="score-label">환상의 궁합!</span>
                    </div>
                    <div class="compatibility-detail">
                        <h4>💪 장점</h4>
                        <ul>
                            <li>서로의 부족한 부분을 완벽하게 보완</li>
                            <li>깊은 정신적 교감 가능</li>
                        </ul>
                        
                        <h4>⚠️ 주의점</h4>
                        <ul>
                            <li>감정 표현에 서투를 수 있음</li>
                            <li>갈등 시 대화가 필요</li>
                        </ul>
                    </div>
                </div>
            </div>
        `,
        
        calculation: `
            function checkCompatibility() {
                // 전면 광고 먼저 보여주기
                showInterstitialAd();
                
                setTimeout(() => {
                    // 궁합 계산 로직
                    const scores = {
                        'INTJ-ENFP': 95,
                        'INTJ-ENTP': 88,
                        'INTJ-INFJ': 82,
                        // ... 모든 조합
                    };
                    
                    // 결과 표시
                    showCompatibilityResult(score);
                    
                    // 광고 새로고침
                    refreshAds();
                }, 5000);
            }
        `
    },
    
    // ============ 3. 오늘의 운세 (매일 새로운 콘텐츠) ============
    dailyFortune: {
        description: "MBTI별 오늘의 운세 - 매일 재방문 유도",
        
        implementation: `
            function getDailyFortune(mbtiType) {
                const date = new Date();
                const seed = date.getDate() + date.getMonth();
                
                const fortunes = {
                    love: [
                        "오늘은 운명적인 만남이 있을 수 있는 날!",
                        "연인과 깊은 대화를 나누기 좋은 때입니다.",
                        "솔로라면 적극적으로 어필해보세요.",
                        "관계에 변화가 필요한 시기입니다."
                    ],
                    money: [
                        "예상치 못한 수입이 생길 수 있습니다.",
                        "절약이 필요한 날입니다.",
                        "투자 기회를 잘 살펴보세요.",
                        "로또 한 장 어떠세요?"
                    ],
                    work: [
                        "상사에게 인정받을 일이 생깁니다.",
                        "동료와의 협업이 중요한 날입니다.",
                        "새로운 프로젝트가 시작될 수 있습니다.",
                        "실수에 주의하세요."
                    ]
                };
                
                return {
                    overall: 60 + (seed % 40), // 60~100점
                    love: fortunes.love[seed % 4],
                    money: fortunes.money[seed % 4],
                    work: fortunes.work[seed % 4],
                    luckyColor: ['빨강', '파랑', '노랑', '초록'][seed % 4],
                    luckyNumber: (seed % 9) + 1
                };
            }
        `,
        
        monetization: "운세 보기 전 전면 광고 필수 시청"
    },
    
    // ============ 4. MBTI 통계 & 랭킹 ============
    statistics: {
        description: "실시간 MBTI 분포 & 희귀도 랭킹",
        
        ui: `
            <div class="statistics-section">
                <h3>📊 MBTI 통계</h3>
                
                <div class="rarity-badge">
                    <span class="rarity-label">당신의 MBTI 희귀도</span>
                    <span class="rarity-rank">상위 2.1%</span>
                </div>
                
                <div class="mbti-ranking">
                    <h4>가장 많은 MBTI TOP 5</h4>
                    <ol>
                        <li>ISFJ - 수호자 (13.8%)</li>
                        <li>ESFJ - 집정관 (12.0%)</li>
                        <li>ISTJ - 물류전문가 (11.6%)</li>
                        <li>ISFP - 모험가 (8.8%)</li>
                        <li>ESTJ - 경영자 (8.7%)</li>
                    </ol>
                </div>
                
                <div class="mbti-rare">
                    <h4>가장 희귀한 MBTI TOP 5</h4>
                    <ol>
                        <li>INFJ - 옹호자 (1.5%)</li>
                        <li>ENTJ - 지휘관 (1.8%)</li>
                        <li>INTJ - 전략가 (2.1%)</li>
                        <li>ENFJ - 선도자 (2.5%)</li>
                        <li>ENTP - 토론가 (3.2%)</li>
                    </ol>
                </div>
            </div>
        `,
        
        shareableImage: "통계 이미지 생성 → SNS 공유 유도"
    },
    
    // ============ 5. 미니 게임 (체류시간 폭발) ============
    miniGames: {
        description: "MBTI 관련 미니 게임",
        
        games: {
            // 게임 1: MBTI 맞추기 퀴즈
            guessTheMBTI: `
                <div class="mini-game">
                    <h3>🎮 MBTI 맞추기 게임</h3>
                    <p>유명인의 MBTI를 맞춰보세요!</p>
                    
                    <div class="celebrity-card">
                        <img src="elon-musk.jpg" alt="일론 머스크">
                        <p>일론 머스크의 MBTI는?</p>
                        <div class="options">
                            <button>INTJ</button>
                            <button>ENTP</button>
                            <button>ENTJ</button>
                            <button>INTP</button>
                        </div>
                    </div>
                    
                    <div class="score">점수: 0/10</div>
                </div>
            `,
            
            // 게임 2: MBTI 빙고
            mbtiBingo: `
                <div class="bingo-game">
                    <h3>MBTI 빙고</h3>
                    <p>당신의 MBTI 특징에 해당하는 것을 선택하세요</p>
                    <div class="bingo-board">
                        <!-- 5x5 빙고판 -->
                    </div>
                </div>
            `
        },
        
        monetization: "게임 시작/종료 시 광고, 리워드 광고로 힌트"
    },
    
    // ============ 6. 프리미엄 콘텐츠 (Unlock) ============
    premiumContent: {
        description: "광고 시청으로 잠금 해제",
        
        contents: [
            {
                title: "나의 숨겨진 어두운 면",
                locked: true,
                unlockMethod: "30초 광고 시청"
            },
            {
                title: "MBTI별 연봉 순위",
                locked: true,
                unlockMethod: "광고 시청"
            },
            {
                title: "나와 찰떡인 연예인",
                locked: true,
                unlockMethod: "광고 시청"
            },
            {
                title: "전생의 MBTI",
                locked: true,
                unlockMethod: "광고 시청"
            }
        ],
        
        implementation: `
            function unlockContent(contentId) {
                // 보상형 광고 표시
                showRewardedAd(() => {
                    // 콘텐츠 잠금 해제
                    document.getElementById(contentId).classList.remove('locked');
                    
                    // 로컬 스토리지 저장
                    localStorage.setItem('unlocked_' + contentId, 'true');
                    
                    // Analytics
                    gtag('event', 'unlock_content', {
                        content_id: contentId
                    });
                });
            }
        `
    },
    
    // ============ 7. 팔로우 시스템 ============
    followSystem: {
        description: "특정 MBTI 팔로우 → 푸시 알림",
        
        implementation: `
            <div class="follow-section">
                <h3>관심 MBTI 팔로우</h3>
                <p>좋아하는 사람의 MBTI를 팔로우하고 소식을 받아보세요</p>
                
                <div class="follow-grid">
                    <button class="follow-btn" data-mbti="ENFP">
                        ENFP 팔로우 ❤️
                    </button>
                    <!-- 16개 타입 -->
                </div>
                
                <div class="push-notification">
                    <input type="checkbox" id="pushAllow">
                    <label>매일 오전 9시 운세 알림 받기</label>
                </div>
            </div>
        `,
        
        benefits: [
            "재방문율 극대화",
            "푸시 알림으로 트래픽 확보",
            "타겟팅 광고 가능"
        ]
    },
    
    // ============ 8. 실시간 채팅 ============
    liveChat: {
        description: "같은 MBTI끼리 익명 채팅",
        
        implementation: `
            <!-- Firebase 실시간 채팅 -->
            <div class="chat-room">
                <h3>INTJ 채팅방 (현재 23명)</h3>
                
                <div class="chat-messages">
                    <div class="message">
                        <span class="user">익명1:</span>
                        <span>역시 INTJ는 혼자가 최고...</span>
                    </div>
                </div>
                
                <input type="text" placeholder="메시지 입력...">
                <button>전송</button>
            </div>
        `,
        
        monetization: "채팅방 입장 시 광고, 이모티콘 구매"
    },
    
    // ============ 9. AI 상담 (ChatGPT API) ============
    aiCounseling: {
        description: "MBTI 기반 AI 상담사",
        
        implementation: `
            async function askAI(question) {
                // 광고 먼저
                await showInterstitialAd();
                
                const response = await fetch('/api/ai-counsel', {
                    method: 'POST',
                    body: JSON.stringify({
                        mbti: currentMBTI,
                        question: question
                    })
                });
                
                const answer = await response.json();
                displayAIResponse(answer);
            }
        `,
        
        examples: [
            "INTJ인 제가 ENFP와 잘 맞을까요?",
            "직장에서 인간관계가 힘들어요",
            "제 MBTI에 맞는 공부법은?"
        ]
    },
    
    // ============ 10. 월간 리포트 (이메일 수집) ============
    monthlyReport: {
        description: "월간 MBTI 리포트 이메일 발송",
        
        implementation: `
            <div class="email-collect">
                <h3>📧 월간 MBTI 리포트 받기</h3>
                <p>매월 당신의 MBTI 운세와 조언을 이메일로!</p>
                
                <form onsubmit="subscribeEmail(event)">
                    <input type="email" placeholder="이메일 주소" required>
                    <button type="submit">무료 구독</button>
                </form>
                
                <p class="privacy">* 스팸 없음, 언제든 구독 취소 가능</p>
            </div>
        `,
        
        benefits: [
            "이메일 리스트 구축",
            "정기적 트래픽 확보",
            "이메일 마케팅 가능"
        ]
    }
};

// ============ 실제 구현 코드 ============

// 1. 리워드 광고 시스템
function showRewardedAd(callback) {
    const modal = document.createElement('div');
    modal.className = 'rewarded-ad-modal';
    modal.innerHTML = `
        <div class="ad-content">
            <h3>광고를 보고 콘텐츠를 잠금 해제하세요!</h3>
            <div class="ad-timer">30초 남음</div>
            
            <!-- 비디오 광고 또는 디스플레이 광고 -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-format="auto"></ins>
            
            <button class="skip-btn" disabled>
                잠금 해제하기
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    let timer = 30;
    const interval = setInterval(() => {
        timer--;
        modal.querySelector('.ad-timer').textContent = timer + '초 남음';
        
        if (timer === 0) {
            clearInterval(interval);
            modal.querySelector('.skip-btn').disabled = false;
            modal.querySelector('.skip-btn').onclick = () => {
                modal.remove();
                callback();
            };
        }
    }, 1000);
}

// 2. 궁합 계산 알고리즘
function calculateCompatibility(type1, type2) {
    const compatibilityMatrix = {
        'INTJ': {
            'ENFP': 95, 'ENTP': 88, 'INFJ': 82, 'INTJ': 75,
            'INTP': 73, 'ENTJ': 71, 'ENFJ': 68, 'INFP': 65,
            'ISTJ': 62, 'ISFJ': 58, 'ESTP': 55, 'ESFP': 52,
            'ISTP': 50, 'ISFP': 48, 'ESTJ': 45, 'ESFJ': 40
        },
        // ... 16개 타입 모두
    };
    
    return compatibilityMatrix[type1]?.[type2] || 50;
}

// 3. 실시간 채팅 (Firebase)
function initializeChat(mbtiType) {
    const chatRef = firebase.database().ref('chats/' + mbtiType);
    
    // 메시지 수신
    chatRef.on('child_added', (snapshot) => {
        const message = snapshot.val();
        displayMessage(message);
    });
    
    // 메시지 전송
    function sendMessage(text) {
        chatRef.push({
            text: text,
            timestamp: Date.now(),
            user: 'Anonymous' + Math.floor(Math.random() * 1000)
        });
    }
}

// 4. 체류시간 추적
let startTime = Date.now();
window.addEventListener('beforeunload', () => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    
    // Analytics
    gtag('event', 'engagement_time', {
        value: duration,
        mbti_type: localStorage.getItem('lastMBTI')
    });
    
    // 서버로 전송
    navigator.sendBeacon('/api/track', JSON.stringify({
        duration: duration,
        pages_viewed: pageViews,
        ads_viewed: adsViewed
    }));
});

// 5. 소셜 공유 이미지 생성
function generateShareImage(mbtiType) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    
    // 그라데이션 배경
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);
    
    // MBTI 텍스트
    ctx.fillStyle = 'white';
    ctx.font = 'bold 120px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(mbtiType, 600, 300);
    
    // 설명
    ctx.font = '40px Arial';
    ctx.fillText(mbtiData[mbtiType].title, 600, 400);
    
    // 이미지 다운로드
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `my-mbti-${mbtiType}.png`;
        a.click();
    });
}

// Export
if (typeof module !== 'undefined') {
    module.exports = AdditionalFeatures;
}