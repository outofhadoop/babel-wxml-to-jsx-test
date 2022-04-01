const babel = require("@babel/core")
const fs = require("fs")
const myBabelPlugin = require("./babelPlugins")

const content = fs.readFileSync('./src/test.js', 'utf-8')

console.log(content)
const res = babel.transformSync(content, {
//   plugins: ['./src/babelPlugins'],
  generatorOpts: {
    comments: false,
    ast: true,
    compact: false,
  },
})
fs.writeFileSync("./output.js", res.code)

console.log(res)
