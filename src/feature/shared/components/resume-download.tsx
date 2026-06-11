"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function ResumeDownload() {
  // Replace YOUR_FILE_ID with the actual ID from your Google Drive link
  const DRIVE_FILE_ID = "1V4oNHV8M2mrSkB2MqY1bjrk9yi9h-Iqr";
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;

  const handleDownload = () => {
    // This opens the direct download link in a hidden way to trigger the browser download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.target = "_blank";
    link.setAttribute("download", "Resume.pdf"); // Suggests a filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={handleDownload}
      >
      <Download className="w-5 h-5 group-hover:animate-bounce" />
      <span>Download Resume</span>
    </Button>
  );
}
