import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Confession() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 text-pink-700 bg-pink-50">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        💗 表白时刻 💗
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg max-w-md leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        无论我们在哪儿，我总觉得有你在的地方才叫心安。<br />
        <br />
        我喜欢你，认真而坚定，不只是在今天，而是从我们认识的那一刻起。<br />
        <br />
        谢谢你愿意听我絮叨，也愿意看我为你做这些小事。<br />
        有时候我会想，也许你未必知道，其实在我脑海里，你出现的频率远比你想象得多得多。<br />
        <br />
        我知道喜欢不只是说说而已，它是一点点的行动，是慢慢的坚持，是每个平凡日子里偷偷为你加的糖。<br />
        <br />
        所以这一次，我想郑重地告诉你：我真的很喜欢你，不止现在，而是从一开始，并会一直继续下去。
      </motion.p>
      <Link to="/">
        <button className="mt-10 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 shadow-md">
          回到首页 ❤️
        </button>
      </Link>
    </div>
  );
}
