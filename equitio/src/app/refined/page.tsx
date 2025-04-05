"use client";
import { useState, useEffect } from "react";
import { Volume2, PauseCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Refined() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [refinedText, setRefinedText] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");

  // This effect will be used to set the data passed from the previous page (e.g. from FileUploader)
  // This effect will be used to get the data from sessionStorage
  useEffect(() => {
    const savedText = sessionStorage.getItem("pdfText");

    if (savedText) {
      setRefinedText(savedText); // Set the refined text if found in sessionStorage
    } else {
      setRefinedText("No refined text available.");
    }
  }, []);

  const playChunks = async () => {
    if (isPlaying) return;
    const res = await fetch(`/api/tts?text=${encodeURIComponent(refinedText)}`);
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

  // Handle difficulty change
  const handleDifficultyChange = (value: string) => {
    setDifficulty(value); // Set the selected difficulty value
  };

  return (
    <>
      <div className="h-screen grid grid-cols-[1.5fr_3fr_3fr] gap-4 p-4">
        {/* Left column - static */}
        <div className="border-2 p-4">
          <h2 className="font-bold text-3xl mb-2 pt-2 pb-12">Adjustments</h2>
          <h3 className="pb-4 font-semibold text-xl">Level of difficulty</h3>
          <RadioGroup
            defaultValue="option-one"
            value={difficulty}
            onValueChange={handleDifficultyChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one" className="text-lg">
                Mild
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two" className="text-lg">
                Moderate
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-three" id="option-three" />
              <Label htmlFor="option-three" className="text-lg">
                {" "}
                Severe
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Middle column - scrollable */}
        <div className="border-2 p-4 overflow-y-auto h-full">
          <div className="flex flex-row gap-4 pt-2 pb-6">
            {" "}
            <h2 className="font-bold text-3xl mb-2">Refined Text </h2>
            <Button className="w-8 h-8" onClick={togglePlayPause}>
              {isPlaying ? <PauseCircle size={40} /> : <Volume2 size={40} />}
            </Button>
          </div>

          <div className="space-y-4">
            {refinedText || "Loading refined text..."}
          </div>
        </div>

        {/* Right column - scrollable */}
        <div className="border-2 p-4 overflow-y-auto h-full">
          <div className="flex flex-row gap-4 pt-2 pb-6">
            <h2 className="font-bold text-3xl mb-2">Summary </h2>
            <Button className="w-8 h-8" onClick={togglePlayPause}>
              {isPlaying ? <PauseCircle size={40} /> : <Volume2 size={40} />}
            </Button>
          </div>

          <div className="space-y-4">
            {refinedText || "Loading refined text..."}
          </div>
        </div>
      </div>
    </>
  );
}
