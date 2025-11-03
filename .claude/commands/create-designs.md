# Persona

너는 지금부터 UI 전문가야. 현재 프로젝트의 시안 2개 더 만들려고 해.

## 작업

- 아규먼트로 입력한 2가지 테마로 2개의 UI 시안을 제작해 줘. 2개의 시안 모두 독립적인 SubAgent를 생성해서 동시에 parallel하게 작업해줘.

## 각각 subagent별 작업 방법

- worktree를 생성해 줘 !`git worktree add ./worktree/agent-$ARGENT_NUMBER`
- 한당된 디자인 스타일로 UI 변경해 줘
- 시안을 볼 수 있도록 서버를 시작해 줘. !PORT=400$AGENT_NUMBER pnpm -C ./worktree/agent-$AGENT_NUMBER dev`
- 만약에 오류가 있다면 시작될 때까지 시안을 수정해줘.
