// next-sitemap.config.js
// Runs automatically via the "postbuild" script in package.json.

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.hello-med.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  // /check-in collects PHI (DOB, insurance images, medical history) and is
  // noindexed at the route level too — excluded here so it's never listed
  // as a page for crawlers to prioritize.
  exclude: ["/admin/*", "/check-in", "/check-in/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/check-in/"],
      },
    ],
  },
  transform: async (config, path) => {
    const highPriority = [
      "/urgent-care",
      "/primary-care",
      "/make-appointment",
      "/immigration-medical-exam",
    ];
    const lowPriority = ["/careers", "/future-employee", "/contact"];

    let priority = 0.7;
    if (highPriority.some((p) => path.startsWith(p))) priority = 0.9;
    if (lowPriority.some((p) => path.startsWith(p))) priority = 0.4;

    return {
      loc: path,
      changefreq: path === "/" ? "daily" : "weekly",
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
