import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

// Set revalidation time for ISR (Incremental Static Regeneration) in seconds
export const revalidate = 60;

type Props = {
  params: {
    slug: string; // Define the shape of params with a slug property
  };
};

// Initialize Redis client using environment variables
const redis = Redis.fromEnv();

// Function to generate static params for all projects
export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published) // Filter projects to include only published ones
    .map((p) => ({
      slug: p.slug, // Map each project to an object containing its slug
    }));
}

// Default export function to handle the rendering of a project page
export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound(); // If no project is found, return a 404 not found page
  }

  // Get the number of views for the project from Redis, default to 0 if not found
  const views =
    (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

  // Return the rendered page with header, view report, and project content
  return (
    <div className="min-h-[100vh] dark:bg-black bg-white z-90">
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
