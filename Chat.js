export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { messages } = req.body;
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer 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,
      'HTTP-Referer': 'https://ai-chatbot-hackathon.vercel.app',
      'X-Title': 'BizMind AI'
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct:free',
      messages
    })
  });
  const data = await response.json();
  res.status(200).json(data);
    }
