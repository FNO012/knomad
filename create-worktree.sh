#!/bin/bash

# Git Worktree 생성 및 Claude Code 실행 스크립트
# 사용법: ./create-worktree.sh <브랜치-이름>

set -e  # 에러 발생 시 스크립트 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # 색상 없음

# 도움말 출력
print_help() {
    echo -e "${BLUE}=== Git Worktree 생성 및 Claude Code 실행기 ===${NC}"
    echo ""
    echo "사용법:"
    echo "  $0 <브랜치-이름> [워크트리-경로]"
    echo ""
    echo "예시:"
    echo "  $0 feature/city-detail"
    echo "  $0 fix/bug-123 /custom/path"
    echo ""
    echo "옵션:"
    echo "  -h, --help     도움말 출력"
    echo "  -l, --list     현재 워크트리 목록 출력"
    echo ""
}

# Worktree 목록 출력
list_worktrees() {
    echo -e "${BLUE}현재 Worktree 목록:${NC}"
    git worktree list
    exit 0
}

# 인자 처리
if [[ "$1" == "-h" ]] || [[ "$1" == "--help" ]]; then
    print_help
    exit 0
fi

if [[ "$1" == "-l" ]] || [[ "$1" == "--list" ]]; then
    list_worktrees
fi

# 브랜치 이름 확인
if [ -z "$1" ]; then
    echo -e "${RED}❌ 에러: 브랜치 이름을 입력해주세요.${NC}"
    echo ""
    print_help
    exit 1
fi

BRANCH_NAME="$1"
REPO_ROOT=$(git rev-parse --show-toplevel)
WORKTREE_BASE_DIR="$REPO_ROOT/worktree"

# Worktree 경로 설정
if [ -n "$2" ]; then
    WORKTREE_PATH="$2"
else
    # 브랜치 이름에서 슬래시를 대시로 변경 (feature/city-detail -> feature-city-detail)
    SANITIZED_BRANCH=$(echo "$BRANCH_NAME" | sed 's/\//-/g')
    WORKTREE_PATH="$WORKTREE_BASE_DIR/$SANITIZED_BRANCH"
fi

echo -e "${BLUE}=== Git Worktree 생성 시작 ===${NC}"
echo -e "브랜치: ${GREEN}$BRANCH_NAME${NC}"
echo -e "경로: ${GREEN}$WORKTREE_PATH${NC}"
echo ""

# Worktree 베이스 디렉토리 생성 (존재하지 않는 경우)
if [ ! -d "$WORKTREE_BASE_DIR" ]; then
    echo -e "${YELLOW}📁 Worktree 디렉토리 생성: $WORKTREE_BASE_DIR${NC}"
    mkdir -p "$WORKTREE_BASE_DIR"
fi

# Worktree가 이미 존재하는지 확인
if [ -d "$WORKTREE_PATH" ]; then
    echo -e "${YELLOW}⚠️  Worktree가 이미 존재합니다: $WORKTREE_PATH${NC}"
    echo -e "${BLUE}기존 worktree로 이동합니다...${NC}"
else
    # 브랜치가 이미 존재하는지 확인
    if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
        echo -e "${YELLOW}📌 기존 브랜치 '$BRANCH_NAME'에서 worktree 생성${NC}"
        git worktree add "$WORKTREE_PATH" "$BRANCH_NAME"
    else
        echo -e "${GREEN}🌿 새 브랜치 '$BRANCH_NAME' 생성 및 worktree 추가${NC}"
        git worktree add -b "$BRANCH_NAME" "$WORKTREE_PATH"
    fi

    echo -e "${GREEN}✅ Worktree 생성 완료!${NC}"
fi

echo ""
echo -e "${BLUE}=== Worktree 정보 ===${NC}"
git worktree list | grep "$WORKTREE_PATH" || true
echo ""

# Claude Code 실행 여부 확인
echo -e "${YELLOW}Claude Code를 실행하시겠습니까? (y/n)${NC}"
read -r RESPONSE

if [[ "$RESPONSE" =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}🚀 Claude Code 실행 중...${NC}"

    # Claude CLI가 설치되어 있는지 확인
    if command -v claude &> /dev/null; then
        cd "$WORKTREE_PATH"
        echo -e "${GREEN}📂 작업 디렉토리: $(pwd)${NC}"
        exec claude
    else
        echo -e "${RED}❌ 에러: 'claude' 명령어를 찾을 수 없습니다.${NC}"
        echo -e "${YELLOW}Claude CLI가 설치되어 있는지 확인해주세요.${NC}"
        echo ""
        echo -e "${BLUE}수동으로 실행하려면:${NC}"
        echo -e "  cd $WORKTREE_PATH"
        echo -e "  claude"
        exit 1
    fi
else
    echo -e "${BLUE}💡 Worktree로 이동하려면 다음 명령어를 실행하세요:${NC}"
    echo -e "  ${GREEN}cd $WORKTREE_PATH${NC}"
    echo ""
    echo -e "${BLUE}💡 Claude Code를 실행하려면:${NC}"
    echo -e "  ${GREEN}claude${NC}"
fi
