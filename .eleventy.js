const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  // CSS & Bilder durchreichen
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/img": "img" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });

  // Live-Reload für CSS
  eleventyConfig.addWatchTarget("src/css");

  // Slug-Filter (für saubere URLs)
  eleventyConfig.addFilter("slug", s =>
    slugify(s, { lower: true, strict: true })
  );

  // Collection für Rassen-Seiten (A–Z sortiert)
  eleventyConfig.addCollection("breeds", collection => {
    return collection
      .getFilteredByGlob("src/rassen/*.md")
      .sort((a, b) => (a.data.title || "").localeCompare(b.data.title || "", "de"));
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
