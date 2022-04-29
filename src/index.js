const babel = require("@babel/core")
const fs = require("fs")
const { parse } = require("path")
const parseWxml = require("wxml-parse")
const myBabelPlugin = require("./babelPlugins")



const content = fs.readFileSync("./src/test.wxml", "utf-8")

// 生成ast

let ast = parseWxml.parse(content)

console.log(ast)

// fs.writeFileSync("./output.jsx", parseWxml.generate(ast, {}) )
