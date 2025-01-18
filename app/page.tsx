import { Canvas } from "./canvas";

export default function Home() {
  return (
    <div>
      <div className="h-screen">
        {/* <div
        id="subtitle"
        className="fixed rounded-full bg-white bg-opacity-80 font-normal max-w-max mx-auto mt-8 text-sm md:text-xl p-[1px] md:p-[1.5px]"
      >
        <div className="px-3 py-1 rounded-full bg-black bg-opacity-60 duration-300 text-white">
          Hemant Jatal
        </div>
      </div> */}
        <Canvas />
      </div>
    </div>
  );
}
