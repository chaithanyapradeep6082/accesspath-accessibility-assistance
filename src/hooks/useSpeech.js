
import { useCallback, useEffect, useState } from "react";

export function useSpeech() {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(
      typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      "SpeechSynthesisUtterance" in window
    );
  }, []);

  const speak = useCallback((text) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(String(text));
    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => () => stop(), [stop]);

  return { speak, stop, supported };
}
