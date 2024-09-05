"use client";
import { BackgroundBeams } from "@/app/components/ui/background-beams";
import { ArrowLeft, Eye, Github, Twitter } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

// Defining the type for the component props
type Props = {
  project: {
    url?: string;
    title: string;
    description: string;
    repository?: string;
  };

  views: number;
};

// Header component definition
export const Header: React.FC<Props> = ({ project, views }) => {
  // Ref to track the header element
  const ref = useRef<HTMLElement>(null);
  // State to track if the header is intersecting the viewport
  const [isIntersecting, setIntersecting] = useState(true);

  // Array to hold project-related links
  const links: { label: string; href: string }[] = [];
  if (project.repository) {
    // Adding GitHub link if repository is provided
    links.push({
      label: "GitHub",
      href: project.repository,
    });
  }
  if (project.url) {
    // Adding Website link if URL is provided
    links.push({
      label: "Website",
      href: project.url,
    });
  }

  // Effect to set up Intersection Observer
  useEffect(() => {
    if (!ref.current) return; // If ref is not set, exit

    // Creating Intersection Observer instance
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    // Observing the header element
    observer.observe(ref.current);
    // Cleanup function to disconnect the observer
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className="relative isolate overflow-hidden dark:bg-black bg-white"
    >
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
          isIntersecting
            ? "bg-gray-900/0 border-transparent"
            : "bg-white/10  border-gray-200 lg:border-transparent"
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            <span
              title="View counter for this page"
              className={`duration-200 hover:font-medium flex items-center gap-1 ${
                isIntersecting
                  ? " text-gray-400 hover:text-gray-100"
                  : "text-gray-600 hover:text-gray-900"
              } `}
            >
              <Eye className="w-5 h-5" />{" "}
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                views
              )}
            </span>
            <Link target="_blank" href="https://twitter.com/Wagner12668765">
              <Twitter
                className={`w-6 h-6 duration-200 hover:font-medium ${
                  isIntersecting
                    ? " text-gray-400 hover:text-gray-100"
                    : "text-gray-600 hover:text-gray-900"
                } `}
              />
            </Link>
            <Link target="_blank" href="https://github.com/ethrdev">
              <Github
                className={`w-6 h-6 duration-200 hover:font-medium ${
                  isIntersecting
                    ? " text-gray-400 hover:text-gray-100"
                    : "text-gray-600 hover:text-gray-900"
                } `}
              />
            </Link>
          </div>

          <Link
            href="/projects"
            className={`duration-200 hover:font-medium ${
              isIntersecting
                ? " text-gray-400 hover:text-gray-100"
                : "text-gray-600 hover:text-gray-900"
            } `}
          >
            <ArrowLeft className="w-6 h-6 " />
          </Link>
        </div>
      </div>
      <div className="z-20 container mx-auto relative isolate overflow-hidden py-24 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
              {project.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 font-sans font-medium">
              {project.description}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-medium font-sans leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <Link target="_blank" key={link.label} href={link.href}>
                  <div className="hover:text-gray-100 text-gray-400 duration-300">
                    {link.label} <span aria-hidden="true">&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </header>
  );
};
