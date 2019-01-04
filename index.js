const fs = require ('fs')
const matter = require('gray-matter');
const md = require('markdown-it')();

const pages = './pages/';

// fs.readdir(pages, (err, files) => {
//   files.forEach(file => {
//     console.log(file);
//   });
// })

var str = fs.readFileSync("./pages/index.md", "utf8");
const theMatter = matter(str);
const result = md.render(theMatter.content);
console.log(result);