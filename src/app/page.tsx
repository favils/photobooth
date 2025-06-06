import localFont from 'next/font/local'
import Link from 'next/link';

const ZTFormom = localFont({
  src: [
    {
      path: '../fonts/ZT Formom.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/ZT Formom Italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
});

export default function Home() {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div
        className="w-[95%] h-[75%] rounded-full flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/bg.png")' }}
      >
        
        <div className={`text-9xl text-shadows text-white ${ZTFormom.className}`}>
          photobooth
        </div>
        
        <Link href='/photobooth'>
          <button className="fadeInUp px-6 py-3 bg-white text-purple-300 font-semibold rounded-full hover:bg-purple-300 border-2 hover:text-white transition">
            take some pictures! →
          </button>
        </Link>
      </div>
    </div>
  );
}