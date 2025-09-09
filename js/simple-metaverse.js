// 간단하고 실용적인 MBTI 메타버스
class SimpleMBTIMetaverse {
    constructor() {
        this.userMBTI = null;
        this.currentRoom = null;
        this.visitHistory = [];
        this.friends = [];
        this.level = 1;
        this.coins = 100;
    }
    
    // 메타버스 시작
    start(container, mbtiType) {
        this.userMBTI = mbtiType;
        this.currentRoom = mbtiType;
        
        container.innerHTML = `
            <div class="metaverse-container">
                <!-- 상단 상태바 -->
                <div class="status-bar">
                    <div class="user-info">
                        <span class="avatar">${this.getAvatarEmoji(mbtiType)}</span>
                        <span class="username">${mbtiType} 유저</span>
                        <span class="level">Lv.${this.level}</span>
                        <span class="coins">💰 ${this.coins}</span>
                    </div>
                </div>
                
                <!-- 메인 화면 -->
                <div class="main-screen">
                    <div class="room-header">
                        <h2>${this.getRoomName(mbtiType)}</h2>
                        <p>${this.getRoomDescription(mbtiType)}</p>
                    </div>
                    
                    <!-- 현재 방 사람들 -->
                    <div class="room-users">
                        <h3>🏠 현재 방 사람들 (${this.getOnlineCount(mbtiType)}명)</h3>
                        <div class="users-grid" id="room-users">
                            ${this.generateRoomUsers(mbtiType)}
                        </div>
                    </div>
                    
                    <!-- 활동 옵션 -->
                    <div class="activities">
                        <h3>🎮 할 수 있는 활동</h3>
                        <div class="activity-buttons">
                            <button class="activity-btn" onclick="simpleMeta.doActivity('chat')">
                                💬 채팅하기
                            </button>
                            <button class="activity-btn" onclick="simpleMeta.doActivity('game')">
                                🎯 미니게임
                            </button>
                            <button class="activity-btn" onclick="simpleMeta.doActivity('shop')">
                                🛍️ 상점
                            </button>
                            <button class="activity-btn" onclick="simpleMeta.doActivity('customize')">
                                ✨ 꾸미기
                            </button>
                        </div>
                    </div>
                    
                    <!-- 다른 MBTI 방 방문 -->
                    <div class="other-rooms">
                        <h3>🗺️ 다른 MBTI 방 구경하기</h3>
                        <div class="rooms-grid">
                            ${this.generateRoomButtons()}
                        </div>
                    </div>
                </div>
                
                <!-- 하단 네비게이션 -->
                <div class="bottom-nav">
                    <button onclick="simpleMeta.goHome()" class="${this.currentRoom === mbtiType ? 'active' : ''}">
                        🏠 내 방
                    </button>
                    <button onclick="simpleMeta.showFriends()">
                        👥 친구 (${this.friends.length})
                    </button>
                    <button onclick="simpleMeta.showProfile()">
                        👤 프로필
                    </button>
                    <button onclick="simpleMeta.showShop()">
                        🛍️ 상점
                    </button>
                </div>
            </div>
            
            <style>
            .metaverse-container {
                height: 100%;
                display: flex;
                flex-direction: column;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                font-family: 'Arial', sans-serif;
            }
            
            .status-bar {
                background: rgba(0,0,0,0.2);
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .user-info {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .avatar {
                font-size: 24px;
                background: rgba(255,255,255,0.2);
                padding: 8px;
                border-radius: 50%;
            }
            
            .username {
                font-weight: bold;
                font-size: 16px;
            }
            
            .level, .coins {
                background: rgba(255,255,255,0.15);
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 14px;
            }
            
            .main-screen {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
            }
            
            .room-header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .room-header h2 {
                font-size: 28px;
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            
            .room-users, .activities, .other-rooms {
                background: rgba(255,255,255,0.1);
                padding: 20px;
                border-radius: 15px;
                margin-bottom: 20px;
                backdrop-filter: blur(10px);
            }
            
            .users-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }
            
            .user-card {
                background: rgba(255,255,255,0.1);
                padding: 15px;
                border-radius: 10px;
                text-align: center;
                cursor: pointer;
                transition: transform 0.2s;
            }
            
            .user-card:hover {
                transform: scale(1.05);
                background: rgba(255,255,255,0.2);
            }
            
            .activity-buttons {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }
            
            .activity-btn {
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                padding: 15px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.2s;
            }
            
            .activity-btn:hover {
                background: rgba(255,255,255,0.3);
                transform: translateY(-2px);
            }
            
            .rooms-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                gap: 10px;
                margin-top: 15px;
            }
            
            .room-btn {
                background: rgba(255,255,255,0.15);
                border: none;
                color: white;
                padding: 12px 8px;
                border-radius: 8px;
                cursor: pointer;
                text-align: center;
                font-size: 12px;
                transition: all 0.2s;
            }
            
            .room-btn:hover {
                background: rgba(255,255,255,0.25);
                transform: scale(1.05);
            }
            
            .room-btn.current {
                background: rgba(255,255,255,0.3);
                font-weight: bold;
            }
            
            .bottom-nav {
                display: flex;
                background: rgba(0,0,0,0.3);
                padding: 10px;
            }
            
            .bottom-nav button {
                flex: 1;
                background: none;
                border: none;
                color: white;
                padding: 12px 8px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.2s;
                border-radius: 5px;
                margin: 0 2px;
            }
            
            .bottom-nav button:hover {
                background: rgba(255,255,255,0.1);
            }
            
            .bottom-nav button.active {
                background: rgba(255,255,255,0.2);
                font-weight: bold;
            }
            
            @media (max-width: 768px) {
                .users-grid {
                    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                }
                
                .activity-buttons {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .rooms-grid {
                    grid-template-columns: repeat(4, 1fr);
                }
            }
            </style>
        `;
        
        return this;
    }
    
    // MBTI별 아바타 이모지
    getAvatarEmoji(mbti) {
        const avatars = {
            'INTJ': '🧙‍♂️', 'INTP': '🔬', 'ENTJ': '👑', 'ENTP': '💡',
            'INFJ': '🔮', 'INFP': '🎨', 'ENFJ': '⭐', 'ENFP': '🎪',
            'ISTJ': '🏛️', 'ISFJ': '🏡', 'ESTJ': '🏢', 'ESFJ': '🎭',
            'ISTP': '🔧', 'ISFP': '🌸', 'ESTP': '🏃‍♂️', 'ESFP': '🎤'
        };
        return avatars[mbti] || '🤔';
    }
    
    // MBTI별 방 이름
    getRoomName(mbti) {
        const names = {
            'INTJ': '🧙‍♂️ 전략가의 성채', 'INTP': '🔬 사색가의 실험실',
            'ENTJ': '👑 지휘관의 본부', 'ENTP': '💡 토론가의 광장',
            'INFJ': '🔮 예언자의 성소', 'INFP': '🎨 몽상가의 정원',
            'ENFJ': '⭐ 영웅의 광장', 'ENFP': '🎪 활동가의 축제',
            'ISTJ': '🏛️ 관리자의 요새', 'ISFJ': '🏡 수호자의 마을',
            'ESTJ': '🏢 경영자의 타워', 'ESFJ': '🎭 외교관의 살롱',
            'ISTP': '🔧 장인의 공방', 'ISFP': '🌸 예술가의 아틀리에',
            'ESTP': '🏃‍♂️ 모험가의 경기장', 'ESFP': '🎤 연예인의 무대'
        };
        return names[mbti] || 'MBTI 방';
    }
    
    // MBTI별 방 설명
    getRoomDescription(mbti) {
        const descriptions = {
            'INTJ': '완벽한 계획과 전략이 실현되는 곳',
            'INTP': '논리와 창의성이 만나는 실험의 공간',
            'ENTJ': '리더십과 야망이 꽃피는 본부',
            'ENTP': '아이디어와 토론이 불꽃 튀는 광장',
            'INFJ': '직감과 통찰이 깃든 신비로운 성소',
            'INFP': '꿈과 이상이 자라는 아름다운 정원',
            'ENFJ': '희망과 영감이 넘치는 영웅의 터전',
            'ENFP': '열정과 모험이 가득한 축제의 장',
            'ISTJ': '질서와 전통이 지켜지는 든든한 요새',
            'ISFJ': '따뜻함과 배려가 넘치는 평화로운 마을',
            'ESTJ': '효율과 성과가 만들어지는 비즈니스 타워',
            'ESFJ': '사교와 화합이 이루어지는 우아한 살롱',
            'ISTP': '기술과 실용이 조화를 이루는 장인의 터',
            'ISFP': '감성과 창작이 흐르는 예술가의 공간',
            'ESTP': '스릴과 액션이 가득한 모험가의 무대',
            'ESFP': '즐거움과 엔터테인먼트의 화려한 무대'
        };
        return descriptions[mbti] || 'MBTI의 특별한 공간';
    }
    
    // 온라인 사용자 수 (랜덤)
    getOnlineCount(mbti) {
        return Math.floor(Math.random() * 20) + 5;
    }
    
    // 방 사용자들 생성
    generateRoomUsers(mbti) {
        const users = [];
        const count = Math.min(8, this.getOnlineCount(mbti));
        
        for (let i = 0; i < count; i++) {
            users.push(`
                <div class="user-card" onclick="simpleMeta.talkToUser('${mbti}유저${i + 1}')">
                    <div style="font-size: 20px;">${this.getAvatarEmoji(mbti)}</div>
                    <div>${mbti}유저${i + 1}</div>
                    <div style="font-size: 12px; opacity: 0.8;">Lv.${Math.floor(Math.random() * 10) + 1}</div>
                </div>
            `);
        }
        
        return users.join('');
    }
    
    // 다른 방 버튼들 생성
    generateRoomButtons() {
        const mbtiTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
                          'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
        
        return mbtiTypes.map(type => {
            const isCurrentRoom = type === this.currentRoom;
            return `
                <button class="room-btn ${isCurrentRoom ? 'current' : ''}" 
                        onclick="simpleMeta.visitRoom('${type}')">
                    <div style="font-size: 16px;">${this.getAvatarEmoji(type)}</div>
                    <div>${type}</div>
                    <div style="font-size: 10px;">${this.getOnlineCount(type)}명</div>
                </button>
            `;
        }).join('');
    }
    
    // 방 방문
    visitRoom(mbti) {
        if (mbti === this.currentRoom) return;
        
        this.currentRoom = mbti;
        
        if (!this.visitHistory.includes(mbti)) {
            this.visitHistory.push(mbti);
            this.coins += 10;
            this.showMessage(`🎉 ${this.getRoomName(mbti)} 첫 방문! +10 코인`);
        }
        
        // 방 내용 업데이트
        document.querySelector('.room-header h2').textContent = this.getRoomName(mbti);
        document.querySelector('.room-header p').textContent = this.getRoomDescription(mbti);
        document.getElementById('room-users').innerHTML = this.generateRoomUsers(mbti);
        document.querySelector('.rooms-grid').innerHTML = this.generateRoomButtons();
        document.querySelector('.coins').textContent = `💰 ${this.coins}`;
        
        // 네비게이션 업데이트
        document.querySelectorAll('.bottom-nav button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        this.showMessage(`${this.getRoomName(mbti)}에 입장했습니다!`);
    }
    
    // 내 방으로 돌아가기
    goHome() {
        this.visitRoom(this.userMBTI);
    }
    
    // 활동 실행
    doActivity(activity) {
        const activities = {
            'chat': () => this.startChat(),
            'game': () => this.playMiniGame(),
            'shop': () => this.openShop(),
            'customize': () => this.customize()
        };
        
        if (activities[activity]) {
            activities[activity]();
        }
    }
    
    // 채팅 시작
    startChat() {
        this.coins += 5;
        this.showMessage('💬 채팅 참여! +5 코인 (실제 채팅 기능 곧 추가 예정)');
    }
    
    // 미니게임
    playMiniGame() {
        const games = ['🎯 다트 게임', '🎲 주사위 게임', '🃏 카드 게임', '🧩 퍼즐 게임'];
        const randomGame = games[Math.floor(Math.random() * games.length)];
        const win = Math.random() > 0.4;
        
        if (win) {
            const reward = Math.floor(Math.random() * 20) + 10;
            this.coins += reward;
            this.showMessage(`🎉 ${randomGame} 승리! +${reward} 코인`);
        } else {
            this.showMessage(`😅 ${randomGame} 패배! 다음에 다시 도전하세요.`);
        }
        
        this.updateUI();
    }
    
    // 상점 열기
    openShop() {
        this.showMessage('🛍️ 상점 기능 곧 추가 예정! 아바타 꾸미기, 방 데코 등');
    }
    
    // 꾸미기
    customize() {
        this.showMessage('✨ 꾸미기 기능 곧 추가 예정! 프로필, 방 꾸미기 등');
    }
    
    // 사용자와 대화
    talkToUser(username) {
        this.showMessage(`💬 ${username}님과 대화를 시도합니다!`);
        
        // 친구 추가 확률
        if (Math.random() > 0.7 && !this.friends.includes(username)) {
            this.friends.push(username);
            this.showMessage(`🎉 ${username}님이 친구가 되었습니다!`);
            this.updateUI();
        }
    }
    
    // 친구 목록 보기
    showFriends() {
        if (this.friends.length === 0) {
            this.showMessage('👥 아직 친구가 없습니다. 다른 사용자들과 대화해보세요!');
        } else {
            this.showMessage(`👥 친구 목록: ${this.friends.join(', ')}`);
        }
    }
    
    // 프로필 보기
    showProfile() {
        this.showMessage(`👤 프로필 | MBTI: ${this.userMBTI} | 레벨: ${this.level} | 코인: ${this.coins} | 방문한 방: ${this.visitHistory.length}/16`);
    }
    
    // 메시지 표시
    showMessage(message) {
        // 기존 메시지 제거
        const existingMsg = document.querySelector('.floating-message');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        // 새 메시지 생성
        const msgDiv = document.createElement('div');
        msgDiv.className = 'floating-message';
        msgDiv.innerHTML = message;
        msgDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 1000;
            font-size: 16px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: fadeInOut 3s ease-in-out forwards;
        `;
        
        // CSS 애니메이션 추가
        if (!document.querySelector('#floating-msg-style')) {
            const style = document.createElement('style');
            style.id = 'floating-msg-style';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(msgDiv);
        
        // 3초 후 제거
        setTimeout(() => {
            if (msgDiv.parentNode) {
                msgDiv.remove();
            }
        }, 3000);
    }
    
    // UI 업데이트
    updateUI() {
        const coinsEl = document.querySelector('.coins');
        const friendsBtn = document.querySelector('.bottom-nav button:nth-child(2)');
        
        if (coinsEl) coinsEl.textContent = `💰 ${this.coins}`;
        if (friendsBtn) friendsBtn.textContent = `👥 친구 (${this.friends.length})`;
    }
}

// 전역 인스턴스
let simpleMeta = null;