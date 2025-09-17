/**
 * MBTI Test Interface
 * 실제 작동하는 테스트 인터페이스
 */

class TestInterface {
    constructor() {
        this.engine = new MBTITestEngine();
        this.questions = [];
        this.currentIndex = 0;
        this.isTestStarted = false;
    }

    // 테스트 시작
    startTest() {
        this.questions = this.engine.getAllQuestions();
        this.currentIndex = 0;
        this.isTestStarted = true;
        
        this.renderTestContainer();
        this.showQuestion();
    }

    // 테스트 컨테이너 렌더링
    renderTestContainer() {
        const container = document.createElement('div');
        container.id = 'mbti-test-container';
        container.innerHTML = `
            <div class="test-wrapper">
                <div class="test-header">
                    <button class="back-btn" onclick="testInterface.goBack()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill"></div>
                        </div>
                        <span class="progress-text" id="progress-text">1 / ${this.questions.length}</span>
                    </div>
                </div>
                
                <div class="question-container" id="question-container">
                    <!-- 질문이 여기에 표시됨 -->
                </div>
                
                <div class="test-footer">
                    <p class="test-tip">💡 직관적으로 답변하세요. 정답은 없습니다.</p>
                </div>
            </div>
        `;
        
        document.body.innerHTML = '';
        document.body.appendChild(container);
        
        // 스타일 추가
        this.addTestStyles();
    }

    // 질문 표시
    showQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.showResult();
            return;
        }

        const question = this.questions[this.currentIndex];
        const progress = ((this.currentIndex + 1) / this.questions.length) * 100;
        
        // 프로그레스 업데이트
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = 
            `${this.currentIndex + 1} / ${this.questions.length}`;
        
        // 질문 렌더링
        const container = document.getElementById('question-container');
        container.innerHTML = `
            <div class="question-card animate-in">
                <h2 class="question-number">질문 ${this.currentIndex + 1}</h2>
                <p class="question-text">${question.text}</p>
                
                <div class="options-container">
                    ${question.options.map((option, index) => `
                        <button class="option-button" onclick="testInterface.selectAnswer('${question.id}', ${index})">
                            <span class="option-letter">${index === 0 ? 'A' : 'B'}</span>
                            <span class="option-text">${option.text}</span>
                        </button>
                    `).join('')}
                </div>
                
                <div class="navigation-buttons">
                    ${this.currentIndex > 0 ? `
                        <button class="nav-btn prev" onclick="testInterface.previousQuestion()">
                            이전 질문
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // 답변 선택
    selectAnswer(questionId, optionIndex) {
        const question = this.questions[this.currentIndex];
        const selectedOption = question.options[optionIndex];
        
        // 엔진에 답변 기록
        this.engine.recordAnswer(questionId, selectedOption);
        
        // 선택 애니메이션
        const buttons = document.querySelectorAll('.option-button');
        buttons[optionIndex].classList.add('selected');
        
        // 다음 질문으로
        setTimeout(() => {
            this.currentIndex++;
            this.showQuestion();
        }, 300);
    }

    // 이전 질문
    previousQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            // 이전 답변 제거 (간단한 구현)
            this.engine.answers.pop();
            this.showQuestion();
        }
    }

    // 뒤로가기
    goBack() {
        if (confirm('테스트를 중단하고 처음으로 돌아가시겠습니까?')) {
            location.reload();
        }
    }

    // 결과 표시
    showResult() {
        const result = this.engine.calculateMBTI();
        const interpretation = this.engine.generateInterpretation(result.type);
        const stats = this.engine.generateStatistics(result.type);
        
        // 결과 저장
        const savedResult = this.engine.saveResult({
            type: result.type,
            preferences: result.preferences,
            interpretation,
            stats
        });
        
        // 결과 페이지 렌더링
        this.renderResultPage(savedResult);
    }

    // 결과 페이지 렌더링
    renderResultPage(result) {
        const container = document.getElementById('mbti-test-container');
        container.innerHTML = `
            <div class="result-wrapper">
                <div class="result-header">
                    <div class="celebration">🎉</div>
                    <h1>당신의 MBTI 유형은</h1>
                    <div class="mbti-type-display">
                        <span class="type-letters">${result.type}</span>
                        <span class="type-title">${result.interpretation.title}</span>
                    </div>
                    <p class="type-description">${result.interpretation.description}</p>
                </div>
                
                <div class="preferences-chart">
                    <h3>성향 분석</h3>
                    ${this.renderPreferenceChart(result.preferences)}
                </div>
                
                <div class="result-sections">
                    <div class="result-section">
                        <h3>💪 당신의 강점</h3>
                        <ul class="strength-list">
                            ${result.interpretation.strengths.map(s => 
                                `<li><span class="checkmark">✓</span> ${s}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    
                    <div class="result-section">
                        <h3>🎯 성장 포인트</h3>
                        <ul class="growth-list">
                            ${result.interpretation.growth.map(g => 
                                `<li><span class="arrow">→</span> ${g}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    
                    <div class="result-section">
                        <h3>💼 추천 커리어</h3>
                        <div class="career-tags">
                            ${result.interpretation.careers.map(c => 
                                `<span class="career-tag">${c}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="result-section">
                        <h3>❤️ 관계 궁합</h3>
                        <div class="compatibility">
                            <p><strong>잘 맞는 유형:</strong> ${result.interpretation.relationships.compatible.join(', ')}</p>
                            <p><strong>도전적 관계:</strong> ${result.interpretation.relationships.challenging.join(', ')}</p>
                            <p class="tip">💡 ${result.interpretation.relationships.tips}</p>
                        </div>
                    </div>
                    
                    <div class="result-section">
                        <h3>📊 통계</h3>
                        <div class="stats">
                            <p>인구 비율: <strong>${result.stats.percentage}%</strong></p>
                            <p>희귀도: <strong>${result.stats.rarity}</strong></p>
                            <p>유사 유형: ${result.stats.similarTypes.join(', ')}</p>
                        </div>
                    </div>
                </div>
                
                <div class="result-actions">
                    <button class="btn-primary" onclick="testInterface.saveAndShare()">
                        결과 저장하기
                    </button>
                    <button class="btn-secondary" onclick="testInterface.retakeTest()">
                        다시 테스트하기
                    </button>
                    <button class="btn-secondary" onclick="testInterface.exploreMore()">
                        더 알아보기
                    </button>
                </div>
                
                <div class="share-section">
                    <h4>결과 공유하기</h4>
                    <div class="share-buttons">
                        <button onclick="testInterface.shareKakao()">카카오톡</button>
                        <button onclick="testInterface.shareFacebook()">페이스북</button>
                        <button onclick="testInterface.shareTwitter()">트위터</button>
                        <button onclick="testInterface.copyLink()">링크 복사</button>
                    </div>
                </div>
            </div>
        `;
    }

    // 선호도 차트 렌더링
    renderPreferenceChart(preferences) {
        return `
            <div class="preference-bars">
                ${Object.entries(preferences).map(([dimension, values]) => {
                    const [first, second] = Object.entries(values);
                    return `
                        <div class="preference-item">
                            <div class="preference-labels">
                                <span>${first[0]} ${first[1]}%</span>
                                <span>${second[0]} ${second[1]}%</span>
                            </div>
                            <div class="preference-bar">
                                <div class="bar-fill ${first[0]}" style="width: ${first[1]}%"></div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // 스타일 추가
    addTestStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #mbti-test-container {
                min-height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
            
            .test-wrapper, .result-wrapper {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            }
            
            .test-header {
                margin-bottom: 40px;
            }
            
            .progress-container {
                margin-top: 20px;
            }
            
            .progress-bar {
                height: 8px;
                background: #e0e0e0;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #667eea, #764ba2);
                transition: width 0.3s ease;
            }
            
            .progress-text {
                display: block;
                text-align: center;
                margin-top: 10px;
                color: #666;
                font-size: 14px;
            }
            
            .question-card {
                animation: fadeIn 0.3s ease;
            }
            
            .question-number {
                color: #667eea;
                font-size: 16px;
                margin-bottom: 10px;
            }
            
            .question-text {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 30px;
                line-height: 1.4;
            }
            
            .option-button {
                display: flex;
                align-items: center;
                width: 100%;
                padding: 20px;
                margin-bottom: 15px;
                background: #f8f9fa;
                border: 2px solid transparent;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s;
                text-align: left;
            }
            
            .option-button:hover {
                background: #e8ebff;
                border-color: #667eea;
                transform: translateY(-2px);
            }
            
            .option-button.selected {
                background: #667eea;
                color: white;
                border-color: #667eea;
            }
            
            .option-letter {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                background: white;
                border-radius: 50%;
                margin-right: 15px;
                font-weight: bold;
                color: #667eea;
            }
            
            .option-button.selected .option-letter {
                background: white;
                color: #667eea;
            }
            
            .option-text {
                flex: 1;
                font-size: 16px;
            }
            
            /* 결과 페이지 스타일 */
            .result-header {
                text-align: center;
                margin-bottom: 40px;
            }
            
            .celebration {
                font-size: 60px;
                margin-bottom: 20px;
            }
            
            .mbti-type-display {
                margin: 20px 0;
            }
            
            .type-letters {
                font-size: 48px;
                font-weight: bold;
                color: #667eea;
                display: block;
            }
            
            .type-title {
                font-size: 24px;
                color: #333;
                display: block;
                margin-top: 10px;
            }
            
            .type-description {
                font-size: 18px;
                color: #666;
                margin-top: 15px;
            }
            
            .result-section {
                margin-bottom: 40px;
                padding: 25px;
                background: #f8f9fa;
                border-radius: 12px;
            }
            
            .result-section h3 {
                margin-bottom: 20px;
                color: #333;
            }
            
            .strength-list, .growth-list {
                list-style: none;
                padding: 0;
            }
            
            .strength-list li, .growth-list li {
                padding: 10px 0;
                display: flex;
                align-items: flex-start;
            }
            
            .checkmark, .arrow {
                margin-right: 10px;
                color: #667eea;
                font-weight: bold;
            }
            
            .career-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .career-tag {
                padding: 8px 16px;
                background: #667eea;
                color: white;
                border-radius: 20px;
                font-size: 14px;
            }
            
            .result-actions {
                display: flex;
                gap: 15px;
                margin-top: 40px;
            }
            
            .btn-primary, .btn-secondary {
                flex: 1;
                padding: 15px 30px;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .btn-primary {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
            }
            
            .btn-secondary {
                background: #f8f9fa;
                color: #333;
                border: 2px solid #e0e0e0;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @media (max-width: 640px) {
                .test-wrapper, .result-wrapper {
                    padding: 20px;
                }
                
                .question-text {
                    font-size: 20px;
                }
                
                .result-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 공유 기능들
    shareKakao() {
        // Kakao SDK 필요
        alert('카카오톡 공유 기능 준비중');
    }

    shareFacebook() {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }

    shareTwitter() {
        const text = encodeURIComponent(`나의 MBTI는 ${this.engine.calculateMBTI().type}입니다!`);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }

    copyLink() {
        navigator.clipboard.writeText(window.location.href);
        alert('링크가 복사되었습니다!');
    }

    saveAndShare() {
        alert('결과가 저장되었습니다. 마이페이지에서 확인하세요.');
    }

    retakeTest() {
        this.engine = new MBTITestEngine();
        this.startTest();
    }

    exploreMore() {
        window.location.href = '/';
    }
}

// 전역 인스턴스
window.testInterface = new TestInterface();