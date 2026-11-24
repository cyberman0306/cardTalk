import type { BuiltInDeckId } from './decks.ts'
import type { ExtraLanguage } from '../i18n/ui.ts'

export interface DeckMetaTranslation {
  title: string
  mood: string
  description: string
}

export type CardTranslation = [question: string, followUp: string]

export const deckMetaTranslations: Record<BuiltInDeckId, Record<ExtraLanguage, DeckMetaTranslation>> = {
  hello: {
    ja: { title: 'はじめまして', mood: '気軽に', description: '名前を交わしたあと、小さな話から始めてみましょう。' },
    zh: { title: '初次见面', mood: '轻松破冰', description: '交换名字后，从一个轻松的小故事开始聊吧。' },
    es: { title: 'Primeros saludos', mood: 'Ligero', description: 'Después de presentarse, empiecen con una pequeña historia.' },
  },
  taste: {
    ja: { title: '好き集め', mood: '楽しく', description: 'それぞれの好きを集めると、意外な共通点が見えてきます。' },
    zh: { title: '品味收集', mood: '趣味十足', description: '聊聊各自喜欢的事物，会发现意想不到的共同点。' },
    es: { title: 'Cosas favoritas', mood: 'Divertido', description: 'Descubran en qué coinciden sus gustos.' },
  },
  daily: {
    ja: { title: 'ふつうの一日', mood: 'ゆったり', description: '何気ない一日の中から、話したくなる場面を探します。' },
    zh: { title: '平凡日常', mood: '舒适放松', description: '在匆匆掠过的日常里，找到想分享的瞬间。' },
    es: { title: 'Vida cotidiana', mood: 'Relajado', description: 'Miren de cerca los pequeños momentos de un día común.' },
  },
  closer: {
    ja: { title: 'もう一歩近く', mood: 'じっくり', description: '少し打ち解けたら、考えや気持ちをもう一歩深く分かち合います。' },
    zh: { title: '更近一步', mood: '深度交流', description: '彼此熟悉之后，再多分享一层想法与心声。' },
    es: { title: 'Un poco más cerca', mood: 'Reflexivo', description: 'Tómense su tiempo con preguntas más personales.' },
  },
}

export const cardTranslations: Record<string, Record<ExtraLanguage, CardTranslation>> = {
  // hello
  'hello-route': {
    ja: ['今日ここへ来る途中で、何か目に入ったものはありますか？', 'もう一度その道を歩くなら、どこで少し立ち止まりたいですか？'],
    zh: ['今天来这里的路上，有什么东西吸引了你的注意？', '如果再走一次那条路，你想在哪里稍微停下脚步？'],
    es: ['¿Qué te llamó la atención de camino hasta aquí?', '¿Dónde te detendrías un momento si volvieras a caminar por ahí?'],
  },
  'hello-menu': {
    ja: ['みんなで一緒に食べるメニューを一つ選ぶなら、何をおすすめしますか？', 'そのメニューの一番好きなところはどこですか？'],
    zh: ['如果挑一道大家一起分享的菜，你会推荐什么？', '这道菜最让你喜欢的地方是什么？'],
    es: ['¿Qué plato pedirías para compartir en esta mesa?', '¿Qué es lo que más te gusta de ese plato?'],
  },
  'hello-skill': {
    ja: ['急に5分間のミニ講座を任されたら、何を教えられますか？', '初心者はどこから始めるとよさそうですか？'],
    zh: ['如果突然让你上一节 5 分钟的小课，你能教什么？', '新手应该从哪里开始比较好？'],
    es: ['¿Qué podrías enseñar en una clase de cinco minutos?', '¿Por dónde debería empezar alguien principiante?'],
  },
  'hello-seat': {
    ja: ['初めて入るカフェでは、まずどの席を探しますか？', 'その席に座ったら最初に何をしますか？'],
    zh: ['去一家没去过的咖啡馆时，你会先找什么样的座位？', '坐下后你最先做的事是什么？'],
    es: ['¿Qué asiento buscas primero en una cafetería nueva?', '¿Qué haces primero cuando te sientas ahí?'],
  },
  'hello-photo': {
    ja: ['最近、思わず写真を撮りたくなるものは何ですか？', '最近撮ったお気に入りの一枚を言葉で紹介してもらえますか？'],
    zh: ['最近什么东西会让你忍不住想拍照？', '能用语言描述一下你最近拍的一张照片吗？'],
    es: ['¿Qué te hace sacar la cámara últimamente?', '¿Nos cuentas sobre una foto reciente que te guste?'],
  },
  'hello-walk': {
    ja: ['住んでいる街を1時間だけ案内するなら、どこへ連れて行きたいですか？', 'そこでぜひ見てほしいものは何ですか？'],
    zh: ['如果只有一小时介绍你住的街区，你会带大家去哪儿？', '去那里一定要看的是什么？'],
    es: ['¿A dónde nos llevarías durante una hora por tu barrio?', '¿Qué no deberíamos perdernos ahí?'],
  },
  'hello-song': {
    ja: ['最近つい口ずさんでしまう曲はありますか？', 'その曲を聴くとどんな景色が浮かびますか？'],
    zh: ['最近有没有哪首歌会让你不自觉地哼起来？', '听到那首歌时脑海里会浮现什么画面？'],
    es: ['¿Qué canción se te pega últimamente sin darte cuenta?', '¿Qué escena imaginas cuando la escuchas?'],
  },
  'hello-weather': {
    ja: ['どんな天気を見るとピクニックに行きたくなりますか？', 'レジャーシートに必ず持っていきたいおやつは何ですか？'],
    zh: ['看到什么样的天气会让你想去野餐？', '野餐垫上一定要带的零食是什么？'],
    es: ['¿Qué tipo de clima te da ganas de hacer un picnic?', '¿Qué snack no puede faltar en la manta?'],
  },
  'hello-small-win': {
    ja: ['最近、思ったよりうまくいって嬉しかったことはありますか？', 'そのとき一番に誰に伝えたくなりましたか？'],
    zh: ['最近有没有哪件事比想象中顺利，让你挺开心的？', '当时你最想第一个告诉谁？'],
    es: ['¿Qué salió mejor de lo que esperabas últimamente?', '¿A quién quisiste contárselo primero?'],
  },
  'hello-hour': {
    ja: ['待ち合わせが急に1時間後ろ倒しになったら、近くで何をして過ごしますか？', '一人のときと二人のときで選び方は変わりますか？'],
    zh: ['如果约会突然推迟一小时，你会在附近做些什么打发时间？', '一个人和两个人时，你的选择会不一样吗？'],
    es: ['Si un plan se retrasa una hora, ¿qué harías cerca mientras tanto?', '¿Elegirías distinto si estuvieras acompañado?'],
  },
  'hello-object': {
    ja: ['普段バッグに入れているものの中で、一番自分らしいものは何ですか？', 'いつ頃からそれを持ち歩いていますか？'],
    zh: ['平时包里带的东西中，最能代表你的是哪一件？', '你是从什么时候开始随身带着它的？'],
    es: ['¿Qué llevas siempre en tu bolso o mochila que dice mucho de ti?', '¿Desde cuándo lo llevas contigo?'],
  },
  'hello-sound': {
    ja: ['聞くと気分がよくなる日常の音はありますか？', 'その音は主にいつ、どこで聞きますか？'],
    zh: ['生活中有没有一种听了会心情变好的声音？', '你通常在什么时候、什么地方听到它？'],
    es: ['¿Qué sonido cotidiano te levanta el ánimo?', '¿Cuándo y dónde sueles escucharlo?'],
  },
  'hello-nickname': {
    ja: ['今日の気分を絵文字ひとつで表すならどれですか？', 'それを選んだ理由を少し教えてもらえますか？'],
    zh: ['如果用一个表情符号形容今天的心情，你会选哪个？', '能说说为什么选这个表情吗？'],
    es: ['¿Qué emoji describe mejor tu ánimo de hoy?', '¿Qué te hizo elegir ese?'],
  },
  'hello-shop': {
    ja: ['街に小さなお店をひとつ開けるなら、何を売りますか？', '最初のお客さんにはまず何をすすめたいですか？'],
    zh: ['如果能在街角开一家小店，你想卖什么？', '你会先向第一位客人推荐什么？'],
    es: ['Si pudieras abrir una pequeña tienda, ¿qué venderías?', '¿Qué le ofrecerías a tu primer cliente?'],
  },
  'hello-break': {
    ja: ['ちょうど10分休憩できるとき、最初に手が伸びるものは何ですか？', 'もう少し長く休めるなら何をしたいですか？'],
    zh: ['只有十分钟休息时，你最先会拿什么或做什么？', '如果休息时间再长一点，你想做什么？'],
    es: ['¿Qué es lo primero que agarras en un descanso de diez minutos?', '¿Qué harías si tuvieras un descanso más largo?'],
  },
  'hello-weekend': {
    ja: ['最近の週末にやってみて、またやりたいと思ったことはありますか？', 'ここにいるみんなとやるなら何から準備しますか？'],
    zh: ['最近周末试过的事情里，有什么想再做一次的？', '如果和在座的人一起做，要先准备什么？'],
    es: ['¿Qué probaste un fin de semana que repetirías con gusto?', '¿Qué necesitaríamos para hacerlo juntos?'],
  },
  'hello-stamp': {
    ja: ['今日の集まりに名前をつけるとしたら、何と呼びたいですか？', 'その名前を思いついた理由は何ですか？'],
    zh: ['如果给今天的聚会起个名字，你会叫它什么？', '为什么会想到这个名字？'],
    es: ['Si le pusieras un nombre a la reunión de hoy, ¿cómo la llamarías?', '¿Qué inspiró ese nombre?'],
  },
  'hello-bench': {
    ja: ['公園のベンチに座って一緒に食べたいおやつは何ですか？', 'そのおやつに合わせたい飲み物は何ですか？'],
    zh: ['坐在公园长椅上，你想和大家一起吃什么零食？', '配什么饮料最合适？'],
    es: ['¿Qué snack compartirías en un banco del parque?', '¿Qué bebida combinaría mejor?'],
  },
  'hello-map': {
    ja: ['今日ここへ出発する直前にしたことは何ですか？', 'そのおかげで今の気分はどうですか？'],
    zh: ['今天出门来这里前，你做的最后一件事是什么？', '做完那件事后你现在心情怎么样？'],
    es: ['¿Qué fue lo último que hiciste antes de salir hacia aquí?', '¿Cómo te dejó sintiéndote?'],
  },
  'hello-lesson': {
    ja: ['小学校の一日をやり直せるなら、どの授業が一番楽しみですか？', '休み時間は友達と何をして遊んでいましたか？'],
    zh: ['如果能重温小学的一天，你最期待哪一节课？', '课间休息时你常和同学玩什么？'],
    es: ['Si pudieras repetir una clase de la primaria, ¿cuál elegirías?', '¿Qué solías hacer en el recreo?'],
  },

  // taste
  'taste-bread': {
    ja: ['パン屋さんに最後の一つだけ残っていたら、何のパンだと嬉しいですか？', 'そのパンにはどんな飲み物が合いますか？'],
    zh: ['如果面包店只剩最后一个面包，你希望是什么面包？', '配什么饮料最搭？'],
    es: ['¿Qué te gustaría que fuera lo último que queda en una panadería?', '¿Con qué bebida lo acompañarías?'],
  },
  'taste-playlist': {
    ja: ['一緒に歩く道の1曲目を選ぶなら、何を流しますか？', 'どのあたりで音量を上げたくなりますか？'],
    zh: ['一起散步时，播放列表的第一首歌你会选哪首？', '放到哪一段时你会想调大音量？'],
    es: ['¿Qué canción pondrías primero en una lista para caminar juntos?', '¿En qué parte subirías el volumen?'],
  },
  'taste-detour': {
    ja: ['旅行中、少し遠回りしてでも立ち寄りたくなる場所はありますか？', 'そこで一番楽しみにしていることは何ですか？'],
    zh: ['旅行时，有什么地方是你宁愿绕路也要去逛逛的？', '你最期待在那里看到或买到什么？'],
    es: ['¿Qué tipo de lugar merece un desvío cuando viajas?', '¿Qué es lo que más ilusión te hace encontrar ahí?'],
  },
  'taste-scent': {
    ja: ['家に帰ったとき、どんな香りがするとホッとしますか？', 'その香りを好きになったきっかけはありますか？'],
    zh: ['回到家推开门时，你希望闻到什么味道？', '你是怎么爱上这种气味的？'],
    es: ['¿Con qué aroma te gustaría que te recibiera tu casa?', '¿Qué recuerdo te trae ese olor?'],
  },
  'taste-fiction': {
    ja: ['映画やドラマ、本の世界に一泊できるならどこを選びますか？', 'そこで目を覚ましたら最初に何をしてみたいですか？'],
    zh: ['如果能在电影、剧集或书里的世界住一晚，你会选哪里？', '在那里醒来后你最想先做什么？'],
    es: ['¿En qué lugar ficticio de una película o libro pasarías una noche?', '¿Qué harías primero al despertar ahí?'],
  },
  'taste-colour': {
    ja: ['自分の部屋の壁を一面だけ塗るなら、何色にしたいですか？', 'その壁の前に何を置いたら似合いそうですか？'],
    zh: ['如果把房间的一面墙刷成别的颜色，你会选什么色？', '在这面墙前放什么东西会很搭？'],
    es: ['¿De qué color pintarías una pared de tu habitación?', '¿Qué pondrías delante de esa pared?'],
  },
  'taste-game': {
    ja: ['初対面の人ともすぐ盛り上がれるゲームや遊びはありますか？', '初めての人にはどんなコツを教えたいですか？'],
    zh: ['有什么游戏或玩法能让你和刚认识的人很快玩到一起？', '你会给第一次玩的人什么小技巧？'],
    es: ['¿Qué juego funciona bien con gente que acabas de conocer?', '¿Qué consejo le darías a alguien que juega por primera vez?'],
  },
  'taste-season': {
    ja: ['ひとつの季節を1週間だけ延ばせるなら、いつにしますか？', 'その1週間でぜひやりたいことは何ですか？'],
    zh: ['如果可以把一个季节延长一周，你会选哪个季节？', '那一周里你最想做什么？'],
    es: ['¿Qué estación del año alargarías una semana más?', '¿Cómo aprovecharías esa semana?'],
  },
  'taste-dessert': {
    ja: ['自分の名前がついたアイスクリームには、どんな味が入りますか？', '最初の一口は誰にすすめたいですか？'],
    zh: ['如果有一款以你名字命名的冰淇淋，会是什么口味？', '第一勺你想先给谁尝？'],
    es: ['¿Qué sabores tendría un helado con tu nombre?', '¿A quién le darías la primera cucharada?'],
  },
  'taste-repeat': {
    ja: ['結末を知っていても何度も見返したくなる作品はありますか？', '見返すたびに楽しみになるシーンはありますか？'],
    zh: ['即使知道结局，你还是会想重看的作品是哪一部？', '每次重看时最期待哪一个片段？'],
    es: ['¿Qué película, serie o libro repetirías aunque ya sepas el final?', '¿Qué escena te hace volver siempre?'],
  },
  'taste-texture': {
    ja: ['つい手が伸びるマグカップにはどんな特徴がありますか？', 'そのカップで飲むと一番おいしいものは何ですか？'],
    zh: ['你最顺手的那个杯子有什么特点？', '用它装什么喝起来最舒服？'],
    es: ['¿Qué hace que una taza sea tu favorita?', '¿Qué sabe mejor en esa taza?'],
  },
  'taste-gift': {
    ja: ['ちょっとしたプレゼントでもらうと特に嬉しいものは何ですか？', '逆に、人によく贈る定番のプレゼントはありますか？'],
    zh: ['收到什么样的小礼物会让你格外开心？', '反过来，你经常会送别人什么小礼物？'],
    es: ['¿Qué pequeño regalo siempre te saca una sonrisa?', '¿Hay algún detalle pequeño que te guste regalar a otros?'],
  },
  'taste-museum': {
    ja: ['自分の「好き」で小さな展示を開くなら、何を集めますか？', '入口で最初に見せたいアイテムは何ですか？'],
    zh: ['如果用你的个人品味办一个小展览，你会展出些什么？', '放在入口处最先展示的展品会是什么？'],
    es: ['Si hicieras una mini exposición sobre tus gustos, ¿qué pondrías?', '¿Qué pieza recibiría a los visitantes en la entrada?'],
  },
  'taste-window': {
    ja: ['電車の窓からずっと眺めていたい景色はどんな風景ですか？', 'その景色を見ながら聴きたい曲はありますか？'],
    zh: ['坐火车时，你希望窗外一直绵延着怎样的风景？', '看着那片风景时你想听什么歌？'],
    es: ['¿Qué paisaje te encantaría ver por la ventana de un tren?', '¿Qué canción escucharías mientras lo miras?'],
  },
  'taste-swap': {
    ja: ['一日だけ誰かの趣味を体験できるなら、何をやってみたいですか？', '今まで試せていなかった理由はありますか？'],
    zh: ['如果能体验别人的一天爱好，你想试试什么？', '之前一直没尝试的原因是什么？'],
    es: ['¿El pasatiempo de quién probarías por un día?', '¿Qué te ha impedido intentarlo hasta ahora?'],
  },
  'taste-combo': {
    ja: ['自分だけが知っている意外な食べ合わせはありますか？', '初めて食べる人にどんな割合でおすすめしますか？'],
    zh: ['你有没有私藏的、听起来很意外却好吃的食物搭配？', '你会怎么教朋友第一口该怎么配？'],
    es: ['¿Qué combinación rara de comida disfrutas mucho?', '¿Cómo convencerías a un amigo de probar el primer bocado?'],
  },
  'taste-cover': {
    ja: ['表紙を見ただけで手に取りたくなる本は、どんな雰囲気ですか？', '最近、装丁が気に入って選んだ本はありますか？'],
    zh: ['什么样的书封会让你看一眼就想拿起来？', '最近有因为封面好看而买或借的书吗？'],
    es: ['¿Qué tipo de portada te hace levantar un libro?', '¿Elegiste algún libro últimamente solo por su portada?'],
  },
  'taste-credits': {
    ja: ['映画が終わったあと、どんな音楽が流れると席を立てなくなりますか？', 'エンドロールまで心に残っている映画はありますか？'],
    zh: ['电影散场时，响起什么样的音乐会让你忍不住多坐一会儿？', '有哪部电影连片尾字幕都让你念念不忘？'],
    es: ['¿Qué tipo de música te hace quedarte hasta los créditos de una película?', '¿Qué película recuerdas incluso por sus créditos finales?'],
  },
  'taste-sticker': {
    ja: ['パソコンにステッカーを1枚だけ貼るなら、どんな絵柄にしますか？', 'それを見た人にどんな話をしますか？'],
    zh: ['如果只能在电脑上贴一张贴纸，你会选什么图案？', '别人看到时你会怎么介绍它？'],
    es: ['Si tu portátil solo pudiera llevar un sticker, ¿de qué sería?', '¿Qué historia contarías sobre él?'],
  },
  'taste-pair': {
    ja: ['しょっぱいものの次に食べたくなる一口は何ですか？', '甘じょっぱい組み合わせで一番好きなものは何ですか？'],
    zh: ['吃完咸的东西之后，你最想来一口什么？', '你最喜欢的甜咸搭配是什么？'],
    es: ['¿Qué bocado te apetece justo después de algo salado?', '¿Cuál es tu combinación favorita de dulce y salado?'],
  },

  // daily
  'daily-morning': {
    ja: ['朝起きて最初に開けるものは何ですか？', 'それを開けると一日がどう始まりますか？'],
    zh: ['早上醒来后你最先打开的是什么？', '打开它之后你的一天通常是怎样开始的？'],
    es: ['¿Qué es lo primero que abres al despertar por la mañana?', '¿Qué pasa justo después?'],
  },
  'daily-quiet': {
    ja: ['一日の中で一番静かな瞬間はいつですか？', 'そのときに聞こえる音を一つ挙げるとしたら何ですか？'],
    zh: ['一天当中最安静的时刻是什么时候？', '那时你能听到的声音是什么？'],
    es: ['¿Cuál es el momento más silencioso de tu día?', '¿Qué se escucha en ese instante?'],
  },
  'daily-place': {
    ja: ['理由はわからないけれど落ち着く場所はありますか？', 'そこに座っているとき、いつも何をしていますか？'],
    zh: ['有没有一个说不上原因、但待着就很安心的角落？', '坐在那里时你通常会做些什么？'],
    es: ['¿Dónde te sientes a gusto sin saber muy bien por qué?', '¿En qué te fijas cuando estás ahí?'],
  },
  'daily-thanks': {
    ja: ['今週、誰かにしてもらってありがたかった小さなことは何ですか？', 'そのおかげでその日はどう変わりましたか？'],
    zh: ['这周别人为你做的哪件小事让你觉得很感谢？', '那件小事让你那天有什么不一样？'],
    es: ['¿Qué pequeño gesto de alguien agradeciste esta semana?', '¿Qué diferencia marcó en tu día?'],
  },
  'daily-habit': {
    ja: ['最近新しく身についた小さな習慣はありますか？', 'どんなきっかけで始めましたか？'],
    zh: ['最近有没有养成什么新的小习惯？', '是怎么开始这个习惯的？'],
    es: ['¿Qué pequeño hábito adoptaste últimamente?', '¿Cómo empezaste con él?'],
  },
  'daily-kitchen': {
    ja: ['家にある材料で自信を持って作れる一皿は何ですか？', '誰に作ってあげたいですか？'],
    zh: ['用家里现有的食材，你最有把握做的一道菜是什么？', '你最想做给谁吃？'],
    es: ['¿Qué comida puedes preparar con confianza con lo que hay en casa?', '¿Cuál es tu toque final?'],
  },
  'daily-desk': {
    ja: ['手の届くところに置いてよく使うものを一つ紹介してもらえますか？', 'いつ頃から使い始めましたか？'],
    zh: ['能介绍一件你放在手边、每天常用的东西吗？', '你从什么时候开始用它的？'],
    es: ['¿Qué tienes siempre a mano y usas a diario?', '¿Desde hace cuánto lo usas?'],
  },
  'daily-laugh': {
    ja: ['ここ数日で思わずくすっと笑った瞬間はありましたか？', 'その話を聞いて一緒に笑ってくれそうな人は浮かびますか？'],
    zh: ['这几天有没有哪个瞬间让你忍不住笑出声？', '说起这件事，你会想到谁会和你一起笑？'],
    es: ['¿Qué te hizo reír por lo bajo en los últimos días?', '¿Qué detalle todavía te saca una sonrisa?'],
  },
  'daily-sky': {
    ja: ['最近、空を見上げたのはいつでしたか？', 'どこで見た空でしたか？'],
    zh: ['你最近一次抬头看天空是什么时候？', '那是在哪里看到的天空？'],
    es: ['¿Cuándo fue la última vez que te detuviste a mirar el cielo?', '¿Qué te hizo levantar la vista?'],
  },
  'daily-evening': {
    ja: ['「今日が終わったな」と感じる行動は何ですか？', 'そのあとに待っている小さな楽しみはありますか？'],
    zh: ['做什么事情会让你觉得“今天终于结束了”？', '那之后还有什么小小的享受在等着你？'],
    es: ['¿Qué gesto te indica que tu día ya terminó?', '¿Qué te gusta hacer justo después?'],
  },
  'daily-street': {
    ja: ['よく通る道で、最近変わったことはありますか？', 'その変化に一番最初にどうやって気づきましたか？'],
    zh: ['你常走的那条路上，最近有什么新变化吗？', '你最先是怎么注意到这个变化的？'],
    es: ['¿Qué ha cambiado últimamente en una calle por la que pasas seguido?', '¿Cómo te diste cuenta la primera vez?'],
  },
  'daily-note': {
    ja: ['最近、忘れないようにメモしたことは何ですか？', 'それはもう片付きましたか、それともまだ残っていますか？'],
    zh: ['最近为了不忘记，你随手记下了什么？', '那件事解决了吗，还是还在清单上？'],
    es: ['¿Qué anotaste hace poco para no olvidarlo?', '¿Ya lo hiciste o sigue pendiente?'],
  },
  'daily-repair': {
    ja: ['直してでも長く使い続けたいものは何ですか？', 'それにまつわる思い出はありますか？'],
    zh: ['有什么东西是坏了也想修好、一直用下去的？', '关于它有什么让你记得的回忆吗？'],
    es: ['¿Qué preferirías reparar antes que reemplazar?', '¿Hay algún recuerdo unido a ese objeto?'],
  },
  'daily-rest': {
    ja: ['一日の終わりに自分だけの時間ができたら、まず何をしますか？', 'その時間をもう少し増やせるなら何を足したいですか？'],
    zh: ['忙完一天终于有了独处时间，你最先做什么？', '如果这段时间能拉长一点，你还想做什么？'],
    es: ['Cuando por fin tienes un rato para ti, ¿qué haces primero?', '¿Qué hace que ese tiempo se sienta realmente tuyo?'],
  },
  'daily-unexpected': {
    ja: ['急に空き時間ができたら、普段は何をして過ごしますか？', '最近そうやって過ごしてよかったなと思ったことはありますか？'],
    zh: ['突然多出一段空闲时间时，你一般会怎么过？', '最近有哪次这样度过让你觉得很棒？'],
    es: ['¿Qué sueles hacer cuando te aparece un rato libre inesperado?', '¿Cuándo disfrutaste por última vez una pausa así?'],
  },
  'daily-postcard': {
    ja: ['今日一日をポストカードにするなら、表にどんな場面を載せますか？', '裏にはどんな一言を添えますか？'],
    zh: ['如果把今天做成一张明信片，正面你会放什么画面？', '背面你会写下哪一句话？'],
    es: ['Si el día de hoy fuera una postal, ¿qué escena pondrías al frente?', '¿Qué frase escribirías detrás?'],
  },
  'daily-shelf': {
    ja: ['最近、家の中で置き場所を変えたものはありますか？', '新しい場所にして何が便利になりましたか？'],
    zh: ['最近家里有没有挪动过哪件东西的位置？', '换到新位置后有什么变顺手了？'],
    es: ['¿Qué cambiaste de lugar en tu casa hace poco?', '¿Qué resulta más cómodo ahora?'],
  },
  'daily-line': {
    ja: ['列に並んで待っているとき、いつも何をして過ごしますか？', '待っている間に意外と楽しかったことはありますか？'],
    zh: ['排队等待的时候，你平时都在干嘛打发时间？', '有没有在排队时发现过什么好玩的事？'],
    es: ['¿Cómo pasas el tiempo mientras haces fila?', '¿Notaste alguna vez algo divertido mientras esperabas?'],
  },
  'daily-light': {
    ja: ['家の中で陽の光が入るとき、一番きれいな場所はどこですか？', 'その光がある間に何をしていたいですか？'],
    zh: ['阳光照进家里时，哪个角落最好看？', '趁着阳光还在，你想在那里做什么？'],
    es: ['¿Dónde se ve más bonita la luz del sol en tu casa?', '¿Qué te gustaría hacer mientras dura esa luz?'],
  },
  'daily-leftovers': {
    ja: ['残ったおかずをおいしく食べ直す、自分なりの工夫はありますか？', 'その食べ方はどこで知りましたか？'],
    zh: ['你有没有把剩菜重新变好吃的独家方法？', '这个方法你是从哪儿学来的？'],
    es: ['¿Tienes alguna forma favorita de aprovechar las sobras de comida?', '¿Dónde aprendiste ese truco?'],
  },

  // closer
  'closer-kindness': {
    ja: ['これまで受けた親切の中で、今でも覚えていることは何ですか？', '自分も誰かに同じようにしてあげたいと思う瞬間はありますか？'],
    zh: ['别人给过你的善意中，哪一件至今还记在心里？', '你有没有在某个瞬间也想那样对待别人？'],
    es: ['¿Qué gesto de amabilidad se te ha quedado grabado?', '¿Qué pequeño detalle recuerdas de ese momento?'],
  },
  'closer-words': {
    ja: ['何度でも思い出して支えにしている言葉はありますか？', '今の自分にはその言葉がどう響きますか？'],
    zh: ['有没有一句话你总是反复想起、记在心里？', '现在的你再想起那句话，感觉有什么不同？'],
    es: ['¿A qué palabras vuelves una y otra vez?', '¿En qué momentos te vienen a la mente?'],
  },
  'closer-me': {
    ja: ['最近「自分らしいな」と感じた瞬間はいつですか？', 'その瞬間のどんなところが特に自分らしかったですか？'],
    zh: ['最近一次觉得“这很像我自己”是什么时候？', '那个瞬间具体哪里让你觉得最像自己？'],
    es: ['¿Cuándo te sentiste más tú mismo últimamente?', '¿Qué estabas haciendo en ese momento?'],
  },
  'closer-support': {
    ja: ['「この人は味方だな」と感じるちょっとした行動は何ですか？', '自分も誰かにそうしてあげたことはありますか？'],
    zh: ['什么样的一个小举动，会让你觉得对方是站在你这边的？', '你平时怎么向别人表达这种支持？'],
    es: ['¿Qué pequeño gesto te hace sentir que alguien está de tu lado?', '¿Cómo sueles demostrar eso a los demás?'],
  },
  'closer-try': {
    ja: ['上手いかどうかに関係なく、ずっと続けたいことはありますか？', 'その中でもどの瞬間が一番好きですか？'],
    zh: ['不管擅不擅长，你都想一直做下去的事是什么？', '其中哪一个瞬间最让你享受？'],
    es: ['¿Qué seguirías haciendo sin importar qué tan bien se te dé?', '¿Qué parte hace que siempre vuelvas a ello?'],
  },
  'closer-pace': {
    ja: ['自分のペースでゆっくり学んでいる、または学んでみたいことはありますか？', 'ほんの少しでも変わったと感じた瞬間はいつでしたか？'],
    zh: ['有没有一件事，你正在按自己的节奏慢慢学，或者很想慢慢学？', '什么时候让你觉得自己哪怕进步了一点点？'],
    es: ['¿Qué estás aprendiendo, o te gustaría aprender, a tu propio ritmo?', '¿Qué pequeño avance has disfrutado?'],
  },
  'closer-welcome': {
    ja: ['初めて行った場所で「歓迎されているな」と感じたことはありますか？', '次に新しく来る人には何をしてあげたいですか？'],
    zh: ['在一个陌生场合，你有没有过被热情接纳的感觉？', '下次遇到新来的人，你想为对方做些什么？'],
    es: ['¿Cuándo te sentiste bienvenido en un lugar nuevo?', '¿Qué hizo alguien que te ayudó a sentirte así?'],
  },
  'closer-curious': {
    ja: ['最近、頭の中でよく巡っている問いや悩みはありますか？', 'それを考え始めたきっかけは何ですか？'],
    zh: ['最近有没有一个念头或问题经常在你脑海里盘旋？', '最初是什么让你开始想这个问题的？'],
    es: ['¿Qué pregunta o pensamiento te ronda la cabeza últimamente?', '¿Qué hizo que empezaras a pensarlo?'],
  },
  'closer-change': {
    ja: ['昔は良さがわからなかったのに、最近好きになったものはありますか？', '気持ちが変わったきっかけの場面を覚えていますか？'],
    zh: ['有没有什么东西以前不懂得欣赏，现在却越来越喜欢？', '还记得让你改观的那个瞬间吗？'],
    es: ['¿Qué has aprendido a disfrutar con el tiempo?', '¿Cuándo empezó a cambiar lo que sentías?'],
  },
  'closer-advice': {
    ja: ['1年前の自分にひと言だけ伝えるなら、何と言いたいですか？', 'その言葉を一番聞きたかった瞬間はいつでしたか？'],
    zh: ['如果能对一年前的自己说一句话，你想说什么？', '你最需要听到这句话的时刻是什么时候？'],
    es: ['¿Qué le dirías a tu yo de hace un año?', '¿En qué momento habrías necesitado más escucharlo?'],
  },
  'closer-learn': {
    ja: ['身近な人と過ごすうちに自然と身についた姿勢や癖はありますか？', 'その人のどんな行動から感じ取りましたか？'],
    zh: ['和亲近的人相处久了，你自然而然学到了哪种处事态度？', '你是从对方哪件事里感受到的？'],
    es: ['¿Qué actitud has aprendido de alguien cercano?', '¿Qué le viste hacer que te inspiró?'],
  },
  'closer-future': {
    ja: ['未来の自分と小さな約束をひとつするなら何にしますか？', 'その約束を守れた日はどんな姿だと思いますか？'],
    zh: ['如果和未来的自己做一个小小的约定，会是什么？', '做到那个约定的那天，你会是什么样子？'],
    es: ['¿Qué pequeña promesa le harías a tu yo del futuro?', '¿Cómo se vería el día en que la cumplas?'],
  },
  'closer-listen': {
    ja: ['誰かが自分の話をちゃんと聴いてくれていると、どんなときに感じますか？', '自分が話すときも真似したいところはありますか？'],
    zh: ['你怎么感觉到对方真的在认真听你说话？', '对方倾听的方式里，有什么是你想学习的？'],
    es: ['¿Cómo notas que alguien te está escuchando de verdad?', '¿Qué te gustaría imitar de su forma de escuchar?'],
  },
  'closer-memory': {
    ja: ['当時は普通だったのに、振り返ると大切になった日はありますか？', 'その日に少し戻れるなら、何をもう少し長く見ていたいですか？'],
    zh: ['有没有哪一天当时觉得很普通，回头看却变得格外珍贵？', '如果能短暂回到那天，你想多看一会儿什么？'],
    es: ['¿Qué día común se volvió valioso al mirarlo en retrospectiva?', 'Si pudieras volver un instante, ¿en qué te detendrías más?'],
  },
  'closer-keep': {
    ja: ['毎日が忙しくなっても、これだけは守りたいと思うものは何ですか？', 'それを守れた日はどんな気持ちになりますか？'],
    zh: ['哪怕生活再忙，你也想守住的一件事是什么？', '守住它的那天，你心里是什么感觉？'],
    es: ['¿Qué quieres mantener incluso cuando la vida se pone muy ocupada?', '¿Cómo te sientes los días en que lo logras?'],
  },
  'closer-invite': {
    ja: ['もっと一緒に過ごしたい人を、どこへ招きたいですか？', '向かい合って座ったら最初にどんな話を切り出しますか？'],
    zh: ['想多待一会儿的人，你想邀请对方去哪里？', '面对面坐下后，你最先会聊什么话题？'],
    es: ['¿A dónde invitarías a alguien con quien quieres pasar más tiempo?', '¿De qué hablarían primero al sentarse?'],
  },
  'closer-ritual': {
    ja: ['友達と会うといつも決まってすることはありますか？', '最初はどんなきっかけで始まりましたか？'],
    zh: ['和朋友见面时，有没有每次必做的小仪式？', '最初是怎么开始的？'],
    es: ['¿Hay algo que siempre haces cuando te reúnes con un amigo?', '¿Cómo empezó esa costumbre?'],
  },
  'closer-pause': {
    ja: ['誰かが最後まで話を待ってくれて嬉しかった瞬間はありますか？', 'そのとき、どんな表情や仕草が安心感につながりましたか？'],
    zh: ['有没有哪个瞬间，因为有人耐心听你慢慢说完而觉得很暖心？', '当时对方的什么表情或举动让你觉得很自在？'],
    es: ['¿Cuándo agradeciste que alguien esperara con paciencia a que terminaras de hablar?', '¿Qué hizo que esa pausa se sintiera cómoda?'],
  },
  'closer-ticket': {
    ja: ['この1年の中で一度だけ戻れるとしたら、いつに戻りたいですか？', 'その瞬間にもう一度行けたら、何をじっくり見たいですか？'],
    zh: ['如果能回到过去一年的某一个瞬间，你想回到什么时候？', '再回去一次的话，你想更仔细地看看什么？'],
    es: ['Si pudieras volver a un solo momento del último año, ¿cuál elegirías?', '¿Qué mirarías con más detalle esta vez?'],
  },
  'closer-letter': {
    ja: ['数か月後の自分に写真を1枚送るなら、何を撮りますか？', '写真の裏にはどんな言葉を添えますか？'],
    zh: ['如果给几个月后的自己寄一张照片，你会拍什么？', '照片背面你会写下什么话？'],
    es: ['¿Qué foto te enviarías a ti mismo dentro de unos meses?', '¿Qué escribirías en la parte de atrás?'],
  },
}
