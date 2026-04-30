import { NextRequest, NextResponse } from 'next/server'
import { qwen } from '@/lib/claude'
import { getUnit } from '@/lib/curriculum'
import { ChatMessage } from '@/lib/types'

function buildSystemPrompt(
  scenarioDescription: string,
  conversationContext: string,
  targetPhrase: string,
  targetPinyin: string,
  targetMeaning: string
): string {
  return `You are a warm, encouraging Mandarin tutor running a live conversation practice session.

Scenario: ${scenarioDescription}
Your role: ${conversationContext}

The learner is practicing this phrase:
Chinese: ${targetPhrase}
Pinyin: ${targetPinyin}
Meaning: ${targetMeaning}

Rules:
- Your dialogue turns should be IN MANDARIN with pinyin on the line below and English translation below that
- When given the learner's transcribed speech, assess how close it was to the target phrase (0-100 score)
- Celebrate what they got right, gently correct mistakes
- Use the "sounds like English words" style for phonetic tips (e.g. "think 'knee HOW' for 你好")
- Keep exchanges brief and natural — this is voice-first
- Run 3-4 back-and-forth exchanges then mark complete
- Be warm, encouraging, and patient

ALWAYS respond with valid JSON only, no extra text:
{
  "yourLine": {
    "chinese": "...",
    "pinyin": "...",
    "english": "..."
  },
  "assessment": {
    "score": 0-100,
    "correct": "what they said correctly",
    "correction": "what to improve (optional)",
    "phoneticTip": "sound-alike hint (optional)"
  } | null,
  "isComplete": false
}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { history, userTranscript, clusterId, unitId, phase } = body as {
      history: ChatMessage[]
      userTranscript: string | null
      clusterId: string
      unitId: string
      phase: 'start' | 'respond'
    }

    const unit = getUnit(unitId)
    const cluster = unit?.clusters.find((c) => c.id === clusterId)

    if (!cluster) {
      return NextResponse.json({ error: 'Cluster not found' }, { status: 404 })
    }

    const systemPrompt = buildSystemPrompt(
      cluster.scenarioDescription,
      cluster.conversationContext,
      cluster.phrase.chinese,
      cluster.phrase.pinyin,
      cluster.phrase.meaning
    )

    const messages: { role: 'user' | 'assistant'; content: string }[] = []

    if (phase === 'start') {
      messages.push({
        role: 'user',
        content: 'Please start the conversation. Set the scene briefly and say your first line in Mandarin.',
      })
    } else {
      // Build history as alternating user/assistant messages
      const filtered = history.filter((m) => !m.isTyping)
      for (const msg of filtered) {
        if (msg.role === 'ai' && msg.chinese) {
          messages.push({
            role: 'assistant',
            content: JSON.stringify({
              yourLine: { chinese: msg.chinese, pinyin: msg.pinyin, english: msg.english },
              assessment: msg.assessment ?? null,
              isComplete: false,
            }),
          })
        } else if (msg.role === 'user' && msg.transcript) {
          messages.push({
            role: 'user',
            content: `The learner said: "${msg.transcript}". Please assess this and continue the conversation.`,
          })
        }
      }

      if (userTranscript) {
        messages.push({
          role: 'user',
          content: `The learner said: "${userTranscript}". Please assess this and continue the conversation.`,
        })
      }
    }

    // Ensure messages alternate properly; if last is assistant, add a user prompt
    if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      messages.push({ role: 'user', content: 'Please continue.' })
    }

    const response = await qwen.chat.completions.create({
      model: 'qwen-mt-turbo',
      max_tokens: 1024,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
    })

    const text = response.choices[0]?.message?.content ?? ''

    // Extract JSON from response (Claude sometimes wraps in ```json blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Invalid response from AI' }, { status: 500 })
    }

    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json(parsed)
  } catch (err) {
    console.error('[/api/chat]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
