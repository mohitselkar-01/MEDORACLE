import { useEffect, useState } from "react";

function TypingText() {
  const texts = [
    "Healthcare AI",
    "Medical Intelligence",
    "Clinical AI",
  
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex === currentText.length) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1000);
        }
      } else {
        setText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 60 : 120);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  return (
    <span className="gradient-text">
      {text}
      <span className="cursor">|</span>
    </span>
  );
}

export default TypingText;