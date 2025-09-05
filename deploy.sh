#!/bin/bash

# MBTI Fortune 2025 - Production Deploy Script

echo "🚀 MBTI Fortune 2025 배포 시작..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 체크 함수
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
    else
        echo -e "${RED}✗${NC} $1"
        exit 1
    fi
}

# 1. 환경 체크
echo "📋 환경 체크 중..."

# Node.js 체크
node --version > /dev/null 2>&1
check_status "Node.js 설치 확인"

# npm 체크
npm --version > /dev/null 2>&1
check_status "npm 설치 확인"

# Git 체크
git --version > /dev/null 2>&1
check_status "Git 설치 확인"

# 2. 의존성 설치
echo -e "\n📦 의존성 설치 중..."
npm install
check_status "의존성 설치 완료"

# 3. 환경변수 체크
echo -e "\n🔐 환경변수 체크 중..."
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}⚠️  .env.local 파일이 없습니다.${NC}"
    echo "   .env.example을 참고하여 생성해주세요."
    read -p "계속하시겠습니까? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    check_status ".env.local 파일 확인"
fi

# 4. 빌드
echo -e "\n🔨 프로덕션 빌드 중..."
npm run build
check_status "빌드 완료"

# 5. 빌드 크기 체크
echo -e "\n📊 빌드 크기 분석..."
if [ -d "dist" ]; then
    du -sh dist/*
fi

# 6. Lighthouse 테스트 (선택)
read -p "Lighthouse 성능 테스트를 실행하시겠습니까? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "\n🔍 Lighthouse 테스트 중..."
    npm run lighthouse
    check_status "Lighthouse 테스트 완료"
fi

# 7. Git 커밋
echo -e "\n📝 Git 커밋 중..."
git add -A
git commit -m "Deploy: Production build $(date +'%Y-%m-%d %H:%M:%S')"
check_status "Git 커밋 완료"

# 8. Vercel 배포
echo -e "\n🚀 Vercel 배포 중..."

# Vercel CLI 체크
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI 설치 중..."
    npm i -g vercel
fi

# 프로덕션 배포
vercel --prod

# 9. 배포 확인
echo -e "\n✅ 배포 완료!"
echo -e "${GREEN}====================================${NC}"
echo "🌐 사이트: https://mbti2025.vercel.app"
echo "📊 애널리틱스: https://analytics.google.com"
echo "💰 광고: https://adfit.kakao.com"
echo -e "${GREEN}====================================${NC}"

# 10. 체크리스트
echo -e "\n📋 배포 후 체크리스트:"
echo "[ ] 사이트 접속 확인"
echo "[ ] 공유 기능 테스트"
echo "[ ] 광고 노출 확인"
echo "[ ] 애널리틱스 데이터 수집 확인"
echo "[ ] 모바일 반응형 확인"
echo "[ ] PWA 설치 테스트"

echo -e "\n${GREEN}🎉 배포가 완료되었습니다!${NC}"