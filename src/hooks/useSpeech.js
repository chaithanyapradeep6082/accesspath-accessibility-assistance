import { useState, useEffect, useCallback } from 'react';

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if the browser supports Speech Synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  const speak = useCallback((text) => {
    if (!isSupported || !text) return;

    // Cancel any ongoing speech to avoid overlapping audio queues
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0; // Normal speed
    utterance.pitch = 1.0; // Normal pitch

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (err) => {
      console.error("Speech synthesis error:", err);
      setSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [isSupported]);

  return {
    speak,
    stop,
    speaking,
    isSupported
  };
}