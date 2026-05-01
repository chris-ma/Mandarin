import OpenAI from 'openai'

let _client: OpenAI | null = null

export function getQwenClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      apiKey: process.env.GOOGLE_API_KEY ?? 'missing-key',
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    })
  }
  return _client
}
