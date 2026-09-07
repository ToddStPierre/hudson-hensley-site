import { z } from "astro/zod";
import rawSite from "./site.json";

export const siteSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  nav: z.array(z.object({ label: z.string(), href: z.string() })),
  hero: z.object({ image: z.string(), imageAlt: z.string(), ctaTrailer: z.string(), imdbUrl: z.string().url() }),
  feature: z.object({ heading: z.string(), youtubeId: z.string(), posterImage: z.string(), posterAlt: z.string(), body: z.string() }),
  award: z.object({ heading: z.string(), text: z.string() }),
  credits: z.array(z.object({
    title: z.string(), year: z.string().nullable(), role: z.string().nullable(),
    note: z.string().nullable(), image: z.string().nullable(), imageAlt: z.string().nullable(),
  })),
  press: z.array(z.object({ outlet: z.string(), headline: z.string(), url: z.string().url() })).length(3),
  about: z.object({ heading: z.string(), image: z.string(), imageAlt: z.string(), paragraphs: z.array(z.string()).min(2).max(2), basedIn: z.string() }),
  representation: z.array(z.object({ role: z.string(), name: z.string(), phone: z.string().nullable(), phoneHref: z.string().nullable() })),
  contact: z.object({ heading: z.string(), blurb: z.string(), accessKey: z.string().min(1), subjectLine: z.string() }),
  socials: z.array(z.object({ label: z.string(), url: z.string().url() })),
  footerCredit: z.literal("© Copyright Hudson Hensley 2026. All rights reserved. Website Created & Hosted By: More Views Pro."),
});

export type Site = z.infer<typeof siteSchema>;

export function loadSite(): Site {
  return siteSchema.parse(rawSite);
}
