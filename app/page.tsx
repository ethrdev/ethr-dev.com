import Link from "next/link";
import React from "react";
import { SparklesCore } from "./components/ui/sparkles";

// Navigation items for the navbar
const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

// Home component definition
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
      {/*<h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        ether
          </h1>*/}
      
      {/* Inner container with a fixed height and width, black background, centered content */}
      <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        {/* Navigation bar with animation */}
        <nav className="my-16 animate-fade-in">
          <ul className="flex items-center justify-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm duration-500 text-gray-500 hover:text-gray-300 font-display"
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>

        {/* Decorative horizontal line with gradient and animations */}
        <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-gray-300/0 via-gray-300/50 to-gray-300/0" />
        
         {/* Main heading with animation and gradient text effect */}
        <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
          ether
        </h1>

        {/* Container for the SparklesCore component and gradient effects */}
        <div className="w-[40rem] h-40 relative">
          
          {/* Gradients for decorative effect */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* SparklesCore component for animated particle effects */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial gradient to create a smooth edge effect */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>

        {/* Another decorative horizontal line with gradient and animations */}
        <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-gray-300/0 via-gray-300/50 to-gray-300/0" />
        
        {/* Section with text and a link, with animation */}
        <div className="my-16 text-center animate-fade-in">
          <h2 className="text-sm text-gray-500 font-sans font-medium">
            I'm building{" "}
            <Link
              target="_blank"
              href="https://poker-scientist.com/"
              className="underline duration-500 hover:text-gray-300 font-sans font-medium"
            >
              Poker Scientist
            </Link>{" "}
            to help you become a better poker player.
          </h2>
        </div>
      </div>
    </div>
  );
}
