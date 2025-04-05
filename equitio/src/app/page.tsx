"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { CircleChevronRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center h-screen max-w-screen p-4">
        {/* TITLE FOR LANDING PAGE */}
        <div className="flex flex-col items-center gap-4 py-16">
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
        <div className="">
          <Card className="w-80 flex flex-col items-center py-4 px-4">
            <Image
              className="rounded-lg"
              src="/card.png"
              width={300}
              height={200}
              alt=""
            ></Image>

            <div className="flex flex-row items-center px-2 h-full w-full border-t pt-4">
              <div className="px-2 text-sm ">
                {" "}
                Convert text into dyslexia-friendly font
              </div>
              <div>
                <CircleChevronRight />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
