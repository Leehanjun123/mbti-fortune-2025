// Viral & Growth Module - 바이럴 성장 엔진
class ViralGrowthEngine {
    constructor() {
        this.viralCoefficient = 0;
        this.shareChannels = ['kakao', 'instagram', 'twitter', 'facebook', 'link'];
        this.referralProgram = {
            enabled: true,
            rewards: [],
            referrals: new Map()
        };
        this.gamification = {
            points: 0,
            level: 1,
            badges: [],
            leaderboard: []
        };
        this.socialProof = {
            userCount: 127892,
            recentActivity: []
        };
        
        this.init();
    }
    
    init() {
        this.setupSharingOptimization();
        this.setupReferralSystem();
        this.setupGamification();
        this.setupSocialProof();
        this.setupViralLoops();
        this.trackViralMetrics();
    }
    
    // 공유 최적화
    setupSharingOptimization() {
        // 공유 템플릿 A/B 테스트
        this.shareTemplates = {
            kakao: [
                {
                    title: '헐 나 {mbti}인데 2025년 {keyword}래!',
                    description: '너도 해봐 진짜 소름돋게 맞음ㅋㅋ',
                    imageUrl: '/share/result-1.png',
                    button: '나도 운세보기'
                },
                {
                    title: '2025년 내 운세 {score}점이래 ㄷㄷ',
                    description: '친구들 평균 65점인데 나만 높음ㅋㅋ',
                    imageUrl: '/share/result-2.png',
                    button: '내 점수 확인하기'
                },
                {
                    title: '{name}의 2025년은 {fortune}',
                    description: '3분이면 확인 가능! 무료야',
                    imageUrl: '/share/result-3.png',
                    button: '지금 확인하기'
                }
            ],
            instagram: {
                storyTemplate: '/templates/instagram-story.html',
                feedTemplate: '/templates/instagram-feed.html',
                hashtags: ['#2025운세', '#MBTI운세', '#신년운세', '#운세테스트', '#성격테스트']
            }
        };
        
        // 공유 인센티브
        this.shareIncentives = {
            immediate: '공유하면 숨겨진 운세 1개 더!',
            points: 100,
            unlock: 'premium_feature_trial'
        };
        
        this.optimizeShareButtons();
        // this.createShareableContent(); // 함수 없음 주석처리
    }
    
    // 공유 버튼 최적화
    optimizeShareButtons() {
        // 모바일 네이티브 공유 API 활용
        if (navigator.share) {
            document.querySelectorAll('.share-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const channel = btn.dataset.channel;
                    
                    try {
                        await this.nativeShare(channel);
                    } catch (error) {
                        this.fallbackShare(channel);
                    }
                });
            });
        }
        
        // 공유 후 콜백
        this.setupShareCallbacks();
    }
    
    // 네이티브 공유
    async nativeShare(channel) {
        const shareData = this.getShareData(channel);
        
        if (navigator.share && this.canShare(shareData)) {
            await navigator.share(shareData);
            this.onShareSuccess(channel);
        } else {
            this.fallbackShare(channel);
        }
    }
    
    // 공유 데이터 생성
    getShareData(channel) {
        const mbti = localStorage.getItem('mbti_type') || 'MBTI';
        const name = localStorage.getItem('user_name') || '친구';
        const score = Math.floor(Math.random() * 30) + 70;
        
        const template = this.shareTemplates.kakao[0];
        const title = template.title
            .replace('{mbti}', mbti)
            .replace('{name}', name)
            .replace('{score}', score)
            .replace('{keyword}', '대박');
        
        return {
            title: title,
            text: template.description,
            url: `${window.location.origin}?ref=${this.generateReferralCode()}&ch=${channel}`
        };
    }
    
    // 공유 가능 여부 체크
    canShare(data) {
        if (!navigator.canShare) return true;
        return navigator.canShare(data);
    }
    
    // 폴백 공유 (웹 기반)
    fallbackShare(channel) {
        const shareData = this.getShareData(channel);
        const url = encodeURIComponent(shareData.url);
        const text = encodeURIComponent(shareData.text);
        
        const shareUrls = {
            kakao: () => this.shareKakao(shareData),
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
            instagram: () => this.shareInstagram(shareData),
            link: () => this.copyLink(shareData.url)
        };
        
        if (typeof shareUrls[channel] === 'function') {
            shareUrls[channel]();
        } else {
            window.open(shareUrls[channel], '_blank', 'width=600,height=400');
        }
        
        this.onShareSuccess(channel);
    }
    
    // 카카오톡 공유
    shareKakao(data) {
        if (!window.Kakao || !window.Kakao.isInitialized()) {
            console.error('Kakao SDK not initialized');
            return;
        }
        
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: data.title,
                description: data.text,
                imageUrl: 'https://mbti2025.vercel.app/og-image.png',
                link: {
                    mobileWebUrl: data.url,
                    webUrl: data.url
                }
            },
            buttons: [
                {
                    title: '운세 확인하기',
                    link: {
                        mobileWebUrl: data.url,
                        webUrl: data.url
                    }
                }
            ],
            installTalk: true
        });
    }
    
    // 인스타그램 공유 (스토리/피드)
    shareInstagram(data) {
        // 이미지 생성
        this.generateShareImage(data).then(imageUrl => {
            // 인스타그램 스토리 공유 URL Scheme
            const storyUrl = `instagram-stories://share?backgroundImage=${imageUrl}`;
            
            // 모바일에서 인스타그램 앱 열기 시도
            window.location.href = storyUrl;
            
            // 실패시 웹 인스타그램으로
            setTimeout(() => {
                window.open('https://instagram.com', '_blank');
            }, 2000);
        });
    }
    
    // 공유용 이미지 생성
    async generateShareImage(data) {
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d');
        
        // 배경 그라디언트
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 텍스트 스타일
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        
        // 제목
        ctx.font = 'bold 120px Pretendard';
        ctx.fillText('2025', canvas.width/2, 400);
        
        // MBTI
        ctx.font = 'bold 80px Pretendard';
        ctx.fillText(data.title, canvas.width/2, 600);
        
        // 설명
        ctx.font = '48px Pretendard';
        ctx.fillText(data.text, canvas.width/2, 800);
        
        // QR 코드 또는 링크
        ctx.font = '36px Pretendard';
        ctx.fillText('mbti2025.vercel.app', canvas.width/2, 1700);
        
        return canvas.toDataURL('image/png');
    }
    
    // 링크 복사
    copyLink(url) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                this.showToast('링크가 복사되었습니다! 📋');
            });
        } else {
            const input = document.createElement('input');
            input.value = url;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            this.showToast('링크가 복사되었습니다! 📋');
        }
    }
    
    // 공유 성공 처리
    onShareSuccess(channel) {
        // 포인트 지급
        this.gamification.points += this.shareIncentives.points;
        
        // 보상 잠금 해제
        this.unlockReward(this.shareIncentives.unlock);
        
        // 분석 추적
        if (window.analytics) {
            window.analytics.track('share_complete', {
                channel: channel,
                reward: this.shareIncentives.immediate
            });
        }
        
        // 바이럴 계수 업데이트
        this.updateViralCoefficient();
        
        // 성공 메시지
        this.showShareReward();
    }
    
    // 추천인 시스템
    setupReferralSystem() {
        // 추천 코드 체크
        this.checkReferralCode();
        
        // 추천 보상 설정
        this.referralProgram.rewards = [
            { referrals: 1, reward: '프리미엄 3일 무료' },
            { referrals: 3, reward: '프리미엄 1주일 무료' },
            { referrals: 5, reward: '프리미엄 1개월 무료' },
            { referrals: 10, reward: '평생 프리미엄 50% 할인' }
        ];
        
        // 추천인 대시보드
        this.createReferralDashboard();
    }
    
    // 추천 코드 체크
    checkReferralCode() {
        const urlParams = new URLSearchParams(window.location.search);
        const refCode = urlParams.get('ref');
        const channel = urlParams.get('ch');
        
        if (refCode) {
            // 추천인 기록
            localStorage.setItem('referrer_code', refCode);
            localStorage.setItem('referral_channel', channel);
            
            // 서버에 추천 기록
            this.recordReferral(refCode, channel);
            
            // 추천인에게 알림
            this.notifyReferrer(refCode);
            
            // 신규 사용자에게 보너스
            this.giveNewUserBonus();
        }
    }
    
    // 추천 기록
    recordReferral(refCode, channel) {
        const referral = {
            code: refCode,
            channel: channel,
            timestamp: Date.now(),
            converted: false
        };
        
        // 로컬 저장
        const referrals = JSON.parse(localStorage.getItem('referrals') || '[]');
        referrals.push(referral);
        localStorage.setItem('referrals', JSON.stringify(referrals));
        
        // 서버 전송 (API 구현 필요)
        if (window.analytics) {
            window.analytics.track('referral_recorded', referral);
        }
    }
    
    // 추천인 알림
    notifyReferrer(refCode) {
        // 실시간 알림 (웹소켓 또는 푸시)
        console.log(`Referrer ${refCode} got a new referral!`);
    }
    
    // 신규 사용자 보너스
    giveNewUserBonus() {
        const bonus = {
            type: 'referral_bonus',
            value: '첫 결과 보기 무료',
            expires: Date.now() + 86400000 // 24시간
        };
        
        localStorage.setItem('new_user_bonus', JSON.stringify(bonus));
        
        // 환영 메시지
        this.showToast('🎁 친구 추천으로 오셨네요! 특별 보너스를 드립니다!');
    }
    
    // 추천 코드 생성
    generateReferralCode() {
        const userId = localStorage.getItem('user_id') || this.generateUserId();
        return btoa(userId).substring(0, 8).toUpperCase();
    }
    
    // 사용자 ID 생성
    generateUserId() {
        const id = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2);
        localStorage.setItem('user_id', id);
        return id;
    }
    
    // 추천인 대시보드
    createReferralDashboard() {
        const dashboard = document.createElement('div');
        dashboard.className = 'referral-dashboard';
        dashboard.innerHTML = `
            <div class="referral-header">
                <h3>🎯 친구 초대하고 보상 받기</h3>
                <div class="referral-code">
                    내 추천 코드: <span>${this.generateReferralCode()}</span>
                    <button onclick="viral.copyReferralLink()">복사</button>
                </div>
            </div>
            
            <div class="referral-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <div class="progress-text">0 / 3 친구 초대</div>
            </div>
            
            <div class="referral-rewards">
                ${this.referralProgram.rewards.map(r => `
                    <div class="reward-item ${r.unlocked ? 'unlocked' : ''}">
                        <span class="reward-condition">${r.referrals}명 초대시</span>
                        <span class="reward-value">${r.reward}</span>
                    </div>
                `).join('')}
            </div>
            
            <button class="invite-btn" onclick="viral.showInviteModal()">
                친구 초대하기
            </button>
        `;
        
        // 결과 페이지에 추가
        const resultScreen = document.getElementById('resultScreen');
        if (resultScreen) {
            resultScreen.appendChild(dashboard);
        }
    }
    
    // 추천 링크 복사
    copyReferralLink() {
        const code = this.generateReferralCode();
        const link = `${window.location.origin}?ref=${code}`;
        this.copyLink(link);
    }
    
    // 게임화 시스템
    setupGamification() {
        // 포인트 시스템
        this.pointSystem = {
            daily_visit: 10,
            complete_test: 50,
            share: 100,
            referral: 200,
            premium_purchase: 500
        };
        
        // 레벨 시스템
        this.levelSystem = [
            { level: 1, points: 0, title: '운세 초보자' },
            { level: 2, points: 100, title: '운세 입문자' },
            { level: 3, points: 300, title: '운세 전문가' },
            { level: 4, points: 600, title: '운세 마스터' },
            { level: 5, points: 1000, title: '운세 그랜드마스터' }
        ];
        
        // 배지 시스템
        this.badges = [
            { id: 'early_bird', name: '얼리버드', condition: '오전 6시 이전 접속' },
            { id: 'night_owl', name: '올빼미', condition: '자정 이후 접속' },
            { id: 'social_butterfly', name: '소셜 나비', condition: '5명 이상 추천' },
            { id: 'loyal_user', name: '단골손님', condition: '7일 연속 방문' },
            { id: 'explorer', name: '탐험가', condition: '모든 MBTI 결과 확인' }
        ];
        
        this.initializeGameElements();
    }
    
    // 게임 요소 초기화
    initializeGameElements() {
        // 포인트 로드
        this.gamification.points = parseInt(localStorage.getItem('user_points') || 0);
        
        // 레벨 계산
        this.updateLevel();
        
        // 일일 보상
        this.checkDailyReward();
        
        // 연속 방문 체크
        this.checkStreak();
        
        // UI 업데이트
        this.updateGameUI();
    }
    
    // 포인트 획득
    earnPoints(action, amount = null) {
        const points = amount || this.pointSystem[action] || 0;
        this.gamification.points += points;
        
        // 저장
        localStorage.setItem('user_points', this.gamification.points);
        
        // 레벨 업 체크
        const oldLevel = this.gamification.level;
        this.updateLevel();
        
        if (this.gamification.level > oldLevel) {
            this.onLevelUp();
        }
        
        // 애니메이션
        this.showPointsAnimation(points);
        
        // 분석
        if (window.analytics) {
            window.analytics.track('points_earned', {
                action: action,
                points: points,
                total: this.gamification.points
            });
        }
    }
    
    // 레벨 업데이트
    updateLevel() {
        const points = this.gamification.points;
        
        for (let i = this.levelSystem.length - 1; i >= 0; i--) {
            if (points >= this.levelSystem[i].points) {
                this.gamification.level = this.levelSystem[i].level;
                break;
            }
        }
    }
    
    // 레벨업 처리
    onLevelUp() {
        const level = this.levelSystem[this.gamification.level - 1];
        
        // 축하 모달
        this.showLevelUpModal(level);
        
        // 보상 지급
        this.giveLevelReward(level);
        
        // 배지 체크
        this.checkBadges();
    }
    
    // 일일 보상
    checkDailyReward() {
        const lastClaim = localStorage.getItem('last_daily_reward');
        const today = new Date().toDateString();
        
        if (lastClaim !== today) {
            this.showDailyReward();
        }
    }
    
    // 연속 방문 체크
    checkStreak() {
        const lastVisit = localStorage.getItem('last_visit_date');
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        let streak = parseInt(localStorage.getItem('visit_streak') || 0);
        
        if (lastVisit === yesterday) {
            streak++;
        } else if (lastVisit !== today) {
            streak = 1;
        }
        
        localStorage.setItem('visit_streak', streak);
        localStorage.setItem('last_visit_date', today);
        
        // 연속 방문 보상
        if (streak > 0 && streak % 7 === 0) {
            this.giveStreakReward(streak);
        }
    }
    
    // 소셜 증명
    setupSocialProof() {
        // 실시간 활동 피드
        this.startActivityFeed();
        
        // 사용자 카운터
        this.animateUserCount();
        
        // 인기 MBTI 순위
        this.showPopularMBTI();
        
        // 실시간 알림
        this.showRealtimeNotifications();
    }
    
    // 실시간 활동 피드
    startActivityFeed() {
        const activities = [
            '{name}님이 방금 운세를 확인했어요',
            '{name}님이 친구를 초대했어요',
            '{name}님이 프리미엄을 구매했어요',
            '{city}에서 {count}명이 테스트 중',
            '오늘 {total}명이 운세를 확인했어요'
        ];
        
        const names = ['지현', '민수', '서연', '준호', '하은', '태양', '수지', '현우'];
        const cities = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '수원'];
        
        setInterval(() => {
            const activity = activities[Math.floor(Math.random() * activities.length)];
            const name = names[Math.floor(Math.random() * names.length)];
            const city = cities[Math.floor(Math.random() * cities.length)];
            const count = Math.floor(Math.random() * 50) + 10;
            const total = this.socialProof.userCount + Math.floor(Math.random() * 100);
            
            const message = activity
                .replace('{name}', name)
                .replace('{city}', city)
                .replace('{count}', count)
                .replace('{total}', total.toLocaleString());
            
            this.showActivityNotification(message);
        }, 10000); // 10초마다
    }
    
    // 활동 알림 표시
    showActivityNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'activity-notification';
        notification.innerHTML = `
            <span class="activity-icon">✨</span>
            <span class="activity-message">${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // 사용자 수 애니메이션
    animateUserCount() {
        const countElement = document.getElementById('userCount');
        if (!countElement) return;
        
        // 실시간 증가 효과
        setInterval(() => {
            this.socialProof.userCount += Math.floor(Math.random() * 3) + 1;
            countElement.textContent = this.socialProof.userCount.toLocaleString();
            
            // 증가 애니메이션
            countElement.classList.add('count-up');
            setTimeout(() => countElement.classList.remove('count-up'), 300);
        }, 5000);
    }
    
    // 바이럴 루프 설정
    setupViralLoops() {
        // K-Factor 계산 (바이럴 계수)
        this.calculateKFactor();
        
        // 바이럴 훅 설정
        this.viralHooks = [
            {
                trigger: 'result_view',
                action: 'prompt_share',
                message: '친구들도 궁금해할 것 같은데?'
            },
            {
                trigger: 'premium_unlock',
                action: 'invite_friends',
                message: '친구 3명 초대하면 프리미엄 무료!'
            },
            {
                trigger: 'badge_earned',
                action: 'share_achievement',
                message: '새로운 배지를 획득했어요! 자랑하기'
            }
        ];
        
        this.activateViralHooks();
    }
    
    // K-Factor 계산
    calculateKFactor() {
        const invites = parseInt(localStorage.getItem('total_invites') || 0);
        const conversions = parseInt(localStorage.getItem('total_conversions') || 0);
        const users = parseInt(localStorage.getItem('total_users') || 1);
        
        const inviteRate = invites / users;
        const conversionRate = conversions / invites || 0;
        
        this.viralCoefficient = inviteRate * conversionRate;
        
        console.log(`Viral K-Factor: ${this.viralCoefficient.toFixed(2)}`);
        
        // K > 1이면 바이럴 성장
        if (this.viralCoefficient > 1) {
            console.log('🚀 Viral growth achieved!');
        }
    }
    
    // 바이럴 메트릭 추적
    trackViralMetrics() {
        // 공유율
        const shareRate = this.calculateShareRate();
        
        // 전환율
        const conversionRate = this.calculateConversionRate();
        
        // 리텐션
        const retention = this.calculateRetention();
        
        // 대시보드 업데이트
        if (window.analytics) {
            window.analytics.track('viral_metrics', {
                k_factor: this.viralCoefficient,
                share_rate: shareRate,
                conversion_rate: conversionRate,
                retention: retention
            });
        }
    }
    
    // 헬퍼 함수들
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    showShareReward() {
        const reward = document.createElement('div');
        reward.className = 'share-reward-modal';
        reward.innerHTML = `
            <div class="reward-content">
                <div class="reward-icon">🎁</div>
                <h3>공유 완료!</h3>
                <p>${this.shareIncentives.immediate}</p>
                <div class="points-earned">+${this.shareIncentives.points} 포인트</div>
                <button onclick="this.parentElement.parentElement.remove()">확인</button>
            </div>
        `;
        document.body.appendChild(reward);
    }
    
    showPointsAnimation(points) {
        const animation = document.createElement('div');
        animation.className = 'points-animation';
        animation.textContent = `+${points}`;
        
        const button = event.target;
        const rect = button.getBoundingClientRect();
        animation.style.left = rect.left + rect.width/2 + 'px';
        animation.style.top = rect.top + 'px';
        
        document.body.appendChild(animation);
        
        setTimeout(() => animation.remove(), 2000);
    }
    
    showLevelUpModal(level) {
        const modal = document.createElement('div');
        modal.className = 'levelup-modal';
        modal.innerHTML = `
            <div class="levelup-content">
                <div class="levelup-animation">🎉</div>
                <h2>레벨 업!</h2>
                <div class="level-badge">Lv.${level.level}</div>
                <div class="level-title">${level.title}</div>
                <button onclick="this.parentElement.parentElement.remove()">확인</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    calculateShareRate() {
        const views = parseInt(localStorage.getItem('total_views') || 1);
        const shares = parseInt(localStorage.getItem('total_shares') || 0);
        return (shares / views * 100).toFixed(1);
    }
    
    calculateConversionRate() {
        const visits = parseInt(localStorage.getItem('total_visits') || 1);
        const conversions = parseInt(localStorage.getItem('total_conversions') || 0);
        return (conversions / visits * 100).toFixed(1);
    }
    
    calculateRetention() {
        const d1 = parseInt(localStorage.getItem('retention_d1') || 0);
        const d7 = parseInt(localStorage.getItem('retention_d7') || 0);
        const d30 = parseInt(localStorage.getItem('retention_d30') || 0);
        
        return { d1, d7, d30 };
    }
    
    unlockReward(rewardId) {
        console.log('Reward unlocked:', rewardId);
        // 보상 잠금 해제 로직
    }
    
    updateViralCoefficient() {
        // 바이럴 계수 재계산
        this.calculateKFactor();
    }
    
    setupShareCallbacks() {
        // 공유 완료 콜백 설정
        window.addEventListener('message', (e) => {
            if (e.data.type === 'share_complete') {
                this.onShareSuccess(e.data.channel);
            }
        });
    }
    
    activateViralHooks() {
        // 바이럴 훅 활성화
        this.viralHooks.forEach(hook => {
            document.addEventListener(hook.trigger, () => {
                setTimeout(() => {
                    this.showViralPrompt(hook);
                }, 2000);
            });
        });
    }
    
    showViralPrompt(hook) {
        const prompt = document.createElement('div');
        prompt.className = 'viral-prompt';
        prompt.innerHTML = `
            <p>${hook.message}</p>
            <button onclick="viral.${hook.action}()">확인</button>
        `;
        document.body.appendChild(prompt);
        
        setTimeout(() => prompt.remove(), 5000);
    }
    
    showInviteModal() {
        // 초대 모달 표시
        console.log('Showing invite modal');
    }
    
    showDailyReward() {
        const reward = document.createElement('div');
        reward.className = 'daily-reward-modal';
        reward.innerHTML = `
            <div class="reward-content">
                <h3>🎁 일일 보상</h3>
                <div class="reward-item">+${this.pointSystem.daily_visit} 포인트</div>
                <button onclick="viral.claimDailyReward()">받기</button>
            </div>
        `;
        document.body.appendChild(reward);
    }
    
    claimDailyReward() {
        this.earnPoints('daily_visit');
        localStorage.setItem('last_daily_reward', new Date().toDateString());
        document.querySelector('.daily-reward-modal')?.remove();
    }
    
    giveStreakReward(streak) {
        const bonus = streak * 10;
        this.earnPoints('streak_bonus', bonus);
        this.showToast(`🔥 ${streak}일 연속 방문! +${bonus} 포인트`);
    }
    
    giveLevelReward(level) {
        // 레벨업 보상 지급
        const reward = level.level * 50;
        this.earnPoints('level_reward', reward);
    }
    
    checkBadges() {
        // 배지 획득 체크
        this.badges.forEach(badge => {
            if (!this.gamification.badges.includes(badge.id)) {
                // 조건 체크 로직
                console.log('Checking badge:', badge.name);
            }
        });
    }
    
    updateGameUI() {
        // 게임 UI 업데이트
        const levelDisplay = document.getElementById('user-level');
        const pointsDisplay = document.getElementById('user-points');
        
        if (levelDisplay) {
            levelDisplay.textContent = `Lv.${this.gamification.level}`;
        }
        
        if (pointsDisplay) {
            pointsDisplay.textContent = this.gamification.points.toLocaleString();
        }
    }
    
    showPopularMBTI() {
        // 인기 MBTI 순위 표시
        const rankings = [
            { mbti: 'INFP', count: 2341, percentage: 18.5 },
            { mbti: 'ENFP', count: 1987, percentage: 15.7 },
            { mbti: 'INFJ', count: 1654, percentage: 13.1 }
        ];
        
        const rankingElement = document.createElement('div');
        rankingElement.className = 'mbti-rankings';
        rankingElement.innerHTML = `
            <h4>🏆 인기 MBTI TOP 3</h4>
            ${rankings.map((r, i) => `
                <div class="ranking-item">
                    <span class="rank">${i+1}</span>
                    <span class="mbti">${r.mbti}</span>
                    <span class="percentage">${r.percentage}%</span>
                </div>
            `).join('')}
        `;
        
        // 적절한 위치에 추가
        const container = document.querySelector('.social-proof');
        if (container) {
            container.appendChild(rankingElement);
        }
    }
    
    showRealtimeNotifications() {
        // 실시간 알림 설정
        if ('Notification' in window && Notification.permission === 'granted') {
            // 알림 권한이 있으면 푸시 알림
            this.setupPushNotifications();
        }
    }
    
    setupPushNotifications() {
        // 푸시 알림 설정
        console.log('Push notifications setup');
    }
}

// 전역 인스턴스
const viral = new ViralGrowthEngine();
window.viral = viral;