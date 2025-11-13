import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const projectsCollection = defineCollection({
  loader: file("./src/data/projects.json"),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      release: z.number().or(z.string()),
      image: image(),
      link: z.string({ description: "Project Link" }).url(),
      featured: z.boolean(),
    }),
});

const stackCollection = defineCollection({
  loader: file("./src/data/stack.json"),
  schema: z.object({
    name: z.string(),
    link: z.string().url(),
    logo: z.string(),
  }),
});

const writingCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/writing" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      date: z.date(),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  stack: stackCollection,
  projects: projectsCollection,
  writing: writingCollection,
};
