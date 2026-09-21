import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://jobswipe-app.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin-console/dashboard", "/student/", "/company/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
