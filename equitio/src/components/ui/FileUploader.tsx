"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type FileUploaderProps = {
  onFileRead?: (content: string | ArrayBuffer | null, file: File) => void;
};

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

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log("📤 Sending file:", selectedFile);

    // fill in from here...
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
