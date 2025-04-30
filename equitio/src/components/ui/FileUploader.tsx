"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import pdfParse from "pdf-parse";

type FileUploaderProps = {
  onFileRead?: (content: string | ArrayBuffer | null, file: File) => void;
};

export default function FileUploader({ onFileRead }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Send the file to the server API for parsing
      const response = await fetch("/api/parse", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.text) {
        setPdfText(data.text); // Display the extracted text
        console.log("Extracted Text: ", data.text);

        // Store pdfText in sessionStorage
        sessionStorage.setItem("pdfText", data.text);

        if (onFileRead) {
          onFileRead(data.text, selectedFile);
        }
      } else {
        console.error("Error parsing PDF:", data.error);
      }
    } catch (err) {
      console.error("Error uploading PDF:", err);
    }
  };

  return (
    <div className="grid w-full max-w-xl items-center gap-4">
      <Input
        id="file"
        type="file"
        onChange={handleFileChange}
        className="font-semibold"
      />
      <Button onClick={handleProcess} disabled={!selectedFile} asChild>
        <Link href="/refined">Let's Go!</Link>
      </Button>
    </div>
  );
}
