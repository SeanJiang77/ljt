import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const lines = [
  "我总在想，如果能把你放进一封信里，该从哪里开始写呢？",
  "是第一次和你对视时的心跳，还是你笑起来的模样。",
  "但不管从哪里开始，都会写到我爱你。",
  "希望你能一直感受到这份温柔。"
];

export default function Letter() {
  const [currentLine, setCurrentLine] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (currentLine < lines.length) {
      let index = 0;
      const interval = setInterval(() => {
        setTypedText(lines[currentLine].slice(0, index + 1));
        index++;
        if (index === lines[currentLine].length) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentLine(currentLine + 1);
            setTypedText("");
          }, 1500);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [currentLine]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 text-pink-700">
      <h1 className="text-3xl font-bold mb-6">写给你的话 💌</h1>
      <p className="text-xl min-h-[4rem]">{typedText}</p>
      {currentLine >= lines.length && (
        <Link to="/interact">
          <button className="mt-10 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition shadow-md">
            下一页 👉 小互动
          </button>
        </Link>
      )}
    </div>
  );
}
