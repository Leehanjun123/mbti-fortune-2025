// MBTI Battle Arena Enhanced - 업계 최고 수준 최적화
class BattleArenaEnhanced {
    constructor() {
        // 성능 최적화 시스템 초기화
        this.optimizer = typeof PerformanceOptimizer !== 'undefined' ? 
            new PerformanceOptimizer() : null;
        
        this.canvas = null;
        this.ctx = null;
        this.offscreenCanvas = null;
        this.offscreenCtx = null;
        this.gameState = 'menu';
        this.fighters = {};
        this.effects = [];
        this.combos = [];
        this.camera = { x: 0, y: 0, zoom: 1, shake: 0 };
        
        // 성능 모니터링
        this.performance = {
            frameCount: 0,
            fps: 60,
            targetFPS: 60,
            lastTime: 0,
            deltaTime: 0,
            frameSkip: 0,
            drawCalls: 0
        };
        
        // 오브젝트 풀
        this.particlePool = [];
        this.effectPool = [];
        this.maxPoolSize = 100;
        
        // 입력 처리
        this.keys = {};
        this.gamepad = null;
        this.inputBuffer = [];
        this.inputDelay = 0;
        
        // 배틀 설정
        this.battleTimer = 99;
        this.round = 1;
        this.maxRounds = 3;
        this.wins = { player: 0, opponent: 0 };
        
        // 콤보 시스템
        this.comboCount = 0;
        this.comboTimer = 0;
        this.maxCombo = 0;
        
        // 스페셜 게이지
        this.specialGauge = { player: 0, opponent: 0 };
        
        // 렌더 배치
        this.renderBatch = [];
        
        // 품질 설정 적용
        this.applyQualitySettings();
        this.initInputHandlers();
    }

    // 품질 설정 적용
    applyQualitySettings() {
        if (!this.optimizer) return;
        
        const settings = this.optimizer.qualitySettings;
        this.performance.targetFPS = settings.targetFPS;
        this.maxParticles = settings.particleCount;
        this.enablePostProcessing = settings.postProcessing;
        this.enableAntialiasing = settings.antialiasing;
        this.renderResolution = settings.resolution;
    }

    // 배틀 초기화 (최적화)
    initBattle(playerMBTI, opponentMBTI, container) {
        this.container = container;
        
        // 최적화된 캔버스 크기 계산
        const optimalSize = this.calculateOptimalCanvasSize();
        
        // 메인 캔버스 생성
        this.canvas = document.createElement('canvas');
        this.canvas.width = optimalSize.width;
        this.canvas.height = optimalSize.height;
        this.canvas.style.width = '100%';
        this.canvas.style.height = 'auto';
        this.canvas.style.borderRadius = '20px';
        this.canvas.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.3)';
        
        // GPU 가속 활성화
        this.canvas.style.willChange = 'transform';
        this.canvas.style.transform = 'translateZ(0)';
        this.canvas.style.backfaceVisibility = 'hidden';
        
        // 컨텍스트 옵션 최적화
        this.ctx = this.canvas.getContext('2d', {
            alpha: false,
            desynchronized: true,
            willReadFrequently: false
        });
        
        // 더블 버퍼링용 오프스크린 캔버스
        if (window.OffscreenCanvas && this.optimizer?.qualitySettings.resolution >= 0.9) {
            this.offscreenCanvas = new OffscreenCanvas(optimalSize.width, optimalSize.height);
            this.offscreenCtx = this.offscreenCanvas.getContext('2d');
        }
        
        // 이미지 스무딩 설정
        this.ctx.imageSmoothingEnabled = this.enableAntialiasing || false;
        this.ctx.imageSmoothingQuality = this.optimizer?.deviceProfile.tier === 'ultra' ? 'high' : 'low';
        
        container.innerHTML = '';
        container.appendChild(this.canvas);
        
        // 성능 모니터 추가 (개발 모드)
        if (this.optimizer && window.location.search.includes('debug')) {
            this.addPerformanceMonitor(container);
        }
        
        // 파이터 생성
        this.createFighters(playerMBTI, opponentMBTI);
        
        // 리소스 프리로딩
        this.preloadResources().then(() => {
            // 게임 엔진 초기화
            if (typeof GameEngine !== 'undefined') {
                GameEngine.initAudio();
            }
            
            // 게임 시작
            this.gameState = 'fighting';
            this.startOptimizedGameLoop();
        });
        
        return this;
    }

    // 최적 캔버스 크기 계산
    calculateOptimalCanvasSize() {
        const baseWidth = 1280;
        const baseHeight = 720;
        
        if (!this.optimizer) {
            return { width: baseWidth, height: baseHeight };
        }
        
        const resolution = this.renderResolution || 1;
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        
        // 2의 제곱수로 반올림 (GPU 최적화)
        const width = Math.pow(2, Math.round(Math.log2(baseWidth * resolution * pixelRatio)));
        const height = Math.pow(2, Math.round(Math.log2(baseHeight * resolution * pixelRatio)));
        
        return { 
            width: Math.min(width, 2048), // 최대 2K
            height: Math.min(height, 1152)
        };
    }

    // 리소스 프리로딩
    async preloadResources() {
        // 스프라이트 시트 생성 (텍스처 아틀라스)
        this.spriteSheet = document.createElement('canvas');
        this.spriteSheet.width = 2048;
        this.spriteSheet.height = 2048;
        const spriteCtx = this.spriteSheet.getContext('2d');
        
        // 여기에 모든 스프라이트를 미리 그려두기
        // 실제 게임에서는 이미지 파일을 로드
        
        return Promise.resolve();
    }

    // 성능 모니터 추가
    addPerformanceMonitor(container) {
        const monitor = document.createElement('div');
        monitor.id = 'performance-monitor';
        monitor.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.8);
            color: #0f0;
            font-family: monospace;
            font-size: 12px;
            padding: 10px;
            border-radius: 5px;
            z-index: 1000;
        `;
        container.appendChild(monitor);
        
        this.performanceMonitor = monitor;
    }

    // 파이터 생성
    createFighters(playerType, opponentType) {
        // 파이터 스탯 정의
        const fighterStats = {
            'INTJ': { 
                name: '전략의 마스터',
                speed: 7, power: 9, defense: 8, special: 10,
                color: '#8b5cf6',
                moves: {
                    light: { name: '분석 타격', damage: 10, frames: 8 },
                    medium: { name: '계산된 일격', damage: 20, frames: 12 },
                    heavy: { name: '완벽한 카운터', damage: 35, frames: 18 },
                    special: { name: '마스터 플랜', damage: 50, frames: 30 }
                }
            },
            'ENTP': {
                name: '토론의 달인',
                speed: 9, power: 7, defense: 6, special: 9,
                color: '#f97316',
                moves: {
                    light: { name: '빠른 반박', damage: 12, frames: 6 },
                    medium: { name: '논리 폭격', damage: 18, frames: 10 },
                    heavy: { name: '악마의 변호', damage: 30, frames: 16 },
                    special: { name: '무한 토론', damage: 45, frames: 28 }
                }
            },
            'INFJ': {
                name: '신비한 예언자',
                speed: 6, power: 7, defense: 9, special: 10,
                color: '#a855f7',
                moves: {
                    light: { name: '직관 타격', damage: 9, frames: 9 },
                    medium: { name: '예지력', damage: 22, frames: 14 },
                    heavy: { name: '운명의 일격', damage: 38, frames: 20 },
                    special: { name: '미래 예견', damage: 55, frames: 35 }
                }
            },
            'ESTP': {
                name: '액션 히어로',
                speed: 10, power: 9, defense: 5, special: 7,
                color: '#ef4444',
                moves: {
                    light: { name: '스피드 잽', damage: 11, frames: 5 },
                    medium: { name: '파워 스트레이트', damage: 19, frames: 9 },
                    heavy: { name: '회전 킥', damage: 32, frames: 15 },
                    special: { name: '극한 러시', damage: 48, frames: 25 }
                }
            },
            'ENFP': {
                name: '열정의 화신',
                speed: 8, power: 7, defense: 7, special: 9,
                color: '#ec4899',
                moves: {
                    light: { name: '활력 펀치', damage: 10, frames: 7 },
                    medium: { name: '열정 폭발', damage: 20, frames: 11 },
                    heavy: { name: '무한 에너지', damage: 33, frames: 17 },
                    special: { name: '희망의 빛', damage: 50, frames: 32 }
                }
            },
            'ISTJ': {
                name: '철벽 수호자',
                speed: 5, power: 8, defense: 10, special: 8,
                color: '#6b7280',
                moves: {
                    light: { name: '정확한 타격', damage: 9, frames: 10 },
                    medium: { name: '규칙적 연타', damage: 21, frames: 15 },
                    heavy: { name: '철벽 방어', damage: 28, frames: 22 },
                    special: { name: '절대 방어', damage: 40, frames: 38 }
                }
            }
        };

        // 기본 스탯 설정
        const defaultStats = {
            name: '파이터',
            speed: 7, power: 7, defense: 7, special: 7,
            color: '#667eea',
            moves: {
                light: { name: '기본 공격', damage: 10, frames: 8 },
                medium: { name: '중간 공격', damage: 20, frames: 12 },
                heavy: { name: '강한 공격', damage: 30, frames: 18 },
                special: { name: '필살기', damage: 45, frames: 30 }
            }
        };

        const playerStats = fighterStats[playerType] || defaultStats;
        const opponentStats = fighterStats[opponentType] || defaultStats;

        // 플레이어 파이터
        this.fighters.player = {
            type: playerType,
            ...playerStats,
            x: 300,
            y: 400,
            width: 80,
            height: 120,
            velocityX: 0,
            velocityY: 0,
            health: 100,
            maxHealth: 100,
            direction: 1, // 1: right, -1: left
            state: 'idle', // idle, walking, jumping, attacking, hit, blocking
            currentMove: null,
            animationFrame: 0,
            combo: [],
            stunTimer: 0,
            blockTimer: 0
        };

        // 상대 파이터
        this.fighters.opponent = {
            type: opponentType,
            ...opponentStats,
            x: 900,
            y: 400,
            width: 80,
            height: 120,
            velocityX: 0,
            velocityY: 0,
            health: 100,
            maxHealth: 100,
            direction: -1,
            state: 'idle',
            currentMove: null,
            animationFrame: 0,
            combo: [],
            stunTimer: 0,
            blockTimer: 0,
            ai: {
                attackCooldown: 0,
                dodgeCooldown: 0,
                strategy: 'balanced' // aggressive, defensive, balanced
            }
        };
    }

    // 입력 핸들러 초기화
    initInputHandlers() {
        // 키보드 입력
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            this.handleKeyPress(e.code);
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // 게임패드 지원
        window.addEventListener('gamepadconnected', (e) => {
            this.gamepad = e.gamepad;
            console.log('게임패드 연결됨:', e.gamepad.id);
        });
    }

    // 키 입력 처리
    handleKeyPress(key) {
        if (this.gameState !== 'fighting') return;
        
        const player = this.fighters.player;
        if (player.stunTimer > 0 || player.state === 'hit') return;

        // 공격 키
        switch(key) {
            case 'KeyZ': // Light Attack
                this.executeMove(player, 'light');
                break;
            case 'KeyX': // Medium Attack
                this.executeMove(player, 'medium');
                break;
            case 'KeyC': // Heavy Attack
                this.executeMove(player, 'heavy');
                break;
            case 'Space': // Special Attack
                if (this.specialGauge.player >= 100) {
                    this.executeMove(player, 'special');
                    this.specialGauge.player = 0;
                }
                break;
            case 'ShiftLeft': // Block
                player.state = 'blocking';
                player.blockTimer = 10;
                break;
        }
    }

    // 이동 처리
    handleMovement(fighter, isPlayer = true) {
        if (fighter.stunTimer > 0) {
            fighter.stunTimer--;
            return;
        }

        const speed = fighter.speed * 0.8;
        
        if (isPlayer) {
            // 플레이어 이동
            if (this.keys['ArrowLeft']) {
                fighter.velocityX = -speed;
                fighter.direction = -1;
                if (fighter.state === 'idle') fighter.state = 'walking';
            } else if (this.keys['ArrowRight']) {
                fighter.velocityX = speed;
                fighter.direction = 1;
                if (fighter.state === 'idle') fighter.state = 'walking';
            } else {
                fighter.velocityX *= 0.8; // 마찰
                if (Math.abs(fighter.velocityX) < 0.1 && fighter.state === 'walking') {
                    fighter.state = 'idle';
                }
            }

            // 점프
            if (this.keys['ArrowUp'] && fighter.y >= 400) {
                fighter.velocityY = -15;
                fighter.state = 'jumping';
            }
        }

        // 물리 적용
        fighter.x += fighter.velocityX;
        fighter.y += fighter.velocityY;
        
        // 중력
        if (fighter.y < 400) {
            fighter.velocityY += 0.8;
        } else {
            fighter.y = 400;
            fighter.velocityY = 0;
            if (fighter.state === 'jumping') {
                fighter.state = 'idle';
            }
        }

        // 경계 체크
        fighter.x = Math.max(50, Math.min(1230, fighter.x));
    }

    // 공격 실행
    executeMove(fighter, moveType) {
        if (fighter.state === 'attacking' || fighter.currentMove) return;
        
        const move = fighter.moves[moveType];
        fighter.state = 'attacking';
        fighter.currentMove = move;
        fighter.animationFrame = 0;
        
        // 콤보 추가
        fighter.combo.push(moveType);
        if (fighter.combo.length > 3) fighter.combo.shift();
        
        // 효과음
        if (typeof GameEngine !== 'undefined') {
            GameEngine.playSound('hit');
        }
        
        // 공격 판정은 애니메이션 중간에
        setTimeout(() => {
            this.checkHit(fighter, moveType);
        }, move.frames * 8);
        
        // 공격 종료
        setTimeout(() => {
            fighter.state = 'idle';
            fighter.currentMove = null;
        }, move.frames * 16);
    }

    // 히트 체크
    checkHit(attacker, moveType) {
        const target = attacker === this.fighters.player ? 
                      this.fighters.opponent : this.fighters.player;
        
        const move = attacker.moves[moveType];
        const distance = Math.abs(attacker.x - target.x);
        
        // 사거리 체크
        const range = moveType === 'heavy' ? 120 : moveType === 'medium' ? 100 : 80;
        
        if (distance < range) {
            if (target.state === 'blocking') {
                // 블록 성공
                target.health -= Math.floor(move.damage * 0.2);
                this.createEffect('block', target.x, target.y - 50);
                
                if (typeof GameEngine !== 'undefined') {
                    GameEngine.playSound('block');
                }
            } else {
                // 히트!
                let damage = move.damage;
                
                // 콤보 보너스
                if (this.comboCount > 0) {
                    damage *= (1 + this.comboCount * 0.1);
                }
                
                target.health -= damage;
                target.state = 'hit';
                target.stunTimer = move.frames;
                
                // 넉백
                target.velocityX = attacker.direction * 5;
                
                // 콤보 카운트
                this.comboCount++;
                this.comboTimer = 60;
                
                // 스페셜 게이지 증가
                const gaugeIncrease = moveType === 'light' ? 10 : 
                                    moveType === 'medium' ? 20 : 
                                    moveType === 'heavy' ? 30 : 0;
                
                if (attacker === this.fighters.player) {
                    this.specialGauge.player = Math.min(100, this.specialGauge.player + gaugeIncrease);
                } else {
                    this.specialGauge.opponent = Math.min(100, this.specialGauge.opponent + gaugeIncrease);
                }
                
                // 효과
                this.createEffect('hit', target.x, target.y - 50);
                this.createDamageText(target.x, target.y - 100, Math.floor(damage));
                
                // 카메라 흔들림
                this.camera.shake = moveType === 'special' ? 20 : 
                                   moveType === 'heavy' ? 15 : 10;
                
                // 효과음
                if (typeof GameEngine !== 'undefined') {
                    GameEngine.playSound('hit');
                    
                    if (moveType === 'special') {
                        GameEngine.createExplosion(target.x, target.y);
                    }
                }
            }
        }
    }

    // AI 업데이트
    updateAI() {
        const ai = this.fighters.opponent;
        const player = this.fighters.player;
        const distance = Math.abs(ai.x - player.x);
        
        // AI 쿨다운 감소
        if (ai.ai.attackCooldown > 0) ai.ai.attackCooldown--;
        if (ai.ai.dodgeCooldown > 0) ai.ai.dodgeCooldown--;
        
        // 전략 결정
        if (ai.health < 30) {
            ai.ai.strategy = 'defensive';
        } else if (player.health < 30) {
            ai.ai.strategy = 'aggressive';
        } else {
            ai.ai.strategy = 'balanced';
        }
        
        // 행동 결정
        if (ai.state === 'idle' || ai.state === 'walking') {
            // 거리에 따른 행동
            if (distance > 150) {
                // 접근
                ai.velocityX = ai.x > player.x ? -ai.speed * 0.7 : ai.speed * 0.7;
                ai.direction = ai.x > player.x ? -1 : 1;
                ai.state = 'walking';
            } else if (distance < 80) {
                // 공격 또는 회피
                if (ai.ai.attackCooldown === 0) {
                    const rand = Math.random();
                    if (rand < 0.4) {
                        this.executeMove(ai, 'light');
                        ai.ai.attackCooldown = 30;
                    } else if (rand < 0.7) {
                        this.executeMove(ai, 'medium');
                        ai.ai.attackCooldown = 40;
                    } else if (rand < 0.9) {
                        this.executeMove(ai, 'heavy');
                        ai.ai.attackCooldown = 50;
                    } else if (this.specialGauge.opponent >= 100) {
                        this.executeMove(ai, 'special');
                        this.specialGauge.opponent = 0;
                        ai.ai.attackCooldown = 60;
                    }
                } else if (ai.ai.dodgeCooldown === 0 && Math.random() < 0.3) {
                    // 회피
                    ai.velocityX = ai.x > 640 ? -ai.speed : ai.speed;
                    ai.ai.dodgeCooldown = 40;
                }
            }
            
            // 블록
            if (player.state === 'attacking' && distance < 120 && Math.random() < 0.5) {
                ai.state = 'blocking';
                ai.blockTimer = 10;
            }
        }
        
        // 블록 해제
        if (ai.blockTimer > 0) {
            ai.blockTimer--;
            if (ai.blockTimer === 0) {
                ai.state = 'idle';
            }
        }
        
        // 이동 처리
        this.handleMovement(ai, false);
        
        // 마찰
        ai.velocityX *= 0.9;
    }

    // 효과 생성
    createEffect(type, x, y) {
        this.effects.push({
            type: type,
            x: x,
            y: y,
            frame: 0,
            maxFrames: type === 'hit' ? 15 : type === 'block' ? 10 : 20
        });
    }

    // 데미지 텍스트
    createDamageText(x, y, damage) {
        this.effects.push({
            type: 'damage',
            x: x,
            y: y,
            damage: damage,
            frame: 0,
            maxFrames: 30,
            velocityY: -3
        });
    }

    // 게임 루프
    startGameLoop() {
        const gameLoop = (currentTime) => {
            if (this.gameState === 'menu') return;
            
            // Delta time 계산
            const deltaTime = currentTime - this.lastTime;
            if (deltaTime < 1000 / this.fps) {
                requestAnimationFrame(gameLoop);
                return;
            }
            this.lastTime = currentTime;
            
            // 업데이트
            this.update();
            
            // 렌더링
            this.render();
            
            // 다음 프레임
            if (this.gameState !== 'menu') {
                requestAnimationFrame(gameLoop);
            }
        };
        
        requestAnimationFrame(gameLoop);
    }

    // 업데이트
    update() {
        // 플레이어 이동
        this.handleMovement(this.fighters.player, true);
        
        // AI 업데이트
        this.updateAI();
        
        // 콤보 타이머
        if (this.comboTimer > 0) {
            this.comboTimer--;
            if (this.comboTimer === 0) {
                this.maxCombo = Math.max(this.maxCombo, this.comboCount);
                this.comboCount = 0;
            }
        }
        
        // 효과 업데이트
        for (let i = this.effects.length - 1; i >= 0; i--) {
            const effect = this.effects[i];
            effect.frame++;
            
            if (effect.type === 'damage') {
                effect.y += effect.velocityY;
                effect.velocityY += 0.2;
            }
            
            if (effect.frame >= effect.maxFrames) {
                this.effects.splice(i, 1);
            }
        }
        
        // 카메라 흔들림
        if (this.camera.shake > 0) {
            this.camera.shake *= 0.9;
            if (this.camera.shake < 0.1) this.camera.shake = 0;
        }
        
        // 승부 체크
        this.checkVictory();
        
        // 타이머 업데이트
        this.frameCount++;
        if (this.frameCount % 60 === 0 && this.battleTimer > 0) {
            this.battleTimer--;
        }
    }

    // 렌더링
    render() {
        const ctx = this.ctx;
        
        // 카메라 흔들림 적용
        ctx.save();
        if (this.camera.shake > 0) {
            ctx.translate(
                (Math.random() - 0.5) * this.camera.shake,
                (Math.random() - 0.5) * this.camera.shake
            );
        }
        
        // 배경
        this.renderBackground();
        
        // 바닥
        this.renderFloor();
        
        // 파이터
        this.renderFighter(this.fighters.player);
        this.renderFighter(this.fighters.opponent);
        
        // 효과
        this.renderEffects();
        
        ctx.restore();
        
        // UI (카메라 흔들림 영향 없음)
        this.renderUI();
    }

    // 배경 렌더링
    renderBackground() {
        const ctx = this.ctx;
        
        // 그라데이션 배경
        const gradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#1e1b4b');
        gradient.addColorStop(0.5, '#312e81');
        gradient.addColorStop(1, '#1e1b4b');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 격자 패턴
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < this.canvas.width; i += 50) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, this.canvas.height);
            ctx.stroke();
        }
        
        for (let i = 0; i < this.canvas.height; i += 50) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(this.canvas.width, i);
            ctx.stroke();
        }
    }

    // 바닥 렌더링
    renderFloor() {
        const ctx = this.ctx;
        
        // 바닥 그림자
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 520, this.canvas.width, this.canvas.height - 520);
        
        // 바닥 선
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 520);
        ctx.lineTo(this.canvas.width, 520);
        ctx.stroke();
    }

    // 파이터 렌더링
    renderFighter(fighter) {
        const ctx = this.ctx;
        
        ctx.save();
        ctx.translate(fighter.x, fighter.y);
        
        // 방향 적용
        if (fighter.direction === -1) {
            ctx.scale(-1, 1);
        }
        
        // 그림자
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.ellipse(0, fighter.height/2 + 5, fighter.width/2, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // 몸체 (상태에 따라 다른 색상)
        let color = fighter.color;
        if (fighter.state === 'hit') {
            color = '#ef4444';
        } else if (fighter.state === 'blocking') {
            color = '#3b82f6';
        }
        
        // 몸체 그라데이션
        const bodyGradient = ctx.createLinearGradient(0, -fighter.height/2, 0, fighter.height/2);
        bodyGradient.addColorStop(0, this.lightenColor(color, 20));
        bodyGradient.addColorStop(1, color);
        
        ctx.fillStyle = bodyGradient;
        ctx.fillRect(-fighter.width/2, -fighter.height/2, fighter.width, fighter.height);
        
        // 얼굴
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(0, -fighter.height/2 + 20, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // 눈
        ctx.fillStyle = '#000000';
        ctx.fillRect(-5, -fighter.height/2 + 15, 3, 3);
        ctx.fillRect(2, -fighter.height/2 + 15, 3, 3);
        
        // 공격 이펙트
        if (fighter.state === 'attacking' && fighter.currentMove) {
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            const moveType = Object.keys(fighter.moves).find(key => 
                fighter.moves[key] === fighter.currentMove
            );
            
            if (moveType === 'light') {
                ctx.arc(fighter.width/2, 0, 20, -Math.PI/4, Math.PI/4);
            } else if (moveType === 'medium') {
                ctx.arc(fighter.width/2, 0, 30, -Math.PI/3, Math.PI/3);
            } else if (moveType === 'heavy') {
                ctx.arc(fighter.width/2, 0, 40, -Math.PI/2, Math.PI/2);
            } else if (moveType === 'special') {
                // 스페셜 이펙트
                for (let i = 0; i < 3; i++) {
                    ctx.arc(fighter.width/2, 0, 30 + i * 15, -Math.PI/2, Math.PI/2);
                }
            }
            
            ctx.stroke();
        }
        
        // 블록 이펙트
        if (fighter.state === 'blocking') {
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 5;
            ctx.globalAlpha = 0.5;
            ctx.strokeRect(-fighter.width/2 - 10, -fighter.height/2 - 10, 
                          fighter.width + 20, fighter.height + 20);
            ctx.globalAlpha = 1;
        }
        
        ctx.restore();
        
        // 이름 표시
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(fighter.type, fighter.x, fighter.y - fighter.height/2 - 20);
    }

    // 효과 렌더링
    renderEffects() {
        const ctx = this.ctx;
        
        this.effects.forEach(effect => {
            ctx.save();
            
            if (effect.type === 'hit') {
                // 히트 이펙트
                const progress = effect.frame / effect.maxFrames;
                const size = 30 * (1 + progress);
                
                ctx.globalAlpha = 1 - progress;
                ctx.strokeStyle = '#fbbf24';
                ctx.lineWidth = 3;
                
                for (let i = 0; i < 8; i++) {
                    const angle = (Math.PI * 2 * i) / 8;
                    const x1 = effect.x + Math.cos(angle) * size * 0.5;
                    const y1 = effect.y + Math.sin(angle) * size * 0.5;
                    const x2 = effect.x + Math.cos(angle) * size;
                    const y2 = effect.y + Math.sin(angle) * size;
                    
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            } else if (effect.type === 'block') {
                // 블록 이펙트
                const progress = effect.frame / effect.maxFrames;
                
                ctx.globalAlpha = 1 - progress;
                ctx.strokeStyle = '#3b82f6';
                ctx.lineWidth = 5;
                ctx.strokeRect(
                    effect.x - 30 * (1 + progress),
                    effect.y - 30 * (1 + progress),
                    60 * (1 + progress),
                    60 * (1 + progress)
                );
            } else if (effect.type === 'damage') {
                // 데미지 텍스트
                const progress = effect.frame / effect.maxFrames;
                
                ctx.globalAlpha = 1 - progress * 0.5;
                ctx.font = `bold ${30 + progress * 10}px Arial`;
                ctx.fillStyle = '#fbbf24';
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 3;
                ctx.textAlign = 'center';
                
                const text = `-${effect.damage}`;
                ctx.strokeText(text, effect.x, effect.y);
                ctx.fillText(text, effect.x, effect.y);
            }
            
            ctx.restore();
        });
    }

    // UI 렌더링
    renderUI() {
        const ctx = this.ctx;
        
        // 체력바
        this.renderHealthBar(ctx, 50, 30, 400, 30, 
            this.fighters.player.health, this.fighters.player.maxHealth, 
            this.fighters.player.type, this.fighters.player.color);
        
        this.renderHealthBar(ctx, 830, 30, 400, 30, 
            this.fighters.opponent.health, this.fighters.opponent.maxHealth, 
            this.fighters.opponent.type, this.fighters.opponent.color, true);
        
        // 스페셜 게이지
        this.renderSpecialGauge(ctx, 50, 70, 300, 15, 
            this.specialGauge.player, 100);
        
        this.renderSpecialGauge(ctx, 930, 70, 300, 15, 
            this.specialGauge.opponent, 100, true);
        
        // 타이머
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.battleTimer, this.canvas.width / 2, 60);
        
        // 라운드
        ctx.font = 'bold 24px Arial';
        ctx.fillText(`ROUND ${this.round}`, this.canvas.width / 2, 90);
        
        // 콤보
        if (this.comboCount > 1) {
            ctx.save();
            ctx.font = `bold ${30 + this.comboCount * 2}px Arial`;
            ctx.fillStyle = '#fbbf24';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 3;
            ctx.textAlign = 'center';
            
            const comboText = `${this.comboCount} COMBO!`;
            ctx.strokeText(comboText, this.canvas.width / 2, 150);
            ctx.fillText(comboText, this.canvas.width / 2, 150);
            ctx.restore();
        }
        
        // 라운드 승리 표시
        this.renderRoundWins(ctx);
    }

    // 체력바 렌더링
    renderHealthBar(ctx, x, y, width, height, current, max, name, color, reverse = false) {
        // 배경
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x, y, width, height);
        
        // 테두리
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        
        // 체력
        const fillWidth = (width - 4) * (current / max);
        const gradient = ctx.createLinearGradient(x, y, x + width, y);
        
        if (reverse) {
            gradient.addColorStop(0, this.darkenColor(color, 30));
            gradient.addColorStop(1, color);
            ctx.fillStyle = gradient;
            ctx.fillRect(x + width - fillWidth - 2, y + 2, fillWidth, height - 4);
        } else {
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, this.darkenColor(color, 30));
            ctx.fillStyle = gradient;
            ctx.fillRect(x + 2, y + 2, fillWidth, height - 4);
        }
        
        // 이름
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = reverse ? 'right' : 'left';
        ctx.fillText(name, reverse ? x + width - 10 : x + 10, y - 5);
    }

    // 스페셜 게이지 렌더링
    renderSpecialGauge(ctx, x, y, width, height, current, max, reverse = false) {
        // 배경
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(x, y, width, height);
        
        // 게이지
        const fillWidth = (width - 2) * (current / max);
        const gradient = ctx.createLinearGradient(x, y, x + width, y);
        gradient.addColorStop(0, '#fbbf24');
        gradient.addColorStop(1, '#f59e0b');
        
        ctx.fillStyle = gradient;
        if (reverse) {
            ctx.fillRect(x + width - fillWidth - 1, y + 1, fillWidth, height - 2);
        } else {
            ctx.fillRect(x + 1, y + 1, fillWidth, height - 2);
        }
        
        // 테두리
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);
        
        // SPECIAL 텍스트
        if (current >= 100) {
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = reverse ? 'right' : 'left';
            ctx.fillText('SPECIAL READY!', reverse ? x + width : x, y + height + 15);
        }
    }

    // 라운드 승리 표시
    renderRoundWins(ctx) {
        const y = 110;
        
        // 플레이어 승리
        for (let i = 0; i < this.wins.player; i++) {
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.arc(50 + i * 30, y, 10, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // 상대 승리
        for (let i = 0; i < this.wins.opponent; i++) {
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.arc(1230 - i * 30, y, 10, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 승부 체크
    checkVictory() {
        const player = this.fighters.player;
        const opponent = this.fighters.opponent;
        
        if (player.health <= 0 || opponent.health <= 0 || this.battleTimer <= 0) {
            // 라운드 종료
            if (player.health > opponent.health) {
                this.wins.player++;
            } else {
                this.wins.opponent++;
            }
            
            // 다음 라운드 또는 게임 종료
            if (this.wins.player >= 2) {
                this.gameState = 'victory';
                this.showResult('VICTORY!', '#22c55e');
            } else if (this.wins.opponent >= 2) {
                this.gameState = 'defeat';
                this.showResult('DEFEAT...', '#ef4444');
            } else {
                // 다음 라운드
                this.round++;
                this.resetRound();
            }
        }
    }

    // 라운드 리셋
    resetRound() {
        this.fighters.player.health = this.fighters.player.maxHealth;
        this.fighters.player.x = 300;
        this.fighters.player.state = 'idle';
        
        this.fighters.opponent.health = this.fighters.opponent.maxHealth;
        this.fighters.opponent.x = 900;
        this.fighters.opponent.state = 'idle';
        
        this.battleTimer = 99;
        this.specialGauge = { player: 0, opponent: 0 };
        this.comboCount = 0;
        
        // 라운드 시작 애니메이션
        this.showRoundStart();
    }

    // 라운드 시작 표시
    showRoundStart() {
        const ctx = this.ctx;
        const text = `ROUND ${this.round}`;
        
        let alpha = 0;
        let scale = 0.5;
        
        const animate = () => {
            // 배경
            this.renderBackground();
            this.renderFloor();
            this.renderFighter(this.fighters.player);
            this.renderFighter(this.fighters.opponent);
            this.renderUI();
            
            // 라운드 텍스트
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
            ctx.scale(scale, scale);
            
            ctx.font = 'bold 72px Arial';
            ctx.fillStyle = '#fbbf24';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 5;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            ctx.strokeText(text, 0, 0);
            ctx.fillText(text, 0, 0);
            
            ctx.restore();
            
            alpha = Math.min(1, alpha + 0.05);
            scale = Math.min(1, scale + 0.025);
            
            if (alpha < 1) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    // 페이드 아웃
                    const fadeOut = () => {
                        alpha -= 0.05;
                        if (alpha > 0) {
                            requestAnimationFrame(animate);
                            requestAnimationFrame(fadeOut);
                        }
                    };
                    fadeOut();
                }, 1000);
            }
        };
        
        animate();
    }

    // 결과 표시
    showResult(text, color) {
        const ctx = this.ctx;
        
        // 최종 화면
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 결과 텍스트
        ctx.font = 'bold 96px Arial';
        ctx.fillStyle = color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 5;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.strokeText(text, this.canvas.width / 2, this.canvas.height / 2 - 50);
        ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2 - 50);
        
        // 통계
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`최대 콤보: ${this.maxCombo}`, this.canvas.width / 2, this.canvas.height / 2 + 50);
        ctx.fillText(`라운드: ${this.round}`, this.canvas.width / 2, this.canvas.height / 2 + 90);
        
        // 효과음
        if (typeof GameEngine !== 'undefined') {
            GameEngine.playSound(this.gameState === 'victory' ? 'victory' : 'defeat');
        }
    }

    // 색상 밝게
    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }

    // 색상 어둡게
    darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }
}

// 전역 인스턴스
const BattleArena = new BattleArenaEnhanced();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BattleArena;
}