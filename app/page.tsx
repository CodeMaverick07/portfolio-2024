import Robot from "./Robot";
import { Canvas } from "./canvas";

export default function Home() {
  return (
    <div>
      <div className="">
        <Canvas />
        <Robot />
        <div className="h-screen flex justify-center items-center"></div>
      </div>
    </div>
  );
}
