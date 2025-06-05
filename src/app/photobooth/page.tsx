"use client"
// youtube video i used to help me on the takepicture function:
// https://www.youtube.com/watch?v=3p9nsawLDjw&t=293s

import localFont from "next/font/local";
import { useEffect, useRef, useState } from "react";

export default function Photobooth() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
  
    const video = videoRef.current;
    video.autoplay = true;
    video.style.objectFit = "cover";
  
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
    });
  
    return () => {
      if (video.srcObject instanceof MediaStream) {
        video.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const counting = () => {

    let count = 3;
    setCountdown(count);
    const countBtn = document.getElementById("countbtn");
    if (countBtn) countBtn.style.display = "none";

    const interval = setInterval(() => {
      count--;
      if (count === 0){
        clearInterval(interval);
        setCountdown(null)
        takepicture();
        if (countBtn) countBtn.style.display = "block";
      } else {
        setCountdown(count);
      }
    }, 1000);
  };


  const takepicture = () => {

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    
    
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas?.toDataURL("image/png");

    const picDiv = document.createElement("div");
    picDiv.classList.add("photo")

    const img = document.createElement("img");
    img.src = dataURL;
    picDiv.appendChild(img);
  }

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div
        className="w-[95%] h-[75%] rounded-full flex flex-row bg-cover bg-center"
        style={{ backgroundImage: 'url("/bg.png")' }}
      >

        <div className="w-2/3 flex flex-col items-center justify-center">
        <div id="livecam" className="h-2/3 overflow-hidden relative">
          <video ref={videoRef} className="w-full h-full object-cover" />
          {countdown != null && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold z-10">
              {countdown}
            </div>
          )}
        </div>

          <button onClick={counting} id="countbtn" className="px-6 py-3 m-3 group bg-white text-purple-300 font-semibold rounded-full border-2 transition">
            <span className="block group-hover:hidden">ready?</span>
            <span className="hidden group-hover:block">start countdown!</span>
          </button>
        </div>
        
        <div>
          <canvas ref={canvasRef}/>
        </div>

      </div>
    </div>
  );
}