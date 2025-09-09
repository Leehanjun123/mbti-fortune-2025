// MBTI Universe Game Engine - M4 최적화
class MBTIGameEngine {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.audioContext = null;
        this.animations = new Map();
        this.particles = [];
        this.sounds = {};
        this.performance = {
            fps: 60,
            frameTime: 1000/60,
            lastTime: 0,
            deltaTime: 0
        };
    }

    // Canvas 초기화
    initCanvas(containerId, width = 1200, height = 700) {
        const container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.borderRadius = '20px';
        this.ctx = this.canvas.getContext('2d', { alpha: true, desynchronized: true });
        
        // M4 최적화: 하드웨어 가속
        this.canvas.style.willChange = 'transform';
        this.canvas.style.transform = 'translateZ(0)';
        
        container.appendChild(this.canvas);
        return this.canvas;
    }

    // 오디오 시스템 초기화
    initAudio() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // 사운드 프리셋
        this.soundPresets = {
            hit: { frequency: 200, duration: 0.1, type: 'square', volume: 0.3 },
            heal: { frequency: 440, duration: 0.3, type: 'sine', volume: 0.2 },
            powerup: { frequency: 800, duration: 0.2, type: 'triangle', volume: 0.25 },
            select: { frequency: 600, duration: 0.05, type: 'sine', volume: 0.15 },
            victory: { frequency: [523, 659, 784, 1047], duration: 0.5, type: 'sine', volume: 0.3 },
            defeat: { frequency: [400, 350, 300, 250], duration: 0.6, type: 'sawtooth', volume: 0.25 }
        };
    }

    // 사운드 재생
    playSound(soundName) {
        if (!this.audioContext || !this.soundPresets[soundName]) return;
        
        const preset = this.soundPresets[soundName];
        const now = this.audioContext.currentTime;
        
        if (Array.isArray(preset.frequency)) {
            // 멜로디 재생
            preset.frequency.forEach((freq, index) => {
                this.createTone(freq, now + index * 0.1, preset.duration/4, preset.type, preset.volume);
            });
        } else {
            // 단일 톤 재생
            this.createTone(preset.frequency, now, preset.duration, preset.type, preset.volume);
        }
    }

    // 톤 생성
    createTone(frequency, startTime, duration, type, volume) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(volume, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }

    // 파티클 시스템
    createParticle(x, y, options = {}) {
        const particle = {
            x: x,
            y: y,
            vx: options.vx || (Math.random() - 0.5) * 4,
            vy: options.vy || (Math.random() - 0.5) * 4,
            size: options.size || Math.random() * 5 + 2,
            color: options.color || `hsl(${Math.random() * 360}, 70%, 50%)`,
            life: options.life || 1,
            decay: options.decay || 0.02,
            gravity: options.gravity || 0,
            trail: options.trail || false
        };
        
        this.particles.push(particle);
    }

    // 파티클 업데이트
    updateParticles(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.x += p.vx * deltaTime;
            p.y += p.vy * deltaTime;
            p.vy += p.gravity * deltaTime;
            p.life -= p.decay * deltaTime;
            
            if (p.trail) {
                p.vx *= 0.98;
                p.vy *= 0.98;
            }
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    // 파티클 렌더링
    renderParticles(ctx) {
        ctx.save();
        
        this.particles.forEach(p => {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            
            if (p.trail) {
                // 트레일 효과
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;
            }
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.restore();
    }

    // 화면 흔들림 효과
    shakeScreen(intensity = 10, duration = 300) {
        const startTime = Date.now();
        const originalTransform = this.canvas.style.transform;
        
        const shake = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed < duration) {
                const decay = 1 - elapsed / duration;
                const offsetX = (Math.random() - 0.5) * intensity * decay;
                const offsetY = (Math.random() - 0.5) * intensity * decay;
                
                this.canvas.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                requestAnimationFrame(shake);
            } else {
                this.canvas.style.transform = originalTransform;
            }
        };
        
        shake();
    }

    // 텍스트 애니메이션
    animateText(ctx, text, x, y, options = {}) {
        const fontSize = options.fontSize || 48;
        const color = options.color || '#ffffff';
        const duration = options.duration || 1000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            ctx.save();
            ctx.font = `bold ${fontSize * (1 + progress * 0.5)}px Arial`;
            ctx.fillStyle = color;
            ctx.globalAlpha = 1 - progress;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            ctx.fillText(text, x, y - progress * 50);
            ctx.restore();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    // 레이저 빔 효과
    drawLaser(ctx, x1, y1, x2, y2, color = '#ff0000', width = 3) {
        ctx.save();
        
        // 글로우 효과
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
        
        // 레이저 본체
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // 중심 밝은 선
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = width * 0.3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        ctx.restore();
    }

    // 폭발 효과
    createExplosion(x, y, options = {}) {
        const particleCount = options.count || 30;
        const colors = options.colors || ['#ff6b6b', '#ffd93d', '#ff8800', '#ffffff'];
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = Math.random() * 5 + 3;
            
            this.createParticle(x, y, {
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
                decay: 0.03,
                gravity: 0.1,
                trail: true
            });
        }
        
        this.shakeScreen(15, 200);
        this.playSound('hit');
    }

    // 번개 효과
    drawLightning(ctx, x1, y1, x2, y2, options = {}) {
        const segments = options.segments || 8;
        const offset = options.offset || 30;
        const color = options.color || '#00ffff';
        const width = options.width || 2;
        
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        
        const dx = (x2 - x1) / segments;
        const dy = (y2 - y1) / segments;
        
        let prevX = x1;
        let prevY = y1;
        
        for (let i = 1; i < segments; i++) {
            const x = x1 + dx * i + (Math.random() - 0.5) * offset;
            const y = y1 + dy * i + (Math.random() - 0.5) * offset;
            
            ctx.lineTo(x, y);
            
            // 가지 번개
            if (Math.random() > 0.7) {
                const branchX = x + (Math.random() - 0.5) * offset * 2;
                const branchY = y + (Math.random() - 0.5) * offset * 2;
                
                ctx.moveTo(x, y);
                ctx.lineTo(branchX, branchY);
                ctx.moveTo(x, y);
            }
            
            prevX = x;
            prevY = y;
        }
        
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
    }

    // 원형 프로그레스 바
    drawCircularProgress(ctx, x, y, radius, progress, options = {}) {
        const lineWidth = options.lineWidth || 10;
        const bgColor = options.bgColor || 'rgba(255, 255, 255, 0.1)';
        const fillColor = options.fillColor || '#00ff00';
        const text = options.text || Math.floor(progress * 100) + '%';
        
        ctx.save();
        
        // 배경 원
        ctx.strokeStyle = bgColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // 프로그레스 원
        ctx.strokeStyle = fillColor;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(x, y, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
        ctx.stroke();
        
        // 텍스트
        if (text) {
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${radius * 0.4}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, x, y);
        }
        
        ctx.restore();
    }

    // 별 평점 렌더링
    drawStarRating(ctx, x, y, rating, maxRating = 5, size = 30) {
        const spacing = size * 1.2;
        
        for (let i = 0; i < maxRating; i++) {
            const starX = x + i * spacing;
            const fillAmount = Math.min(Math.max(rating - i, 0), 1);
            
            this.drawStar(ctx, starX, y, size, fillAmount);
        }
    }

    // 별 그리기
    drawStar(ctx, x, y, size, fillAmount = 1) {
        ctx.save();
        ctx.translate(x, y);
        
        // 별 경로 생성
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
            const outerX = Math.cos(angle) * size;
            const outerY = Math.sin(angle) * size;
            
            if (i === 0) {
                ctx.moveTo(outerX, outerY);
            } else {
                ctx.lineTo(outerX, outerY);
            }
            
            const innerAngle = angle + Math.PI / 5;
            const innerX = Math.cos(innerAngle) * size * 0.5;
            const innerY = Math.sin(innerAngle) * size * 0.5;
            ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        
        // 채우기
        if (fillAmount > 0) {
            ctx.save();
            ctx.clip();
            
            // 그라데이션 채우기
            const gradient = ctx.createLinearGradient(-size, 0, size, 0);
            gradient.addColorStop(0, '#ffd700');
            gradient.addColorStop(fillAmount, '#ffd700');
            gradient.addColorStop(fillAmount, 'rgba(255, 215, 0, 0.2)');
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0.2)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(-size, -size, size * 2, size * 2);
            ctx.restore();
        }
        
        // 윤곽선
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
    }

    // 네온 텍스트 효과
    drawNeonText(ctx, text, x, y, options = {}) {
        const fontSize = options.fontSize || 48;
        const color = options.color || '#00ffff';
        const glowSize = options.glowSize || 20;
        
        ctx.save();
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = options.align || 'center';
        ctx.textBaseline = 'middle';
        
        // 글로우 효과 (여러 겹)
        for (let i = glowSize; i > 0; i -= 2) {
            ctx.shadowBlur = i;
            ctx.shadowColor = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.strokeText(text, x, y);
        }
        
        // 중심 텍스트
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(text, x, y);
        
        ctx.restore();
    }

    // 체력바 애니메이션
    drawHealthBar(ctx, x, y, width, height, current, max, options = {}) {
        const bgColor = options.bgColor || 'rgba(0, 0, 0, 0.5)';
        const borderColor = options.borderColor || '#ffffff';
        const fillColor = options.fillColor || this.getHealthColor(current / max);
        const showText = options.showText !== false;
        const animated = options.animated !== false;
        
        ctx.save();
        
        // 배경
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, width, height);
        
        // 테두리
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        
        // 체력바
        const fillWidth = (width - 4) * (current / max);
        
        // 그라데이션
        const gradient = ctx.createLinearGradient(x, y, x, y + height);
        gradient.addColorStop(0, this.lightenColor(fillColor, 30));
        gradient.addColorStop(0.5, fillColor);
        gradient.addColorStop(1, this.darkenColor(fillColor, 30));
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x + 2, y + 2, fillWidth, height - 4);
        
        // 반짝임 효과
        if (animated) {
            const shimmer = ctx.createLinearGradient(x, y, x + width, y);
            shimmer.addColorStop(0, 'rgba(255, 255, 255, 0)');
            shimmer.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
            shimmer.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = shimmer;
            ctx.fillRect(x + 2, y + 2, fillWidth, height - 4);
        }
        
        // 텍스트
        if (showText) {
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${height * 0.6}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${current} / ${max}`, x + width / 2, y + height / 2);
        }
        
        ctx.restore();
    }

    // 체력 색상 계산
    getHealthColor(ratio) {
        if (ratio > 0.6) return '#4ade80';
        if (ratio > 0.3) return '#facc15';
        return '#ef4444';
    }

    // 색상 밝게
    lightenColor(color, percent) {
        // 간단한 구현
        return color;
    }

    // 색상 어둡게
    darkenColor(color, percent) {
        // 간단한 구현
        return color;
    }

    // 플로팅 데미지 텍스트
    showDamageText(x, y, damage, options = {}) {
        const color = options.color || (damage > 0 ? '#ff4444' : '#44ff44');
        const fontSize = options.fontSize || 32;
        const duration = options.duration || 1000;
        
        const startTime = Date.now();
        const startY = y;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                this.ctx.save();
                
                const currentY = startY - progress * 100;
                const alpha = 1 - progress;
                const scale = 1 + progress * 0.5;
                
                this.ctx.globalAlpha = alpha;
                this.ctx.font = `bold ${fontSize * scale}px Arial`;
                this.ctx.fillStyle = color;
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = 3;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                
                const text = damage > 0 ? `-${damage}` : `+${Math.abs(damage)}`;
                
                this.ctx.strokeText(text, x, currentY);
                this.ctx.fillText(text, x, currentY);
                
                this.ctx.restore();
                
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    // 카메라 줌 효과
    zoomCamera(scale, duration = 300) {
        const startScale = parseFloat(this.canvas.style.transform.match(/scale\(([\d.]+)\)/)?.[1] || 1);
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease-out 효과
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentScale = startScale + (scale - startScale) * easeOut;
            
            this.canvas.style.transform = `scale(${currentScale})`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    // 슬로우 모션 효과
    setSlowMotion(speed = 0.5, duration = 1000) {
        this.performance.frameTime = (1000 / 60) / speed;
        
        setTimeout(() => {
            this.performance.frameTime = 1000 / 60;
        }, duration);
    }
}

// 전역 엔진 인스턴스
const GameEngine = new MBTIGameEngine();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameEngine;
}