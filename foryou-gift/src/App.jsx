import { useState } from 'react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // 默认音量
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('自动播放被拦截，可以手动点击播放');
        });
      }
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (playing) {
        audio.pause();
      } else {
        audio.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src="/audio/bgm.mp3" loop />
      <button
        onClick={togglePlay}
        className="bg-pink-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-pink-600"
      >
        {playing ? '暂停音乐 🎵' : '播放音乐 🎶'}
      </button>
    </div>
  );
}

const gifts = [
  {
    name: '刻字项链',
    reason: '简单又有纪念意义，就像我们的每一天。',
    image: '/assets/necklace.jpg'
  },
  {
    name: '拍立得',
    reason: '用来记录我们一起度过的温柔瞬间。',
    image: '/assets/instax.jpg'
  },
  {
    name: '手写信+香薰蜡烛',
    reason: '写下我想对你说的话，配上熟悉的味道。',
    image: '/assets/letter.jpg'
  }
];

export default function App() {
  const [selectedGift, setSelectedGift] = useState(null);

  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mt-6 mb-4 text-center text-pink-700">
        我为你准备的一些小小心意
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {gifts.map((gift, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer"
            onClick={() => setSelectedGift(gift)}
          >
            <img src={gift.image} alt={gift.name} className="w-full h-48 object-cover rounded-xl" />
            <h2 className="text-xl font-semibold mt-2 text-pink-800">{gift.name}</h2>
          </motion.div>
        ))}
      </div>

      {selectedGift && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md">
            <h3 className="text-2xl font-bold text-pink-700">{selectedGift.name}</h3>
            <p className="mt-4 text-gray-600">{selectedGift.reason}</p>
            <button
              onClick={() => setSelectedGift(null)}
              className="mt-6 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600"
            >
              关闭
            </button>
          </div>
        </div>
      )}
      <MusicPlayer />
    </main>
  );
}