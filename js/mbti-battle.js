// MBTI Battle Arena - 실시간 PvP 배틀 시스템
const MBTIBattle = {
    // 배틀 상태
    currentBattle: null,
    playerTeam: null,
    opponentTeam: null,
    battleLog: [],
    
    // MBTI 타입별 스탯
    typeStats: {
        'INTJ': { attack: 90, defense: 85, speed: 70, special: 95, hp: 160 },
        'INTP': { attack: 85, defense: 70, speed: 75, special: 100, hp: 150 },
        'ENTJ': { attack: 95, defense: 80, speed: 85, special: 85, hp: 170 },
        'ENTP': { attack: 88, defense: 72, speed: 90, special: 92, hp: 158 },
        'INFJ': { attack: 70, defense: 90, speed: 65, special: 105, hp: 155 },
        'INFP': { attack: 65, defense: 85, speed: 70, special: 110, hp: 145 },
        'ENFJ': { attack: 75, defense: 88, speed: 80, special: 95, hp: 162 },
        'ENFP': { attack: 78, defense: 75, speed: 95, special: 88, hp: 164 },
        'ISTJ': { attack: 85, defense: 100, speed: 60, special: 70, hp: 185 },
        'ISFJ': { attack: 70, defense: 105, speed: 55, special: 75, hp: 180 },
        'ESTJ': { attack: 92, defense: 95, speed: 75, special: 68, hp: 175 },
        'ESFJ': { attack: 80, defense: 92, speed: 70, special: 78, hp: 170 },
        'ISTP': { attack: 100, defense: 75, speed: 85, special: 65, hp: 165 },
        'ISFP': { attack: 88, defense: 78, speed: 82, special: 72, hp: 160 },
        'ESTP': { attack: 105, defense: 70, speed: 100, special: 60, hp: 155 },
        'ESFP': { attack: 95, defense: 68, speed: 105, special: 62, hp: 150 }
    },
    
    // MBTI 타입별 스킬
    typeSkills: {
        'INTJ': {
            name: '전략의 대가',
            skills: [
                { name: '마스터플랜', damage: 120, cost: 30, type: 'special' },
                { name: '냉철한 분석', damage: 90, cost: 20, type: 'special' },
                { name: '완벽한 계획', damage: 100, cost: 25, type: 'attack' }
            ]
        },
        'INTP': {
            name: '논리의 마법사',
            skills: [
                { name: '논리 폭격', damage: 110, cost: 28, type: 'special' },
                { name: '모순 지적', damage: 95, cost: 22, type: 'special' },
                { name: '창의적 해법', damage: 105, cost: 26, type: 'special' }
            ]
        },
        'ENTJ': {
            name: '지휘관',
            skills: [
                { name: '리더의 포효', damage: 115, cost: 30, type: 'attack' },
                { name: '압도적 카리스마', damage: 100, cost: 25, type: 'attack' },
                { name: '승리의 진군', damage: 108, cost: 27, type: 'attack' }
            ]
        },
        'ENTP': {
            name: '토론의 달인',
            skills: [
                { name: '악마의 변호인', damage: 102, cost: 24, type: 'special' },
                { name: '논리적 도발', damage: 98, cost: 23, type: 'special' },
                { name: '창의적 반박', damage: 106, cost: 26, type: 'special' }
            ]
        },
        'INFJ': {
            name: '예언자',
            skills: [
                { name: '미래 예지', damage: 125, cost: 35, type: 'special' },
                { name: '직관의 빛', damage: 95, cost: 22, type: 'special' },
                { name: '공감의 치유', damage: -80, cost: 20, type: 'heal' }
            ]
        },
        'INFP': {
            name: '꿈꾸는 이상주의자',
            skills: [
                { name: '순수한 마음', damage: -90, cost: 22, type: 'heal' },
                { name: '이상의 불꽃', damage: 118, cost: 32, type: 'special' },
                { name: '감성 폭발', damage: 108, cost: 28, type: 'special' }
            ]
        },
        'ENFJ': {
            name: '영웅',
            skills: [
                { name: '희망의 빛', damage: -100, cost: 25, type: 'heal' },
                { name: '모두를 위한 승리', damage: 105, cost: 27, type: 'attack' },
                { name: '감동의 연설', damage: 98, cost: 24, type: 'special' }
            ]
        },
        'ENFP': {
            name: '열정의 화신',
            skills: [
                { name: '무한 에너지', damage: 112, cost: 29, type: 'attack' },
                { name: '즉흥적 공격', damage: 103, cost: 25, type: 'attack' },
                { name: '긍정의 힘', damage: -85, cost: 21, type: 'heal' }
            ]
        },
        'ISTJ': {
            name: '수호자',
            skills: [
                { name: '철벽 방어', damage: -70, cost: 18, type: 'defense' },
                { name: '규칙의 힘', damage: 92, cost: 23, type: 'attack' },
                { name: '전통의 수호', damage: 88, cost: 22, type: 'attack' }
            ]
        },
        'ISFJ': {
            name: '보호자',
            skills: [
                { name: '헌신의 방패', damage: -75, cost: 19, type: 'defense' },
                { name: '치유의 손길', damage: -95, cost: 24, type: 'heal' },
                { name: '조용한 분노', damage: 85, cost: 21, type: 'attack' }
            ]
        },
        'ESTJ': {
            name: '관리자',
            skills: [
                { name: '효율적 타격', damage: 108, cost: 26, type: 'attack' },
                { name: '조직의 힘', damage: 96, cost: 24, type: 'attack' },
                { name: '질서 정립', damage: 100, cost: 25, type: 'attack' }
            ]
        },
        'ESFJ': {
            name: '외교관',
            skills: [
                { name: '화합의 힘', damage: -88, cost: 22, type: 'heal' },
                { name: '사교적 공격', damage: 94, cost: 23, type: 'attack' },
                { name: '팀워크 부스트', damage: -60, cost: 15, type: 'buff' }
            ]
        },
        'ISTP': {
            name: '장인',
            skills: [
                { name: '정밀 타격', damage: 115, cost: 28, type: 'attack' },
                { name: '도구 활용', damage: 105, cost: 26, type: 'attack' },
                { name: '침착한 일격', damage: 110, cost: 27, type: 'attack' }
            ]
        },
        'ISFP': {
            name: '예술가',
            skills: [
                { name: '감성의 일격', damage: 102, cost: 25, type: 'attack' },
                { name: '예술적 공격', damage: 98, cost: 24, type: 'special' },
                { name: '자유로운 영혼', damage: 95, cost: 23, type: 'attack' }
            ]
        },
        'ESTP': {
            name: '모험가',
            skills: [
                { name: '스피드 러시', damage: 118, cost: 30, type: 'attack' },
                { name: '액션 히어로', damage: 112, cost: 28, type: 'attack' },
                { name: '직감적 회피', damage: -50, cost: 12, type: 'defense' }
            ]
        },
        'ESFP': {
            name: '연예인',
            skills: [
                { name: '스포트라이트', damage: 108, cost: 27, type: 'attack' },
                { name: '매력 발산', damage: 100, cost: 25, type: 'special' },
                { name: '파티 타임', damage: -82, cost: 20, type: 'heal' }
            ]
        }
    },
    
    // 팀 상성 보너스
    teamSynergy: {
        'NT': { bonus: 1.15, name: '분석가 연합' },
        'NF': { bonus: 1.12, name: '외교관 연합' },
        'ST': { bonus: 1.10, name: '관리자 연합' },
        'SF': { bonus: 1.08, name: '탐험가 연합' },
        'IN': { bonus: 1.13, name: '내향 직관' },
        'EN': { bonus: 1.11, name: '외향 직관' },
        'IS': { bonus: 1.09, name: '내향 감각' },
        'ES': { bonus: 1.07, name: '외향 감각' }
    },
    
    // 배틀 시작
    startBattle(playerTypes, opponentTypes) {
        this.playerTeam = playerTypes.map(type => this.createFighter(type));
        this.opponentTeam = opponentTypes.map(type => this.createFighter(type));
        this.currentBattle = {
            turn: 0,
            currentAttacker: 'player',
            status: 'ongoing'
        };
        this.battleLog = [];
        
        // 팀 시너지 적용
        this.applyTeamSynergy(this.playerTeam);
        this.applyTeamSynergy(this.opponentTeam);
        
        this.addLog('⚔️ 배틀 시작!');
        this.addLog(`플레이어 팀: ${playerTypes.join(', ')}`);
        this.addLog(`상대 팀: ${opponentTypes.join(', ')}`);
        
        return this.currentBattle;
    },
    
    // 파이터 생성
    createFighter(mbtiType) {
        const stats = { ...this.typeStats[mbtiType] };
        const skills = this.typeSkills[mbtiType];
        
        return {
            type: mbtiType,
            name: skills.name,
            stats: stats,
            currentHp: stats.hp,
            currentMp: 100,
            skills: skills.skills,
            status: 'normal',
            buffs: [],
            debuffs: []
        };
    },
    
    // 팀 시너지 적용
    applyTeamSynergy(team) {
        const types = team.map(f => f.type);
        let bestSynergy = null;
        let bestBonus = 1;
        
        // 시너지 체크
        for (const [key, value] of Object.entries(this.teamSynergy)) {
            const hasAllTypes = types.every(type => {
                return key.split('').every(char => type.includes(char));
            });
            
            if (hasAllTypes && value.bonus > bestBonus) {
                bestSynergy = value.name;
                bestBonus = value.bonus;
            }
        }
        
        // 시너지 보너스 적용
        if (bestSynergy) {
            team.forEach(fighter => {
                fighter.stats.attack = Math.floor(fighter.stats.attack * bestBonus);
                fighter.stats.special = Math.floor(fighter.stats.special * bestBonus);
            });
            this.addLog(`✨ ${bestSynergy} 시너지 발동! (${Math.floor((bestBonus - 1) * 100)}% 보너스)`);
        }
    },
    
    // 공격 실행
    executeAttack(attacker, skill, target) {
        if (attacker.currentMp < skill.cost) {
            this.addLog(`❌ ${attacker.name}의 MP가 부족합니다!`);
            return false;
        }
        
        attacker.currentMp -= skill.cost;
        
        let damage = skill.damage;
        if (skill.type === 'attack') {
            damage = Math.floor(damage * (attacker.stats.attack / 100));
        } else if (skill.type === 'special') {
            damage = Math.floor(damage * (attacker.stats.special / 100));
        }
        
        // 회복/버프 스킬
        if (damage < 0) {
            if (skill.type === 'heal') {
                target.currentHp = Math.min(target.currentHp - damage, target.stats.hp);
                this.addLog(`💚 ${attacker.name}이(가) ${target.name}을(를) ${-damage} 회복!`);
            } else if (skill.type === 'defense') {
                target.stats.defense += Math.floor(-damage / 2);
                this.addLog(`🛡️ ${target.name}의 방어력 상승!`);
            }
        } else {
            // 데미지 계산
            const finalDamage = Math.max(1, damage - Math.floor(target.stats.defense / 2));
            target.currentHp = Math.max(0, target.currentHp - finalDamage);
            
            this.addLog(`⚡ ${attacker.name}의 ${skill.name}! ${target.name}에게 ${finalDamage} 데미지!`);
            
            if (target.currentHp <= 0) {
                this.addLog(`💀 ${target.name}이(가) 쓰러졌다!`);
                target.status = 'defeated';
            }
        }
        
        return true;
    },
    
    // 로그 추가
    addLog(message) {
        this.battleLog.push({
            message: message,
            timestamp: Date.now(),
            turn: this.currentBattle?.turn || 0
        });
    },
    
    // AI 턴
    executeAITurn() {
        const aliveFighters = this.opponentTeam.filter(f => f.status !== 'defeated');
        if (aliveFighters.length === 0) return false;
        
        const attacker = aliveFighters[Math.floor(Math.random() * aliveFighters.length)];
        const skill = attacker.skills[Math.floor(Math.random() * attacker.skills.length)];
        
        let target;
        if (skill.damage < 0) {
            // 회복/버프는 아군에게
            target = aliveFighters[Math.floor(Math.random() * aliveFighters.length)];
        } else {
            // 공격은 적에게
            const aliveEnemies = this.playerTeam.filter(f => f.status !== 'defeated');
            if (aliveEnemies.length === 0) return false;
            target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
        }
        
        this.executeAttack(attacker, skill, target);
        return true;
    },
    
    // 배틀 체크
    checkBattleEnd() {
        const playerAlive = this.playerTeam.some(f => f.status !== 'defeated');
        const opponentAlive = this.opponentTeam.some(f => f.status !== 'defeated');
        
        if (!playerAlive) {
            this.currentBattle.status = 'defeat';
            this.addLog('💔 패배했습니다...');
            return true;
        } else if (!opponentAlive) {
            this.currentBattle.status = 'victory';
            this.addLog('🏆 승리했습니다!');
            return true;
        }
        
        return false;
    }
};

// 전역 사용 가능하도록 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MBTIBattle;
}