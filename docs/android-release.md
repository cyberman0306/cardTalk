# 카드톡 Android 출시와 설치 전환

## 스토어에서 무엇을 보여 줄까

첫 독서·취미 모임을 여는 사람이 “자기소개 다음에 뭘 물어보지?” 하며 검색하는 장면을 기준으로 삼았다. ‘마음카드’는 관계별 팩과 다인 플레이, ‘Party Qs’는 큰 질문 목록을 내세운다. 카드톡의 첫 화면에는 읽어 볼 수 있는 질문 한 장을, 짧은 설명에는 **휴대폰 한 대와 2~6명**을 넣었다. 설치하는 사람은 주최자 한 명이면 된다. 검색량이나 설치율은 아직 측정 전이다. [마음카드](https://play.google.com/store/apps/details?id=com.soohanlee.maeumcard&hl=ko) · [Party Qs](https://play.google.com/store/apps/details?id=com.partyqs&hl=en) · [시장 조사](market.md)

한국어·영어 등록정보에는 앱 이름, 짧은 설명, 자세한 설명, 출시 노트, 아이콘, 피처 그래픽, 세로 스크린샷 네 장을 준비했다. 첫 장은 낭독할 질문, 다음 세 장은 덱 선택, 인원 설정, 꼬리 질문이다. 한국어와 영어 모두 실제 앱의 같은 모바일 화면을 브라우저에서 열어 촬영했다. [한국어 등록정보](../fastlane/metadata/android/ko-KR) · [Google Play 미리보기 이미지 기준](https://support.google.com/googleplay/android-developer/answer/9866151)

출시 뒤에는 Play Console의 ‘전환 분석’에서 같은 언어·국가·유입 경로의 방문자 수와 설치 버튼을 누른 순 사용자 수를 확인한다. 실제 신규 설치를 확인할 곳은 ‘사용자 늘리기’ 개요와 ‘통계’의 획득 지표다. 첫 실험은 스크린샷 순서만 바꿔 질문 화면을 앞세운 안과 네 덱을 앞세운 안을 비교한다. 실험의 추정 범위와 실제 획득 추이를 함께 보고, 표본이 작아 차이가 불분명하면 다음 관찰 기간까지 유지한다. [스토어 등록정보 실험](https://support.google.com/googleplay/android-developer/answer/12053285) · [Play 유입·전환 분석](https://support.google.com/googleplay/android-developer/answer/9859173?hl=ko)

‘다음 모임에 카드톡 공유’를 누르면 예시 질문 한 장으로 Android 공유 창이 열린다. Google Play에서 설치한 출시 버전에는 `utm_source=cardtalk`, `utm_campaign=group_invite`가 붙은 Play 링크가 담긴다. 직접 설치한 APK와 디버그 앱은 예시 질문을 공유한다. 초대 경로의 방문과 설치 클릭은 Play Console에서 보고, 모임을 끝냈는지는 소그룹 관찰에서 확인한다.

## 광고 위치와 동의

배너는 **한 판을 마친 화면 아래**의 전용 네이티브 영역에 들어간다. 휴대폰에서는 320×50dp, 468dp 이상에서는 468×60dp를 사용한다. 최초 광고를 받을 수 있을 때까지 자리를 확보하고, 실패하면 접는다. 손이 자주 가는 다음 차례·카드 교체 버튼, 모달, 보관함으로 이동하면 광고를 내린다. [AdMob 배너 배치 안내](https://support.google.com/admob/answer/6275335) · [배너 크기](https://developers.google.com/admob/android/next-gen/banner/fixed-size)

Google UMP가 시작 때 동의 정보를 갱신한다. 필요한 선택 화면은 광고가 있는 완료 화면에서 열고, `canRequestAds()`가 허용할 때 광고 SDK를 초기화한다. 다시 선택할 수 있는 지역에서는 ‘이용 방법’에 ‘광고 개인정보 선택’이 나타난다. [Google UMP](https://developers.google.com/admob/android/next-gen/privacy)

Android API 36 에뮬레이터에서 2명이 한 바퀴를 마치자 Google의 테스트 배너가 로드됐다. 실제 렌더링 너비와 높이는 320×50dp였고, 웹 화면과 배너 사이에는 24dp의 터치 불가 여백이 있었다. 홈에 돌아오면 광고 영역이 사라졌다. [완료 화면의 테스트 광고](usability-evidence/android-finish-banner.png)

## Windows에서 빌드

1. 프로젝트가 사용하는 JDK 21과 Android SDK 36에서 `npm ci`, `npm test`, `npm run build`, `npx cap copy android`를 실행한다.
2. 테스트 광고가 들어간 설치용 APK는 `.\android\gradlew.bat -p android :app:assembleDebug`로 만든다. Google의 샘플 배너가 표시된다. [Google 테스트 광고 ID](https://developers.google.com/admob/android/next-gen/test-ads)
3. 카드톡 운영 광고 ID와 ‘대화 완료 하단 배너’ ID는 Android 프로젝트의 Gradle 속성에 등록했다. 디버그의 샘플 ID와 별도다. 다른 빌드 환경에서는 아래 이름의 환경 변수 또는 사용자 Gradle 속성을 사용한다. 서명 비밀번호와 키 파일은 저장소에 넣지 않는다.

| 이름 | 값 |
| --- | --- |
| `CARDTALK_ADMOB_APP_ID` | AdMob에 등록한 Android 카드톡 앱 ID, 구분자 `~` |
| `CARDTALK_ADMOB_BANNER_ID` | 같은 게시자의 완료 화면 배너 단위 ID, 구분자 `/` |
| `CARDTALK_UPLOAD_STORE_FILE`, `CARDTALK_UPLOAD_KEY_ALIAS` | Play에 등록할 업로드 키 저장소의 절대 경로와 별칭 |
| `CARDTALK_UPLOAD_STORE_PASSWORD`, `CARDTALK_UPLOAD_KEY_PASSWORD` | 해당 저장소와 키의 비밀번호 |
| `CARDTALK_VERSION_CODE` | 첫 등록의 기본값은 1. 기존 앱을 업데이트하면 Console의 이전 최댓값보다 큰 정수 |

4. 2025HOMEPC에서는 `.\scripts\build-play.ps1 -JavaHome <JDK 21 경로>`를 실행한다. 사용자 프로필의 `%LOCALAPPDATA%\CardTalk\play-upload`에서 업로드 키와 Windows DPAPI로 보호한 비밀번호를 읽는다. 이 암호화 파일은 같은 Windows 사용자 프로필에 묶인다. 업로드 키를 다른 기기에서도 쓸 수 있도록 키 저장소와 비밀번호의 개인 백업이 필요하다. 다른 서명 환경에서는 웹 자산을 복사한 뒤 `.\android\gradlew.bat -p android :app:bundlePlay :app:preparePlayWebsite`를 사용할 수 있다.

번들은 `android/app/build/outputs/bundle/release/app-release.aab`, 배포할 웹 파일은 `android/app/build/outputs/play-website/`에 생긴다. Google Play가 사용 가능하다고 확인한 Android 패키지는 `com.hyunjunyook.cardtalk`이다. 이전 개발용 패키지 `HyunJun.cardTalk`를 직접 설치한 기기에서는 두 앱의 저장 공간이 분리된다. Play Console의 추후 업데이트는 같은 패키지와 등록된 업로드 인증서를 사용한다. [Play 앱 서명](https://developer.android.com/studio/publish/app-signing)

개발자 사이트에서는 설치 전에 네 덱의 질문을 한 장씩 읽을 수 있다. 한국 Play 등록정보의 공개 설치를 확인한 뒤 `.\android\gradlew.bat -p android :app:preparePlayWebsite -PCARDTALK_PLAY_LISTING_LIVE=true`로 웹 파일을 다시 만들어 게시한다. 첫 질문 아래 ‘Google Play에서 설치’가 나타나며, 링크의 `cardtalk_site`와 `question_preview`로 사이트 유입을 확인할 수 있다.

## Google에 제출할 때

- **AdMob.** 계정에 Android 앱 ‘카드톡’과 광고 단위 ‘대화 완료 하단 배너’를 생성해 출시 빌드에 연결했다. 카드톡 전용 유럽 동의 메시지는 영어 기본 문구로 임시 저장했고, 첫 화면에서 동의와 거절을 모두 선택할 수 있게 했다. 공개 개인정보처리방침 URL을 등록하면 게시할 수 있다. 스토어가 공개되면 Play 앱을 AdMob에 연결하고, 등록정보의 개발자 웹사이트 도메인 **루트**에 `app-ads.txt`를 게시한 뒤 앱 확인·준비 상태를 확인한다. [app-ads.txt 설정](https://support.google.com/admob/answer/9363762) · [앱 준비 상태](https://support.google.com/admob/answer/10564477)
- **공개 연락처와 정책.** 같은 개발자 계정의 기존 Play 앱에 공개된 개발자명과 지원 이메일을 정책과 문의 링크에 반영했다. ‘이용 방법’에서 같은 정책을 읽을 수 있다. 공개 개발자 사이트의 정책 URL을 Play 앱 콘텐츠와 AdMob 메시지에 등록한다. [정책 원본](../public/privacy.html) · [Play 심사 준비](https://support.google.com/googleplay/android-developer/answer/9859455)
- **앱 콘텐츠.** 광고 포함과 광고 ID 사용을 선언한다. 데이터 보안 양식에는 IP 기반 대략적 위치, 앱 상호작용, 성능 진단 및 기기 식별자의 SDK 처리와 공유를 실제 광고 설정에 맞게 반영한다. 답변은 음성으로 나누며 앱이 녹음·입력받지 않는다. 공개 국가, 대상 연령, 콘텐츠 등급 설문은 계정 운영자의 실제 배포 대상에 맞춘다. [현재 광고 SDK의 데이터 공개 항목](https://developers.google.com/admob/android/next-gen/privacy/play-data-disclosure)
- **배포 트랙.** 서명한 번들로 내부 테스트에서 Play 설치와 광고 선택을 확인한 뒤 해당 계정에서 허용된 공개 절차로 진행한다. 2023년 11월 13일 뒤에 만든 개인 계정은 프로덕션 액세스 신청 전에 최소 12명이 연속 14일 참여한 비공개 테스트가 필요하다. [개인 개발자 계정 테스트 요건](https://support.google.com/googleplay/android-developer/answer/14151465)
