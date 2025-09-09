// 통합 네비게이션 모듈
const Navigation = {
    init() {
        this.createNavigation();
        this.highlightCurrentPage();
        this.setupMobileMenu();
        this.trackUserMBTI();
    },
    
    createNavigation() {
        const navHTML = `
            <nav class="mbti-nav">
                <div class="nav-container">
                    <a href="/" class="nav-logo">
                        <span class="logo-emoji">🔮</span>
                        <span class="logo-text">MBTI Destiny</span>
                    </a>
                    
                    <button class="mobile-menu-toggle" aria-label="메뉴">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    
                    <ul class="nav-menu">
                        <li><a href="/index.html" data-page="fortune">
                            <span class="nav-icon">✨</span>
                            <span>운세테스트</span>
                        </a></li>
                        <li><a href="/mbti-daily.html" data-page="daily">
                            <span class="nav-icon">🌤️</span>
                            <span>일일예보</span>
                        </a></li>
                        <li><a href="/mbti-compatibility.html" data-page="compatibility">
                            <span class="nav-icon">💕</span>
                            <span>궁합</span>
                        </a></li>
                        <li><a href="/mbti-reactions.html" data-page="reactions">
                            <span class="nav-icon">😂</span>
                            <span>반응</span>
                        </a></li>
                    </ul>
                    
                    <div class="nav-user">
                        <span class="user-mbti" id="userMBTIDisplay"></span>
                    </div>
                </div>
            </nav>
        `;
        
        const navStyles = `
            <style>
                .mbti-nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                    transition: all 0.3s ease;
                }
                
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 60px;
                }
                
                .nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    font-weight: 900;
                    font-size: 1.3em;
                    color: #667eea;
                    transition: transform 0.3s ease;
                }
                
                .nav-logo:hover {
                    transform: scale(1.05);
                }
                
                .logo-emoji {
                    font-size: 1.5em;
                    animation: float 3s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                
                .nav-menu {
                    display: flex;
                    list-style: none;
                    gap: 10px;
                    margin: 0;
                    padding: 0;
                }
                
                .nav-menu li a {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 8px 16px;
                    border-radius: 20px;
                    text-decoration: none;
                    color: #495057;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }
                
                .nav-menu li a:hover {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
                }
                
                .nav-menu li a.active {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                
                .nav-icon {
                    font-size: 1.2em;
                }
                
                .nav-user {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .user-mbti {
                    padding: 6px 12px;
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    color: white;
                    border-radius: 15px;
                    font-weight: 700;
                    font-size: 0.9em;
                    min-width: 50px;
                    text-align: center;
                }
                
                .user-mbti:empty {
                    display: none;
                }
                
                .mobile-menu-toggle {
                    display: none;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 30px;
                    height: 25px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                }
                
                .mobile-menu-toggle span {
                    width: 100%;
                    height: 3px;
                    background: #667eea;
                    border-radius: 3px;
                    transition: all 0.3s;
                }
                
                .mobile-menu-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(7px, 7px);
                }
                
                .mobile-menu-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -7px);
                }
                
                /* 본문 여백 조정 */
                body {
                    padding-top: 80px !important;
                }
                
                @media (max-width: 768px) {
                    .mobile-menu-toggle {
                        display: flex;
                    }
                    
                    .nav-menu {
                        position: fixed;
                        top: 60px;
                        left: 0;
                        right: 0;
                        background: white;
                        flex-direction: column;
                        padding: 20px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                        transform: translateY(-120%);
                        transition: transform 0.3s ease;
                    }
                    
                    .nav-menu.active {
                        transform: translateY(0);
                    }
                    
                    .nav-menu li a {
                        padding: 12px 20px;
                        width: 100%;
                        justify-content: center;
                    }
                    
                    .nav-user {
                        display: none;
                    }
                    
                    .logo-text {
                        font-size: 0.9em;
                    }
                }
            </style>
        `;
        
        // DOM에 추가
        document.head.insertAdjacentHTML('beforeend', navStyles);
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    },
    
    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath || 
                (currentPath === '/' && link.getAttribute('href') === '/index.html')) {
                link.classList.add('active');
            }
        });
    },
    
    setupMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                menu.classList.toggle('active');
            });
            
            // 메뉴 항목 클릭 시 모바일 메뉴 닫기
            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    toggle.classList.remove('active');
                    menu.classList.remove('active');
                });
            });
        }
    },
    
    trackUserMBTI() {
        // localStorage에서 사용자 MBTI 가져오기
        const userMBTI = localStorage.getItem('userMBTI');
        const display = document.getElementById('userMBTIDisplay');
        
        if (userMBTI && display) {
            display.textContent = userMBTI;
        }
        
        // MBTI 업데이트 감지
        window.addEventListener('storage', (e) => {
            if (e.key === 'userMBTI' && display) {
                display.textContent = e.newValue || '';
            }
        });
    }
};

// 자동 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Navigation.init());
} else {
    Navigation.init();
}

// 관련 콘텐츠 추천 모듈
const ContentRecommender = {
    init() {
        this.addRelatedContent();
    },
    
    getRecommendations(currentPage) {
        const recommendations = {
            '/index.html': [
                { url: '/mbti-daily.html', title: '오늘의 MBTI 날씨', emoji: '🌤️' },
                { url: '/mbti-compatibility.html', title: '궁합 확인하기', emoji: '💕' },
                { url: '/mbti-reactions.html', title: 'MBTI 반응 보기', emoji: '😂' }
            ],
            '/mbti-daily.html': [
                { url: '/index.html', title: '2025 운세 보기', emoji: '✨' },
                { url: '/mbti-compatibility.html', title: '궁합 테스트', emoji: '💑' },
                { url: '/mbti-reactions.html', title: '재미있는 반응', emoji: '🎭' }
            ],
            '/mbti-compatibility.html': [
                { url: '/mbti-daily.html', title: '일일 예보', emoji: '📅' },
                { url: '/index.html', title: '운세 테스트', emoji: '🔮' },
                { url: '/mbti-reactions.html', title: 'MBTI 밈', emoji: '😆' }
            ],
            '/mbti-reactions.html': [
                { url: '/index.html', title: '내 운세 확인', emoji: '🌟' },
                { url: '/mbti-daily.html', title: '오늘의 예보', emoji: '☀️' },
                { url: '/mbti-compatibility.html', title: '궁합 보기', emoji: '💘' }
            ]
        };
        
        const currentPath = window.location.pathname === '/' ? '/index.html' : window.location.pathname;
        return recommendations[currentPath] || recommendations['/index.html'];
    },
    
    addRelatedContent() {
        const relatedHTML = `
            <div class="related-content-section">
                <h3>🎯 더 많은 MBTI 콘텐츠</h3>
                <div class="related-content-grid">
                    ${this.getRecommendations(window.location.pathname).map(item => `
                        <a href="${item.url}" class="related-card">
                            <span class="related-emoji">${item.emoji}</span>
                            <span class="related-title">${item.title}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
        
        const relatedStyles = `
            <style>
                .related-content-section {
                    max-width: 1200px;
                    margin: 60px auto 40px;
                    padding: 30px 20px;
                    background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
                    border-radius: 20px;
                    text-align: center;
                }
                
                .related-content-section h3 {
                    font-size: 1.5em;
                    font-weight: 900;
                    color: #333;
                    margin-bottom: 25px;
                }
                
                .related-content-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                }
                
                .related-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    padding: 20px;
                    background: white;
                    border-radius: 15px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }
                
                .related-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                
                .related-emoji {
                    font-size: 2.5em;
                }
                
                .related-title {
                    font-weight: 700;
                    color: inherit;
                }
                
                @media (max-width: 768px) {
                    .related-content-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
        
        // 스타일 추가 (중복 방지)
        if (!document.querySelector('#related-content-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'related-content-styles';
            styleEl.innerHTML = relatedStyles.replace('<style>', '').replace('</style>', '');
            document.head.appendChild(styleEl);
        }
        
        // 적절한 위치에 삽입
        const targetElement = document.querySelector('.share-section') || 
                            document.querySelector('.container > *:last-child');
        if (targetElement) {
            targetElement.insertAdjacentHTML('beforebegin', relatedHTML);
        }
    }
};

// 관련 콘텐츠 자동 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ContentRecommender.init());
} else {
    ContentRecommender.init();
}