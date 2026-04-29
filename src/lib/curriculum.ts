import { Unit } from './types'

export const units: Unit[] = [
  // ─── BASICS ───────────────────────────────────────────────────────────────
  {
    id: 'basics-greetings',
    level: 'basics',
    title: 'Greetings',
    description: 'Say hello, thank you, and goodbye',
    imageQuery: 'people greeting china',
    clusters: [
      {
        id: 'basics-greetings-1',
        title: 'Hello & Thank You',
        scenarioDescription: 'A shopkeeper greets you as you enter their store',
        conversationContext:
          'You are playing a friendly shopkeeper in China. The learner is a tourist entering your shop. Greet them warmly, exchange pleasantries, and thank them for visiting.',
        words: [
          {
            character: '你好',
            pinyin: 'nǐ hǎo',
            meaning: 'Hello',
            phoneticGuide: 'knee HOW',
            toneNote: '"ni" falls then rises, "hao" falls then rises',
            imageQuery: 'friendly greeting handshake',
          },
          {
            character: '谢谢',
            pinyin: 'xiè xie',
            meaning: 'Thank you',
            phoneticGuide: 'sheh sheh',
            toneNote: '"xie" falls sharply, second "xie" is neutral/light',
            imageQuery: 'gratitude thank you gesture',
          },
          {
            character: '不客气',
            pinyin: 'bú kè qi',
            meaning: "You're welcome",
            phoneticGuide: 'boo kuh chee',
            toneNote: '"bu" rises, "ke" falls, "qi" is neutral',
            imageQuery: 'welcoming smile',
          },
        ],
        phrase: {
          chinese: '你好！谢谢你。',
          pinyin: 'Nǐ hǎo! Xiè xie nǐ.',
          meaning: 'Hello! Thank you.',
          breakdown: [
            { chinese: '你好', pinyin: 'nǐ hǎo', meaning: 'Hello' },
            { chinese: '谢谢', pinyin: 'xiè xie', meaning: 'Thank you' },
            { chinese: '你', pinyin: 'nǐ', meaning: 'you' },
          ],
        },
      },
      {
        id: 'basics-greetings-2',
        title: 'Goodbye & Sorry',
        scenarioDescription: 'You accidentally bump into someone on a busy street',
        conversationContext:
          'You are a passerby on a busy street in Beijing. The learner accidentally bumps into you. React naturally, accept their apology, and say goodbye politely.',
        words: [
          {
            character: '再见',
            pinyin: 'zài jiàn',
            meaning: 'Goodbye',
            phoneticGuide: 'dzai JYEN',
            toneNote: '"zai" falls, "jian" falls',
            imageQuery: 'waving goodbye',
          },
          {
            character: '对不起',
            pinyin: 'duì bu qǐ',
            meaning: 'Sorry / Excuse me',
            phoneticGuide: 'dway boo CHEE',
            toneNote: '"dui" falls, "bu" is neutral, "qi" falls then rises',
            imageQuery: 'apology sorry expression',
          },
          {
            character: '没关系',
            pinyin: 'méi guān xi',
            meaning: "It's okay / No problem",
            phoneticGuide: 'may gwahn SHEE',
            toneNote: '"mei" rises, "guan" is flat, "xi" is neutral',
            imageQuery: 'reassuring gesture ok',
          },
        ],
        phrase: {
          chinese: '对不起！没关系，再见。',
          pinyin: 'Duì bu qǐ! Méi guān xi, zài jiàn.',
          meaning: "Sorry! No problem, goodbye.",
          breakdown: [
            { chinese: '对不起', pinyin: 'duì bu qǐ', meaning: 'Sorry' },
            { chinese: '没关系', pinyin: 'méi guān xi', meaning: "No problem" },
            { chinese: '再见', pinyin: 'zài jiàn', meaning: 'Goodbye' },
          ],
        },
      },
    ],
  },
  {
    id: 'basics-introductions',
    level: 'basics',
    title: 'Introductions',
    description: 'Tell people your name and ask theirs',
    imageQuery: 'introduction meeting people',
    clusters: [
      {
        id: 'basics-intro-1',
        title: 'What is Your Name?',
        scenarioDescription: 'You are meeting a new colleague at a work event',
        conversationContext:
          'You are at a networking event in Shanghai. Introduce yourself to the learner and ask their name. Be warm and professional.',
        words: [
          {
            character: '我叫',
            pinyin: 'wǒ jiào',
            meaning: 'My name is / I am called',
            phoneticGuide: 'waw JYOW',
            toneNote: '"wo" falls then rises, "jiao" falls',
            imageQuery: 'pointing to self introduction',
          },
          {
            character: '你叫什么名字',
            pinyin: 'nǐ jiào shénme míngzi',
            meaning: 'What is your name?',
            phoneticGuide: 'knee jyow SHEN-muh MING-dzuh',
            toneNote: '"shen" rises, "me" neutral, "ming" rises, "zi" neutral',
            imageQuery: 'asking question curious',
          },
          {
            character: '很高兴认识你',
            pinyin: 'hěn gāo xìng rèn shi nǐ',
            meaning: 'Nice to meet you',
            phoneticGuide: 'hun GOW shing REN shrr nee',
            toneNote: '"hen" falls-rises, "gao" flat, "xing" falls',
            imageQuery: 'nice to meet you handshake smile',
          },
        ],
        phrase: {
          chinese: '你好！我叫___。你叫什么名字？',
          pinyin: 'Nǐ hǎo! Wǒ jiào ___. Nǐ jiào shénme míngzi?',
          meaning: 'Hello! My name is ___. What is your name?',
          breakdown: [
            { chinese: '你好', pinyin: 'nǐ hǎo', meaning: 'Hello' },
            { chinese: '我叫', pinyin: 'wǒ jiào', meaning: 'My name is' },
            { chinese: '你叫什么名字', pinyin: 'nǐ jiào shénme míngzi', meaning: 'What is your name?' },
          ],
        },
      },
    ],
  },
  {
    id: 'basics-numbers',
    level: 'basics',
    title: 'Numbers 1–10',
    description: 'Count from one to ten',
    imageQuery: 'numbers counting china',
    clusters: [
      {
        id: 'basics-numbers-1',
        title: 'One to Five',
        scenarioDescription: 'You are ordering dim sum and need to say how many you want',
        conversationContext:
          'You are a dim sum server. Ask the learner how many of each dish they would like and practice counting together.',
        words: [
          {
            character: '一二三四五',
            pinyin: 'yī èr sān sì wǔ',
            meaning: 'One two three four five',
            phoneticGuide: 'ee AR sahn srr WOO',
            toneNote: '"yi" flat, "er" rising, "san" flat, "si" falling, "wu" falling-rising',
            imageQuery: 'counting fingers hand',
          },
          {
            character: '一',
            pinyin: 'yī',
            meaning: 'One',
            phoneticGuide: 'ee',
            toneNote: 'flat high tone — like a long "ee"',
            imageQuery: 'number one single',
          },
          {
            character: '两',
            pinyin: 'liǎng',
            meaning: 'Two (for counting things)',
            phoneticGuide: 'lyahng',
            toneNote: 'falls then rises, like a question in English',
            imageQuery: 'two items pair',
          },
        ],
        phrase: {
          chinese: '我要三个，谢谢。',
          pinyin: 'Wǒ yào sān gè, xiè xie.',
          meaning: 'I want three, thank you.',
          breakdown: [
            { chinese: '我要', pinyin: 'wǒ yào', meaning: 'I want' },
            { chinese: '三', pinyin: 'sān', meaning: 'three' },
            { chinese: '个', pinyin: 'gè', meaning: '(measure word)' },
          ],
        },
      },
      {
        id: 'basics-numbers-2',
        title: 'Six to Ten',
        scenarioDescription: 'You are at a market negotiating how many items to buy',
        conversationContext:
          'You are a market vendor. Practice numbers 6-10 with the learner as they buy fruit from your stall.',
        words: [
          {
            character: '六',
            pinyin: 'liù',
            meaning: 'Six',
            phoneticGuide: 'lyoh',
            toneNote: 'falls sharply',
            imageQuery: 'six fruit market',
          },
          {
            character: '七',
            pinyin: 'qī',
            meaning: 'Seven',
            phoneticGuide: 'chee',
            toneNote: 'flat high tone',
            imageQuery: 'seven items',
          },
          {
            character: '十',
            pinyin: 'shí',
            meaning: 'Ten',
            phoneticGuide: 'shrr',
            toneNote: 'rising tone',
            imageQuery: 'ten complete set',
          },
        ],
        phrase: {
          chinese: '我要八个苹果，多少钱？',
          pinyin: 'Wǒ yào bā gè píngguǒ, duōshao qián?',
          meaning: 'I want eight apples, how much?',
          breakdown: [
            { chinese: '我要', pinyin: 'wǒ yào', meaning: 'I want' },
            { chinese: '八', pinyin: 'bā', meaning: 'eight' },
            { chinese: '个', pinyin: 'gè', meaning: '(measure word)' },
            { chinese: '苹果', pinyin: 'píngguǒ', meaning: 'apple' },
            { chinese: '多少钱', pinyin: 'duōshao qián', meaning: 'how much?' },
          ],
        },
      },
    ],
  },

  // ─── TRAVEL ───────────────────────────────────────────────────────────────
  {
    id: 'travel-restaurant',
    level: 'travel',
    title: 'At a Restaurant',
    description: 'Order food and ask for the bill',
    imageQuery: 'chinese restaurant food dining',
    clusters: [
      {
        id: 'travel-restaurant-1',
        title: 'Ordering Food',
        scenarioDescription: 'You sit down at a restaurant and want to order',
        conversationContext:
          'You are a waiter at a traditional Chinese restaurant. Welcome the learner, offer a menu, take their order, and answer questions about the food.',
        words: [
          {
            character: '菜单',
            pinyin: 'càidān',
            meaning: 'Menu',
            phoneticGuide: 'tsai DAHN',
            toneNote: '"cai" falls, "dan" flat',
            imageQuery: 'restaurant menu chinese',
          },
          {
            character: '好吃',
            pinyin: 'hǎo chī',
            meaning: 'Delicious',
            phoneticGuide: 'how CHRR',
            toneNote: '"hao" falls-rises, "chi" flat',
            imageQuery: 'delicious food eating',
          },
          {
            character: '我要这个',
            pinyin: 'wǒ yào zhè gè',
            meaning: 'I want this one',
            phoneticGuide: 'waw YOW juh guh',
            toneNote: '"wo" falls-rises, "yao" falls, "zhe" falls, "ge" neutral',
            imageQuery: 'pointing at menu ordering',
          },
        ],
        phrase: {
          chinese: '请给我菜单。我要这个，谢谢。',
          pinyin: 'Qǐng gěi wǒ càidān. Wǒ yào zhè gè, xiè xie.',
          meaning: 'Please give me the menu. I want this one, thank you.',
          breakdown: [
            { chinese: '请', pinyin: 'qǐng', meaning: 'please' },
            { chinese: '给我', pinyin: 'gěi wǒ', meaning: 'give me' },
            { chinese: '菜单', pinyin: 'càidān', meaning: 'menu' },
            { chinese: '我要这个', pinyin: 'wǒ yào zhè gè', meaning: 'I want this one' },
          ],
        },
      },
      {
        id: 'travel-restaurant-2',
        title: 'Paying the Bill',
        scenarioDescription: 'You have finished your meal and want to pay',
        conversationContext:
          'You are a waiter at a restaurant. The learner wants to pay. Help them ask for the bill and tell them the price.',
        words: [
          {
            character: '多少钱',
            pinyin: 'duōshao qián',
            meaning: 'How much money?',
            phoneticGuide: 'dwaw SHAO chyen',
            toneNote: '"duo" flat, "shao" rising, "qian" rising',
            imageQuery: 'paying money bill',
          },
          {
            character: '买单',
            pinyin: 'mǎi dān',
            meaning: 'The bill please',
            phoneticGuide: 'my DAHN',
            toneNote: '"mai" falls-rises, "dan" flat',
            imageQuery: 'restaurant bill receipt',
          },
          {
            character: '刷卡',
            pinyin: 'shuā kǎ',
            meaning: 'Pay by card',
            phoneticGuide: 'shwah KAH',
            toneNote: '"shua" flat, "ka" falls-rises',
            imageQuery: 'credit card payment',
          },
        ],
        phrase: {
          chinese: '买单！多少钱？可以刷卡吗？',
          pinyin: 'Mǎi dān! Duōshao qián? Kěyǐ shuā kǎ ma?',
          meaning: 'The bill please! How much? Can I pay by card?',
          breakdown: [
            { chinese: '买单', pinyin: 'mǎi dān', meaning: 'bill please' },
            { chinese: '多少钱', pinyin: 'duōshao qián', meaning: 'how much?' },
            { chinese: '可以', pinyin: 'kěyǐ', meaning: 'can / is it okay' },
            { chinese: '刷卡', pinyin: 'shuā kǎ', meaning: 'pay by card' },
            { chinese: '吗', pinyin: 'ma', meaning: '(question particle)' },
          ],
        },
      },
    ],
  },
  {
    id: 'travel-directions',
    level: 'travel',
    title: 'Getting Around',
    description: 'Ask for directions and use transport',
    imageQuery: 'beijing street navigation china',
    clusters: [
      {
        id: 'travel-directions-1',
        title: 'Basic Directions',
        scenarioDescription: 'You are lost and need to find the subway station',
        conversationContext:
          'You are a helpful local on the street in Beijing. The learner is lost and trying to find the subway. Give them simple directions.',
        words: [
          {
            character: '左',
            pinyin: 'zuǒ',
            meaning: 'Left',
            phoneticGuide: 'dzwaw',
            toneNote: 'falls then rises',
            imageQuery: 'direction left arrow',
          },
          {
            character: '右',
            pinyin: 'yòu',
            meaning: 'Right',
            phoneticGuide: 'yo',
            toneNote: 'falls sharply',
            imageQuery: 'direction right arrow',
          },
          {
            character: '地铁站',
            pinyin: 'dìtiě zhàn',
            meaning: 'Subway / metro station',
            phoneticGuide: 'dee TYEH jahn',
            toneNote: '"di" falls, "tie" falls-rises, "zhan" falls',
            imageQuery: 'beijing subway metro station',
          },
        ],
        phrase: {
          chinese: '请问，地铁站在哪里？',
          pinyin: 'Qǐngwèn, dìtiě zhàn zài nǎlǐ?',
          meaning: 'Excuse me, where is the subway station?',
          breakdown: [
            { chinese: '请问', pinyin: 'qǐngwèn', meaning: 'excuse me / may I ask' },
            { chinese: '地铁站', pinyin: 'dìtiě zhàn', meaning: 'subway station' },
            { chinese: '在哪里', pinyin: 'zài nǎlǐ', meaning: 'where is it?' },
          ],
        },
      },
    ],
  },
  {
    id: 'travel-shopping',
    level: 'travel',
    title: 'Shopping',
    description: 'Browse, ask prices, and bargain',
    imageQuery: 'china market shopping street',
    clusters: [
      {
        id: 'travel-shopping-1',
        title: 'Asking Prices & Bargaining',
        scenarioDescription: 'You are at a market stall looking at souvenirs',
        conversationContext:
          'You are a market vendor selling souvenirs in Shanghai. The learner wants to buy something but thinks it is too expensive. Help them practice bargaining.',
        words: [
          {
            character: '贵',
            pinyin: 'guì',
            meaning: 'Expensive',
            phoneticGuide: 'gway',
            toneNote: 'falls sharply',
            imageQuery: 'expensive luxury price tag',
          },
          {
            character: '便宜',
            pinyin: 'piányí',
            meaning: 'Cheap / inexpensive',
            phoneticGuide: 'pyen EE',
            toneNote: '"pian" rising, "yi" rising',
            imageQuery: 'cheap bargain sale market',
          },
          {
            character: '能便宜点吗',
            pinyin: 'néng piányí diǎn ma',
            meaning: 'Can you make it cheaper?',
            phoneticGuide: 'nung pyen-EE dyen mah',
            toneNote: '"neng" rising, "pian" rising, "yi" rising, "dian" falls-rises',
            imageQuery: 'bargaining negotiating market',
          },
        ],
        phrase: {
          chinese: '这个多少钱？太贵了！能便宜点吗？',
          pinyin: 'Zhège duōshao qián? Tài guì le! Néng piányí diǎn ma?',
          meaning: 'How much is this? Too expensive! Can you lower the price?',
          breakdown: [
            { chinese: '这个', pinyin: 'zhège', meaning: 'this one' },
            { chinese: '多少钱', pinyin: 'duōshao qián', meaning: 'how much?' },
            { chinese: '太贵了', pinyin: 'tài guì le', meaning: 'too expensive' },
            { chinese: '能便宜点吗', pinyin: 'néng piányí diǎn ma', meaning: 'can you lower the price?' },
          ],
        },
      },
    ],
  },

  // ─── ADVANCED ─────────────────────────────────────────────────────────────
  {
    id: 'advanced-plans',
    level: 'advanced',
    title: 'Making Plans',
    description: 'Suggest activities and arrange meetings',
    imageQuery: 'friends planning coffee china',
    clusters: [
      {
        id: 'advanced-plans-1',
        title: 'Are You Free?',
        scenarioDescription: 'You want to invite a friend to do something together',
        conversationContext:
          'You are a friend of the learner in China. They want to make plans with you. Ask about their schedule and suggest activities to do together.',
        words: [
          {
            character: '明天',
            pinyin: 'míngtiān',
            meaning: 'Tomorrow',
            phoneticGuide: 'ming TYEN',
            toneNote: '"ming" rising, "tian" flat',
            imageQuery: 'tomorrow calendar planning',
          },
          {
            character: '有空吗',
            pinyin: 'yǒu kòng ma',
            meaning: 'Are you free?',
            phoneticGuide: 'yo KOHNG mah',
            toneNote: '"you" falls-rises, "kong" falls, "ma" neutral',
            imageQuery: 'calendar free time availability',
          },
          {
            character: '一起',
            pinyin: 'yīqǐ',
            meaning: 'Together',
            phoneticGuide: 'ee CHEE',
            toneNote: '"yi" flat, "qi" falls-rises',
            imageQuery: 'friends together group',
          },
        ],
        phrase: {
          chinese: '你明天有空吗？我们一起去吃饭吧！',
          pinyin: 'Nǐ míngtiān yǒu kòng ma? Wǒmen yīqǐ qù chīfàn ba!',
          meaning: "Are you free tomorrow? Let's go eat together!",
          breakdown: [
            { chinese: '你', pinyin: 'nǐ', meaning: 'you' },
            { chinese: '明天', pinyin: 'míngtiān', meaning: 'tomorrow' },
            { chinese: '有空吗', pinyin: 'yǒu kòng ma', meaning: 'are you free?' },
            { chinese: '我们', pinyin: 'wǒmen', meaning: 'we / us' },
            { chinese: '一起', pinyin: 'yīqǐ', meaning: 'together' },
            { chinese: '去吃饭', pinyin: 'qù chīfàn', meaning: 'go eat' },
          ],
        },
      },
    ],
  },
  {
    id: 'advanced-feelings',
    level: 'advanced',
    title: 'Feelings & Opinions',
    description: 'Express how you feel and what you think',
    imageQuery: 'emotions expression feelings',
    clusters: [
      {
        id: 'advanced-feelings-1',
        title: 'How Do You Feel?',
        scenarioDescription: 'A friend is checking in on how your day went',
        conversationContext:
          'You are a caring friend checking in on the learner after a long day. Ask how they feel and share your own feelings too.',
        words: [
          {
            character: '我觉得',
            pinyin: 'wǒ juéde',
            meaning: 'I feel / I think',
            phoneticGuide: 'waw JWAY-duh',
            toneNote: '"wo" falls-rises, "jue" rising, "de" neutral',
            imageQuery: 'thinking feeling reflection',
          },
          {
            character: '累',
            pinyin: 'lèi',
            meaning: 'Tired',
            phoneticGuide: 'lay',
            toneNote: 'falls sharply',
            imageQuery: 'tired exhausted person',
          },
          {
            character: '开心',
            pinyin: 'kāixīn',
            meaning: 'Happy',
            phoneticGuide: 'kai SHIN',
            toneNote: '"kai" flat, "xin" flat',
            imageQuery: 'happy smiling person',
          },
        ],
        phrase: {
          chinese: '我今天很累，但是很开心。',
          pinyin: 'Wǒ jīntiān hěn lèi, dànshì hěn kāixīn.',
          meaning: 'I am very tired today, but very happy.',
          breakdown: [
            { chinese: '我今天', pinyin: 'wǒ jīntiān', meaning: 'I today' },
            { chinese: '很累', pinyin: 'hěn lèi', meaning: 'very tired' },
            { chinese: '但是', pinyin: 'dànshì', meaning: 'but' },
            { chinese: '很开心', pinyin: 'hěn kāixīn', meaning: 'very happy' },
          ],
        },
      },
    ],
  },
]

export function getUnitsByLevel(level: string): Unit[] {
  return units.filter((u) => u.level === level)
}

export function getUnit(unitId: string): Unit | undefined {
  return units.find((u) => u.id === unitId)
}
