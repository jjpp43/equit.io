"use client";
import { useState } from "react";
import { Volume2, PauseCircle } from "lucide-react";
import { Button } from "../../components/ui/button";

const dummyText = `Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.`;

export default function Refined() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const playChunks = async () => {
    if (isPlaying) return;
    const res = await fetch(`/api/tts?text=${encodeURIComponent(dummyText)}`);
    const data = await res.json();

    if (!data.base64Chunks || !Array.isArray(data.base64Chunks)) {
      console.error("Invalid audio data:", data.error);
      return;
    }

    const playSequential = (index: number) => {
      if (index >= data.base64Chunks.length) return;

      const newAudio = new Audio(
        `data:audio/mp3;base64,${data.base64Chunks[index].base64}`
      );
      newAudio.play();

      newAudio.onended = () => playSequential(index + 1);

      // Set the audio to track the playing state
      setAudio(newAudio);
    };

    playSequential(0);
    setIsPlaying(true); // Set play state to true
  };

  // Function to pause the audio
  const pauseAudio = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false); // Set play state to false
    }
  };

  // Function to handle play/pause toggle
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio(); // If it's playing, pause it
    } else {
      playChunks(); // If it's paused, start playing
    }
  };

  return (
    <>
      {/* <div className="flex flex-col items-center h-screen max-w-screen p-4">
        <div className="flex flex-row w-full h-full">
          <div className="w-1/5 h-full border-2"></div>
          <div className="w-3/5 border-2 flex flex-col p-4 gap-8">
            <div className="text-2xl font-bold">Converted</div>
            <Button className="w-12 h-12" onClick={togglePlayPause}>
              {isPlaying ? <PauseCircle size={40} /> : <Volume2 size={40} />}
            </Button>
            <div className="text-lg">{dummyText}</div>
          </div>
          <div className="w-1/2 border-2 flex flex-col p-4 gap-8">
            {" "}
            <div className="text-2xl font-bold">Summary</div>
            <Button className="w-12 h-12" onClick={playChunks}>
              <Volume2 size={40} />
            </Button>
            <div className="overflow: auto">
              <div className="text-lg">{dummyText}</div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="h-screen grid grid-cols-3 gap-4 p-4">
        {/* Left column - static */}
        <div className="border-2 p-4">
          <h2 className="font-bold text-xl mb-2">Adjustments</h2>
          <p>Static content here</p>
        </div>

        {/* Middle column - scrollable */}
        <div className="border-2 p-4 overflow-y-auto h-full">
          <h2 className="font-bold text-xl mb-2">
            Refined Text{" "}
            <Button className="w-8 h-8" onClick={togglePlayPause}>
              {isPlaying ? <PauseCircle size={40} /> : <Volume2 size={40} />}
            </Button>
          </h2>

          <div className="space-y-4">{dummyText}</div>
        </div>

        {/* Right column - scrollable */}
        <div className="border-2 p-4 overflow-y-auto h-full">
          <h2 className="font-bold text-xl mb-2">
            Summary{" "}
            <Button className="w-8 h-8" onClick={togglePlayPause}>
              {isPlaying ? <PauseCircle size={40} /> : <Volume2 size={40} />}
            </Button>
          </h2>

          <div className="space-y-4">{dummyText}</div>
        </div>
      </div>
    </>
  );
}
