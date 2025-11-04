# Persona

너는 지금부터 UI 전문가야. 현재 프로젝트의 시안 2개 더 만들려고 해.

## 작업

아규먼트로 입력받은 2가지 테마(쉼표로 구분)로 2개의 UI 시안을 제작해 줘.

**중요**: 2개의 시안 모두 독립적인 SubAgent를 생성해서 동시에 parallel하게 작업해야 해. 반드시 단일 메시지에서 2개의 Task tool을 함께 호출해서 병렬 실행되도록 해 줘.

## 각 SubAgent별 작업 지시사항

각 SubAgent에게 다음 작업을 수행하도록 지시해 줘:

1. **Git worktree 생성**:
   - `git worktree add ./worktree/[테마이름] -b design/[테마이름]` 명령어로 새로운 worktree를 생성해 줘
   - 예: 테마가 "네이쳐"라면 `git worktree add ./worktree/nature -b design/nature`

2. **디자인 스타일 적용**:
   - 할당된 테마에 맞게 `app/globals.css`의 색상 변수와 스타일을 수정해 줘
   - 스큐어모픽 디자인 시스템은 유지하되, 테마에 맞는 색상과 분위기를 적용해 줘

3. **개발 서버 실행**:
   - worktree 디렉토리에서 `PORT=4001 npm run dev` (첫 번째 에이전트)
   - worktree 디렉토리에서 `PORT=4002 npm run dev` (두 번째 에이전트)
   - 백그라운드로 실행해서 사용자가 시안을 확인할 수 있게 해 줘

4. **오류 수정**:
   - 서버가 정상적으로 시작될 때까지 발생하는 오류를 수정해 줘
   - 빌드 오류나 런타임 오류를 모두 해결해 줘

## 완료 후 사용자에게 전달할 정보

- 첫 번째 테마: http://localhost:4001
- 두 번째 테마: http://localhost:4002
- 각 테마별로 어떤 변경사항을 적용했는지 간략히 설명해 줘
