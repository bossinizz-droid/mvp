
# 🚀 Gemini Quant 배포 가이드 (Vercel)

이 프로젝트를 Vercel에 성공적으로 배포하려면 아래 절차를 따르세요.

### 1. 필수 준비물
- [Google AI Studio](https://aistudio.google.com/)에서 발급받은 **API Key**
- GitHub 계정 및 Vercel 계정

### 2. 배포 순서
1. **GitHub 저장소 생성**: 새로운 Public 또는 Private Repo를 만듭니다.
2. **소스 코드 업로드**: 모든 파일을 업로드합니다.
3. **Vercel 프로젝트 생성**: Vercel 대시보드에서 `Import`를 누릅니다.
4. **환경 변수(Environment Variables) 설정**:
   - 이 단계가 가장 중요합니다!
   - Name: `API_KEY`
   - Value: `본인의_실제_API_키_값`
5. **배포**: `Deploy` 버튼을 누르면 약 1분 내로 웹사이트 주소가 나옵니다.

### 3. 모바일에서 보기
- 배포가 완료되면 생성된 `*.vercel.app` 주소를 스마트폰 브라우저에서 열어보세요.
- 브라우저 메뉴의 **'홈 화면에 추가'** 기능을 이용하면 앱처럼 편리하게 사용할 수 있습니다.
