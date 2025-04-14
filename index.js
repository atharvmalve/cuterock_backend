// index.js
require('dotenv').config();
const express = require('express');
const { classifyPrompt } = require('./classifier');
const { queryMistral } = require('./services/mistral');
const { queryDeepSeek } = require('./services/deepseek');

const app = express();
app.use(express.json());

app.post('/ask', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  const type = classifyPrompt(prompt);
  const results = [];

  // Send to models based on type
  if (type === 'code') {
    results.push({ model: 'DeepSeek', output: await queryDeepSeek(prompt) });
    results.push({ model: 'Mistral', output: await queryMistral(prompt) });
  } else if (type === 'writing') {
    results.push({ model: 'Mistral', output: await queryMistral(prompt) });
  } else {
    results.push({ model: 'Mistral', output: await queryMistral(prompt) });
    results.push({ model: 'DeepSeek', output: await queryDeepSeek(prompt) });
  }

  res.json({
    prompt,
    type,
    responses: results,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Cuterock running at http://localhost:${PORT}`));
