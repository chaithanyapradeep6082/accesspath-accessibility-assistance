
import { useState } from "react";
import { answerScholarshipQuestion } from "../utils/scholarshipCalculations";

const suggestions = [
  "Which has the lowest cutoff?",
  "Which has the highest award?",
  "Show disability scholarships",
  "How many scholarships are there?",
];

export default function DataAssistant({ items, onExplore, onSpeak }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I can help you explore the sample scholarship data. Ask me about cutoffs, awards, income limits, or categories.",
    },
  ]);

  function ask(text = question) {
    const cleaned = text.trim();
    if (!cleaned) return;

    const answer = answerScholarshipQuestion(cleaned, items);
    setMessages((current) => [
      ...current,
      { role: "user", text: cleaned },
      { role: "assistant", text: answer },
    ]);
    setQuestion("");
  }

  return (
    <section className="assistant-card" aria-labelledby="assistant-title">
      <div className="assistant-heading">
        <div className="assistant-avatar" aria-hidden="true">✳</div>
        <div>
          <p className="eyebrow">ACCESSPATH ASSISTANT</p>
          <h2 id="assistant-title">Let's find an answer.</h2>
          <span className="online-label">
            <span aria-hidden="true">●</span> Sample-data assistant
          </span>
        </div>
      </div>

      <div className="chat-messages" aria-label="Conversation">
        {messages.map((message, index) => (
          <div
            key={`${index}-${message.role}`}
            className={`chat-message ${message.role}`}
          >
            <span className="message-role">
              {message.role === "assistant" ? "AccessPath" : "You"}
            </span>
            <p>{message.text}</p>
            {message.role === "assistant" && (
              <button
                className="text-button speech-answer"
                onClick={() => onSpeak(message.text)}
              >
                ▶ Read this answer aloud
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="suggestion-section">
        <p className="field-hint">Try asking</p>
        <div className="suggestion-list">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              className="suggestion-chip"
              onClick={() => ask(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <form
        className="assistant-input"
        onSubmit={(event) => {
          event.preventDefault();
          ask();
        }}
      >
        <label className="sr-only" htmlFor="assistant-question">
          Ask about scholarships
        </label>
        <input
          id="assistant-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask a question..."
        />
        <button className="button button-primary" type="submit">
          Ask <span aria-hidden="true">→</span>
        </button>
      </form>

      <button className="text-button explore-link" onClick={onExplore}>
        Explore the full scholarship comparison →
      </button>

      <p className="assistant-disclaimer">
        Answers are rule-based and use fictional demonstration data.
      </p>
    </section>
  );
}
