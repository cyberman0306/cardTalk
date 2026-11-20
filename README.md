# 카드톡 · CardTalk

2~6명이 휴대폰 한 대를 돌려 가며 이야기하는 한국어 대화 카드 앱. iOS와 Android가 같은 React·TypeScript 화면과 질문을 사용하며, Capacitor가 화면과 카드를 앱 안에 묶는다.

## 한 판 진행

‘처음 만난 사이’, ‘취향 수집’, ‘보통의 하루’, ‘한 걸음 더’ 중 한 덱을 고른다. 각 덱에는 직접 쓴 질문 16장과 카드별 꼬리 질문 16개가 있다. 인원과 바퀴 수를 고르면 첫 사람이 카드를 뒤집고, 다음 사람에게 시계 방향으로 폰을 건넨다.

같은 판에서는 질문이 반복되지 않는다. ‘질문 바꾸기’는 현재 자리를 유지하며 다음 자리에 필요한 카드를 남긴다. ‘다음 차례’는 답을 하지 않고도 누를 수 있다. 중간에 홈으로 가면 이어 할 수 있고, 책갈피를 누른 질문은 보관함에서 다시 읽는다. 답변을 입력하거나 전송하는 기능은 없다.

## 실행

Node.js 22.18 이상과 npm이 필요하다. 루트에서 실행한다.

```sh
npm ci
npm test
npm run dev
```

iOS는 macOS와 Xcode에서 빌드한다. 시뮬레이터가 준비되어 있으면 `npm run ios`로 대상을 선택해 설치한다. Xcode로 열 때는 아래 순서로 앱 번들을 만든다.

```sh
npm run build
npx cap sync ios
open ios/App/App.xcodeproj
```

Android는 JDK 21, Android SDK Platform 36 및 Build Tools 36.0.0을 사용한다. `JAVA_HOME`과 `ANDROID_HOME`이 설치 위치를 가리켜야 한다. Windows PowerShell에서 디버그 APK를 만드는 명령은 다음과 같다.

```powershell
npm run build
npx cap sync android
.\android\gradlew.bat -p android assembleDebug
```

APK는 `android/app/build/outputs/apk/debug/app-debug.apk`에 생긴다. 에뮬레이터나 USB 디버깅 기기에 바로 실행하려면 `npm run android`를 쓴다. 두 네이티브 프로젝트 모두 웹 파일을 앱 안에 포함하므로 설치한 뒤에는 개발 서버와 인터넷 연결 없이 플레이할 수 있다.

## 소스

- `src/content/decks.ts`에서 질문, 꼬리 질문, 덱 설명을 수정한다. 카드 ID는 저장된 책갈피와 연결된다.
- `src/game.ts`에 셔플, 차례, 남은 카드 수, 이어 하기 검증이 있다.
- `ios/App`와 `android`가 하이브리드 앱의 네이티브 진입점이다. 2024년 SwiftUI 원형은 `legacy/ios`에서 볼 수 있다.
- 초기 사용자, 경쟁 제품의 가격, 모임에서 확인할 가설을 정리했다. [시장 조사](docs/market.md)

<details>
<summary>표지 이미지 제작 기록</summary>

홈 추천 덱 사진은 내장 ImageGen으로 생성해 모바일용 JPEG로 압축했다. [표지 원본 자산](public/images/card-table.jpg)

생성 프롬프트

> Product still life for CardTalk. Wide landscape editorial photograph, an overhead view of three overlapping printed conversation cards on a seamless matte pale pistachio green tabletop. The top card is warm ivory with a single large playful round tangerine sunburst and two small dark ink dot eyes. Beneath it are a deep forest green card with cream concentric arches and a lilac card with a plum checker print. Offset cards at gentle angles, grouped centrally, generous pale green breathing room around the stack. Realistic uncoated paper edges, subtle screenprint grain, one beautiful directional afternoon shadow. Restrained independent Korean stationery brand art direction, no text, no letters, no numbers, no hands, no other objects.

</details>
