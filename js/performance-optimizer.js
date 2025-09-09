// 업계 최고 수준의 성능 최적화 시스템
class PerformanceOptimizer {
    constructor() {
        this.deviceProfile = this.detectDevice();
        this.qualitySettings = this.determineQuality();
        this.frameTimeTarget = 16.67; // 60 FPS
        this.performanceHistory = [];
        this.autoAdjust = true;
        this.objectPool = new Map();
        this.renderBatch = [];
        this.lastGC = 0;
    }

    // 디바이스 감지 및 프로파일링
    detectDevice() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        
        const profile = {
            cpu: navigator.hardwareConcurrency || 4,
            memory: navigator.deviceMemory || 4,
            gpu: gl ? this.getGPUTier(gl) : 'low',
            connection: navigator.connection?.effectiveType || '4g',
            platform: navigator.platform,
            isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
            isAppleSilicon: /Mac/.test(navigator.platform) && navigator.maxTouchPoints > 0,
            pixelRatio: Math.min(window.devicePixelRatio || 1, 2) // 최대 2x로 제한
        };

        // M4 MacBook 감지
        if (profile.isAppleSilicon && profile.cpu >= 8) {
            profile.tier = 'ultra';
        } else if (profile.cpu >= 8 && profile.memory >= 8) {
            profile.tier = 'high';
        } else if (profile.cpu >= 4 && profile.memory >= 4) {
            profile.tier = 'medium';
        } else {
            profile.tier = 'low';
        }

        return profile;
    }

    // GPU 티어 판단
    getGPUTier(gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            
            // Apple GPU 감지
            if (/Apple/.test(renderer)) {
                if (/M[234]/.test(renderer)) return 'ultra';
                return 'high';
            }
            
            // NVIDIA/AMD 고성능 GPU
            if (/RTX|GTX|Radeon/i.test(renderer)) {
                if (/4090|4080|4070|3090|3080/.test(renderer)) return 'ultra';
                if (/4060|3070|3060|2080|2070/.test(renderer)) return 'high';
                return 'medium';
            }
        }
        
        // 최대 텍스처 크기로 판단
        const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        if (maxTexture >= 16384) return 'high';
        if (maxTexture >= 8192) return 'medium';
        return 'low';
    }

    // 품질 설정 결정
    determineQuality() {
        const tier = this.deviceProfile.tier;
        
        const qualityPresets = {
            ultra: {
                resolution: 1.0,
                particleCount: 1000,
                shadowQuality: 'high',
                effectQuality: 'high',
                antialiasing: true,
                postProcessing: true,
                reflections: true,
                physicsIterations: 10,
                soundChannels: 32,
                targetFPS: 120
            },
            high: {
                resolution: 1.0,
                particleCount: 500,
                shadowQuality: 'medium',
                effectQuality: 'high',
                antialiasing: true,
                postProcessing: true,
                reflections: false,
                physicsIterations: 8,
                soundChannels: 16,
                targetFPS: 60
            },
            medium: {
                resolution: 0.9,
                particleCount: 200,
                shadowQuality: 'low',
                effectQuality: 'medium',
                antialiasing: false,
                postProcessing: true,
                reflections: false,
                physicsIterations: 5,
                soundChannels: 8,
                targetFPS: 60
            },
            low: {
                resolution: 0.75,
                particleCount: 50,
                shadowQuality: 'off',
                effectQuality: 'low',
                antialiasing: false,
                postProcessing: false,
                reflections: false,
                physicsIterations: 3,
                soundChannels: 4,
                targetFPS: 30
            }
        };

        return qualityPresets[tier];
    }

    // 동적 품질 조정
    adjustQualityDynamically(frameTime) {
        this.performanceHistory.push(frameTime);
        
        // 최근 60프레임의 평균 계산
        if (this.performanceHistory.length > 60) {
            this.performanceHistory.shift();
        }
        
        if (this.performanceHistory.length >= 30) {
            const avgFrameTime = this.performanceHistory.reduce((a, b) => a + b) / this.performanceHistory.length;
            const targetTime = 1000 / this.qualitySettings.targetFPS;
            
            // 성능이 목표보다 20% 이상 나쁘면 품질 감소
            if (avgFrameTime > targetTime * 1.2) {
                this.decreaseQuality();
            }
            // 성능이 목표보다 50% 이상 좋으면 품질 증가
            else if (avgFrameTime < targetTime * 0.5 && this.performanceHistory.every(ft => ft < targetTime * 0.7)) {
                this.increaseQuality();
            }
        }
    }

    // 품질 감소
    decreaseQuality() {
        const settings = this.qualitySettings;
        
        if (settings.particleCount > 50) {
            settings.particleCount = Math.floor(settings.particleCount * 0.7);
        }
        if (settings.resolution > 0.5) {
            settings.resolution -= 0.1;
        }
        if (settings.postProcessing) {
            settings.postProcessing = false;
        } else if (settings.antialiasing) {
            settings.antialiasing = false;
        }
        
        console.log('품질 자동 감소:', settings);
    }

    // 품질 증가
    increaseQuality() {
        const settings = this.qualitySettings;
        const original = this.determineQuality();
        
        if (settings.resolution < original.resolution) {
            settings.resolution = Math.min(settings.resolution + 0.1, original.resolution);
        }
        if (!settings.antialiasing && original.antialiasing) {
            settings.antialiasing = true;
        }
        if (!settings.postProcessing && original.postProcessing) {
            settings.postProcessing = true;
        }
        if (settings.particleCount < original.particleCount) {
            settings.particleCount = Math.min(settings.particleCount * 1.3, original.particleCount);
        }
        
        console.log('품질 자동 증가:', settings);
    }

    // 오브젝트 풀링
    getFromPool(type, createFn) {
        if (!this.objectPool.has(type)) {
            this.objectPool.set(type, []);
        }
        
        const pool = this.objectPool.get(type);
        
        if (pool.length > 0) {
            return pool.pop();
        }
        
        return createFn();
    }

    returnToPool(type, object) {
        if (!this.objectPool.has(type)) {
            this.objectPool.set(type, []);
        }
        
        const pool = this.objectPool.get(type);
        
        // 풀 크기 제한
        if (pool.length < 100) {
            // 객체 초기화
            if (object.reset) {
                object.reset();
            }
            pool.push(object);
        }
    }

    // 렌더 배칭
    addToBatch(drawable) {
        this.renderBatch.push(drawable);
    }

    processBatch(ctx) {
        // 타입별로 그룹화
        const grouped = new Map();
        
        for (const drawable of this.renderBatch) {
            const key = `${drawable.type}_${drawable.texture || 'none'}`;
            if (!grouped.has(key)) {
                grouped.set(key, []);
            }
            grouped.get(key).push(drawable);
        }

        // 그룹별로 일괄 렌더링
        for (const [key, items] of grouped) {
            ctx.save();
            
            // 같은 타입의 아이템들을 한번에 그리기
            for (const item of items) {
                if (item.render) {
                    item.render(ctx);
                }
            }
            
            ctx.restore();
        }

        this.renderBatch = [];
    }

    // 메모리 관리
    manageMemory() {
        const now = Date.now();
        
        // 5초마다 가비지 컬렉션 힌트
        if (now - this.lastGC > 5000) {
            // 사용하지 않는 오브젝트 풀 정리
            for (const [type, pool] of this.objectPool) {
                if (pool.length > 50) {
                    pool.length = 50; // 최대 50개만 유지
                }
            }
            
            this.lastGC = now;
            
            // 브라우저가 GC를 수행할 수 있도록 힌트
            if (typeof window.gc === 'function') {
                window.gc();
            }
        }
    }

    // 텍스처 아틀라스 생성
    createTextureAtlas(images) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 최적 크기 계산
        const size = Math.ceil(Math.sqrt(images.length));
        const cellSize = Math.max(...images.map(img => Math.max(img.width, img.height)));
        
        canvas.width = size * cellSize;
        canvas.height = size * cellSize;
        
        const atlas = {
            texture: canvas,
            coordinates: new Map()
        };

        images.forEach((img, index) => {
            const x = (index % size) * cellSize;
            const y = Math.floor(index / size) * cellSize;
            
            ctx.drawImage(img, x, y);
            
            atlas.coordinates.set(img.src, {
                x: x / canvas.width,
                y: y / canvas.height,
                w: img.width / canvas.width,
                h: img.height / canvas.height
            });
        });

        return atlas;
    }

    // 렌더링 최적화 팁
    getOptimizationTips() {
        return {
            canvas: {
                // 캔버스 크기를 2의 제곱수로 설정
                width: Math.pow(2, Math.floor(Math.log2(window.innerWidth))),
                height: Math.pow(2, Math.floor(Math.log2(window.innerHeight))),
                
                // CSS transform 대신 캔버스 직접 조작
                useTransform: false,
                
                // will-change 속성 사용
                willChange: 'transform',
                
                // GPU 가속
                style: 'transform: translateZ(0); backface-visibility: hidden;'
            },
            
            rendering: {
                // 더블 버퍼링
                useDoubleBuffer: true,
                
                // 프레임 스킵
                maxFrameSkip: 2,
                
                // 뷰포트 컬링
                cullOffscreen: true,
                
                // LOD (Level of Detail)
                useLOD: true,
                
                // 오클루전 컬링
                useOcclusion: this.deviceProfile.tier === 'ultra'
            },
            
            animation: {
                // requestAnimationFrame 사용
                useRAF: true,
                
                // 보간법
                interpolation: 'linear',
                
                // 델타 타임 사용
                useDeltaTime: true
            }
        };
    }

    // 성능 모니터링
    getPerformanceStats() {
        const stats = {
            fps: 0,
            frameTime: 0,
            memory: 0,
            drawCalls: 0,
            particles: 0,
            quality: this.qualitySettings
        };

        if (this.performanceHistory.length > 0) {
            const avgFrameTime = this.performanceHistory.reduce((a, b) => a + b) / this.performanceHistory.length;
            stats.fps = Math.round(1000 / avgFrameTime);
            stats.frameTime = avgFrameTime.toFixed(2);
        }

        if (performance.memory) {
            stats.memory = Math.round(performance.memory.usedJSHeapSize / 1048576); // MB
        }

        return stats;
    }
}

// 전역 최적화 인스턴스
const optimizer = new PerformanceOptimizer();

// 전역 사용 가능하도록 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}