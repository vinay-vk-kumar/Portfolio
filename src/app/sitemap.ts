import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://codewithvin.app";
    const now = new Date();

    return [
        {
            url: base,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 1,
        },
    ];
}
