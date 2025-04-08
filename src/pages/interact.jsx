import { useState } from "react";
import { Link } from "react-router-dom";

const questions = [
  {
    question: "如果你现在就在我身边，我最想做什么？",
    options: [
      "牵你的手去散步",
      "给你一个拥抱",
      "看你笑着不说话",
      "偷亲你一下"
    ]
  },
  {
    question: "如果我们一起看电影，你觉得我会怎么做？",
    options: [
      "偷看你反应",
      "假装害怕然后靠近你",
      "一直帮你拿零食",
      "看你一眼就满足"]
  },
  {
    question: "下雨天我们一起走路，你希望我？",
    options: [
      "帮你撑伞挡雨",
      "牵着你的手慢慢走",
      "陪你踩水玩",
      "替你挡风"]
  },
  {
    question: "如果我们吵架了，我最可能会？",
    options: [
      "先低头道歉",
      "给你写小纸条",
      "假装没事找你聊天",
      "发消息说我想你了"]
  },
  {
    question: "你觉得我什么时候最想你？",
    options: [
      "早上醒来的时候",
      "看到情侣在一起的时候",
      "听到你喜欢的歌的时候",
      "每一个安静的夜晚"]
  }
];

export default function Interact() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const current = questions[step];

  const handleClick = (option) => {
    setSelected(option);
    setTimeout(() => {
      setSelected(null);
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center text-pink-800">
      {!finished ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{current.question}</h1>
          <div className="grid grid-cols-2 gap-4 max-w-md w-full mt-6">
            {current.options.map((opt, index) => (
              <button
                key={index}
                onClick={() => handleClick(opt)}
                className={`px-4 py-3 rounded-xl shadow-md transition ${
                  selected === opt
                    ? "bg-pink-600 text-white"
                    : "bg-white text-pink-700 hover:bg-pink-100"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {selected && (
            <p className="mt-8 text-lg">
              嘿嘿，其实我真的会{selected.replace("你", "你🥰")}。
            </p>
          )}
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">谢谢你的回答 💖</h1>
          <p className="text-lg mb-6">你选的每一个选项我都偷偷记下啦。</p>
          <Link to="/">
            <button className="px-6 py-3 bg-gray-200 text-pink-700 rounded-full hover:bg-gray-300">
              回到首页
            </button>
          </Link>
        </>
      )}
    </div>
  );
}