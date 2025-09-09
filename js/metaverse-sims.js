// MBTI 메타버스 타운 - 심즈 스타일 (업계 최고 수준 최적화)
class MBTIMetaverseSims {
    constructor() {
        // 최적화 시스템
        this.optimizer = typeof PerformanceOptimizer !== 'undefined' ? 
            new PerformanceOptimizer() : null;
        
        // 캔버스 설정
        this.canvas = null;
        this.ctx = null;
        this.isoCanvas = null; // 아이소메트릭 뷰용
        this.isoCtx = null;
        
        // 월드 설정
        this.world = {
            width: 100,  // 타일 단위
            height: 100,
            tileSize: 64,
            zoom: 1,
            camera: { x: 0, y: 0 },
            time: { hour: 8, minute: 0, day: 1 },
            weather: 'sunny'
        };
        
        // 심 관리
        this.sims = new Map();
        this.playerSim = null;
        this.selectedSim = null;
        
        // 건물 및 오브젝트
        this.buildings = new Map();
        this.objects = [];
        this.grid = [];
        
        // 상호작용
        this.interactions = [];
        this.activeQueues = new Map();
        
        // 경제 시스템
        this.economy = {
            playerMoney: 20000,
            jobMarket: [],
            shops: []
        };
        
        // 렌더링 최적화
        this.renderLayers = {
            terrain: null,
            buildings: null,
            objects: null,
            sims: null,
            effects: null,
            ui: null
        };
        
        // 청크 시스템 (대규모 월드 최적화)
        this.chunks = new Map();
        this.chunkSize = 16;
        this.activeChunks = new Set();
        
        // 패스파인딩
        this.pathfinder = new AStarPathfinder();
        
        // 입력 처리
        this.input = {
            mouse: { x: 0, y: 0, isDown: false, button: 0 },
            keys: {},
            touch: { active: false, x: 0, y: 0, startX: 0, startY: 0 }
        };
        
        // 성능 모니터링
        this.performance = {
            fps: 60,
            simCount: 0,
            objectCount: 0,
            drawCalls: 0
        };
        
        this.initWorld();
    }
    
    // 월드 초기화
    initWorld() {
        // 그리드 생성
        for (let y = 0; y < this.world.height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.world.width; x++) {
                this.grid[y][x] = {
                    terrain: this.getTerrainType(x, y),
                    building: null,
                    objects: [],
                    walkable: true,
                    owned: false
                };
            }
        }
        
        // MBTI 구역 생성
        this.createMBTIDistricts();
        
        // NPC 심 생성
        this.createNPCSims();
        
        // 상점 및 직장 생성
        this.createEconomyBuildings();
    }
    
    // MBTI 구역 생성
    createMBTIDistricts() {
        const districts = {
            'INTJ': { x: 10, y: 10, theme: 'tech', color: '#8b5cf6' },
            'ENTP': { x: 30, y: 10, theme: 'creative', color: '#f97316' },
            'INFJ': { x: 50, y: 10, theme: 'mystical', color: '#a855f7' },
            'ENFP': { x: 70, y: 10, theme: 'festival', color: '#ec4899' },
            'ISTJ': { x: 10, y: 30, theme: 'traditional', color: '#6b7280' },
            'ESFJ': { x: 30, y: 30, theme: 'social', color: '#f59e0b' },
            'ISTP': { x: 50, y: 30, theme: 'industrial', color: '#78716c' },
            'ESFP': { x: 70, y: 30, theme: 'entertainment', color: '#ef4444' },
            'INTP': { x: 10, y: 50, theme: 'laboratory', color: '#3b82f6' },
            'ENTJ': { x: 30, y: 50, theme: 'corporate', color: '#eab308' },
            'INFP': { x: 50, y: 50, theme: 'artistic', color: '#c084fc' },
            'ENFJ': { x: 70, y: 50, theme: 'community', color: '#84cc16' },
            'ISFJ': { x: 10, y: 70, theme: 'residential', color: '#10b981' },
            'ESTJ': { x: 30, y: 70, theme: 'government', color: '#0ea5e9' },
            'ISFP': { x: 50, y: 70, theme: 'nature', color: '#22c55e' },
            'ESTP': { x: 70, y: 70, theme: 'sports', color: '#dc2626' }
        };
        
        for (const [mbti, district] of Object.entries(districts)) {
            this.createDistrict(district.x, district.y, mbti, district.theme, district.color);
        }
    }
    
    // 구역 생성
    createDistrict(centerX, centerY, mbtiType, theme, color) {
        const size = 12;
        
        // 중앙 건물 (타운홀)
        this.placeBuilding(centerX, centerY, {
            type: 'townhall',
            mbti: mbtiType,
            name: `${mbtiType} 타운홀`,
            width: 3,
            height: 3,
            color: color,
            floors: 3
        });
        
        // 주거 건물
        for (let i = 0; i < 4; i++) {
            const angle = (Math.PI * 2 / 4) * i;
            const x = Math.floor(centerX + Math.cos(angle) * 5);
            const y = Math.floor(centerY + Math.sin(angle) * 5);
            
            this.placeBuilding(x, y, {
                type: 'house',
                mbti: mbtiType,
                name: `${mbtiType} 하우스 ${i + 1}`,
                width: 2,
                height: 2,
                color: color,
                floors: 2,
                residents: []
            });
        }
        
        // 특수 건물 (테마별)
        this.placeThemeBuilding(centerX + 3, centerY - 3, mbtiType, theme, color);
    }
    
    // 테마 건물 배치
    placeThemeBuilding(x, y, mbtiType, theme, color) {
        const themeBuildings = {
            'tech': { type: 'lab', name: '연구소', icon: '🔬' },
            'creative': { type: 'studio', name: '스튜디오', icon: '🎨' },
            'mystical': { type: 'temple', name: '명상원', icon: '🔮' },
            'festival': { type: 'stage', name: '공연장', icon: '🎪' },
            'traditional': { type: 'museum', name: '박물관', icon: '🏛️' },
            'social': { type: 'cafe', name: '카페', icon: '☕' },
            'industrial': { type: 'workshop', name: '공방', icon: '🔧' },
            'entertainment': { type: 'club', name: '클럽', icon: '🎤' },
            'laboratory': { type: 'library', name: '도서관', icon: '📚' },
            'corporate': { type: 'office', name: '오피스', icon: '🏢' },
            'artistic': { type: 'gallery', name: '갤러리', icon: '🖼️' },
            'community': { type: 'center', name: '커뮤니티센터', icon: '🤝' },
            'residential': { type: 'park', name: '공원', icon: '🌳' },
            'government': { type: 'courthouse', name: '법원', icon: '⚖️' },
            'nature': { type: 'garden', name: '정원', icon: '🌺' },
            'sports': { type: 'gym', name: '체육관', icon: '🏋️' }
        };
        
        const building = themeBuildings[theme];
        this.placeBuilding(x, y, {
            type: building.type,
            mbti: mbtiType,
            name: `${mbtiType} ${building.name}`,
            icon: building.icon,
            width: 3,
            height: 3,
            color: color,
            floors: 2,
            activities: this.getActivitiesForType(building.type)
        });
    }
    
    // 건물 배치
    placeBuilding(x, y, buildingData) {
        if (!this.canPlaceBuilding(x, y, buildingData.width, buildingData.height)) {
            return false;
        }
        
        const building = {
            id: `building_${Date.now()}_${Math.random()}`,
            x: x,
            y: y,
            ...buildingData,
            visitors: [],
            employees: [],
            level: 1,
            upgrades: []
        };
        
        // 그리드 업데이트
        for (let dy = 0; dy < buildingData.height; dy++) {
            for (let dx = 0; dx < buildingData.width; dx++) {
                if (this.grid[y + dy] && this.grid[y + dy][x + dx]) {
                    this.grid[y + dy][x + dx].building = building.id;
                    this.grid[y + dy][x + dx].walkable = false;
                }
            }
        }
        
        this.buildings.set(building.id, building);
        return building;
    }
    
    // 건물 배치 가능 여부 확인
    canPlaceBuilding(x, y, width, height) {
        for (let dy = 0; dy < height; dy++) {
            for (let dx = 0; dx < width; dx++) {
                if (!this.grid[y + dy] || !this.grid[y + dy][x + dx] || 
                    this.grid[y + dy][x + dx].building !== null) {
                    return false;
                }
            }
        }
        return true;
    }
    
    // NPC 심 생성
    createNPCSims() {
        const mbtiTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
                          'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
        
        // 각 MBTI 타입별로 5명씩 생성
        mbtiTypes.forEach(mbti => {
            for (let i = 0; i < 5; i++) {
                const sim = this.createSim({
                    name: this.generateRandomName(),
                    mbti: mbti,
                    age: 20 + Math.floor(Math.random() * 40),
                    x: 10 + Math.floor(Math.random() * 80),
                    y: 10 + Math.floor(Math.random() * 80),
                    isNPC: true
                });
                
                // AI 행동 패턴 설정
                sim.ai = new SimAI(sim, mbti);
                this.sims.set(sim.id, sim);
            }
        });
    }
    
    // 심 생성
    createSim(data) {
        return {
            id: `sim_${Date.now()}_${Math.random()}`,
            name: data.name,
            mbti: data.mbti,
            age: data.age,
            x: data.x,
            y: data.y,
            z: 0,
            targetX: data.x,
            targetY: data.y,
            path: [],
            speed: 0.1,
            direction: 'south',
            animation: 'idle',
            frame: 0,
            
            // 니즈 시스템 (심즈 스타일)
            needs: {
                hunger: 100,
                energy: 100,
                social: 100,
                hygiene: 100,
                fun: 100,
                bladder: 100,
                comfort: 100,
                environment: 100
            },
            
            // 관계 시스템
            relationships: new Map(),
            
            // 스킬
            skills: {
                cooking: 0,
                charisma: 0,
                logic: 0,
                creativity: 0,
                athletic: 0,
                handiness: 0
            },
            
            // 특성 (MBTI 기반)
            traits: this.getTraitsForMBTI(data.mbti),
            
            // 인벤토리
            inventory: [],
            money: 1000,
            
            // 직업
            job: null,
            jobLevel: 0,
            
            // 무드
            mood: 'happy',
            moodlets: [],
            
            // 액션 큐
            actionQueue: [],
            currentAction: null,
            
            // 집
            home: null,
            
            // 외형 커스터마이징
            appearance: {
                skinColor: this.randomChoice(['#fdbcb4', '#f0dcc0', '#e0ac7e', '#c68950', '#8d5524']),
                hairColor: this.randomChoice(['#000000', '#3c2415', '#b47129', '#d4af37', '#e85a3c']),
                hairStyle: this.randomChoice(['short', 'long', 'medium', 'bald']),
                clothing: this.getClothingForMBTI(data.mbti)
            },
            
            isNPC: data.isNPC || false
        };
    }
    
    // MBTI별 특성 설정
    getTraitsForMBTI(mbti) {
        const traits = {
            'INTJ': ['천재', '완벽주의자', '외톨이'],
            'INTP': ['천재', '책벌레', '게으름뱅이'],
            'ENTJ': ['야망가', '카리스마', '일벌레'],
            'ENTP': ['카리스마', '재치있는', '장난꾸러기'],
            'INFJ': ['예술적', '친절한', '신경질적'],
            'INFP': ['예술적', '선한', '몽상가'],
            'ENFJ': ['카리스마', '친절한', '가족지향적'],
            'ENFP': ['사교적', '낙관적', '유치한'],
            'ISTJ': ['일벌레', '깔끔한', '전통적'],
            'ISFJ': ['가족지향적', '친절한', '깔끔한'],
            'ESTJ': ['야망가', '운동광', '까다로운'],
            'ESFJ': ['사교적', '가족지향적', '파티광'],
            'ISTP': ['손재주', '컴퓨터광', '외톨이'],
            'ISFP': ['예술적', '자연애호가', '선한'],
            'ESTP': ['운동광', '용감한', '파티광'],
            'ESFP': ['파티광', '사교적', '유치한']
        };
        
        return traits[mbti] || ['평범한'];
    }
    
    // 플레이어 심 생성
    createPlayerSim(mbtiType, name) {
        const sim = this.createSim({
            name: name || `${mbtiType} 플레이어`,
            mbti: mbtiType,
            age: 25,
            x: 50,
            y: 50,
            isNPC: false
        });
        
        sim.money = 20000; // 시작 자금
        this.playerSim = sim;
        this.selectedSim = sim;
        this.sims.set(sim.id, sim);
        
        // 카메라를 플레이어에게 포커스
        this.focusCamera(sim.x, sim.y);
        
        return sim;
    }
    
    // 게임 시작
    startGame(container, mbtiType) {
        // 캔버스 생성
        this.setupCanvas(container);
        
        // 플레이어 심 생성
        this.createPlayerSim(mbtiType);
        
        // 입력 이벤트 설정
        this.setupInputEvents();
        
        // 렌더 레이어 초기화
        this.initRenderLayers();
        
        // 게임 루프 시작
        this.startGameLoop();
        
        // UI 생성
        this.createUI(container);
    }
    
    // 캔버스 설정
    setupCanvas(container) {
        // 메인 캔버스
        this.canvas = document.createElement('canvas');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight - 200; // UI 공간 확보
        this.ctx = this.canvas.getContext('2d', {
            alpha: false,
            desynchronized: true
        });
        
        // 아이소메트릭 뷰 캔버스
        this.isoCanvas = document.createElement('canvas');
        this.isoCanvas.width = this.canvas.width;
        this.isoCanvas.height = this.canvas.height;
        this.isoCtx = this.isoCanvas.getContext('2d');
        
        container.innerHTML = '';
        container.appendChild(this.canvas);
        
        // GPU 가속
        this.canvas.style.willChange = 'transform';
        this.canvas.style.transform = 'translateZ(0)';
    }
    
    // 렌더 레이어 초기화
    initRenderLayers() {
        // 각 레이어를 오프스크린 캔버스로 생성
        const layers = ['terrain', 'buildings', 'objects', 'sims', 'effects', 'ui'];
        
        layers.forEach(layer => {
            const canvas = document.createElement('canvas');
            canvas.width = this.canvas.width;
            canvas.height = this.canvas.height;
            this.renderLayers[layer] = {
                canvas: canvas,
                ctx: canvas.getContext('2d'),
                needsUpdate: true
            };
        });
        
        // 지형 레이어는 한 번만 그리면 됨
        this.renderTerrainLayer();
    }
    
    // 게임 루프
    startGameLoop() {
        let lastTime = 0;
        const targetFPS = 60;
        const frameTime = 1000 / targetFPS;
        let accumulator = 0;
        
        const gameLoop = (currentTime) => {
            const deltaTime = Math.min(currentTime - lastTime, 100);
            lastTime = currentTime;
            
            accumulator += deltaTime;
            
            // 고정 타임스텝 업데이트
            while (accumulator >= frameTime) {
                this.update(frameTime);
                accumulator -= frameTime;
            }
            
            // 보간을 사용한 렌더링
            const interpolation = accumulator / frameTime;
            this.render(interpolation);
            
            // 성능 모니터링
            if (this.optimizer) {
                this.optimizer.adjustQualityDynamically(deltaTime);
            }
            
            requestAnimationFrame(gameLoop);
        };
        
        requestAnimationFrame(gameLoop);
    }
    
    // 업데이트
    update(dt) {
        // 시간 업데이트
        this.updateTime(dt);
        
        // 청크 관리
        this.updateChunks();
        
        // 심 업데이트 (활성 청크만)
        for (const sim of this.sims.values()) {
            if (this.isInActiveChunk(sim.x, sim.y)) {
                this.updateSim(sim, dt);
            }
        }
        
        // 건물 업데이트
        for (const building of this.buildings.values()) {
            if (this.isInActiveChunk(building.x, building.y)) {
                this.updateBuilding(building, dt);
            }
        }
        
        // 카메라 업데이트
        this.updateCamera(dt);
    }
    
    // 심 업데이트
    updateSim(sim, dt) {
        // 니즈 감소
        this.updateNeeds(sim, dt);
        
        // AI 행동 (NPC만)
        if (sim.isNPC && sim.ai) {
            sim.ai.update(dt);
        }
        
        // 현재 액션 처리
        if (sim.currentAction) {
            this.processAction(sim, sim.currentAction, dt);
        } else if (sim.actionQueue.length > 0) {
            sim.currentAction = sim.actionQueue.shift();
        }
        
        // 이동 처리
        if (sim.path && sim.path.length > 0) {
            this.moveSim(sim, dt);
        }
        
        // 애니메이션 업데이트
        sim.frame = (sim.frame + dt * 0.01) % 4;
    }
    
    // 니즈 업데이트
    updateNeeds(sim, dt) {
        const decayRates = {
            hunger: 0.01,
            energy: 0.008,
            social: 0.006,
            hygiene: 0.007,
            fun: 0.009,
            bladder: 0.012,
            comfort: 0.005,
            environment: 0.003
        };
        
        for (const [need, rate] of Object.entries(decayRates)) {
            sim.needs[need] = Math.max(0, sim.needs[need] - rate * dt * 0.1);
            
            // 니즈가 낮으면 무드에 영향
            if (sim.needs[need] < 30) {
                this.addMoodlet(sim, `low_${need}`, -10, `${need} 부족`);
            }
        }
        
        // 전체 무드 계산
        this.calculateMood(sim);
    }
    
    // 렌더링 (최적화)
    render(interpolation) {
        // 활성 청크만 렌더링
        const visibleChunks = this.getVisibleChunks();
        
        // 레이어별 업데이트 필요 체크
        if (this.renderLayers.buildings.needsUpdate) {
            this.renderBuildingsLayer(visibleChunks);
        }
        
        if (this.renderLayers.sims.needsUpdate) {
            this.renderSimsLayer(visibleChunks, interpolation);
        }
        
        // 최종 합성
        this.composeLayers();
        
        // UI 렌더링
        this.renderUI();
        
        this.performance.drawCalls = visibleChunks.size * 4; // 대략적인 드로우콜
    }
    
    // 레이어 합성
    composeLayers() {
        const ctx = this.ctx;
        
        // 각 레이어를 순서대로 그리기
        ctx.drawImage(this.renderLayers.terrain.canvas, 0, 0);
        ctx.drawImage(this.renderLayers.buildings.canvas, 0, 0);
        ctx.drawImage(this.renderLayers.objects.canvas, 0, 0);
        ctx.drawImage(this.renderLayers.sims.canvas, 0, 0);
        ctx.drawImage(this.renderLayers.effects.canvas, 0, 0);
    }
    
    // 지형 레이어 렌더링
    renderTerrainLayer() {
        const ctx = this.renderLayers.terrain.ctx;
        const tileSize = this.world.tileSize * this.world.zoom;
        
        for (let y = 0; y < this.world.height; y++) {
            for (let x = 0; x < this.world.width; x++) {
                const tile = this.grid[y][x];
                const screenPos = this.worldToScreen(x, y);
                
                // 아이소메트릭 타일 그리기
                ctx.save();
                ctx.translate(screenPos.x, screenPos.y);
                
                // 타일 색상
                ctx.fillStyle = tile.terrain === 'grass' ? '#4ade80' : 
                               tile.terrain === 'dirt' ? '#92400e' : 
                               tile.terrain === 'water' ? '#3b82f6' : '#9ca3af';
                
                // 다이아몬드 모양 타일
                ctx.beginPath();
                ctx.moveTo(0, -tileSize/4);
                ctx.lineTo(tileSize/2, 0);
                ctx.lineTo(0, tileSize/4);
                ctx.lineTo(-tileSize/2, 0);
                ctx.closePath();
                ctx.fill();
                
                // 그리드 라인 (옵션)
                if (this.optimizer?.qualitySettings.effectQuality === 'high') {
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                    ctx.stroke();
                }
                
                ctx.restore();
            }
        }
        
        this.renderLayers.terrain.needsUpdate = false;
    }
    
    // 건물 레이어 렌더링
    renderBuildingsLayer(visibleChunks) {
        const ctx = this.renderLayers.buildings.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        for (const building of this.buildings.values()) {
            const chunk = this.getChunkForPosition(building.x, building.y);
            if (!visibleChunks.has(chunk)) continue;
            
            this.renderBuilding(ctx, building);
        }
        
        this.renderLayers.buildings.needsUpdate = false;
    }
    
    // 건물 렌더링
    renderBuilding(ctx, building) {
        const screenPos = this.worldToScreen(building.x, building.y);
        const tileSize = this.world.tileSize * this.world.zoom;
        
        ctx.save();
        ctx.translate(screenPos.x, screenPos.y);
        
        // 건물 베이스
        ctx.fillStyle = building.color || '#6b7280';
        ctx.fillRect(
            -tileSize * building.width / 2,
            -tileSize * building.height / 2 - building.floors * 20,
            tileSize * building.width,
            tileSize * building.height + building.floors * 20
        );
        
        // 층 구분선
        for (let floor = 1; floor <= building.floors; floor++) {
            ctx.strokeStyle = 'rgba(0,0,0,0.2)';
            ctx.beginPath();
            ctx.moveTo(-tileSize * building.width / 2, -floor * 20);
            ctx.lineTo(tileSize * building.width / 2, -floor * 20);
            ctx.stroke();
        }
        
        // 창문
        if (this.optimizer?.qualitySettings.effectQuality !== 'low') {
            ctx.fillStyle = this.world.time.hour >= 18 || this.world.time.hour < 6 ? 
                           '#fbbf24' : '#60a5fa';
            for (let floor = 0; floor < building.floors; floor++) {
                for (let window = 0; window < building.width; window++) {
                    ctx.fillRect(
                        -tileSize * building.width / 2 + window * tileSize + 10,
                        -floor * 20 - 15,
                        tileSize - 20,
                        10
                    );
                }
            }
        }
        
        // 건물 이름
        if (this.world.zoom > 0.8) {
            ctx.font = '12px Arial';
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.fillText(building.name, 0, -building.floors * 20 - 10);
        }
        
        // 아이콘
        if (building.icon) {
            ctx.font = '24px Arial';
            ctx.fillText(building.icon, 0, 0);
        }
        
        ctx.restore();
    }
    
    // 심 레이어 렌더링
    renderSimsLayer(visibleChunks, interpolation) {
        const ctx = this.renderLayers.sims.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Z-정렬 (아래쪽 심이 위에 그려짐)
        const sortedSims = Array.from(this.sims.values())
            .filter(sim => {
                const chunk = this.getChunkForPosition(sim.x, sim.y);
                return visibleChunks.has(chunk);
            })
            .sort((a, b) => a.y - b.y);
        
        for (const sim of sortedSims) {
            this.renderSim(ctx, sim, interpolation);
        }
        
        this.renderLayers.sims.needsUpdate = false;
    }
    
    // 심 렌더링
    renderSim(ctx, sim, interpolation) {
        // 보간된 위치 계산
        const x = sim.x + (sim.targetX - sim.x) * interpolation;
        const y = sim.y + (sim.targetY - sim.y) * interpolation;
        const screenPos = this.worldToScreen(x, y);
        
        ctx.save();
        ctx.translate(screenPos.x, screenPos.y - 20); // 높이 오프셋
        
        // 그림자
        if (this.optimizer?.qualitySettings.shadowQuality !== 'off') {
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.ellipse(0, 20, 15, 8, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // 심 몸체 (간단한 표현)
        const size = 30 * this.world.zoom;
        
        // 몸
        ctx.fillStyle = sim.appearance.clothing || '#4b5563';
        ctx.fillRect(-size/2, -size, size, size);
        
        // 머리
        ctx.fillStyle = sim.appearance.skinColor;
        ctx.beginPath();
        ctx.arc(0, -size * 1.3, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        // 머리카락
        ctx.fillStyle = sim.appearance.hairColor;
        ctx.beginPath();
        ctx.arc(0, -size * 1.4, size * 0.35, Math.PI, 0);
        ctx.fill();
        
        // 선택 표시
        if (sim === this.selectedSim) {
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, -size/2, size * 0.8, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // 니즈 바 (선택된 심만)
        if (sim === this.selectedSim && this.world.zoom > 0.7) {
            this.renderNeedsBars(ctx, sim, -size, -size * 2);
        }
        
        // 이름 표시
        if (this.world.zoom > 0.9) {
            ctx.font = '12px Arial';
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.fillText(sim.name, 0, -size * 1.8);
        }
        
        // 말풍선 (액션 중)
        if (sim.currentAction && sim.currentAction.icon) {
            ctx.font = '20px Arial';
            ctx.fillText(sim.currentAction.icon, 0, -size * 2.5);
        }
        
        ctx.restore();
    }
    
    // 니즈 바 렌더링
    renderNeedsBars(ctx, sim, x, y) {
        const needs = ['hunger', 'energy', 'social', 'fun'];
        const colors = {
            hunger: '#f59e0b',
            energy: '#10b981',
            social: '#3b82f6',
            fun: '#ec4899'
        };
        
        needs.forEach((need, index) => {
            const value = sim.needs[need];
            const barY = y + index * 8;
            
            // 배경
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(x, barY, 40, 6);
            
            // 값
            ctx.fillStyle = value < 30 ? '#ef4444' : colors[need];
            ctx.fillRect(x, barY, 40 * (value / 100), 6);
        });
    }
    
    // UI 생성
    createUI(container) {
        const uiDiv = document.createElement('div');
        uiDiv.id = 'metaverse-ui';
        uiDiv.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 200px;
            background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
            color: white;
            padding: 20px;
            display: flex;
            gap: 20px;
        `;
        
        // 심 정보 패널
        const simPanel = document.createElement('div');
        simPanel.id = 'sim-panel';
        simPanel.style.cssText = 'flex: 1; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 10px;';
        
        // 액션 패널
        const actionPanel = document.createElement('div');
        actionPanel.id = 'action-panel';
        actionPanel.style.cssText = 'flex: 1; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 10px;';
        
        // 빌드 패널
        const buildPanel = document.createElement('div');
        buildPanel.id = 'build-panel';
        buildPanel.style.cssText = 'flex: 1; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 10px;';
        
        uiDiv.appendChild(simPanel);
        uiDiv.appendChild(actionPanel);
        uiDiv.appendChild(buildPanel);
        
        container.appendChild(uiDiv);
        
        this.updateUI();
    }
    
    // UI 업데이트
    updateUI() {
        if (!this.selectedSim) return;
        
        const simPanel = document.getElementById('sim-panel');
        if (simPanel) {
            simPanel.innerHTML = `
                <h3>${this.selectedSim.name} (${this.selectedSim.mbti})</h3>
                <div>💰 ${this.selectedSim.money}</div>
                <div>😊 ${this.selectedSim.mood}</div>
                <div>🏠 ${this.selectedSim.home ? '집 있음' : '집 없음'}</div>
            `;
        }
    }
    
    // 월드 좌표를 스크린 좌표로 변환 (아이소메트릭)
    worldToScreen(x, y) {
        const tileSize = this.world.tileSize * this.world.zoom;
        const screenX = (x - y) * tileSize / 2 + this.canvas.width / 2 - this.world.camera.x;
        const screenY = (x + y) * tileSize / 4 + this.canvas.height / 4 - this.world.camera.y;
        return { x: screenX, y: screenY };
    }
    
    // 스크린 좌표를 월드 좌표로 변환
    screenToWorld(screenX, screenY) {
        const tileSize = this.world.tileSize * this.world.zoom;
        const offsetX = screenX - this.canvas.width / 2 + this.world.camera.x;
        const offsetY = screenY - this.canvas.height / 4 + this.world.camera.y;
        
        const x = (offsetX / (tileSize / 2) + offsetY / (tileSize / 4)) / 2;
        const y = (offsetY / (tileSize / 4) - offsetX / (tileSize / 2)) / 2;
        
        return { x: Math.floor(x), y: Math.floor(y) };
    }
    
    // 청크 시스템
    getChunkForPosition(x, y) {
        const chunkX = Math.floor(x / this.chunkSize);
        const chunkY = Math.floor(y / this.chunkSize);
        return `${chunkX},${chunkY}`;
    }
    
    updateChunks() {
        // 카메라 주변의 활성 청크 계산
        const centerX = this.world.camera.x / (this.world.tileSize * this.world.zoom);
        const centerY = this.world.camera.y / (this.world.tileSize * this.world.zoom);
        
        this.activeChunks.clear();
        const range = 3; // 활성 청크 범위
        
        for (let dx = -range; dx <= range; dx++) {
            for (let dy = -range; dy <= range; dy++) {
                const chunk = this.getChunkForPosition(
                    centerX + dx * this.chunkSize,
                    centerY + dy * this.chunkSize
                );
                this.activeChunks.add(chunk);
            }
        }
    }
    
    getVisibleChunks() {
        return this.activeChunks;
    }
    
    isInActiveChunk(x, y) {
        const chunk = this.getChunkForPosition(x, y);
        return this.activeChunks.has(chunk);
    }
    
    // 지형 타입 결정 (Perlin Noise 시뮬레이션)
    getTerrainType(x, y) {
        const noise = (Math.sin(x * 0.1) + Math.sin(y * 0.1)) / 2;
        if (noise < -0.3) return 'water';
        if (noise < 0.3) return 'grass';
        if (noise < 0.6) return 'dirt';
        return 'stone';
    }
    
    // 유틸리티 함수들
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    generateRandomName() {
        const firstNames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'];
        const lastNames = ['민수', '지영', '서연', '도윤', '서준', '하은', '지우', '서윤', '민준', '채원'];
        return this.randomChoice(firstNames) + this.randomChoice(lastNames);
    }
    
    getClothingForMBTI(mbti) {
        const styles = {
            'INTJ': '#4c1d95', 'INTP': '#1e3a8a', 'ENTJ': '#7c2d12', 'ENTP': '#ea580c',
            'INFJ': '#581c87', 'INFP': '#831843', 'ENFJ': '#713f12', 'ENFP': '#be185d',
            'ISTJ': '#1f2937', 'ISFJ': '#064e3b', 'ESTJ': '#1e293b', 'ESFJ': '#7c2d12',
            'ISTP': '#44403c', 'ISFP': '#134e4a', 'ESTP': '#7f1d1d', 'ESFP': '#be123c'
        };
        return styles[mbti] || '#6b7280';
    }
    
    getActivitiesForType(type) {
        const activities = {
            'lab': ['연구하기', '실험하기', '발명하기'],
            'studio': ['그림 그리기', '음악 만들기', '창작하기'],
            'temple': ['명상하기', '기도하기', '상담하기'],
            'stage': ['공연하기', '춤추기', '노래하기'],
            'museum': ['관람하기', '역사 공부', '전시하기'],
            'cafe': ['커피 마시기', '대화하기', '독서하기'],
            'workshop': ['만들기', '수리하기', '제작하기'],
            'club': ['파티하기', '춤추기', 'DJ하기'],
            'library': ['독서하기', '공부하기', '연구하기'],
            'office': ['일하기', '회의하기', '계획하기'],
            'gallery': ['감상하기', '전시하기', '비평하기'],
            'center': ['봉사하기', '모임하기', '상담하기'],
            'park': ['산책하기', '운동하기', '휴식하기'],
            'courthouse': ['재판하기', '중재하기', '판결하기'],
            'garden': ['정원 가꾸기', '꽃 감상', '휴식하기'],
            'gym': ['운동하기', '훈련하기', '경기하기']
        };
        return activities[type] || ['활동하기'];
    }
    
    // 카메라 포커스
    focusCamera(x, y) {
        const screenPos = this.worldToScreen(x, y);
        this.world.camera.x = screenPos.x - this.canvas.width / 2;
        this.world.camera.y = screenPos.y - this.canvas.height / 2;
    }
    
    updateCamera(dt) {
        // 부드러운 카메라 이동
        if (this.selectedSim && !this.input.mouse.isDown) {
            const targetPos = this.worldToScreen(this.selectedSim.x, this.selectedSim.y);
            const dx = (targetPos.x - this.canvas.width / 2) - this.world.camera.x;
            const dy = (targetPos.y - this.canvas.height / 2) - this.world.camera.y;
            
            this.world.camera.x += dx * 0.05;
            this.world.camera.y += dy * 0.05;
        }
    }
    
    // 입력 이벤트 설정
    setupInputEvents() {
        // 마우스 이벤트
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));
        
        // 터치 이벤트
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // 키보드 이벤트
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }
    
    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.input.mouse.x = e.clientX - rect.left;
        this.input.mouse.y = e.clientY - rect.top;
        this.input.mouse.isDown = true;
        this.input.mouse.button = e.button;
        
        if (e.button === 0) { // 좌클릭
            const worldPos = this.screenToWorld(this.input.mouse.x, this.input.mouse.y);
            this.handleClick(worldPos.x, worldPos.y);
        }
    }
    
    handleClick(worldX, worldY) {
        // 심 선택
        for (const sim of this.sims.values()) {
            if (Math.abs(sim.x - worldX) < 1 && Math.abs(sim.y - worldY) < 1) {
                this.selectedSim = sim;
                this.updateUI();
                return;
            }
        }
        
        // 이동 명령 (플레이어 심만)
        if (this.selectedSim && !this.selectedSim.isNPC) {
            this.commandSimMove(this.selectedSim, worldX, worldY);
        }
    }
    
    commandSimMove(sim, targetX, targetY) {
        // 경로 찾기
        const path = this.pathfinder.findPath(
            Math.floor(sim.x), Math.floor(sim.y),
            Math.floor(targetX), Math.floor(targetY),
            this.grid
        );
        
        if (path) {
            sim.path = path;
            sim.targetX = targetX;
            sim.targetY = targetY;
            sim.animation = 'walk';
        }
    }
    
    moveSim(sim, dt) {
        if (!sim.path || sim.path.length === 0) {
            sim.animation = 'idle';
            return;
        }
        
        const target = sim.path[0];
        const dx = target.x - sim.x;
        const dy = target.y - sim.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 0.1) {
            sim.x = target.x;
            sim.y = target.y;
            sim.path.shift();
        } else {
            const moveSpeed = sim.speed * dt * 0.01;
            sim.x += (dx / distance) * moveSpeed;
            sim.y += (dy / distance) * moveSpeed;
            
            // 방향 설정
            if (Math.abs(dx) > Math.abs(dy)) {
                sim.direction = dx > 0 ? 'east' : 'west';
            } else {
                sim.direction = dy > 0 ? 'south' : 'north';
            }
        }
    }
    
    handleWheel(e) {
        e.preventDefault();
        const zoomSpeed = 0.1;
        const zoomDirection = e.deltaY < 0 ? 1 : -1;
        
        this.world.zoom = Math.max(0.5, Math.min(2, 
            this.world.zoom + zoomDirection * zoomSpeed));
        
        // 모든 레이어 업데이트 필요
        Object.values(this.renderLayers).forEach(layer => {
            layer.needsUpdate = true;
        });
    }
    
    updateTime(dt) {
        // 게임 시간 업데이트 (1초 = 1분)
        this.world.time.minute += dt * 0.06;
        
        if (this.world.time.minute >= 60) {
            this.world.time.minute = 0;
            this.world.time.hour++;
            
            if (this.world.time.hour >= 24) {
                this.world.time.hour = 0;
                this.world.time.day++;
            }
            
            // 시간대별 조명 변경
            this.updateLighting();
        }
    }
    
    updateLighting() {
        // 시간대별 조명 효과는 렌더링 시 적용
        this.renderLayers.terrain.needsUpdate = true;
        this.renderLayers.buildings.needsUpdate = true;
    }
    
    // 나머지 필요한 함수들...
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.input.mouse.x = e.clientX - rect.left;
        this.input.mouse.y = e.clientY - rect.top;
    }
    
    handleMouseUp(e) {
        this.input.mouse.isDown = false;
    }
    
    handleTouchStart(e) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.input.touch.startX = touch.clientX - rect.left;
        this.input.touch.startY = touch.clientY - rect.top;
        this.input.touch.active = true;
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.input.touch.x = touch.clientX - rect.left;
        this.input.touch.y = touch.clientY - rect.top;
    }
    
    handleTouchEnd(e) {
        this.input.touch.active = false;
    }
    
    handleKeyDown(e) {
        this.input.keys[e.key] = true;
    }
    
    handleKeyUp(e) {
        this.input.keys[e.key] = false;
    }
    
    renderUI() {
        // UI 업데이트는 별도 함수로
        if (this.performance.frameCount % 30 === 0) {
            this.updateUI();
        }
    }
    
    updateBuilding(building, dt) {
        // 건물 업데이트 로직
    }
    
    processAction(sim, action, dt) {
        // 액션 처리 로직
    }
    
    addMoodlet(sim, id, value, description) {
        sim.moodlets.push({ id, value, description, time: Date.now() });
    }
    
    calculateMood(sim) {
        const totalMood = sim.moodlets.reduce((sum, m) => sum + m.value, 0);
        const avgNeeds = Object.values(sim.needs).reduce((a, b) => a + b) / 8;
        
        if (avgNeeds > 70 && totalMood >= 0) sim.mood = 'happy';
        else if (avgNeeds > 50) sim.mood = 'neutral';
        else if (avgNeeds > 30) sim.mood = 'uncomfortable';
        else sim.mood = 'miserable';
    }
}

// A* 패스파인딩 알고리즘
class AStarPathfinder {
    findPath(startX, startY, endX, endY, grid) {
        const openSet = [];
        const closedSet = new Set();
        const start = { x: startX, y: startY, g: 0, h: 0, f: 0, parent: null };
        const end = { x: endX, y: endY };
        
        openSet.push(start);
        
        while (openSet.length > 0) {
            // F값이 가장 낮은 노드 찾기
            let current = openSet[0];
            let currentIndex = 0;
            
            for (let i = 1; i < openSet.length; i++) {
                if (openSet[i].f < current.f) {
                    current = openSet[i];
                    currentIndex = i;
                }
            }
            
            // 목표 도달
            if (current.x === end.x && current.y === end.y) {
                const path = [];
                let temp = current;
                while (temp) {
                    path.unshift({ x: temp.x, y: temp.y });
                    temp = temp.parent;
                }
                return path;
            }
            
            openSet.splice(currentIndex, 1);
            closedSet.add(`${current.x},${current.y}`);
            
            // 이웃 노드 확인
            const neighbors = [
                { x: current.x + 1, y: current.y },
                { x: current.x - 1, y: current.y },
                { x: current.x, y: current.y + 1 },
                { x: current.x, y: current.y - 1 }
            ];
            
            for (const neighbor of neighbors) {
                // 유효성 체크
                if (neighbor.x < 0 || neighbor.x >= grid[0].length ||
                    neighbor.y < 0 || neighbor.y >= grid.length ||
                    !grid[neighbor.y][neighbor.x].walkable ||
                    closedSet.has(`${neighbor.x},${neighbor.y}`)) {
                    continue;
                }
                
                const g = current.g + 1;
                const h = Math.abs(neighbor.x - end.x) + Math.abs(neighbor.y - end.y);
                const f = g + h;
                
                const existing = openSet.find(n => n.x === neighbor.x && n.y === neighbor.y);
                if (existing) {
                    if (g < existing.g) {
                        existing.g = g;
                        existing.f = f;
                        existing.parent = current;
                    }
                } else {
                    openSet.push({
                        x: neighbor.x,
                        y: neighbor.y,
                        g: g,
                        h: h,
                        f: f,
                        parent: current
                    });
                }
            }
        }
        
        return null; // 경로 없음
    }
}

// 심 AI 시스템
class SimAI {
    constructor(sim, mbtiType) {
        this.sim = sim;
        this.mbtiType = mbtiType;
        this.decisionTimer = 0;
        this.currentGoal = null;
    }
    
    update(dt) {
        this.decisionTimer += dt;
        
        // 5초마다 새로운 결정
        if (this.decisionTimer > 5000) {
            this.decisionTimer = 0;
            this.makeDecision();
        }
    }
    
    makeDecision() {
        // 가장 낮은 니즈 찾기
        let lowestNeed = null;
        let lowestValue = 100;
        
        for (const [need, value] of Object.entries(this.sim.needs)) {
            if (value < lowestValue) {
                lowestNeed = need;
                lowestValue = value;
            }
        }
        
        // 니즈 충족 액션 결정
        if (lowestValue < 50) {
            this.fulfillNeed(lowestNeed);
        } else {
            // MBTI 기반 자율 행동
            this.autonomousBehavior();
        }
    }
    
    fulfillNeed(need) {
        // 니즈별 액션 매핑
        const needActions = {
            hunger: { action: 'eat', target: 'kitchen', icon: '🍔' },
            energy: { action: 'sleep', target: 'bed', icon: '😴' },
            social: { action: 'talk', target: 'sim', icon: '💬' },
            hygiene: { action: 'shower', target: 'bathroom', icon: '🚿' },
            fun: { action: 'play', target: 'entertainment', icon: '🎮' },
            bladder: { action: 'toilet', target: 'bathroom', icon: '🚽' },
            comfort: { action: 'sit', target: 'chair', icon: '🪑' },
            environment: { action: 'clean', target: 'room', icon: '🧹' }
        };
        
        const action = needActions[need];
        if (action) {
            this.sim.actionQueue.push(action);
        }
    }
    
    autonomousBehavior() {
        // MBTI별 선호 행동
        const behaviors = {
            'I': ['read', 'meditate', 'hobby'],
            'E': ['socialize', 'party', 'explore'],
            'N': ['create', 'think', 'imagine'],
            'S': ['exercise', 'cook', 'garden'],
            'T': ['study', 'work', 'analyze'],
            'F': ['help', 'chat', 'express'],
            'J': ['organize', 'plan', 'complete'],
            'P': ['explore', 'play', 'discover']
        };
        
        // MBTI 글자별로 행동 선택
        const possibleActions = [];
        for (const letter of this.mbtiType) {
            if (behaviors[letter]) {
                possibleActions.push(...behaviors[letter]);
            }
        }
        
        if (possibleActions.length > 0) {
            const action = possibleActions[Math.floor(Math.random() * possibleActions.length)];
            this.sim.actionQueue.push({ action: action, icon: '✨' });
        }
    }
}

// 전역 인스턴스 (심즈 스타일)
const MBTIMetaverseSim = new MBTIMetaverseSims();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MBTIMetaverseSims;
}