"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { FontSelector } from "./ui/fontSelector";
import { Geist, Geist_Mono, Atkinson_Hyperlegible } from "next/font/google";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import { Slider } from "./ui/slider";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const openDyslexia = localFont({
  src: "../../public/fonts/OpenDyslexic-Regular.woff2",
});

const verdana = localFont({
  src: "../../public/fonts/Verdana-Bold.ttf",
});

export function AppSidebar() {
  const [font, setFont] = useState("");
  const [spacing, setSpacing] = useState(2);
  const [backgroundColor, setBackgroundColor] = useState("#FFF3CE");
  const [textColor, setTextColor] = useState("#020402");

  const fonts = [
    { label: "Sans", value: geistSans.className },
    { label: "Mono", value: geistMono.className },
    { label: "Dyslexia", value: openDyslexia.className },
    { label: "Atkinson", value: atkinsonHyperlegible.className },
    { label: "Verdana", value: verdana.className },
  ];

  // Control Background Color & Text Color
  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;
  }, [backgroundColor, textColor]);
  // Control Letter Spacing
  useEffect(() => {
    document.body.style.setProperty("letter-spacing", `${spacing}px`);
  }, [spacing]);

  // Control Font Selection
  useEffect(() => {
    document.body.classList.remove(
      geistSans.className,
      geistMono.className,
      atkinsonHyperlegible.className,
      openDyslexia.className,
      verdana.className
    );

    if (font) {
      document.body.classList.add(font);
    }
  }, [font]);
  return (
    <Sidebar>
      <SidebarHeader />

      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel className="text-2xl font-bold p-4">
          Customize
        </SidebarGroupLabel>
        <SidebarGroupContent className="px-4">
          <FontSelector fonts={fonts} onChange={(font) => setFont(font)} />
        </SidebarGroupContent>
        <SidebarGroupLabel className="text-2xl font-bold p-4 mt-8">
          Spacing
        </SidebarGroupLabel>
        <SidebarGroupContent className="px-4">
          <Slider
            min={2}
            max={5}
            step={0.1}
            value={[spacing]}
            onValueChange={(val) => setSpacing(val[0])}
          />
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
