import React, { useState } from 'react';
import axios from 'axios';

export default function DataAssistant() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Predefined rule-based questions matching the project specifications
  const presetQuestions = [
    "Which scholarship has the lowest cutoff?",
    "Which scholarship has the highest award?",
    "How many scholarships are there?"
  ];

  const handleAsk = async (queryText) => {
    const textToAsk = queryText || question;
    if (!textToAsk.trim()) return;

    setLoading(true);
    setError(null);
    try {
      // Connects to the Flask backend endpoint /api/ask
      const response = await axios.post('http://localhost:5000/api/ask', {
        question: textToAsk
      });
      setAnswer(response.data.answer || response.data.message || "No response received.");
    } catch (err) {
      console.error("Assistant API Error:", err);
      setError("Unable to connect to the backend assistant. Please ensure Flask is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = (textToSpeak) => {
    if ('speechSynthesis' in window && textToSpeak) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported or available in your browser.");
    }
  };

  return (
    <section className="data-assistant-container" aria-labelledby="assistant-heading">
      <div className="assistant-header">
        <span className="assistant-badge" aria-hidden="true">★</span>
        <span className="assistant-subtitle">Accessible Data Assistant</span>
      </div>
      
      <h2 id="assistant-heading">Let's find an answer.</h2>
      <p className="assistant-description">
        Hello! I can help you explore the sample scholarship data using rule-based calculations. 
        Ask me about cutoffs, awards, income limits, or categories.
      </p>

      {/* Preset Prompt Chips */}
      <div className="preset-chips-wrapper" aria-label="Suggested questions">
        <p className="chips-label"><strong>Try asking:</strong></p>
        <div className="chips-container" role="group">
          {presetQuestions.map((preset, index) => (
            <button
              key={index}
              type="button"
              className="preset-chip-btn"
              onClick={() => {
                setQuestion(preset);
                handleAsk(preset);
              }}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Query Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(question);
        }}
        className="assistant-form"
      >
        <label htmlFor="assistant-input" className="sr-only">Ask a question about scholarships</label>
        <div className="input-group">
          <input
            id="assistant-input"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
            aria-required="true"
          />
          <button type="submit" className="ask-submit-btn" disabled={loading}>
            {loading ? 'Thinking...' : 'Ask →'}
          </button>
        </div>
      </form>

      {/* Error Messaging */}
      {error && (
        <div className="error-alert" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Dynamic Answer Section with Screen Reader Support */}
      {answer && (
        <div className="assistant-response-card" tabIndex="0" aria-live="polite">
          <h3>Assistant Response</h3>
          <p className="response-text">{answer}</p>
          
          <button
            type="button"
            className="speech-action-btn"
            onClick={() => handleSpeech(answer)}
            aria-label="Read this answer aloud using speech synthesis"
          >
            🔊 Read this answer aloud
          </button>
        </div>
      )}

      <div className="assistant-footer-note">
        <small>Answers are rule-based and use fictional demonstration data. No external AI APIs are used.</small>
      </div>
    </section>
  );
}