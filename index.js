const fs = require ('fs')
const matter = require('gray-matter');
const md = require('markdown-it')();
const nunjucks = require('nunjucks')
const pages = './pages/';

nunjucks.configure('views', { autoescape: false });

fs.readdir(pages, (err, files) => {
  files.forEach(file => {
    // READ MARKDOWN FILE (EDITABLE BY CMS/GIT)
    var str = fs.readFileSync(`./pages/${file}`, "utf8");
    // PARSE FRONT MATTER W/DATA AND CONTENT
    const theMatter = matter(str);
    // GET NAME STRING OF CONTENT FILE
    const fileName = file.split('.')[0];
    // CONVERT MARKDOWN TO HTML
    const prettyDown = md.render(theMatter.content);
    // RENDER TEMPALTE WITH MD CONTENT
    const pretty = nunjucks.render(`${fileName}.njk`, {content: prettyDown});
    // SAVE FILE WITH STRING NAME
    fs.writeFile(`./dist/${fileName}.html`, pretty, function (err) {
      if (err) throw err;
      console.log(`Saved: /dist/${fileName}.html`);
    }); 
  });
});