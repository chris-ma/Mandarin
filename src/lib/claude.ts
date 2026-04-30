import OpenAI from 'openai'

let _client: OpenAI | null = null

export function getQwenClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      apiKey: process.env.DASHSCOPE_API_KEY ?? 'missing-key',
      baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    })
  }
  return _client
}
