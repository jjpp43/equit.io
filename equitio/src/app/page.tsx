import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="h-screen max-w-screen p-4">
        {/* TITLE FOR LANDING PAGE */}
        <div className="flex flex-col items-center gap-4 py-16 border-2">
          <h1 className="flex flex-col text-4xl font-bold gap-2">
            <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded-md">
              Read Better
            </span>
            <span className="bg-green-200 text-green-800 px-2 py-1 rounded-md">
              Live Brighter
            </span>
            <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-md">
              For Dyslexia
            </span>
          </h1>
          <h2 className="text-lg font-regular">
            AI-Powered Tool for Dyslexia-Friendly Reading
          </h2>
        </div>
        {/* START BUTTON */}
        <div>
          <Button className="">
            <div className="">Start</div>
          </Button>
        </div>
      </div>
    </>
  );
}
