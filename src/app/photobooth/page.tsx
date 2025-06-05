"use client";

import { useEffect, useRef, useState } from "react";

export default function Photobooth() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [countdown, setCountdown] = useState<number | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  // live camera stream
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

  // countdown loop 
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCounting && countdown !== null && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    }

    if (countdown === 0) {
      takepicture();
      if (photoCount + 1 < 3) {
        setPhotoCount(photoCount + 1);
        setCountdown(3);
      } else {
        setIsCounting(false);
        setCountdown(null);
      }
    }

    return () => clearInterval(interval);
  }, [countdown, isCounting, photoCount]);

  // starts the process
  const startCountdown = () => {
    if (isCounting) return;
    setPhotos([]);
    setPhotoCount(0);
    setCountdown(3);
    setIsCounting(true);
  };

  // take picture + shutter sound + flash + canvas
  const takepicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const shutterSound = new Audio("/shutter.wav");
    shutterSound.play();

    const flash = document.getElementById("flash");
    if (flash) {
      flash.classList.remove("hidden");
      flash.classList.add("opacity-100");
      setTimeout(() => {
        flash.classList.remove("opacity-100");
        flash.classList.add("hidden");
      }, 100);
    }

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");

    setPhotos((prev) => [...prev, dataURL]);
  };

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="w-[95%] h-[75%] rounded-full flex flex-row bg-cover bg-center"
        style={{ backgroundImage: 'url("/bg.png")' }}
      >
        <div className="w-2/3 flex flex-col items-center justify-center">
          <div id="livecam" className="h-2/3 overflow-hidden relative">
            <video ref={videoRef} className="w-full h-full object-cover" />
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold z-10">
                {countdown}
              </div>
            )}
            <div id="flash" className="absolute inset-0 bg-white opacity-0 pointer-events-none transition-opacity duration-100 hidden"
            />
          </div>

          {!isCounting && (
            <button onClick={startCountdown} id="countbtn" className="px-6 py-3 m-3 group bg-white text-purple-300 font-semibold rounded-full border-2 transition">
              <span className="block group-hover:hidden">ready?</span>
              <span className="hidden group-hover:block">start countdown!</span>
            </button>
          )}
        </div>

        <div className="w-1/3 p-4 flex flex-col items-left justify-center space-y-4 overflow-y-auto">
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Photo ${index + 1}`} className="w-24 h-auto"/>
          ))}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
