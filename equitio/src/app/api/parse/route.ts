// /app/api/parse/route.ts
import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";

// This is for handling POST requests
export async function POST(req: NextRequest) {
    try {
      // Extract the file from the form data
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
  
      if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
      }
  
      // Convert the file to an ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
  
      // Convert ArrayBuffer to Buffer (required by pdf-parse)
      const buffer = Buffer.from(arrayBuffer);
  
      // Parse the PDF content
      const pdfData = await pdfParse(buffer);
  
      // Return the extracted text and additional PDF data
      return NextResponse.json({
        text: pdfData.text,  // Extracted text from the PDF
        info: pdfData.info,  // PDF info (author, title, etc.)
        metadata: pdfData.metadata,  // PDF metadata
        version: pdfData.version,  // PDF.js version
      });
    } catch (error) {
      console.error("Error parsing PDF:", error);
      return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
    }
  }