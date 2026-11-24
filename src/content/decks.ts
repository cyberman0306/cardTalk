import { t } from '../language.ts'
import { cardTranslations, deckMetaTranslations } from './deckTranslations.ts'

export interface QuestionCard {
  id: string
  question: string
  followUp: string
}

export type BuiltInDeckId = 'hello' | 'taste' | 'daily' | 'closer'
export type CustomDeckTheme = 'terracotta' | 'sage' | 'cobalt' | 'plum' | 'ochre'
export type DeckTheme = BuiltInDeckId | CustomDeckTheme
export type DeckId = string

export interface Deck {
  id: DeckId
  title: string
  mood: string
  description: string
  cards: QuestionCard[]
  theme?: CustomDeckTheme
  custom?: boolean
}

type Entry = [key: string, question: string, followUp: string, english: string, englishFollowUp: string]

function cards(deck: BuiltInDeckId, entries: Entry[]): QuestionCard[] {
  return entries.map(([key, question, followUp, english, englishFollowUp]) => {
    const id = deck + '-' + key
    const extra = cardTranslations[id]
    return {
      id,
      get question() { return t(question, english, extra && { ja: extra.ja[0], zh: extra.zh[0], es: extra.es[0] }) },
      get followUp() { return t(followUp, englishFollowUp, extra && { ja: extra.ja[1], zh: extra.zh[1], es: extra.es[1] }) },
    }
  })
}

function createDeck(
  id: BuiltInDeckId,
  koTitle: string, enTitle: string,
  koMood: string, enMood: string,
  koDesc: string, enDesc: string,
  entries: Entry[],
): Deck {
  const extra = deckMetaTranslations[id]
  return {
    id,
    get title() { return t(koTitle, enTitle, { ja: extra.ja.title, zh: extra.zh.title, es: extra.es.title }) },
    get mood() { return t(koMood, enMood, { ja: extra.ja.mood, zh: extra.zh.mood, es: extra.es.mood }) },
    get description() { return t(koDesc, enDesc, { ja: extra.ja.description, zh: extra.zh.description, es: extra.es.description }) },
    cards: cards(id, entries),
  }
}

export const decks: Deck[] = [
  createDeck('hello', '처음 만난 사이', 'First hellos', '가볍게', 'Light', '이름을 나눈 다음, 작은 이야기부터 꺼내 봐요.', 'Start with a small story after you’ve traded names.', [
      ['route', '오늘 여기 오는 길에 뭐가 눈에 들어왔어요?', '다시 그 길을 걷는다면 어디서 잠깐 멈추고 싶어요?', "What caught your eye on the way here?", "Where would you stop if you walked that way again?"],
      ['menu', '같이 먹을 메뉴 하나를 고른다면 뭘 권하고 싶어요?', '그 메뉴에서 제일 좋아하는 포인트는 뭐예요?', "What would you order for this table to share?", "What’s your favorite part about that dish?"],
      ['skill', '갑자기 5분짜리 수업을 맡는다면 뭘 가르칠 수 있어요?', '처음 하는 사람은 어디부터 시작하면 좋을까요?', "What could you teach in five minutes?", "Where should a beginner start?"],
      ['seat', '처음 가는 카페에서 어떤 자리를 먼저 찾아요?', '그 자리에 앉으면 가장 먼저 뭘 해요?', "Which seat do you look for in a new café?", "What do you do first once you sit down?"],
      ['photo', '요즘 사진을 찍고 싶어지는 건 뭐예요?', '최근에 찍은 사진 중 기억나는 한 장을 소개해 줄래요?', "What makes you reach for your camera lately?", "Can you tell us about a recent photo you like?"],
      ['walk', '살고 있는 동네를 딱 한 시간 소개한다면 어디로 데려가고 싶어요?', '거기서 꼭 보고 가야 할 건 뭐예요?', "Where would you take us for an hour in your neighborhood?", "What should we look out for there?"],
      ['song', '요즘 나도 모르게 흥얼거리는 노래가 있어요?', '그 노래를 들으면 어떤 장면이 떠올라요?', "What tune keeps slipping into your head?", "What scene comes to mind when you hear it?"],
      ['weather', '어떤 날씨를 보면 소풍 가고 싶다는 생각이 들어요?', '돗자리 위에 꼭 챙겨 가고 싶은 간식은 뭐예요?', "What kind of weather makes you want to go on a picnic?", "What snack belongs on the picnic blanket?"],
      ['small-win', '최근에 생각보다 잘 풀려서 기분 좋았던 일이 있어요?', '그때 누구에게 제일 먼저 말하고 싶었어요?', "What went more smoothly than you expected recently?", "Who did you want to tell first?"],
      ['hour', '약속이 갑자기 한 시간 미뤄지면 근처에서 뭘 하면서 보낼래요?', '혼자일 때와 둘일 때 선택이 달라져요?', "If plans were pushed back an hour, how would you spend it nearby?", "Would you choose differently with company?"],
      ['object', '평소 가방에 챙기는 것 중 가장 나다운 물건은 뭐예요?', '언제부터 그걸 가지고 다녔어요?', "What do you carry that feels especially like you?", "When did you start carrying it?"],
      ['sound', '들으면 기분이 좋아지는 생활 속 소리가 있어요?', '그 소리는 주로 언제, 어디서 들어요?', "What everyday sound lifts your mood?", "When and where do you usually hear it?"],
      ['nickname', '오늘 기분을 이모지 하나로 고르면 뭐예요?', '왜 그 이모지를 골랐는지 살짝 알려 줄래요?', "Which emoji fits your mood today?", "What made you pick that one?"],
      ['shop', '동네에 작은 가게 하나를 열 수 있다면 뭘 팔래요?', '첫 손님에게 무엇부터 권하고 싶어요?', "If you opened a tiny shop, what would you sell?", "What would you offer your first customer?"],
      ['break', '딱 10분 쉴 때 손이 먼저 가는 건 뭐예요?', '조금 더 길게 쉴 수 있다면 뭘 하고 싶어요?', "What do you reach for on a ten-minute break?", "What would you do if you had a longer break?"],
      ['weekend', '최근 주말에 해 본 일 중에 한 번 더 하고 싶은 게 있어요?', '여기 있는 사람과 같이 한다면 뭐부터 준비할까요?', "What’s something you tried on a weekend that you’d happily do again?", "What would we need to try it together?"],
      ['stamp', '오늘 모임에 이름을 붙인다면 뭐라고 부르고 싶어요?', '그 이름을 떠올린 이유가 뭐예요?', "If you named today’s gathering, what would you call it?", "What inspired that name?"],
      ['bench', '공원 벤치에 앉아서 같이 먹고 싶은 간식은 뭐예요?', '그 간식과 함께 마시고 싶은 음료는 뭐예요?', "What snack would you share on a park bench?", "What drink would go best with it?"],
      ['map', '오늘 여기 오기 전에 제일 마지막으로 한 일은 뭐예요?', '덕분에 지금 기분은 어때요?', "What was the last thing you did before heading here today?", "How did it leave you feeling?"],
      ['lesson', '초등학교 하루를 다시 보낸다면 어떤 수업 시간이 제일 기다려질까요?', '쉬는 시간에는 친구들과 뭘 하고 놀았어요?', "If you could revisit one class from elementary school, which would it be?", "What did you usually do during recess?"],
    ]),
  createDeck('taste', '취향 수집', 'Favorite things', '유쾌하게', 'Playful', '각자 좋아하는 걸 모으면, 뜻밖의 공통점이 보여요.', 'Find out where your tastes overlap.', [
      ['bread', '빵집에서 마지막 한 개가 남았다면 어떤 빵이었으면 해요?', '그 빵에는 어떤 음료가 잘 어울려요?', "What do you hope is the last thing left at a bakery?", "What would you drink with it?"],
      ['playlist', '같이 걷는 길에 첫 곡을 고른다면 뭘 틀래요?', '어느 부분에서 볼륨을 올리고 싶어요?', "What song would start our walking playlist?", "When would you turn it up?"],
      ['detour', '여행 중에 일부러 돌아가서라도 꼭 들르는 곳이 있어요?', '거기서 제일 기대되는 건 뭐예요?', "What kind of place is worth a detour when you travel?", "What do you look forward to most there?"],
      ['scent', '집에 들어설 때 어떤 향이 나면 좋겠어요?', '그 향을 좋아하게 된 계기가 있어요?', "What scent would you like to come home to?", "What does it remind you of?"],
      ['fiction', '영화나 드라마, 책 속 공간에서 하룻밤 묵는다면 어디를 고를래요?', '거기서 눈을 뜨면 제일 먼저 뭘 해 보고 싶어요?', "Which fictional place would you spend a night in?", "What would you do there first?"],
      ['colour', '내 방 한쪽 벽을 무슨 색으로 칠하고 싶어요?', '그 벽 앞에 어떤 물건을 놓으면 잘 어울릴까요?', "What color would you paint one wall of your room?", "What would you put beside it?"],
      ['game', '처음 보는 사람과도 금방 친해질 수 있는 게임이나 놀이가 있어요?', '처음 하는 사람에게 어떤 팁을 주고 싶어요?', "What game is fun with people you’ve just met?", "What tip would you give a first-time player?"],
      ['season', '한 계절을 일주일 더 붙잡아 둘 수 있다면 언제예요?', '그 일주일 안에 꼭 하고 싶은 일이 있어요?', "Which season would you keep for one extra week?", "How would you spend that week?"],
      ['dessert', '내 이름을 딴 아이스크림에는 어떤 맛이 들어가요?', '누구에게 첫 숟갈을 권하고 싶어요?', "What flavors would go into an ice cream named after you?", "Who would you offer the first spoonful to?"],
      ['repeat', '줄거리를 알아도 다시 보고 싶은 작품은 뭐예요?', '다시 볼 때마다 기다려지는 장면이 있어요?', "What would you watch or read again even knowing the ending?", "Which moment draws you back?"],
      ['texture', '손이 자주 가는 컵에는 어떤 특징이 있어요?', '그 컵에 담아 마시고 싶은 건 뭐예요?', "What makes a mug the one you reach for?", "What tastes best in it?"],
      ['gift', '작은 선물로 받으면 유난히 반가운 건 뭐예요?', '반대로 다른 사람에게 자주 선물하는 것도 있어요?', "What small gift always makes you smile?", "Is there a small gift you like giving others?"],
      ['museum', '내 취향으로 작은 전시를 열면 어떤 물건을 모을까요?', '입구에 제일 먼저 보여 줄 물건은 뭐예요?', "What would you collect for a tiny exhibition about your tastes?", "Which piece would greet visitors?"],
      ['window', '기차 창밖으로 어떤 풍경이 오래 이어지면 좋겠어요?', '그 풍경을 보면서 듣고 싶은 노래가 있어요?', "What scenery would you love to watch from a train window?", "What song would you listen to while watching it?"],
      ['swap', '하루만 다른 사람의 취미를 체험해 본다면 뭘 해 보고 싶어요?', '그 취미를 아직 못 해 본 이유가 있어요?', "Whose hobby would you try for a day?", "What’s kept you from trying it so far?"],
      ['combo', '나만 아는 의외의 음식 조합이 있어요?', '처음 먹는 사람에게 어떤 비율로 추천해 줄래요?', "What unlikely food pairing do you enjoy?", "How would you tell a friend to try their first bite?"],
      ['cover', '표지만 보고 집어 들게 되는 책은 어떤 분위기예요?', '최근에 표지가 마음에 들어서 고른 책이 있어요?', "What kind of book cover makes you pick it up?", "Have you picked up a book lately just for its cover?"],
      ['credits', '영화가 끝난 뒤 어떤 음악이 흐르면 자리에 더 앉아 있게 돼요?', '엔딩 크레딧까지 기억에 남는 영화가 있어요?', "What kind of music makes you stay for the movie credits?", "Is there a movie whose ending credits stayed with you?"],
      ['sticker', '노트북에 스티커를 하나만 붙인다면 어떤 그림을 고를래요?', '그걸 본 사람에게 어떤 이야기를 해 줄래요?', "If your laptop had just one sticker, what would it show?", "What story would you tell about it?"],
      ['pair', '짭짤한 것 다음에 먹고 싶은 한 입은 뭐예요?', '단짠 조합 중에 제일 좋아하는 건 뭐예요?', "What bite do you crave after something salty?", "What’s your favorite sweet-and-salty pairing?"],
    ]),
  createDeck('daily', '보통의 하루', 'Everyday life', '편안하게', 'Easygoing', '스쳐 지나간 하루에서 들려주고 싶은 장면을 찾아요.', 'Look closer at the moments in an ordinary day.', [
      ['morning', '아침에 일어나서 처음으로 여는 건 뭐예요?', '그걸 열면 하루가 어떻게 시작돼요?', "What’s the first thing you open in the morning?", "What happens next?"],
      ['quiet', '하루 중 가장 조용한 순간은 언제예요?', '그때 들리는 소리를 하나만 꼽는다면요?', "When is your day at its quietest?", "What can you hear then?"],
      ['place', '이유 없이 마음이 편해지는 자리가 있어요?', '그 자리에 앉으면 주로 뭘 해요?', "Where do you feel at ease without quite knowing why?", "What do you notice when you sit there?"],
      ['thanks', '이번 주에 누가 해 준 작은 일 중 고마웠던 건 뭐예요?', '그 일 덕분에 그날 뭐가 달라졌어요?', "What little thing did someone do this week that you appreciated?", "What difference did it make that day?"],
      ['habit', '최근에 새로 생긴 작은 습관이 있어요?', '어떻게 시작하게 됐어요?', "What little habit have you picked up lately?", "How did you get started with it?"],
      ['kitchen', '집에 있는 재료로 자신 있게 만들 수 있는 한 끼는 뭐예요?', '누구에게 한 접시 차려 주고 싶어요?', "What meal could you make confidently with what’s at home?", "What’s your finishing touch?"],
      ['desk', '손 닿는 곳에 두고 자주 쓰는 물건 하나를 소개해 줄래요?', '그 물건을 언제부터 쓰기 시작했어요?', "What do you keep within reach and use often?", "How long have you been using it?"],
      ['laugh', '며칠 사이에 피식 웃었던 순간이 있었어요?', '그 얘기를 들으면 같이 웃을 사람이 떠올라요?', "What made you chuckle in the last few days?", "Which detail still makes you smile?"],
      ['sky', '최근에 하늘을 올려다본 건 언제였어요?', '어디에서 본 하늘이었어요?', "When did you last stop to look at the sky?", "What made you look up?"],
      ['evening', '하루가 끝났다는 느낌을 주는 행동은 뭐예요?', '그 뒤에 기다리는 작은 즐거움이 있어요?', "What tells you your day is winding down?", "What do you like to do next?"],
      ['street', '자주 지나는 길에서 최근 달라진 게 있어요?', '그 변화를 제일 먼저 어떻게 알아챘어요?', "What has changed on a street you use often?", "How did you first notice?"],
      ['note', '최근 잊지 않으려고 메모해 둔 건 뭐예요?', '그 일은 잘 해결됐나요, 아니면 아직 남아 있어요?', "What did you jot down recently so you wouldn’t forget?", "Did you get to it yet, or is it still on your list?"],
      ['repair', '고쳐서라도 오래 쓰고 싶은 물건은 뭐예요?', '그 물건과 함께한 기억 중 떠오르는 게 있어요?', "What would you rather repair and keep using?", "Is there a memory attached to it?"],
      ['rest', '하루 일과가 끝나고 나만의 시간이 생기면 뭘 먼저 해요?', '그 시간을 조금 늘린다면 뭘 더 해 보고 싶어요?', "When you finally get time to yourself, what comes first?", "What makes that time feel like yours?"],
      ['unexpected', '갑자기 빈 시간이 생기면 주로 뭘 하면서 보내요?', '최근에 그렇게 보내서 좋았던 적이 있어요?', "What do you usually do when you get an unexpected pocket of free time?", "When did you last enjoy a break like that?"],
      ['postcard', '오늘 하루를 엽서로 만든다면 앞면에 어떤 장면을 담을래요?', '뒷면에는 어떤 한 줄을 적을까요?', "If today were a postcard, what scene would go on the front?", "What line would you write on the back?"],
      ['shelf', '집에서 최근 자리를 옮긴 물건이 있어요?', '새 자리에 두고 뭐가 편해졌어요?', "What have you moved to a new spot at home?", "What’s easier now?"],
      ['line', '줄 서서 기다릴 때 주로 뭘 하면서 시간을 보내요?', '기다리면서 생각보다 재밌었던 적이 있어요?', "How do you pass the time while waiting in line?", "Have you ever noticed something fun while waiting?"],
      ['light', '집 안에 햇빛이 들 때 제일 예쁜 곳은 어디예요?', '그 빛이 머무는 동안 뭘 하고 싶어요?', "Where does sunlight look best in your home?", "What would you do while it lasts?"],
      ['leftovers', '남은 음식을 맛있게 다시 먹는 나만의 방법이 있어요?', '그 방법을 어디서 알게 됐어요?', "Do you have a favorite way to turn leftovers into a good meal?", "Where did you learn that trick?"],
    ]),
  createDeck('closer', '한 걸음 더', 'A little closer', '깊이 있게', 'Reflective', '서로 익숙해졌을 때, 생각과 마음을 한 겹 더 나눠요.', 'Take your time with a more personal question.', [
      ['kindness', '받아 본 친절 중 아직도 생각나는 건 뭐예요?', '나도 비슷하게 해 주고 싶은 순간이 있어요?', "What act of kindness has stayed with you?", "What small detail do you remember?"],
      ['words', '두고두고 꺼내 보는 말 한마디가 있어요?', '요즘에는 그 말이 어떻게 들려요?', "What words do you come back to?", "When do they come to mind?"],
      ['me', '최근에 나답다고 느낀 순간은 언제예요?', '그 순간의 어떤 모습이 특히 나다웠어요?', "When did you feel most like yourself recently?", "What were you doing at the time?"],
      ['support', '누군가 내 편이라고 느끼게 하는 작은 행동은 뭐예요?', '나도 다른 사람에게 그렇게 해 본 적이 있어요?', "What little gesture tells you someone’s on your side?", "How do you show that to someone else?"],
      ['try', '잘하는 것과 별개로 계속하고 싶은 일이 있어요?', '그중 어느 순간이 가장 좋아요?', "What would you keep doing regardless of how good you are at it?", "Which part keeps you coming back?"],
      ['pace', '내 속도로 천천히 배우고 있거나 배워 보고 싶은 게 있어요?', '아주 조금이라도 달라진 걸 언제 느꼈어요?', "What are you learning, or hoping to learn, at your own pace?", "What’s a small step you’ve enjoyed?"],
      ['welcome', '처음 간 자리에서 환영받는다고 느낀 적이 있어요?', '다음에 새로 온 사람에게 무엇을 해 주고 싶어요?', "When have you felt welcome somewhere new?", "What did someone do that helped?"],
      ['curious', '요즘 머릿속에서 자주 맴도는 고민이나 질문이 있어요?', '그 생각을 처음 하게 된 계기가 뭐예요?', "What question or thought has been on your mind lately?", "What first sparked it?"],
      ['change', '예전에는 몰랐는데 요즘 좋아진 게 있어요?', '생각을 바꿔 준 장면이 기억나요?', "What have you grown to like over time?", "When did your feelings start to shift?"],
      ['advice', '1년 전의 나에게 한마디 건넨다면 어떤 말을 해 주고 싶어요?', '그 말을 가장 듣고 싶었던 순간은 언제였어요?', "What would you tell yourself from a year ago?", "When would you have needed to hear it most?"],
      ['learn', '가까운 사람에게 자연스럽게 닮아 가거나 배운 태도가 있어요?', '그 사람의 어떤 행동에서 느꼈어요?', "What attitude have you picked up from someone close?", "What did you see them do?"],
      ['future', '미래의 나와 작은 약속을 하나 한다면 뭐예요?', '그 약속을 지킨 날은 어떤 모습일까요?', "What small promise would you make your future self?", "What would keeping it look like?"],
      ['listen', '누군가 내 말을 잘 듣고 있다는 걸 어떻게 느껴요?', '나도 대화할 때 따라 하고 싶은 점이 있어요?', "How can you tell someone is really listening?", "What would you like to borrow from the way they listen?"],
      ['memory', '평범했는데 지나고 보니 소중해진 날이 있어요?', '그날로 잠깐 돌아간다면 어떤 걸 더 오래 볼래요?', "What ordinary day became precious in hindsight?", "What would you linger over if you went back?"],
      ['keep', '생활이 바빠져도 지키고 싶은 한 가지는 뭐예요?', '그걸 지킨 날에는 어떤 기분이 들어요?', "What’s one thing you want to keep even when life gets busy?", "How do you feel on days you manage it?"],
      ['invite', '함께 시간을 보내고 싶은 사람을 어디로 초대하고 싶어요?', '마주 앉으면 제일 먼저 어떤 이야기를 꺼낼래요?', "Where would you invite someone you’d like more time with?", "What would you talk about first?"],
      ['ritual', '친구랑 만나면 꼭 하는 게 있어요?', '처음엔 어떻게 시작됐어요?', "Is there something you always do when you meet up with a friend?", "How did it get started?"],
      ['pause', '누군가 내 이야기를 끝까지 기다려 줘서 고마웠던 순간이 있어요?', '그때 어떤 표정이나 행동이 도움이 됐어요?', "When were you grateful someone patiently waited for you to finish?", "What made the pause feel comfortable?"],
      ['ticket', '지난 한 해 중 딱 한 순간으로 돌아갈 수 있다면 언제로 가고 싶어요?', '그 순간으로 돌아가면 무엇을 더 자세히 보고 싶어요?', "If you could revisit one moment from the past year, when would it be?", "What would you look at more closely?"],
      ['letter', '몇 달 뒤의 나에게 사진 한 장을 보낸다면 뭘 찍을래요?', '사진 뒤에는 어떤 말을 남길래요?', "What photo would you send yourself a few months from now?", "What would you write on the back?"],
    ]),
]

export function deckTheme(deck: Pick<Deck, 'id' | 'theme'>): DeckTheme {
  return deck.theme ?? (deck.id as DeckTheme)
}

export function findDeck(id: string | undefined, extraDecks: Deck[] = []) {
  return decks.find(deck => deck.id === id) ?? extraDecks.find(deck => deck.id === id)
}
