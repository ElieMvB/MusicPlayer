import { useEffect, useRef, useState } from "react";

export default function AudioProgress() {
  const [duration, setDuration] = useState(0);
  const [value, setValue] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);

  const raf = useRef<number | null>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const audio = document.getElementById("player") as HTMLAudioElement | null;
    if (!audio) return;

    const updateDuration = () => setDuration(audio.duration || 0);

    const loop = () => {
      if (!dragging.current) {
        const current = audio.currentTime;

        setValue(current);

        if (sliderRef.current && duration > 0) {
          sliderRef.current.style.setProperty(
            "--progress",
            `${(current / duration) * 100}`,
          );
        }
      }

      raf.current = requestAnimationFrame(loop);
    };

    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);

    raf.current = requestAnimationFrame(loop);

    return () => {
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);

      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [duration]);

  const seek = (time: number) => {
    const audio = document.getElementById("player") as HTMLAudioElement;

    audio.currentTime = time;
    setValue(time);

    sliderRef.current?.style.setProperty(
      "--progress",
      `${(time / duration) * 100}`,
    );
  };

  return (
    <input
      type="range"
      min={0}
      max={duration || 0}
      step={0.01}
      value={value}
      ref={sliderRef}
      onMouseDown={() => (dragging.current = true)}
      onMouseUp={(e) => {
        dragging.current = false;
        seek(Number((e.target as HTMLInputElement).value));
      }}
      onTouchStart={() => (dragging.current = true)}
      onTouchEnd={(e) => {
        dragging.current = false;
        seek(Number((e.target as HTMLInputElement).value));
      }}
      onChange={(e) => {
        seek(Number(e.target.value));
      }}
      className="audio-slider w-full cursor-pointer accent-white hover:accent-gray-400 bg-transparent rounded-lg"
    />
  );
}
