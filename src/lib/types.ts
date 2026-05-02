export type Level = 'basics' | 'travel' | 'advanced'
export type Dialect = 'cantonese' | 'putonghua'

export interface Word {
  character: string
  pinyin: string   // holds Jyutping for Cantonese units
  meaning: string
  phoneticGuide: string
  toneNote: string
  imageQuery: string
}

export interface PhraseBreakdown {
  chinese: string
  pinyin: string
  meaning: string
}

export interface Phrase {
  chinese: string
  pinyin: string
  meaning: string
  breakdown: PhraseBreakdown[]
}

export interface Cluster {
  id: string
  title: string
  words: Word[]
  phrase: Phrase
  phrases?: Phrase[]   // if set, PhrasePhase cycles through all of them
  conversationContext: string
  scenarioDescription: string
}

export interface Unit {
  id: string
  level: Level
  dialect: Dialect
  title: string
  description: string
  imageQuery: string
  clusters: Cluster[]
}

export interface Assessment {
  score: number
  correct: string
  correction?: string
  phoneticTip?: string
  spokenTranslation?: string
}

export interface ChatMessage {
  role: 'ai' | 'user'
  chinese?: string
  pinyin?: string
  english?: string
  transcript?: string
  assessment?: Assessment
  isTyping?: boolean
}

export interface TutorResponse {
  yourLine: { chinese: string; pinyin: string; english: string }
  assessment: Assessment | null
  isComplete: boolean
}

export interface Progress {
  [unitId: string]: {
    completedClusters: string[]
    lastAccessedAt: string
  }
}
