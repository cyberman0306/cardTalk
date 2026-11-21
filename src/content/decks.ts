import { t } from '../language.ts'

export interface QuestionCard {
  id: string
  question: string
  followUp: string
}

export type DeckId = 'hello' | 'taste' | 'daily' | 'closer'

export interface Deck {
  id: DeckId
  title: string
  mood: string
  description: string
  cards: QuestionCard[]
}

type Entry = [key: string, question: string, followUp: string, english: string, englishFollowUp: string]

function cards(deck: DeckId, entries: Entry[]): QuestionCard[] {
  return entries.map(([key, question, followUp, english, englishFollowUp]) => ({
    id: deck + '-' + key,
    get question() { return t(question, english) },
    get followUp() { return t(followUp, englishFollowUp) },
  }))
}

export const decks: Deck[] = [
  {
    id: 'hello',
    get title() { return t('처음 만난 사이', 'First hellos') },
    get mood() { return t('가볍게', 'Light') },
    get description() { return t('이름을 나눈 다음, 작은 이야기부터 꺼내 봐요.', 'Start with a small story after you’ve traded names.') },
    cards: cards('hello', [
      ['route', '오늘 여기 오는 길에 뭐가 눈에 들어왔어요?', '다시 그 길을 걷는다면 어디서 잠깐 멈추고 싶어요?', "What caught your eye on the way here?", "Where would you stop if you walked that way again?"],
      ['menu', '같이 먹을 메뉴 하나를 고른다면 뭘 권하고 싶어요?', '첫입에 어떤 맛이 날까요?', "What would you order for this table to share?", "What would the first bite taste like?"],
      ['skill', '갑자기 5분짜리 수업을 맡는다면 뭘 가르칠 수 있어요?', '처음 하는 사람은 어디부터 시작하면 좋을까요?', "What could you teach in five minutes?", "Where should a beginner start?"],
      ['seat', '처음 가는 카페에서 어떤 자리를 먼저 찾아요?', '그 자리에 앉으면 가장 먼저 뭘 해요?', "Which seat do you look for in a new café?", "What do you do first once you sit down?"],
      ['photo', '요즘 사진을 찍고 싶어지는 건 뭐예요?', '최근에 찍은 한 장을 말로 보여 줄래요?', "What makes you reach for your camera lately?", "Can you describe a recent shot?"],
      ['walk', '우리 동네를 딱 한 시간 소개한다면 어디로 갈까요?', '거기서 꼭 보고 가야 할 건 뭐예요?', "Where would you take us for an hour in your neighborhood?", "What should we look out for there?"],
      ['song', '요즘 나도 모르게 흥얼거리는 노래가 있어요?', '그 노래를 들으면 어떤 장면이 떠올라요?', "What tune keeps slipping into your head?", "What scene comes to mind when you hear it?"],
      ['weather', '소풍 가기 딱 좋은 날에는 뭐가 느껴져요?', '그날 돗자리 위에 꼭 올리고 싶은 건 뭐예요?', "What tells you it’s a good day for a picnic?", "What belongs on the picnic blanket?"],
      ['small-win', '오늘 생각보다 잘 풀린 일이 하나 있었어요?', '그때 누구에게 제일 먼저 말하고 싶었어요?', "What went more smoothly than you expected today?", "Who did you want to tell first?"],
      ['hour', '약속이 한 시간 뒤로 밀리면 근처에서 뭘 할래요?', '혼자일 때와 둘일 때 선택이 달라져요?', "If we had an extra hour before meeting, how would you spend it nearby?", "Would you choose differently with company?"],
      ['object', '평소 가방에 챙기는 것 중 가장 나다운 물건은 뭐예요?', '언제부터 그걸 가지고 다녔어요?', "What do you carry that feels especially like you?", "When did you start carrying it?"],
      ['sound', '들으면 기분이 좋아지는 생활 속 소리가 있어요?', '그 소리를 주로 어디서 만나요?', "What everyday sound lifts your mood?", "Where do you usually hear it?"],
      ['nickname', '오늘 기분을 이모지 하나로 고르면 뭐예요?', '누가 그 이모지를 보면 어떤 설명을 붙여 줄래요?', "Which emoji fits your mood today?", "How would you explain your choice?"],
      ['shop', '동네에 작은 가게 하나를 열 수 있다면 뭘 팔래요?', '첫 손님에게 무엇부터 권하고 싶어요?', "If you opened a tiny shop, what would you sell?", "What would you offer your first customer?"],
      ['break', '딱 십 분 쉴 때 손이 먼저 가는 건 뭐예요?', '그 십 분이 잘 지나갔다는 걸 어떻게 알아요?', "What do you reach for on a ten-minute break?", "How can you tell it was a good break?"],
      ['weekend', '주말에 가볍게 해 본 일 중에 한 번 더 하고 싶은 건 뭐예요?', '여기 있는 사람과 같이 한다면 뭐부터 준비할까요?', "What’s something you tried one weekend that you’d happily do again?", "What would we need to try it together?"],
      ['stamp', '오늘 모임의 도장을 만든다면 어떤 그림을 새길까요?', '어디에 제일 먼저 찍고 싶어요?', "What picture would go on a stamp for today’s gathering?", "Where would you stamp it first?"],
      ['bench', '빈 벤치 옆에서 같이 먹고 싶은 간식은 뭐예요?', '그 간식은 어떻게 나눠 먹으면 좋을까요?', "What snack would you share on a park bench?", "How would you split it?"],
      ['map', '오늘 온 길에 별명을 붙인다면 뭐라고 할까요?', '어느 구간에서 그 이름이 떠올랐어요?', "What nickname would you give your route here?", "Which stretch inspired it?"],
      ['lesson', '초등학교 하루를 다시 보낸다면 어떤 시간부터 갈래요?', '그 시간에 옆자리 친구와 뭘 해 볼까요?', "If you could revisit one class from elementary school, which would it be?", "What would you do with the kid beside you?"],
    ]),
  },
  {
    id: 'taste',
    get title() { return t('취향 수집', 'Favorite things') },
    get mood() { return t('유쾌하게', 'Playful') },
    get description() { return t('각자 좋아하는 걸 모으면, 뜻밖의 공통점이 보여요.', 'Find out where your tastes overlap.') },
    cards: cards('taste', [
      ['bread', '빵집에서 마지막 한 개가 남았다면 어떤 빵이었으면 해요?', '그 빵에는 어떤 음료가 잘 어울려요?', "What do you hope is the last thing left at a bakery?", "What would you drink with it?"],
      ['playlist', '같이 걷는 길에 첫 곡을 고른다면 뭘 틀래요?', '어느 부분에서 볼륨을 올리고 싶어요?', "What song would start our walking playlist?", "When would you turn it up?"],
      ['detour', '여행 중에 일부러 돌아가서라도 들르는 곳은 어디예요?', '거기서 찾고 싶은 게 있어요?', "What’s worth a detour when you travel?", "What do you hope to find there?"],
      ['scent', '집에 들어설 때 어떤 향이 나면 좋겠어요?', '그 향을 좋아하게 된 계기가 있어요?', "What scent would you like to come home to?", "What does it remind you of?"],
      ['fiction', '작품 속 공간에서 하룻밤 묵는다면 어디를 고를래요?', '그곳에서 눈을 뜨면 제일 먼저 뭘 볼까요?', "Which fictional place would you spend a night in?", "What would you do there first?"],
      ['colour', '내 방 한쪽을 무슨 색으로 칠하고 싶어요?', '그 벽 앞에 어떤 물건을 놓으면 잘 어울릴까요?', "What color would you paint one wall of your room?", "What would you put beside it?"],
      ['game', '처음 보는 사람과도 같이 즐길 만한 놀이는 뭐예요?', '처음 하는 사람에게 어떤 팁을 주고 싶어요?', "What game is fun with people you’ve just met?", "How would you explain the first move?"],
      ['season', '한 계절을 일주일 더 붙잡아 둘 수 있다면 언제예요?', '그 일주일 안에 꼭 하고 싶은 일이 있어요?', "Which season would you keep for one extra week?", "How would you spend that week?"],
      ['dessert', '내 이름을 딴 아이스크림에는 어떤 맛이 들어가요?', '누구에게 첫 숟갈을 권하고 싶어요?', "What flavors would go into an ice cream named after you?", "Who would you offer the first spoonful to?"],
      ['repeat', '줄거리를 알아도 다시 보고 싶은 작품은 뭐예요?', '다시 볼 때마다 기다려지는 장면이 있어요?', "What would you watch or read again even knowing the ending?", "Which moment draws you back?"],
      ['texture', '손이 자주 가는 컵에는 어떤 특징이 있어요?', '그 컵에 담아 마시고 싶은 건 뭐예요?', "What makes a mug the one you reach for?", "What tastes best in it?"],
      ['gift', '작은 선물로 받으면 유난히 반가운 건 뭐예요?', '직접 고른다면 어떤 걸 눈여겨볼까요?', "What small gift always makes you smile?", "What makes it feel personal?"],
      ['museum', '내 취향으로 작은 전시를 열면 어떤 물건을 모을까요?', '입구에 제일 먼저 보여 줄 물건은 뭐예요?', "What would you collect for a tiny exhibition about your tastes?", "Which piece would greet visitors?"],
      ['window', '기차 창밖으로 어떤 풍경이 오래 이어지면 좋겠어요?', '그 풍경에서 제일 오래 바라보고 싶은 건 뭐예요?', "What scenery would you love to watch from a train window?", "What detail would hold your gaze?"],
      ['swap', '하루만 다른 사람의 취미를 빌린다면 뭘 해 보고 싶어요?', '옆에서 어떤 걸 알려 주면 좋을까요?', "Whose hobby would you borrow for a day?", "What part would you try first?"],
      ['combo', '나만 아는 의외의 음식 조합이 있어요?', '처음 먹는 사람에게 비율을 어떻게 알려 줄래요?', "What unlikely food pairing do you enjoy?", "Which bite would you offer a doubtful friend?"],
      ['cover', '표지만 보고 집어 들게 되는 책은 어떤 모습이에요?', '어느 부분을 손으로 만져 보고 싶어요?', "What book cover makes you pick it up?", "Which detail would you touch?"],
      ['credits', '영화가 끝난 뒤 어떤 음악이 흐르면 자리에 더 앉아 있게 돼요?', '그 음악 뒤에 어떤 장면이 어울릴까요?', "What kind of music makes you stay for the movie credits?", "What scene would follow it?"],
      ['sticker', '노트북에 스티커를 하나만 붙인다면 어떤 그림을 고를래요?', '그걸 본 사람에게 어떤 이야기를 해 줄래요?', "If your laptop had just one sticker, what would it show?", "What story would you tell about it?"],
      ['pair', '짭짤한 것 다음에 먹고 싶은 한 입은 뭐예요?', '둘을 한 접시에 담으면 어떤 이름을 붙일까요?', "What bite do you crave after something salty?", "What would you call the pairing?"],
    ]),
  },
  {
    id: 'daily',
    get title() { return t('보통의 하루', 'Everyday life') },
    get mood() { return t('편안하게', 'Easygoing') },
    get description() { return t('스쳐 지나간 하루에서 들려주고 싶은 장면을 찾아요.', 'Look closer at the moments in an ordinary day.') },
    cards: cards('daily', [
      ['morning', '아침에 일어나서 처음으로 여는 건 뭐예요?', '그걸 열면 하루가 어떻게 시작돼요?', "What’s the first thing you open in the morning?", "What happens next?"],
      ['quiet', '하루 중 가장 조용한 순간은 언제예요?', '그때 들리는 소리를 하나만 꼽는다면요?', "When is your day at its quietest?", "What can you hear then?"],
      ['place', '이유 없이 마음이 편해지는 자리가 있어요?', '그 자리에 앉으면 주로 뭘 해요?', "Where do you feel at ease without quite knowing why?", "What do you notice when you sit there?"],
      ['thanks', '이번 주에 누가 해 준 작은 일 중 고마웠던 건 뭐예요?', '그 일 덕분에 그날 뭐가 달라졌어요?', "What little thing did someone do this week that you appreciated?", "What difference did it make that day?"],
      ['habit', '최근에 새로 생긴 작은 습관이 있어요?', '첫날에는 어떻게 시작했어요?', "What little habit have you picked up lately?", "When did you first notice it?"],
      ['kitchen', '집에 있는 재료로 자신 있게 만들 수 있는 한 끼는 뭐예요?', '누구에게 한 접시 차려 주고 싶어요?', "What meal could you make confidently with what’s at home?", "What’s your finishing touch?"],
      ['desk', '손 닿는 곳에 두고 자주 쓰는 물건 하나를 소개해 줄래요?', '그 물건은 어떻게 내 곁에 오게 됐어요?', "What do you keep within reach and use often?", "When did you last use it?"],
      ['laugh', '며칠 사이에 피식 웃었던 순간이 있었어요?', '그 얘기를 들으면 같이 웃을 사람이 떠올라요?', "What made you chuckle in the last few days?", "Which detail still makes you smile?"],
      ['sky', '최근에 하늘을 올려다본 건 언제였어요?', '어디에서 본 하늘이었어요?', "When did you last stop to look at the sky?", "What made you look up?"],
      ['evening', '하루가 끝났다는 느낌을 주는 행동은 뭐예요?', '그 뒤에 기다리는 작은 즐거움이 있어요?', "What tells you your day is winding down?", "What do you like to do next?"],
      ['street', '자주 지나는 길에서 최근 달라진 게 있어요?', '그 변화를 제일 먼저 어떻게 알아챘어요?', "What has changed on a street you use often?", "How did you first notice?"],
      ['note', '최근 잊지 않으려고 적어 둔 건 뭐예요?', '다시 읽으면 어떤 장면이 떠올라요?', "What did you write down recently so you wouldn’t forget?", "Where did you leave the note?"],
      ['repair', '고쳐서라도 오래 쓰고 싶은 물건은 뭐예요?', '그 물건에서 꼭 그대로 두고 싶은 부분은 어디예요?', "What would you rather repair and keep using?", "What do you like about that particular one?"],
      ['rest', '하루 일과가 끝나고 나만의 시간이 생기면 뭘 먼저 해요?', '그 시간을 조금 늘린다면 뭘 더 해 보고 싶어요?', "When you finally get time to yourself, what comes first?", "What makes that time feel like yours?"],
      ['unexpected', '예상하지 못한 빈 시간에 발견한 재미가 있어요?', '다음에 같은 시간이 생겨도 또 할 것 같아요?', "What have you enjoyed in an unexpected pocket of free time?", "Would you make time for it again?"],
      ['postcard', '오늘 하루를 엽서로 만든다면 앞면에 어떤 장면을 담을래요?', '뒷면에는 어떤 한 줄을 적을까요?', "If today were a postcard, what scene would go on the front?", "What line would you write on the back?"],
      ['shelf', '집에서 최근 자리를 옮긴 물건이 있어요?', '새 자리에 두고 뭐가 편해졌어요?', "What have you moved to a new spot at home?", "What’s easier now?"],
      ['line', '줄을 기다릴 때 주변에서 주로 뭘 살펴봐요?', '최근 기다리다가 발견한 건 뭐예요?', "What do you notice while waiting in line?", "What did you spot the last time?"],
      ['light', '집 안에 햇빛이 들 때 제일 예쁜 곳은 어디예요?', '그 빛이 머무는 동안 뭘 하고 싶어요?', "Where does sunlight look best in your home?", "What would you do while it lasts?"],
      ['leftovers', '어제 먹던 음식이 조금 남으면 어떻게 즐겨요?', '그렇게 먹는 법을 어디서 알았어요?', "How do you like to eat yesterday’s leftovers?", "Where did you learn that trick?"],
    ]),
  },
  {
    id: 'closer',
    get title() { return t('한 걸음 더', 'A little closer') },
    get mood() { return t('깊이 있게', 'Reflective') },
    get description() { return t('서로 익숙해졌을 때, 생각과 마음을 한 겹 더 나눠요.', 'Take your time with a more personal question.') },
    cards: cards('closer', [
      ['kindness', '받아 본 친절 중 아직도 생각나는 건 뭐예요?', '나도 비슷하게 해 주고 싶은 순간이 있어요?', "What act of kindness has stayed with you?", "What small detail do you remember?"],
      ['words', '두고두고 꺼내 보는 말 한마디가 있어요?', '요즘에는 그 말이 어떻게 들려요?', "What words do you come back to?", "When do they come to mind?"],
      ['me', '최근에 나답다고 느낀 순간은 언제예요?', '그 순간의 어떤 모습이 특히 나다웠어요?', "When did you feel most like yourself recently?", "What were you doing at the time?"],
      ['support', '누군가 내 편이라고 느끼게 하는 작은 행동은 뭐예요?', '나도 다른 사람에게 그렇게 해 본 적이 있어요?', "What little gesture tells you someone’s on your side?", "How do you show that to someone else?"],
      ['try', '잘하는 것과 별개로 계속하고 싶은 일이 있어요?', '그중 어느 순간이 가장 좋아요?', "What would you keep doing regardless of how good you are at it?", "Which part keeps you coming back?"],
      ['pace', '내 속도로 하고 싶어서 천천히 배우는 게 있어요?', '아주 조금이라도 달라진 걸 언제 느꼈어요?', "What do you enjoy learning at your own pace?", "What’s a small step you’ve enjoyed?"],
      ['welcome', '처음 간 자리에서 환영받는다고 느낀 적이 있어요?', '다음에 새로 온 사람에게 무엇을 해 주고 싶어요?', "When have you felt welcome somewhere new?", "What did someone do that helped?"],
      ['curious', '요즘 답을 알아가는 중인 질문이 하나 있어요?', '그 질문을 처음 떠올린 계기는 뭐예요?', "What question are you slowly finding an answer to?", "What recently gave you a clue?"],
      ['change', '예전에는 몰랐는데 요즘 좋아진 게 있어요?', '생각을 바꿔 준 장면이 기억나요?', "What have you grown to like over time?", "When did your feelings start to shift?"],
      ['advice', '조금 전의 나에게 짧게 건넨다면 어떤 말을 하고 싶어요?', '그 말을 가장 듣고 싶었던 순간은 언제였어요?', "What would you tell your slightly younger self?", "When would you want them to hear it?"],
      ['learn', '가까이 지내며 자연스럽게 배운 태도가 있어요?', '그 사람의 어떤 행동에서 느꼈어요?', "What attitude have you picked up from someone close?", "What did you see them do?"],
      ['future', '미래의 나와 작은 약속을 하나 한다면 뭐예요?', '그 약속을 지킨 날은 어떤 모습일까요?', "What small promise would you make your future self?", "What would keeping it look like?"],
      ['listen', '누군가 내 말을 잘 듣고 있다는 걸 어떻게 느껴요?', '나도 대화할 때 따라 하고 싶은 점이 있어요?', "How can you tell someone is really listening?", "What would you like to borrow from the way they listen?"],
      ['memory', '평범했는데 지나고 보니 소중해진 날이 있어요?', '그날로 잠깐 돌아간다면 어떤 걸 더 오래 볼래요?', "What ordinary day became precious in hindsight?", "What would you linger over if you went back?"],
      ['keep', '생활이 바빠져도 지키고 싶은 한 가지는 뭐예요?', '그걸 지킨 날에는 어떤 기분이 들어요?', "What’s one thing you want to keep even when life gets busy?", "How do you feel on days you manage it?"],
      ['invite', '함께 시간을 보내고 싶은 사람을 어디로 초대하고 싶어요?', '마주 앉으면 제일 먼저 어떤 이야기를 꺼낼래요?', "Where would you invite someone you’d like more time with?", "What would you talk about first?"],
      ['ritual', '친구랑 만나면 꼭 하는 게 있어요?', '처음엔 어떻게 시작됐어요?', "Is there something you always do when you meet up with a friend?", "How did it get started?"],
      ['pause', '누군가 대답을 기다려 줘서 편했던 순간이 있어요?', '그때 어떤 표정이나 행동이 도움이 됐어요?', "When did someone give you enough time to answer?", "What made the silence comfortable?"],
      ['ticket', '지난 한 해의 어느 순간에 다시 가는 표를 한 장 받으면 언제 쓸래요?', '이번에는 무엇을 더 자세히 보고 싶어요?', "If you had a ticket back to one moment from the past year, when would you go?", "What would you look at more closely?"],
      ['letter', '몇 달 뒤의 나에게 사진 한 장을 보낸다면 뭘 찍을래요?', '사진 뒤에는 어떤 말을 남길래요?', "What photo would you send yourself a few months from now?", "What would you write on the back?"],
    ]),
  },
]

export function findDeck(id: string | undefined) {
  return decks.find(deck => deck.id === id)
}
