import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Redis client using environment variables.
const redis = Redis.fromEnv();

// Configuration for the edge runtime environment.
export const config = {
  runtime: "edge",
};

// Export the default asynchronous function to handle incoming requests.
export default async function incr(req: NextRequest): Promise<NextResponse> {
  // Check if the request method is POST, if not return a 405 Method Not Allowed response.
  if (req.method !== "POST") {
    return new NextResponse("use POST", { status: 405 });
  }

  // Check if the Content-Type header is application/json, if not return a 400 Bad Request response.
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }

  // Parse the request body as JSON.
  const body = await req.json();
  let slug: string | undefined = undefined;

  // Check if the body contains a slug property and assign it to the slug variable.
  if ("slug" in body) {
    slug = body.slug;
  }

  // If slug is not found in the request body, return a 400 Bad Request response.
  if (!slug) {
    return new NextResponse("Slug not found", { status: 400 });
  }

  // Get the IP address from the request.
  const ip = req.ip;
  if (ip) {
    // Hash the IP address to avoid storing it directly in the database for privacy reasons.
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip),
    );

    // Convert the hash buffer to a hexadecimal string.
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Deduplicate the IP for each slug by setting a Redis key with an expiration of 24 hours.
    const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
      nx: true,
      ex: 24 * 60 * 60,
    });

    // If the key already exists, return a 202 Accepted response without further processing.
    if (!isNew) {
      new NextResponse(null, { status: 202 });
    }
  }

  // Increment the pageview count for the given slug in the Redis database.
  await redis.incr(["pageviews", "projects", slug].join(":"));

  // Return a 202 Accepted response indicating that the request was successful.
  return new NextResponse(null, { status: 202 });
}
