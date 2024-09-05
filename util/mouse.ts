import { useEffect, useState } from "react";

// Define an interface for the mouse position with x and y coordinates
interface MousePosition {
	x: number;
	y: number;
}

// Create a custom hook that tracks the mouse position
export function useMousePosition(): MousePosition {
	// Initialize the state to hold the mouse position, starting at { x: 0, y: 0 }
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: 0,
		y: 0,
	});

	// Use the useEffect hook to set up an event listener for mouse movement
	useEffect(() => {
		// Define a function to handle mouse move events
		const handleMouseMove = (event: MouseEvent) => {
			// Update the state with the new mouse position
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		// Add the mouse move event listener to the window
		window.addEventListener("mousemove", handleMouseMove);

		// Return a cleanup function to remove the event listener when the component unmounts
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []); // Empty dependency array ensures this effect runs only once

	// Return the current mouse position
	return mousePosition;
}
