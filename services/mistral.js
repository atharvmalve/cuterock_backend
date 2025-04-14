// services/mistral.js
const axios = require('axios');

async function queryMistral(prompt) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );
    return response.data[0]?.generated_text || 'No response';
  } catch (err) {
    return `❌ Mistral Error: ${err.message}`;
  }
}

module.exports = { queryMistral };
