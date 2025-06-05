import localFont from "next/font/local";

export default function Photobooth() {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div
        className="w-[95%] h-[75%] rounded-full flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/bg.png")' }}
      >
        
        <video></video>
        
      </div>
    </div>
  );
}