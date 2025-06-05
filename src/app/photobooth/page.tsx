"use client"
import localFont from "next/font/local";
import { useEffect, useRef } from "react";

export default function Photobooth() {
  
  useEffect(() => {
    const video = document.createElement("video");
    video.id = "cam";
    video.autoplay = true;
    video.muted = true;

    document.getElementById("livecam")?.appendChild(video);

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
    })

    return () => {
      video.remove();
    };

  }, []);

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div
        className="w-[95%] h-[75%] rounded-full flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/bg.png")' }}
      >

        <div id="livecam"></div>

      </div>
    </div>
  );
}