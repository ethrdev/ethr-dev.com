"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => { // Defines a functional React component named Navigation.
  const ref = useRef<HTMLElement>(null); // Creates a ref to access the header element.
  const [isIntersecting, setIntersecting] = useState(true); // State to track if the header is intersecting the viewport.

  useEffect(() => { // useEffect hook to run code on component mount and when dependencies change.
    if (!ref.current) return; // If ref is not assigned to an element, exit early.
    const observer = new IntersectionObserver(([entry]) => // Creates a new IntersectionObserver to observe visibility.
      setIntersecting(entry.isIntersecting) // Updates state based on the intersection status.
    );

    observer.observe(ref.current); // Starts observing the header element.
    return () => observer.disconnect(); // Cleanup: disconnect the observer when the component unmounts.
  }, []); // Empty dependency array means this effect runs only once on mount.

  return (
    <header ref={ref}> {/* Assigns the ref to the header element. */}
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
          isIntersecting
            ? "bg-gray-900/0 border-transparent"
            : "bg-gray-900/500  border-gray-800 "
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            <Link
              href="/projects"
              className="duration-200 text-gray-400 hover:text-gray-100 font-sans font-medium"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="duration-200 text-gray-400 hover:text-gray-100 font-sans font-medium"
            >
              Contact
            </Link>
          </div>

          <Link
            href="/"
            className="duration-200 text-gray-300 hover:text-gray-100"
          >
            <ArrowLeft className="w-6 h-6 " />
          </Link>
        </div>
      </div>
    </header>
  );
};
