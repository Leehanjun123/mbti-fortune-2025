// 2D 심즈 스타일 MBTI 메타버스
class Sims2DMetaverse {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameState = 'playing';
        
        // 월드 설정
        this.world = {
            width: 1200,
            height: 800,
            tileSize: 40,
            camera: { x: 0, y: 0 }
        };
        
        // 플레이어
        this.player = {
            x: 600,
            y: 400,
            width: 30,
            height: 40,
            speed: 3,
            targetX: null,
            targetY: null,
            path: [],
            animation: 'idle',
            direction: 'down',
            frame: 0,
            mbti: null,
            energy: 100,
            happiness: 100,
            social: 50
        };
        
        // MBTI 건물들
        this.buildings = [
            // 16개 MBTI 집들
            { id: 'INTJ', x: 100, y: 100, width: 80, height: 60, color: '#8b5cf6', name: '전략가의 집', type: 'house' },
            { id: 'INTP', x: 300, y: 100, width: 80, height: 60, color: '#3b82f6', name: '사색가의 집', type: 'house' },
            { id: 'ENTJ', x: 500, y: 100, width: 80, height: 60, color: '#eab308', name: '지휘관의 집', type: 'house' },
            { id: 'ENTP', x: 700, y: 100, width: 80, height: 60, color: '#f97316', name: '토론가의 집', type: 'house' },
            
            { id: 'INFJ', x: 100, y: 250, width: 80, height: 60, color: '#a855f7', name: '예언자의 집', type: 'house' },
            { id: 'INFP', x: 300, y: 250, width: 80, height: 60, color: '#ec4899', name: '몽상가의 집', type: 'house' },
            { id: 'ENFJ', x: 500, y: 250, width: 80, height: 60, color: '#84cc16', name: '영웅의 집', type: 'house' },
            { id: 'ENFP', x: 700, y: 250, width: 80, height: 60, color: '#ef4444', name: '활동가의 집', type: 'house' },
            
            { id: 'ISTJ', x: 100, y: 400, width: 80, height: 60, color: '#6b7280', name: '관리자의 집', type: 'house' },
            { id: 'ISFJ', x: 300, y: 400, width: 80, height: 60, color: '#10b981', name: '수호자의 집', type: 'house' },
            { id: 'ESTJ', x: 500, y: 400, width: 80, height: 60, color: '#0ea5e9', name: '경영자의 집', type: 'house' },
            { id: 'ESFJ', x: 700, y: 400, width: 80, height: 60, color: '#f59e0b', name: '외교관의 집', type: 'house' },
            
            { id: 'ISTP', x: 100, y: 550, width: 80, height: 60, color: '#78716c', name: '장인의 집', type: 'house' },
            { id: 'ISFP', x: 300, y: 550, width: 80, height: 60, color: '#22c55e', name: '예술가의 집', type: 'house' },
            { id: 'ESTP', x: 500, y: 550, width: 80, height: 60, color: '#dc2626', name: '모험가의 집', type: 'house' },
            { id: 'ESFP', x: 700, y: 550, width: 80, height: 60, color: '#be185d', name: '연예인의 집', type: 'house' },
            
            // 공용 건물들
            { id: 'CAFE', x: 900, y: 200, width: 100, height: 80, color: '#8b4513', name: 'MBTI 카페', type: 'cafe' },
            { id: 'PARK', x: 900, y: 350, width: 100, height: 100, color: '#228b22', name: 'MBTI 공원', type: 'park' },
            { id: 'SHOP', x: 900, y: 500, width: 100, height: 80, color: '#ff69b4', name: 'MBTI 상점', type: 'shop' }
        ];
        
        // NPC들
        this.npcs = [];
        
        // 입력 처리
        this.keys = {};
        this.mousePos = { x: 0, y: 0 };
        this.isMouseDown = false;
        
        // 애니메이션
        this.lastTime = 0;
        this.animationSpeed = 200; // ms per frame
        
        // UI 상태
        this.showingDialog = false;
        this.currentDialog = null;
        this.selectedBuilding = null;
        
        this.initNPCs();
    }
    
    // 게임 시작
    start(container, mbtiType) {
        this.player.mbti = mbtiType;
        
        // 플레이어를 해당 MBTI 집 앞에 위치
        const playerHouse = this.buildings.find(b => b.id === mbtiType);
        if (playerHouse) {
            this.player.x = playerHouse.x + 40;
            this.player.y = playerHouse.y + 80;
        }
        
        this.setupCanvas(container);
        this.setupEvents();
        this.startGameLoop();
        
        this.showWelcomeMessage(mbtiType);
        
        return this;
    }
    
    // 캔버스 설정
    setupCanvas(container) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.border = '2px solid #667eea';
        this.canvas.style.borderRadius = '10px';
        this.canvas.style.cursor = 'pointer';
        this.canvas.style.background = '#87ceeb';
        
        this.ctx = this.canvas.getContext('2d');
        
        container.innerHTML = `
            <div style="position: relative; height: 100%;">
                <div style="position: absolute; top: 10px; left: 10px; z-index: 100; background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 5px;">
                    <div><strong>${this.player.mbti} 플레이어</strong></div>
                    <div>🔋 에너지: <span id="energy">${this.player.energy}</span></div>
                    <div>😊 행복: <span id="happiness">${this.player.happiness}</span></div>
                    <div>👥 사교: <span id="social">${this.player.social}</span></div>
                </div>
                
                <div style="position: absolute; top: 10px; right: 10px; z-index: 100; background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 5px; font-size: 12px;">
                    <div><strong>조작법</strong></div>
                    <div>🖱️ 클릭: 이동</div>
                    <div>🏠 건물 클릭: 입장</div>
                    <div>⌨️ WASD: 이동</div>
                </div>
                
                <div id="dialog-box" style="position: absolute; bottom: 20px; left: 20px; right: 20px; background: rgba(0,0,0,0.9); color: white; padding: 15px; border-radius: 10px; display: none; z-index: 200;">
                    <div id="dialog-text"></div>
                    <button id="dialog-close" onclick="sims2d.closeDialog()" style="margin-top: 10px; padding: 5px 15px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">닫기</button>
                </div>
            </div>
        `;
        
        container.appendChild(this.canvas);
    }
    
    // 이벤트 설정
    setupEvents() {
        // 마우스 이벤트
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // 키보드 이벤트
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // 터치 이벤트 (모바일)
        this.canvas.addEventListener('touchstart', (e) => this.handleTouch(e));
    }
    
    // NPC 초기화
    initNPCs() {
        const mbtiTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
                          'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
        
        // 각 MBTI마다 1-2명의 NPC 생성
        for (const mbti of mbtiTypes) {
            const building = this.buildings.find(b => b.id === mbti);
            if (building) {
                // 집 주인 NPC
                this.npcs.push({
                    id: `${mbti}_owner`,
                    x: building.x + Math.random() * 50 + 20,
                    y: building.y + Math.random() * 50 + 70,
                    mbti: mbti,
                    name: `${mbti} 주민`,
                    color: this.getMBTIColor(mbti),
                    targetX: null,
                    targetY: null,
                    moveTimer: 0,
                    animation: 'idle',
                    direction: 'down',
                    frame: 0
                });
            }
        }
        
        // 공용 장소 NPC들
        for (let i = 0; i < 5; i++) {
            this.npcs.push({
                id: `visitor_${i}`,
                x: 900 + Math.random() * 100,
                y: 200 + Math.random() * 300,
                mbti: mbtiTypes[Math.floor(Math.random() * mbtiTypes.length)],
                name: `방문객${i + 1}`,
                color: '#999999',
                targetX: null,
                targetY: null,
                moveTimer: 0,
                animation: 'idle',
                direction: 'down',
                frame: 0
            });
        }
    }
    
    // 게임 루프
    startGameLoop() {
        const gameLoop = (currentTime) => {
            const deltaTime = currentTime - this.lastTime;
            this.lastTime = currentTime;
            
            this.update(deltaTime);
            this.render();
            
            requestAnimationFrame(gameLoop);
        };
        
        requestAnimationFrame(gameLoop);
    }
    
    // 업데이트
    update(deltaTime) {
        // 플레이어 업데이트
        this.updatePlayer(deltaTime);
        
        // NPC 업데이트
        this.updateNPCs(deltaTime);
        
        // 카메라 업데이트
        this.updateCamera();
        
        // 니즈 감소
        if (Math.random() < 0.001) { // 가끔씩 감소
            this.player.energy = Math.max(0, this.player.energy - 1);
            this.player.happiness = Math.max(0, this.player.happiness - 1);
        }
        
        // UI 업데이트
        this.updateUI();
    }
    
    // 플레이어 업데이트
    updatePlayer(deltaTime) {
        // 키보드 이동
        let dx = 0, dy = 0;
        if (this.keys['w'] || this.keys['W'] || this.keys['ArrowUp']) dy -= this.player.speed;
        if (this.keys['s'] || this.keys['S'] || this.keys['ArrowDown']) dy += this.player.speed;
        if (this.keys['a'] || this.keys['A'] || this.keys['ArrowLeft']) dx -= this.player.speed;
        if (this.keys['d'] || this.keys['D'] || this.keys['ArrowRight']) dx += this.player.speed;
        
        // 마우스 클릭 이동
        if (this.player.targetX !== null && this.player.targetY !== null) {
            const tdx = this.player.targetX - this.player.x;
            const tdy = this.player.targetY - this.player.y;
            const distance = Math.sqrt(tdx * tdx + tdy * tdy);
            
            if (distance < 5) {
                this.player.targetX = null;
                this.player.targetY = null;
                this.player.animation = 'idle';
            } else {
                dx += (tdx / distance) * this.player.speed;
                dy += (tdy / distance) * this.player.speed;
            }
        }
        
        // 이동 적용
        if (dx !== 0 || dy !== 0) {
            const newX = this.player.x + dx;
            const newY = this.player.y + dy;
            
            // 경계 체크
            if (newX >= 0 && newX <= this.world.width - this.player.width &&
                newY >= 0 && newY <= this.world.height - this.player.height) {
                
                // 건물 충돌 체크
                let canMove = true;
                for (const building of this.buildings) {
                    if (this.checkCollision(
                        {x: newX, y: newY, width: this.player.width, height: this.player.height},
                        building
                    )) {
                        canMove = false;
                        break;
                    }
                }
                
                if (canMove) {
                    this.player.x = newX;
                    this.player.y = newY;
                    this.player.animation = 'walking';
                    
                    // 방향 설정
                    if (Math.abs(dx) > Math.abs(dy)) {
                        this.player.direction = dx > 0 ? 'right' : 'left';
                    } else if (dy !== 0) {
                        this.player.direction = dy > 0 ? 'down' : 'up';
                    }
                }
            }
        } else {
            this.player.animation = 'idle';
        }
        
        // 애니메이션 프레임 업데이트
        if (deltaTime > this.animationSpeed) {
            this.player.frame = (this.player.frame + 1) % 4;
        }
    }
    
    // NPC 업데이트
    updateNPCs(deltaTime) {
        for (const npc of this.npcs) {
            // 랜덤 이동
            npc.moveTimer -= deltaTime;
            if (npc.moveTimer <= 0) {
                if (Math.random() < 0.3) {
                    npc.targetX = npc.x + (Math.random() - 0.5) * 200;
                    npc.targetY = npc.y + (Math.random() - 0.5) * 200;
                    
                    // 경계 체크
                    npc.targetX = Math.max(0, Math.min(this.world.width - 30, npc.targetX));
                    npc.targetY = Math.max(0, Math.min(this.world.height - 40, npc.targetY));
                }
                npc.moveTimer = 2000 + Math.random() * 3000; // 2-5초
            }
            
            // 목표점으로 이동
            if (npc.targetX !== null && npc.targetY !== null) {
                const dx = npc.targetX - npc.x;
                const dy = npc.targetY - npc.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 5) {
                    npc.targetX = null;
                    npc.targetY = null;
                    npc.animation = 'idle';
                } else {
                    const speed = 1;
                    npc.x += (dx / distance) * speed;
                    npc.y += (dy / distance) * speed;
                    npc.animation = 'walking';
                    
                    // 방향 설정
                    if (Math.abs(dx) > Math.abs(dy)) {
                        npc.direction = dx > 0 ? 'right' : 'left';
                    } else if (dy !== 0) {
                        npc.direction = dy > 0 ? 'down' : 'up';
                    }
                }
            }
            
            // 애니메이션 프레임
            if (deltaTime > this.animationSpeed) {
                npc.frame = (npc.frame + 1) % 4;
            }
        }
    }
    
    // 카메라 업데이트
    updateCamera() {
        // 플레이어를 화면 중앙에 위치
        const targetCameraX = this.player.x - this.canvas.width / 2;
        const targetCameraY = this.player.y - this.canvas.height / 2;
        
        // 부드러운 카메라 이동
        this.world.camera.x += (targetCameraX - this.world.camera.x) * 0.1;
        this.world.camera.y += (targetCameraY - this.world.camera.y) * 0.1;
        
        // 카메라 경계 제한
        this.world.camera.x = Math.max(0, Math.min(this.world.width - this.canvas.width, this.world.camera.x));
        this.world.camera.y = Math.max(0, Math.min(this.world.height - this.canvas.height, this.world.camera.y));
    }
    
    // 렌더링
    render() {
        const ctx = this.ctx;
        
        // 배경 클리어
        ctx.fillStyle = '#87ceeb'; // 하늘색
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 잔디 패턴
        ctx.fillStyle = '#90EE90';
        for (let x = 0; x < this.world.width; x += 40) {
            for (let y = 0; y < this.world.height; y += 40) {
                if ((Math.floor(x/40) + Math.floor(y/40)) % 2 === 0) {
                    ctx.fillRect(x - this.world.camera.x, y - this.world.camera.y, 40, 40);
                }
            }
        }
        
        // 건물 렌더링
        for (const building of this.buildings) {
            this.renderBuilding(building);
        }
        
        // NPC 렌더링
        for (const npc of this.npcs) {
            this.renderCharacter(npc, npc.color);
        }
        
        // 플레이어 렌더링
        this.renderCharacter(this.player, this.getMBTIColor(this.player.mbti));
        
        // 건물 라벨 렌더링
        for (const building of this.buildings) {
            this.renderBuildingLabel(building);
        }
    }
    
    // 건물 렌더링
    renderBuilding(building) {
        const ctx = this.ctx;
        const x = building.x - this.world.camera.x;
        const y = building.y - this.world.camera.y;
        
        // 건물이 화면에 보이는지 체크
        if (x + building.width < 0 || x > this.canvas.width || 
            y + building.height < 0 || y > this.canvas.height) {
            return;
        }
        
        // 그림자
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(x + 5, y + 5, building.width, building.height);
        
        // 건물 본체
        ctx.fillStyle = building.color;
        ctx.fillRect(x, y, building.width, building.height);
        
        // 건물 테두리
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, building.width, building.height);
        
        // 지붕
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.moveTo(x - 5, y);
        ctx.lineTo(x + building.width / 2, y - 15);
        ctx.lineTo(x + building.width + 5, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // 문
        ctx.fillStyle = '#654321';
        ctx.fillRect(x + building.width/2 - 10, y + building.height - 25, 20, 25);
        
        // 문 손잡이
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(x + building.width/2 + 5, y + building.height - 12, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // 창문들
        ctx.fillStyle = '#87CEEB';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        
        if (building.width > 60) {
            // 왼쪽 창문
            ctx.fillRect(x + 10, y + 15, 15, 15);
            ctx.strokeRect(x + 10, y + 15, 15, 15);
            
            // 오른쪽 창문
            ctx.fillRect(x + building.width - 25, y + 15, 15, 15);
            ctx.strokeRect(x + building.width - 25, y + 15, 15, 15);
        }
    }
    
    // 캐릭터 렌더링
    renderCharacter(character, color) {
        const ctx = this.ctx;
        const x = character.x - this.world.camera.x;
        const y = character.y - this.world.camera.y;
        
        // 화면 밖이면 렌더링 안함
        if (x < -50 || x > this.canvas.width + 50 || y < -50 || y > this.canvas.height + 50) {
            return;
        }
        
        // 그림자
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(x + character.width/2, y + character.height - 5, character.width/2, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // 몸체
        ctx.fillStyle = color;
        ctx.fillRect(x + 5, y + 15, character.width - 10, character.height - 20);
        
        // 머리
        ctx.fillStyle = '#FFDBAC'; // 살색
        ctx.beginPath();
        ctx.arc(x + character.width/2, y + 10, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // 얼굴
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x + character.width/2 - 3, y + 8, 1, 0, Math.PI * 2); // 왼쪽 눈
        ctx.arc(x + character.width/2 + 3, y + 8, 1, 0, Math.PI * 2); // 오른쪽 눈
        ctx.fill();
        
        // 입
        ctx.beginPath();
        ctx.arc(x + character.width/2, y + 12, 2, 0, Math.PI);
        ctx.stroke();
        
        // 팔다리 (간단한 선으로)
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        
        // 팔
        ctx.beginPath();
        ctx.moveTo(x + 5, y + 20);
        ctx.lineTo(x, y + 25);
        ctx.moveTo(x + character.width - 5, y + 20);
        ctx.lineTo(x + character.width, y + 25);
        ctx.stroke();
        
        // 다리 (걷기 애니메이션)
        const legOffset = character.animation === 'walking' ? Math.sin(character.frame) * 3 : 0;
        ctx.beginPath();
        ctx.moveTo(x + 8, y + character.height - 5);
        ctx.lineTo(x + 6 + legOffset, y + character.height + 5);
        ctx.moveTo(x + character.width - 8, y + character.height - 5);
        ctx.lineTo(x + character.width - 6 - legOffset, y + character.height + 5);
        ctx.stroke();
        
        // 플레이어라면 특별 표시
        if (character === this.player) {
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x + character.width/2, y + character.height/2, 25, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    // 건물 라벨 렌더링
    renderBuildingLabel(building) {
        const ctx = this.ctx;
        const x = building.x - this.world.camera.x;
        const y = building.y - this.world.camera.y;
        
        // 거리 체크 (가까이 있을 때만 표시)
        const distance = Math.sqrt(
            Math.pow(this.player.x - (building.x + building.width/2), 2) +
            Math.pow(this.player.y - (building.y + building.height/2), 2)
        );
        
        if (distance < 100) {
            ctx.fillStyle = 'rgba(0,0,0,0.8)';
            ctx.fillRect(x, y - 25, building.width, 20);
            
            ctx.fillStyle = '#fff';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(building.name, x + building.width/2, y - 10);
        }
    }
    
    // 클릭 처리
    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) * (this.canvas.width / rect.width)) + this.world.camera.x;
        const mouseY = ((e.clientY - rect.top) * (this.canvas.height / rect.height)) + this.world.camera.y;
        
        // 건물 클릭 체크
        for (const building of this.buildings) {
            if (mouseX >= building.x && mouseX <= building.x + building.width &&
                mouseY >= building.y && mouseY <= building.y + building.height) {
                this.enterBuilding(building);
                return;
            }
        }
        
        // NPC 클릭 체크
        for (const npc of this.npcs) {
            if (mouseX >= npc.x && mouseX <= npc.x + 30 &&
                mouseY >= npc.y && mouseY <= npc.y + 40) {
                this.talkToNPC(npc);
                return;
            }
        }
        
        // 빈 공간 클릭 시 이동
        this.player.targetX = mouseX;
        this.player.targetY = mouseY;
    }
    
    // 건물 입장
    enterBuilding(building) {
        const messages = {
            'house': `${building.name}에 입장했습니다! 🏠\n\n${building.id} 스타일의 인테리어가 인상적입니다.\n에너지와 행복도가 회복됩니다!`,
            'cafe': `${building.name}에서 맛있는 커피를 마셨습니다! ☕\n\n사교성이 증가하고 기분이 좋아집니다!`,
            'park': `${building.name}에서 산책을 즐겼습니다! 🌳\n\n신선한 공기로 에너지가 회복됩니다!`,
            'shop': `${building.name}에서 쇼핑을 했습니다! 🛍️\n\n새로운 아이템으로 행복도가 증가합니다!`
        };
        
        // 능력치 회복
        if (building.type === 'house') {
            this.player.energy = Math.min(100, this.player.energy + 20);
            this.player.happiness = Math.min(100, this.player.happiness + 15);
        } else if (building.type === 'cafe') {
            this.player.social = Math.min(100, this.player.social + 25);
            this.player.happiness = Math.min(100, this.player.happiness + 10);
        } else if (building.type === 'park') {
            this.player.energy = Math.min(100, this.player.energy + 30);
        } else if (building.type === 'shop') {
            this.player.happiness = Math.min(100, this.player.happiness + 20);
        }
        
        this.showDialog(messages[building.type] || `${building.name}에 입장했습니다!`);
    }
    
    // NPC와 대화
    talkToNPC(npc) {
        const greetings = [
            `안녕하세요! 저는 ${npc.name}입니다. ${npc.mbti} 타입이에요!`,
            `${npc.mbti} 특성상 이런 대화가 즐겁네요! 어떤 활동을 좋아하세요?`,
            `${this.player.mbti}와 ${npc.mbti}의 만남이네요! 서로 배울 점이 많을 것 같아요.`,
            `이 동네에 온 지 얼마나 되셨나요? 재미있는 곳들이 많아요!`
        ];
        
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        this.showDialog(`💬 ${npc.name}\n\n"${randomGreeting}"\n\n사교성이 증가했습니다!`);
        
        this.player.social = Math.min(100, this.player.social + 10);
        this.player.happiness = Math.min(100, this.player.happiness + 5);
    }
    
    // 대화창 표시
    showDialog(text) {
        this.showingDialog = true;
        this.currentDialog = text;
        
        const dialogBox = document.getElementById('dialog-box');
        const dialogText = document.getElementById('dialog-text');
        
        if (dialogBox && dialogText) {
            dialogText.innerHTML = text.replace(/\n/g, '<br>');
            dialogBox.style.display = 'block';
        }
    }
    
    // 대화창 닫기
    closeDialog() {
        this.showingDialog = false;
        this.currentDialog = null;
        
        const dialogBox = document.getElementById('dialog-box');
        if (dialogBox) {
            dialogBox.style.display = 'none';
        }
    }
    
    // 환영 메시지
    showWelcomeMessage(mbti) {
        setTimeout(() => {
            this.showDialog(`🎉 ${mbti} 메타버스에 오신 걸 환영합니다!\n\n🖱️ 클릭해서 이동하고\n🏠 건물을 클릭해서 입장하세요!\n👥 다른 사람들과 대화도 해보세요!\n\n즐거운 시간 보내세요! ✨`);
        }, 1000);
    }
    
    // UI 업데이트
    updateUI() {
        const energyEl = document.getElementById('energy');
        const happinessEl = document.getElementById('happiness');
        const socialEl = document.getElementById('social');
        
        if (energyEl) energyEl.textContent = Math.round(this.player.energy);
        if (happinessEl) happinessEl.textContent = Math.round(this.player.happiness);
        if (socialEl) socialEl.textContent = Math.round(this.player.social);
    }
    
    // 유틸리티 함수들
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mousePos.x = e.clientX - rect.left;
        this.mousePos.y = e.clientY - rect.top;
    }
    
    handleKeyDown(e) {
        this.keys[e.key] = true;
        
        // ESC로 대화창 닫기
        if (e.key === 'Escape' && this.showingDialog) {
            this.closeDialog();
        }
    }
    
    handleKeyUp(e) {
        this.keys[e.key] = false;
    }
    
    handleTouch(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const mouseX = ((touch.clientX - rect.left) * (this.canvas.width / rect.width)) + this.world.camera.x;
        const mouseY = ((touch.clientY - rect.top) * (this.canvas.height / rect.height)) + this.world.camera.y;
        
        // 터치를 클릭으로 처리
        this.handleClick({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
    }
    
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    getMBTIColor(mbti) {
        const colors = {
            'INTJ': '#8b5cf6', 'INTP': '#3b82f6', 'ENTJ': '#eab308', 'ENTP': '#f97316',
            'INFJ': '#a855f7', 'INFP': '#ec4899', 'ENFJ': '#84cc16', 'ENFP': '#ef4444',
            'ISTJ': '#6b7280', 'ISFJ': '#10b981', 'ESTJ': '#0ea5e9', 'ESFJ': '#f59e0b',
            'ISTP': '#78716c', 'ISFP': '#22c55e', 'ESTP': '#dc2626', 'ESFP': '#be185d'
        };
        return colors[mbti] || '#666666';
    }
}

// 전역 인스턴스
let sims2d = null;