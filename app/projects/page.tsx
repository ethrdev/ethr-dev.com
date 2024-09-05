import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";
import Image from "next/image";
import { BackgroundGradient } from "../components/ui/backgrond-gradient";

// Initialize Redis client from environment variables
const redis = Redis.fromEnv();

// Set the revalidation time for static generation
export const revalidate = 60;

// Define the main function for the Projects Page
export default async function ProjectsPage() {
  // Fetch page views data from Redis
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":"))
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0; // Assign view count to each project's slug
    return acc;
  }, {} as Record<string, number>);

  // Find specific projects to feature prominently
  const featured = allProjects.find(
    (project) => project.slug === "poker-scientist"
  )!;
  const top2 = allProjects.find((project) => project.slug === "crypto-prices")!;
  const bottom1 = allProjects.find((project) => project.slug === "ether.com")!;
  const bottom2 = allProjects.find((project) => project.slug === "docs")!;

  // Sort the remaining projects by publication date, excluding the featured ones
  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) => project.slug !== featured.slug && project.slug !== top2.slug
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  // Render the Projects Page
  return (
    <div className="h-full  w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute  pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <Navigation />

      <div className="px-6 pt-20 z-10 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-8 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl z-20 font-bold tracking-tight text-white sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-gray-400 font-sans font-medium">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className="w-full h-px bg-neutral-800" />

        {/* Display featured project */}
        <div className="w-full grid grid-cols-1 gap-0 mx-auto lg:grid-cols-2 lg:mx-0">
          <Link href={`/projects/${featured.slug}`}>
            <CardContainer className="inter-var w-full">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-xl dark:hover:shadow-indigo-500/[0.05] dark:bg-black dark:border-white/[0.2] dark:hover:border-indigo-500/[0.45] border-black/[0.1] w-auto h-auto rounded-xl p-6 border  ">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-sans text-xs text-gray-400 font-medium">
                    {featured.date ? (
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(featured.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(views[featured.slug] ?? 0)}
                  </span>
                </div>
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-gray-600 dark:text-white"
                >
                  {featured.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-gray-600 text-sm font-medium font-sans max-w-sm mt-2 dark:text-gray-400"
                >
                  {featured.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src="/images/poker-scientist/ps_preview.jpg"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-20">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-0 py-2 rounded-xl text-xs font-sans font-medium dark:text-gray-400 dark:hover:text-white"
                  >
                    Read more →
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </Link>

          {/* Display the second top project */}
          <div className="flex flex-col w-full gap-0 h-full mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            <Link href={`/projects/${top2.slug}`}>
              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-xl dark:hover:shadow-indigo-500/[0.05] dark:bg-black dark:border-white/[0.2] dark:hover:border-indigo-500/[0.45] border-black/[0.1] w-auto h-auto rounded-xl p-6 border  ">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-gray-400 font-medium">
                      {top2.date ? (
                        <time dateTime={new Date(top2.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(top2.date))}
                        </time>
                      ) : (
                        <span>SOON</span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", {
                        notation: "compact",
                      }).format(views[top2.slug] ?? 0)}
                    </span>
                  </div>
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-gray-600 dark:text-white"
                  >
                    {top2.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-gray-600 text-sm font-medium font-sans max-w-sm mt-2 dark:text-gray-400"
                  >
                    {top2.description}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                      src="/images/crypto-prices/crypto.png"
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-8">
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-0 py-2 rounded-xl text-xs font-sans font-medium dark:text-gray-400 dark:hover:text-white"
                    >
                      Read more →
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </Link>
          </div>
        </div>

        <div className="hidden w-full h-px md:block bg-neutral-800" />

        {/* Display the bottom three projects */}
        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-2 pb-12 justify-stretch">
          <Link href={`/projects/${bottom1.slug}`}>
            <CardContainer className="inter-var w-full">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-xl dark:hover:shadow-indigo-500/[0.05] dark:bg-black dark:border-white/[0.2] dark:hover:border-indigo-500/[0.45] border-black/[0.1] w-full h-auto rounded-xl p-6 border  ">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-gray-400 font-medium">
                    {bottom1.date ? (
                      <time dateTime={new Date(bottom1.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(bottom1.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(views[bottom1.slug] ?? 0)}
                  </span>
                </div>
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-gray-600 dark:text-white"
                >
                  {bottom1.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-gray-600 text-sm font-medium font-sans max-w-sm mt-2 dark:text-gray-400"
                >
                  {bottom1.description}
                </CardItem>

                <div className="flex justify-between items-center mt-8">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-0 py-2 rounded-xl text-xs font-sans font-medium dark:text-gray-400 dark:hover:text-white"
                  >
                    Read more →
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </Link>

          <Link href={`/projects/${bottom2.slug}`}>
            <CardContainer className="inter-var w-full">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-xl dark:hover:shadow-indigo-500/[0.05] dark:bg-black  dark:hover:border-indigo-500/[0.45] dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border  ">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-gray-400 font-medium">
                    {bottom2.date ? (
                      <time dateTime={new Date(bottom2.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(bottom2.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(views[bottom2.slug] ?? 0)}
                  </span>
                </div>
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-gray-600 dark:text-white"
                >
                  {bottom2.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-gray-600 text-sm font-medium font-sans max-w-sm mt-2 dark:text-gray-400"
                >
                  {bottom2.description}
                </CardItem>

                <div className="flex justify-between items-center mt-8">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-0 py-2 rounded-xl text-xs font-sans font-medium dark:text-gray-400 dark:hover:text-white"
                  >
                    Read more →
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </Link>
          {/*
          <Link href={`/projects/${bottom3.slug}`}>
            <CardContainer className="inter-var w-full">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-xl dark:hover:shadow-indigo-500/[0.05] dark:bg-black  dark:hover:border-indigo-500/[0.45] dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border  ">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-gray-400 font-medium">
                    {bottom3.date ? (
                      <time dateTime={new Date(bottom3.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(bottom3.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(views[bottom3.slug] ?? 0)}
                  </span>
                </div>
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-gray-600 dark:text-white"
                >
                  {bottom3.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-gray-600 text-sm font-medium font-sans max-w-sm mt-2 dark:text-gray-400"
                >
                  {bottom3.description}
                </CardItem>

                <div className="flex justify-between items-center mt-8">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-0 py-2 rounded-xl text-xs font-sans font-medium dark:text-gray-400 dark:hover:text-white"
                  >
                    Read more →
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </Link>
          */}
        </div>
      </div>
    </div>
  );
}
