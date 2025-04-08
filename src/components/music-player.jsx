import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.warn("自动播放被拦截，可以手动点击播放");
        });
      }
    }

    // 用户首次点击页面时尝试播放（防止 autoplay 被拦）
    const handleFirstClick = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play();
      }
      window.removeEventListener("click", handleFirstClick);
    };
    window.addEventListener("click", handleFirstClick);

    return () => {
      window.removeEventListener("click", handleFirstClick);
    };
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
      <audio ref={audioRef} src="/audio/music.mp3" loop />
      <button
        onClick={togglePlay}
        className="bg-pink-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-pink-600"
      >
        {playing ? "暂停音乐 🎵" : "播放音乐 🎶"}
      </button>
    </div>
  );
}
