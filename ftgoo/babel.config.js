module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "next/babel" // Add this to enable JSX and other Next.js transformations
  ]
};
