module.exports = {
  presets: [
    process.env.NODE_ENV === "test"
      ? ["@babel/preset-env", { targets: { node: "current" } }]
      : "next/babel", // Use the Next.js preset in all environments except testing
  ],
};

/*module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};*/
