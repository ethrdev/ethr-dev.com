"use client";

// Exporting the Analytics function as a React component
export function BeamAnalytics() {
  // Retrieving the Beam Analytics token from environment variables
  const token = process.env.NEXT_PUBLIC_BEAM_TOKEN;

  // If the token is not found, the component returns null and renders nothing
  if (!token) {
    return null;
  }

  // If the token is found, the component returns a script element that loads the Beam Analytics script
  return (
    <script
      // The source URL of the Beam Analytics script
      src="https://beamanalytics.b-cdn.net/beam.min.js"
      // Setting the data-token attribute with the retrieved token
      data-token={token}
      // The async attribute allows the script to be executed asynchronously
      async
    />
  );
}