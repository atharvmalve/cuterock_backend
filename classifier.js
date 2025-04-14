// classifier.js
function classifyPrompt(prompt) {
    const lower = prompt.toLowerCase();
  
    if (/code|function|bug|algorithm/.test(lower)) return 'code';
    if (/essay|write|explain|summarize/.test(lower)) return 'writing';
    if (/solve|equation|math|integrate/.test(lower)) return 'math';
  
    return 'general';
  }
  
  module.exports = { classifyPrompt };
  