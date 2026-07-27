// next-sitemap.config.js
// Runs automatically via the "postbuild" script in package.json.

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.hello-med.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  // /check-in collects PHI (DOB, insurance images, medical history).
  // It's excluded from the sitemap so it's never advertised as a page to
  // crawl. It is intentionally NOT disallowed in robots.txt below —
  // that page carries a `noindex` meta tag, and search engines can only
  // act on that tag by actually crawling the page. Blocking the crawl
  // would prevent Google from ever seeing (and honoring) the noindex,
  // leaving already-indexed URLs like /check-in/success stuck in the
  // index indefinitely. robots.txt disallow is for crawl-budget
  // management, not privacy/index control — noindex handles that here.
  exclude: ["/admin/*", "/check-in", "/check-in/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/"],
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
