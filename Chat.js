export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const { messages } = req.body;

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
          'HTTP-Referer': 'https://ai-chatbot-hackathon.vercel.app',
          'X-Title': 'BizMind AI'
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct:free',
          messages
        })
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error('OpenRouter Error:', error);

    return res.status(500).json({
      error: 'Failed to get AI response',
      details: error.message
    });
  }
}
