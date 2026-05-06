import { getAllPosts, PostMeta } from "./posts";

export type ContentType = "blog" | "video";

export interface ContentItem {
  type: ContentType;
  title: string;
  date: string;
  platform: string;
  slug?: string;
  url?: string;
  description?: string;
}

export function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}

// Add your YouTube videos here
const videos: ContentItem[] = [
  {
    type: "video",
    platform: "YouTube",
    title: "Understanding React Server Components",
    date: "2024-11-10",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "A deep dive into how React Server Components work under the hood.",
  },
  {
    type: "video",
    platform: "YouTube",
    title: "Building a Full-Stack App with Next.js 14",
    date: "2024-08-22",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "End-to-end walkthrough of building a production Next.js app.",
  },
  {
    type: "video",
    platform: "YouTube",
    title: "TypeScript Generics Explained Simply",
    date: "2024-05-15",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Generics don't have to be scary. Let's break them down step by step.",
  },
];

export function getAllContent(): ContentItem[] {
  const posts = getAllPosts();

  const blogItems: ContentItem[] = posts.map((p: PostMeta) => ({
    type: "blog",
    platform: "Blog",
    title: p.title,
    date: p.date,
    slug: p.slug,
    description: p.description,
  }));

  return [...blogItems, ...videos].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
