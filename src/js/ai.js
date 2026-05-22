const FEEDS = [
  { name: 'MIT Tech Review', rss: 'https://www.technologyreview.com/feed/', color: '#e74c3c', filterRequired: true },
  { name: 'OpenAI Blog', rss: 'https://openai.com/blog/rss/', color: '#10a37f' },
  { name: 'Google AI Blog', rss: 'https://blog.google/technology/ai/rss/', color: '#4285f4' },
  { name: 'The Verge', rss: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', color: '#fa4b2a' },
  { name: 'Ars Technica', rss: 'https://feeds.arstechnica.com/arstechnica/index', color: '#ff4c00', filterRequired: true },
  { name: 'VentureBeat', rss: 'https://venturebeat.com/category/ai/feed/', color: '#c026d3' },
  { name: 'Hacker News', rss: 'https://hnrss.org/frontpage', color: '#ff6600', filterRequired: true },
  { name: 'Towards AI', rss: 'https://pub.towardsai.net/feed', color: '#14b8a6' },
  { name: 'AI News', rss: 'https://www.artificialintelligence-news.com/feed/', color: '#3b82f6' }
];

const KEYWORDS = [
  'artificial intelligence', ' ai ', ' ai,', ' ai.', 'machine learning',
  'deep learning', 'neural network', 'large language model', ' llm',
  'generative ai', 'gen ai', 'genai', 'chatgpt', 'gpt-4', 'gpt-5', 'gpt4', 'gpt5',
  'openai', 'anthropic', 'claude', 'gemini', 'copilot',
  'midjourney', 'stable diffusion', 'dall-e', 'dalle', 'sora',
  'transformer', 'diffusion model', 'foundation model',
  'ai agent', 'autonomous agent', 'agentic', 'multi-agent',
  'langchain', 'llamaindex', 'autogpt', 'crewai', 'autogen',
  'rag', 'retrieval augmented', 'vector database', 'embedding',
  'fine-tuning', 'fine tuning', 'rlhf', 'reinforcement learning',
  'prompt engineer', 'prompt injection', 'jailbreak',
  'natural language processing', ' nlp', 'computer vision',
  'text-to-image', 'text-to-video', 'text-to-speech',
  'image generation', 'code generation', 'ai coding',
  'chatbot', 'conversational ai', 'voice assistant',
  'nvidia', 'tensor', 'gpu cluster', ' tpu',
  'llama', 'mistral', 'mixtral', 'phi-', 'qwen', 'deepseek',
  'hugging face', 'huggingface',
  'ai safety', 'ai alignment', 'ai regulation', 'ai ethics',
  'ai startup', 'ai chip', 'ai hardware',
  'model context protocol', 'mcp', 'tool use', 'function calling',
  'reasoning model', 'chain of thought', 'ai benchmark',
  'multimodal', 'vision language', 'ai search',
  'synthetic data', 'data labeling', 'annotation',
  'ai inference', 'model serving', 'ai deploy',
  'robotic', 'humanoid', 'embodied ai'
];

const EMPTY_EMOJI = '🤖';
const EMPTY_TEXT = 'No AI articles found matching your criteria.';

function isRelevant(text) {
  const lower = text.toLowerCase();
  return KEYWORDS.some(kw => lower.includes(kw));
}
