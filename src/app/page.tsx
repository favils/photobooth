import localFont from 'next/font/local';
import Link from 'next/link';

const ZTFormom = localFont({
  src: [
    { path: '../fonts/ZT Formom.otf', weight: '400', style: 'normal' },
    { path: '../fonts/ZT Formom Italic.otf', weight: '400', style: 'italic' },
  ],
});

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white font-serif">
      <div
        className="absolute inset-0 bg-cover bg-center filter sepia contrast-125 brightness-90"
        style={{ backgroundImage: 'url("/bg.gif")' }}
      ></div>

      <div className="absolute inset-0 bg-opacity-60"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-10">
        <div className={`text-white ${ZTFormom.className}`}>
          <h2 className="text-xl tracking-widest mb-2">PRESENTING...</h2>
          <h1 className="text-7xl md:text-9xl uppercase tracking-wide">Photobooth</h1>
          <p className="mt-4 text-lg uppercase tracking-widest">A Vintage Snapshot Experience</p>
        </div>

        <Link href="/welcome">
          <button className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition rounded-full text-lg tracking-wide">
            take some pictures →
          </button>
        </Link>
      </div>
    </div>
  );
}
