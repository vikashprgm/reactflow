import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <div className="min-h-[calc(100svh-4rem)] py-16 max-w-(--breakpoint-xl) mx-auto text-center px-6">
      <strong className="font-semibold text-muted-foreground/90">
        Showcase your code the easier way
      </strong>
      <h1 className="mt-5 max-w-3xl mx-auto text-4xl sm:text-5xl md:text-6xl leading-[1.1] font-semibold tracking-tighter text-balance">
       Codeboard - Visualize Your Program with Ease
      </h1>
      <div className="mt-8 max-w-3xl mx-auto text-lg text-muted-foreground text-balance">
        <p>
          CodeBoard allows you to visualize your code in a 2-D flowchart style, making it easier to understand for everyone.
          Try it now!
          </p>
      </div>
      <div className="mt-12 flex gap-4 justify-center">
        <Button asChild size="lg">
          <Link to="/app">
            Get Started
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/learnmore">
            Learn More
          </Link>
        </Button>
      </div>
    </div>
  );
}