import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FileUploader from "@/components/ui/FileUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function upload() {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <Card className="w-2/3 h-2/3 border-2 bg-[#FFFAEF] text-[#020402]">
          <CardHeader className="text-start ">
            <CardTitle className="text-4xl pb-8">Upload File</CardTitle>
            <CardDescription className="text-xl">
              We'll handle the rest!
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>

          <CardContent className="flex justify-center items-center">
            {/* Calls File Uploader */}
            <FileUploader onFileRead={undefined} />
          </CardContent>

          <CardContent></CardContent>

          <CardFooter className="flex justify-center"></CardFooter>
        </Card>
      </div>
    </>
  );
}
