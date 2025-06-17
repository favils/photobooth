import localFont from 'next/font/local'
import Link from 'next/link';

const ZTFormom = localFont({
  src: [
    {
      path: '../../fonts/ZT Formom.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/ZT Formom Italic.otf',
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
        style={{ backgroundImage: 'url("/bg.gif")' }}
      >
        
        <div className="text-7xl text-center text-white">
          <div className={ZTFormom.className}>welcome</div>
          <div className='text-xl'>
            You'll have 3 seconds for each of the 4 shots (no retakes!).
            <br/>Afterwards, you'll get an option to download your photostrip.
            <br/>Have fun!
          </div>
        </div>
        
        <Link href='/photobooth'>
          <button className="fadeInUp px-6 py-3 mt-5 bg-none text-white border-white border-2 font-semibold rounded-full hover:bg-white hover:text-black transition">
            start now! →
          </button>
        </Link>
      </div>
    </div>
  );
}