import type { Language } from '../language.ts'

export type ExtraLanguage = Exclude<Language, 'ko' | 'en'>
type Dict = Record<string, Record<ExtraLanguage, string>>

export const uiTranslations: Dict = {
  'CardTalk · Conversation cards': {
    ja: 'CardTalk · 会話カード',
    zh: 'CardTalk · 对话卡牌',
    es: 'CardTalk · Cartas de conversación',
  },
  'CardTalk home': {
    ja: 'CardTalk ホーム',
    zh: 'CardTalk 首页',
    es: 'Inicio de CardTalk',
  },
  'Main menu': {
    ja: 'メインメニュー',
    zh: '主菜单',
    es: 'Menú principal',
  },
  'Choose a deck': {
    ja: 'デッキを選ぶ',
    zh: '选择牌组',
    es: 'Elegir mazo',
  },
  'Choose a deck ': {
    ja: 'デッキを選ぶ ',
    zh: '选择牌组 ',
    es: 'Elegir mazo ',
  },
  'Saved': {
    ja: '保存済み',
    zh: '收藏夹',
    es: 'Guardadas',
  },
  'How to play': {
    ja: '遊び方',
    zh: '玩法说明',
    es: 'Cómo jugar',
  },
  'Close': {
    ja: '閉じる',
    zh: '关闭',
    es: 'Cerrar',
  },
  'Language': {
    ja: '言語',
    zh: '语言',
    es: 'Idioma',
  },
  'Storage is unavailable. Progress will last for this session.': {
    ja: '端末の保存領域を使えないため、このセッションのみ記録されます。',
    zh: '无法使用设备存储空间，本次对话记录仅在当前会话保留。',
    es: 'Almacenamiento no disponible. El progreso solo durará esta sesión.',
  },
  'Gather around': {
    ja: 'テーブルを囲もう',
    zh: '围坐在一起',
    es: 'Reúnanse alrededor',
  },
  'Choose a deck, players and rounds. The person holding the phone is seat one.': {
    ja: 'デッキ・人数・周回数を選びます。スマホを持っている人が1番目です。',
    zh: '选择牌组、人数和轮数。拿着手机的人是 1 号位。',
    es: 'Elijan mazo, jugadores y rondas. Quien tiene el teléfono es el turno 1.',
  },
  'Flip a card': {
    ja: 'カードをめくって話す',
    zh: '翻开卡牌聊一聊',
    es: 'Voltea una carta',
  },
  'Open the follow-up if you’re curious. Swap the question or pass without answering.': {
    ja: 'もっと聞きたいときは深掘り質問を開けます。質問を替えたり、パスしてもOKです。',
    zh: '想多听一点可以展开追问。也可以换题，或不回答直接跳过。',
    es: 'Abre la pregunta extra si quieres saber más. Puedes cambiarla o pasar sin responder.',
  },
  'Pass clockwise': {
    ja: '時計回りに渡そう',
    zh: '顺时针传递手机',
    es: 'Pasa en sentido horario',
  },
  'One turn each makes a round. Bookmark questions you’d like to revisit.': {
    ja: '全員が一回ずつ話すと1周です。気に入った質問はブックマークできます。',
    zh: '每人轮流聊完一次算一轮。喜欢的提问可以收藏起来。',
    es: 'Un turno por persona forma una ronda. Guarda las preguntas que te gusten.',
  },
  'Got it': {
    ja: 'わかりました',
    zh: '知道了',
    es: 'Entendido',
  },
  'Privacy policy': {
    ja: 'プライバシーポリシー',
    zh: '隐私政策',
    es: 'Política de privacidad',
  },
  'Policy details': {
    ja: 'ポリシー詳細',
    zh: '政策详情',
    es: 'Detalles de la política',
  },
  'Go back': {
    ja: '戻る',
    zh: '返回',
    es: 'Volver',
  },
  'Start a new conversation?': {
    ja: '新しい会話を始めますか？',
    zh: '要开始新对话吗？',
    es: '¿Empezar una nueva conversación?',
  },
  'This ends the current game and shuffles a new deck. Your saved questions stay with you.': {
    ja: '進行中のゲームを終了して新しいカードを切ります。保存した質問はそのまま残ります。',
    zh: '将结束当前对局并重新洗牌。已收藏的问题会继续保留。',
    es: 'Esto termina la partida actual y baraja un mazo nuevo. Tus preguntas guardadas se conservan.',
  },
  'Cancel': {
    ja: 'キャンセル',
    zh: '取消',
    es: 'Cancelar',
  },
  'Start again ': {
    ja: '新しく始める ',
    zh: '重新开始 ',
    es: 'Empezar de nuevo ',
  },
  'Delete this card pack?': {
    ja: 'このカードパックを削除しますか？',
    zh: '要删除这个卡牌包吗？',
    es: '¿Eliminar este mazo?',
  },
  'Delete': {
    ja: '削除する',
    zh: '删除',
    es: 'Eliminar',
  },
  'Conversation in progress': {
    ja: '進行中の会話',
    zh: '进行中的对话',
    es: 'Conversación en curso',
  },
  ' turns': {
    ja: 'ターン目',
    zh: '回合',
    es: ' turnos',
  },
  'Resume ': {
    ja: '続ける ',
    zh: '继续 ',
    es: 'Continuar ',
  },
  'Featured · ': {
    ja: 'おすすめ · ',
    zh: '推荐 · ',
    es: 'Destacado · ',
  },
  'Pass one phone around a table of 2–6.': {
    ja: '2〜6人でスマホ1台を回しながら話せます。',
    zh: '2～6 人传阅一部手机，轻松开启话题。',
    es: 'Pasen un solo teléfono entre 2 y 6 personas.',
  },
  'Open deck ': {
    ja: 'このデッキを開く ',
    zh: '打开牌组 ',
    es: 'Abrir mazo ',
  },
  ' decks · ': {
    ja: 'デッキ · ',
    zh: '个牌组 · ',
    es: ' mazos · ',
  },
  ' cards': {
    ja: '枚',
    zh: '张',
    es: ' cartas',
  },
  ' card': {
    ja: '枚',
    zh: '张',
    es: ' carta',
  },
  'Custom packs': {
    ja: 'カスタムパック',
    zh: '自定义卡牌包',
    es: 'Mazos personalizados',
  },
  'Make your own': {
    ja: '自分で作る',
    zh: '自己创建',
    es: 'Crea el tuyo',
  },
  'Custom': {
    ja: 'カスタム',
    zh: '自定义',
    es: 'Personalizado',
  },
  'Custom mode': {
    ja: 'カスタムモード',
    zh: '自定义模式',
    es: 'Modo personalizado',
  },
  'New pack': {
    ja: '新しいパック',
    zh: '新建卡牌包',
    es: 'Nuevo mazo',
  },
  'Write questions': {
    ja: '質問を作る',
    zh: '编写问题',
    es: 'Escribir preguntas',
  },
  'Create a card pack for your own table': {
    ja: '自分たちだけの質問パックを作ってみよう',
    zh: '用你们专属的问题创建卡牌包',
    es: 'Crea un mazo con tus propias preguntas',
  },
  'Add two or more questions for friends, family, or teammates and start playing right away.': {
    ja: '友達・チーム・家族と話したい質問を2枚以上書くだけですぐ遊べます。',
    zh: '写下 2 个以上想和朋友、同事或家人聊的问题，即可立刻开始。',
    es: 'Agrega 2 o más preguntas para amigos, familia o equipo y empieza a jugar al instante.',
  },
  'Create a pack': {
    ja: 'パックを作る',
    zh: '创建卡牌包',
    es: 'Crear mazo',
  },
  ' — remove bookmark': {
    ja: ' — 保存を解除',
    zh: ' — 取消收藏',
    es: ' — quitar de guardadas',
  },
  'Follow-up': {
    ja: '深掘り質問',
    zh: '追问',
    es: 'Pregunta extra',
  },
  'Follow-up ': {
    ja: '深掘り質問 ',
    zh: '追问 ',
    es: 'Pregunta extra ',
  },
  'Your bookmarks start here': {
    ja: '保存したカードはまだありません',
    zh: '还没有收藏的卡牌',
    es: 'Tus guardadas aparecerán aquí',
  },
  'Tap the bookmark on a question': {
    ja: 'また話したい質問が見つかったら',
    zh: '遇到想再次聊起的问题时',
    es: 'Toca el marcador en una pregunta',
  },
  'to find it here later.': {
    ja: 'ブックマークしておきましょう。',
    zh: '点击书签即可收藏在这里。',
    es: 'para encontrarla aquí después.',
  },
  '2 players': {
    ja: '2人',
    zh: '2人',
    es: '2 jugadores',
  },
  'Start a conversation with your own custom questions.': {
    ja: '自分で作った質問カードで会話を始めましょう。',
    zh: '用你亲手写下的问题开启对话吧。',
    es: 'Inicia una conversación con tus propias preguntas.',
  },
  'Edit pack': {
    ja: 'パックを編集',
    zh: '编辑卡牌包',
    es: 'Editar mazo',
  },
  'Set the table': {
    ja: 'ゲームの準備',
    zh: '开始准备',
    es: 'Prepara la mesa',
  },
  'Players': {
    ja: '参加人数',
    zh: '参与人数',
    es: 'Jugadores',
  },
  'How many rounds?': {
    ja: '何周しますか？',
    zh: '玩几轮？',
    es: '¿Cuántas rondas?',
  },
  'One round': {
    ja: '1周',
    zh: '一轮',
    es: 'Una ronda',
  },
  'Two rounds': {
    ja: '2周',
    zh: '两轮',
    es: 'Dos rondas',
  },
  'Start with whoever has the phone, then pass clockwise.': {
    ja: 'スマホを持っている人から時計回りに回してください。',
    zh: '从拿着手机的人开始，按顺时针传递。',
    es: 'Empieza quien tiene el teléfono y pásenlo en sentido horario.',
  },
  'Pause': {
    ja: 'いったん戻る',
    zh: '暂停退出',
    es: 'Pausa',
  },
  'round': {
    ja: '周目',
    zh: '轮',
    es: 'ronda',
  },
  'rounds': {
    ja: '周目',
    zh: '轮',
    es: 'rondas',
  },
  'Remove bookmark': {
    ja: '保存を解除',
    zh: '取消收藏',
    es: 'Quitar guardado',
  },
  'Save question': {
    ja: '質問を保存',
    zh: '收藏问题',
    es: 'Guardar pregunta',
  },
  'Flip the card': {
    ja: 'カードをめくる',
    zh: '翻开卡牌',
    es: 'Voltear carta',
  },
  'Swap question': {
    ja: '質問を替える',
    zh: '换一题',
    es: 'Cambiar pregunta',
  },
  'Finish': {
    ja: '会話を終える',
    zh: '结束对话',
    es: 'Terminar',
  },
  'Pass the phone': {
    ja: '次の人へ渡す',
    zh: '交给下一位',
    es: 'Pasar teléfono',
  },
  'You’ve seen all the swaps. ': {
    ja: '替えられる質問をすべて見ました。',
    zh: '可替换的题目已全部看完。',
    es: 'Ya viste todos los cambios. ',
  },
  'The remaining cards are for the next players. ': {
    ja: '残りのカードは次の人たちの分です。',
    zh: '剩下的卡牌留给后面的伙伴。',
    es: 'Las cartas restantes son para los siguientes. ',
  },
  'You can finish without answering.': {
    ja: '答えずに終えても大丈夫です。',
    zh: '不回答也可以直接结束。',
    es: 'Puedes terminar sin responder.',
  },
  'You can pass without answering.': {
    ja: '答えずに次の人へ渡しても大丈夫です。',
    zh: '不回答也可以直接交给下一位。',
    es: 'Puedes pasar sin responder.',
  },
  'Whoever has the phone opens the first card.': {
    ja: 'スマホを持っている人が最初のカードをめくってください。',
    zh: '请拿着手机的人翻开第一张卡牌。',
    es: 'Quien tiene el teléfono abre la primera carta.',
  },
  'Everyone’s had a turn': {
    ja: '全員のターンが終わりました',
    zh: '大家都聊完一轮啦',
    es: 'Todos tuvieron su turno',
  },
  'Play this deck again': {
    ja: '同じデッキでもう一度',
    zh: '再用这组牌玩一局',
    es: 'Jugar este mazo otra vez',
  },
  'Choose another deck ': {
    ja: '別のデッキを選ぶ ',
    zh: '换个牌组 ',
    es: 'Elegir otro mazo ',
  },
  'Ad privacy choices': {
    ja: '広告プライバシー設定',
    zh: '广告隐私选项',
    es: 'Opciones de privacidad de anuncios',
  },
  'Ad privacy choices are unavailable. Try again shortly.': {
    ja: '広告プライバシー設定を開けません。しばらくしてからお試しください。',
    zh: '暂时无法打开广告隐私选项，请稍后再试。',
    es: 'Las opciones de privacidad no están disponibles. Intenta de nuevo pronto.',
  },
  'Share CardTalk': {
    ja: '次の集まりにCardTalkを共有',
    zh: '分享给下次聚会',
    es: 'Compartir CardTalk',
  },
  'Sharing is unavailable. Try again shortly.': {
    ja: '共有画面を開けません。しばらくしてからお試しください。',
    zh: '暂时无法打开分享窗口，请稍后再试。',
    es: 'No se puede compartir ahora. Intenta más tarde.',
  },
  'Terracotta': { ja: 'テラコッタ', zh: '陶土红', es: 'Terracota' },
  'Sage': { ja: 'セージ', zh: '鼠尾草绿', es: 'Salvia' },
  'Cobalt': { ja: 'コバルト', zh: '钴蓝', es: 'Cobalto' },
  'Plum': { ja: 'プラム', zh: '梅子紫', es: 'Ciruela' },
  'Ochre': { ja: 'オーカー', zh: '赭黄', es: 'Ocre' },
  'Please enter a pack title.': {
    ja: 'パック名を入力してください。',
    zh: '请输入卡牌包名称。',
    es: 'Ingresa un título para el mazo.',
  },
  'Add at least 2 question cards.': {
    ja: '質問カードを2枚以上入力してください。',
    zh: '请至少填写 2 张问题卡牌。',
    es: 'Agrega al menos 2 cartas de pregunta.',
  },
  'Untitled pack': {
    ja: '新しいパック',
    zh: '未命名卡牌包',
    es: 'Mazo sin título',
  },
  'Delete pack': {
    ja: 'パック削除',
    zh: '删除卡牌包',
    es: 'Eliminar mazo',
  },
  'Edit custom pack': {
    ja: 'カスタムパックを編集',
    zh: '编辑自定义卡牌包',
    es: 'Editar mazo personalizado',
  },
  'Create a custom pack': {
    ja: 'カスタムパックを作成',
    zh: '创建自定义卡牌包',
    es: 'Crear mazo personalizado',
  },
  'Write your own questions for any gathering. Packs are saved on this device.': {
    ja: '集まりに合わせたオリジナル質問を作れます。端末に保存されいつでも遊べます。',
    zh: '为你们的聚会写下专属问题，卡牌包将保存在此设备上随时可用。',
    es: 'Escribe tus propias preguntas para cualquier reunión. Los mazos se guardan en este dispositivo.',
  },
  'Pack details': {
    ja: '基本情報',
    zh: '基本信息',
    es: 'Detalles del mazo',
  },
  'Pack title *': {
    ja: 'パック名 *',
    zh: '卡牌包名称 *',
    es: 'Título del mazo *',
  },
  'e.g. Friday dinner, Road trip': {
    ja: '例：チーム飲み会、旅行ナイト',
    zh: '例如：团队聚餐、好友旅行',
    es: 'ej. Cena del viernes, Viaje',
  },
  'Mood label': {
    ja: '雰囲気タグ',
    zh: '氛围标签',
    es: 'Etiqueta de tono',
  },
  'e.g. Playful, Deep': {
    ja: '例：ワイワイ、本音トーク',
    zh: '例如：轻松愉快、走心聊聊',
    es: 'ej. Divertido, Profundo',
  },
  'Short description': {
    ja: 'ひとこと説明',
    zh: '一句话简介',
    es: 'Descripción breve',
  },
  'What kind of stories is this pack for?': {
    ja: 'どんな話をしたいパックですか？',
    zh: '想用这组卡牌聊些什么？',
    es: '¿Para qué tipo de historias es este mazo?',
  },
  'Cover color': {
    ja: 'カバーカラー',
    zh: '封面颜色',
    es: 'Color de portada',
  },
  'Choose cover color': {
    ja: 'カバーカラーを選択',
    zh: '选择封面颜色',
    es: 'Elegir color de portada',
  },
  'Question cards': {
    ja: '質問カード',
    zh: '问题卡牌',
    es: 'Cartas de pregunta',
  },
  'Add at least 2 questions to play. Follow-ups are optional.': {
    ja: '2枚以上書くとすぐ遊べます。深掘り質問は空欄でも構いません。',
    zh: '至少填写 2 个问题即可开始，追问可留空。',
    es: 'Agrega al menos 2 preguntas para jugar. Las preguntas extra son opcionales.',
  },
  'Add multiple': {
    ja: 'まとめて追加',
    zh: '批量添加',
    es: 'Agregar varias',
  },
  'Paste one question per line': {
    ja: '1行につき1つの質問を貼り付けてください',
    zh: '每行粘贴一个问题',
    es: 'Pega una pregunta por línea',
  },
  'What song have you had on repeat?\nWhere do you want to travel this year?': {
    ja: '最近リピートしている曲は？\n今年行ってみたい場所は？',
    zh: '最近单曲循环的歌是哪首？\n今年最想去哪里旅行？',
    es: '¿Qué canción no paras de escuchar?\n¿A dónde te gustaría viajar este año?',
  },
  'Add to list': {
    ja: 'リストに追加',
    zh: '添加到列表',
    es: 'Agregar a la lista',
  },
  'Question': {
    ja: '質問',
    zh: '问题',
    es: 'Pregunta',
  },
  'Write a question': {
    ja: '質問を入力してください',
    zh: '请输入问题',
    es: 'Escribe una pregunta',
  },
  'Follow-up (optional)': {
    ja: '深掘り質問（任意）',
    zh: '追问（选填）',
    es: 'Pregunta extra (opcional)',
  },
  'Follow-up question (optional)': {
    ja: '深掘り質問（任意）',
    zh: '追问（选填）',
    es: 'Pregunta extra (opcional)',
  },
  'Add a card': {
    ja: '質問カードを追加',
    zh: '添加问题卡牌',
    es: 'Agregar una carta',
  },
  'Save pack': {
    ja: '保存する',
    zh: '保存',
    es: 'Guardar mazo',
  },
  'Save & open': {
    ja: '保存して始める',
    zh: '保存并开始',
    es: 'Guardar y abrir',
  },
}
