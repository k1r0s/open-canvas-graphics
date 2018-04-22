const pkg = require("./package.json")

export default {
  input: "compiled/index.js",
  output: [
		{ file: pkg.main, name: "ocg", format: "umd" },
		{ file: pkg.module, format: "es" }
  ],
  sourcemap: true
}
