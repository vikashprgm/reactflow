import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <div className="flex flex-col justify-center items-center bg-[url('/src/components/new.jpg')] bg-cover bg-center min-h-screen py-16 mx-auto text-center px-6">
      
      <div>
        <strong className="text-white font-semibold">
          Showcase your code the easier way
        </strong>
      </div>
      
      <div>
        <h1 className="text-amber-100 mt-5 max-w-3xl mx-auto text-4xl sm:text-5xl md:text-6xl leading-[1.1] font-semibold tracking-tighter text-balance">
          Codeboard - Visualize Your Program with Ease
        </h1>
      </div>

      <div className="text-gray-300 mt-8 max-w-3xl mx-auto text-lg text-balance">
        <p>
          CodeBoard allows you to visualize your code in a 2-D flowchart style, making it easier to understand for everyone.
          Try it now!
        </p>
      </div>

      <div className="mt-12 justify-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/app">
            Get Started
          </Link>
        </Button>
      </div>
    </div>
  );
}