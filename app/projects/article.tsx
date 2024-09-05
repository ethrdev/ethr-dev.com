import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, View } from "lucide-react";

// Defining the Props type to specify the expected props for the Article component
type Props = {
  project: Project;
  views: number;
};

// Defining the Article component as a React functional component
export const Article: React.FC<Props> = ({ project, views }) => {
  return (
    // Wrapping the article content in a Next.js Link component for navigation to the project page
    <Link href={`/projects/${project.slug}`}>
      <article className="p-4 md:p-8">
        <div className="flex justify-between gap-2 items-center">
          <span className="text-xs text-gray-100">
            {project.date ? (
              <time dateTime={new Date(project.date).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(project.date)
                )}
              </time>
            ) : (
              <span>SOON</span>
            )}
          </span>
          <span className="text-gray-500 text-xs  flex items-center gap-1">
            <Eye className="w-4 h-4" />{" "}
            {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-600 dark:text-white mt-2">
          {project.title}
        </h2>
        <p className="text-gray-600 text-sm max-w-sm mt-2 dark:text-gray-400 font-sans font-medium">
          {project.description}
        </p>
      </article>
    </Link>
  );
};
