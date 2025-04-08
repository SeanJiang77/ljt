import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MusicPlayer from "./components/music-player";
import Letter from "./pages/letters";
import Interact from "./pages/interact";
import Confession from "./pages/Confession";


function FloatingHearts({ count }) {
  const hearts = Array.from({ length: count });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, x: "50%" }}
          animate={{ opacity: 1, y: -200, x: `${Math.random() * 100}%` }}
          transition={{ duration: 2, delay: i * 0.1 }}
          className="absolute text-pink-500 text-2xl select-none"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 80}%` }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

function HomeWithEasterEgg() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showEgg, setShowEgg] = useState(false);
  const [heartCount, setHeartCount] = useState(0);

  useEffect(() => {
    if (location.state && location.state.fromInteract) {
      setShowEgg(true);
      const timer = setTimeout(() => setShowEgg(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleHeartClick = () => {
    setHeartCount(prev => {
      const newCount = prev + 1;
      if (newCount === 9) {
        navigate("/confession");
      }
      return newCount;
    });
  };

  return (
    <div className="text-center relative px-4 w-full max-w-md mx-auto">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-pink-700 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        给我最特别的你
      </motion.h1>
      <motion.p
        className="text-gray-600 text-base sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        这里有一些话，我一直想对你说。
      </motion.p>
      <Link to="/letter">
        <button className="mt-8 sm:mt-10 px-5 py-2 sm:px-6 sm:py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition shadow-lg">
          点我进入 💌
        </button>
      </Link>
      <div className="mt-8">
        <button
          onClick={handleHeartClick}
          className="text-3xl sm:text-4xl hover:scale-125 transition-transform duration-200"
        >
          ❤️
        </button>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">点击 9 次开启表白</p>
      </div>
      {heartCount > 0 && <FloatingHearts count={heartCount} />}
      {showEgg && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-pink-600 text-sm"
        >
          🎉 彩蛋：谢谢你完成了小互动，你真的很特别 💖
        </motion.div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <main className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 sm:p-6 relative">
        <Routes>
          <Route path="/" element={<HomeWithEasterEgg />} />
          <Route path="/letter" element={<Letter />} />
          <Route path="/interact" element={<Interact />} />
          <Route path="/confession" element={<Confession />} />
        </Routes>
        <MusicPlayer />
      </main>
    </Router>
  );
}
