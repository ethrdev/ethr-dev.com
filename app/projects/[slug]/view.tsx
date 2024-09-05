"use client";

import { useEffect } from "react";

// Define a functional component named ReportView that accepts a prop object containing a 'slug' string
export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {

	// Use the useEffect hook to perform a side effect when the component is mounted or when the 'slug' changes
	useEffect(() => {
		// Send a POST request to the /api/incr endpoint
		fetch("/api/incr", {
			method: "POST", // Specify the request method as POST
			headers: {
				"Content-Type": "application/json", // Set the Content-Type header to indicate the request body is JSON
			},
			body: JSON.stringify({ slug }), // Convert the 'slug' prop to a JSON string and include it in the request body
		});
	}, [slug]); // The effect depends on the 'slug' prop, so it will re-run if 'slug' changes

	// This component does not render any UI, so it returns null
	return null;
};
