"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as pdfjsLib from "pdfjs-dist";

type FileUploaderProps = {
  onFileRead?: (content: string | ArrayBuffer | null, file: File) => void;
};

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function FileUploader({ onFileRead }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    const arrayBuffer = await selectedFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str);
      fullText += strings.join(" ") + "\n";
    }

    onFileRead?.(fullText, selectedFile);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-4">
      <Label htmlFor="file">Upload a file</Label>
      <Input id="file" type="file" onChange={handleFileChange} />
      <Button onClick={handleProcess} disabled={!selectedFile}>
        Save File
      </Button>
    </div>
  );
}
