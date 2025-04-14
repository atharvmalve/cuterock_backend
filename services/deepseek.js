// services/deepseek.js
const axios = require('axios');

async function queryDeepSeek(prompt) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/deepseek-ai/deepseek-coder-6.7b-instruct',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );
    return response.data[0]?.generated_text || 'No response';
  } catch (err) {
    return `❌ DeepSeek Error: ${err.message}`;
  }
}

module.exports = { queryDeepSeek };
