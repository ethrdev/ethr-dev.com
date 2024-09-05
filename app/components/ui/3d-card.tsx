// This is a 3D Card component that rotates based on mouse movement
"use client";

import { cn } from "@/util/cn";
import Image from "next/image";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

// Create a context to manage mouse enter state
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

// Component to provide 3D Card Container
export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the container div
  const [isMouseEntered, setIsMouseEntered] = useState(false); // State to track if the mouse has entered the container

  // Handle mouse move to apply 3D rotation based on cursor position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect(); // Get container dimensions and position
    const x = (e.clientX - left - width / 2) / 25; // Calculate rotation value for Y-axis
    const y = (e.clientY - top - height / 2) / 25; // Calculate rotation value for X-axis
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`; // Apply rotation
  };

  // Handle mouse enter event
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true); // Set mouse enter state to true
    if (!containerRef.current) return;
  };

  // Handle mouse leave event
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsMouseEntered(false); // Set mouse enter state to false
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`; // Reset rotation
  };
  return (
    // Provide the mouse enter state context
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "py-2 flex items-center justify-center",
          containerClassName
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

// Component for the body of the 3D Card
export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

// Component for individual items inside the 3D Card
export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
}) => {
  const ref = useRef<HTMLDivElement>(null); // Reference to the card item div
  const [isMouseEntered] = useMouseEnter(); // Get mouse enter state from context

  useEffect(() => {
    handleAnimations(); // Apply animations when mouse enter state changes
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      // Apply translations and rotations when mouse enters
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      // Reset transformations when mouse leaves
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};


// Custom hook to use the MouseEnterContext
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext); // Get context value
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider"); // Ensure hook is used within provider
  }
  return context;
};
