import { WavyBackground } from "./components/ui/wavy-background";
import Home1 from "./components/Home";
import Server from "./components/Server";

function Home() {
  return (
    <main className="flex flex-col">
      <WavyBackground className="mx-auto min-h-screen w-full overflow-y-auto">
        <p className="mt-10 text-2xl sm:text-6xl md:text-7xl lg:text-7xl text-white font-bold inter-var text-center">
          FoodFactAI
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
          Track Your Meal
        </p>
        <Home1 />
        
  
      </WavyBackground>
    </main>
  );
}

export default Home;
