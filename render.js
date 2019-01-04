const fs = require('fs')
const matter = require('gray-matter');
const md = require('markdown-it')();
const nunjucks = require('nunjucks')
const pages = './pages/';

nunjucks.configure('views', { autoescape: false });
// READ PAGES DIR
fs.readdir(pages, (err, files) => {
  // ITERATE OVER EACH FILE IN PAGES DIR
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
    // const pretty = nunjucks.render(`${fileName}.njk`, { content: prettyDown, data: theMatter.data });
    const pretty = nunjucks.render(`${fileName}.njk`, { content: prettyDown, data: theMatter.data }, function (err, res) {
      if (err) {
        const pretty = nunjucks.render(`base.njk`, { layoutContent: prettyDown, data: theMatter.data });
        fs.writeFile(`./src/${fileName}.html`, pretty, function (err) {
          if (err) {throw err};
          console.log(`Saved: /src/${fileName}.html`);
        });
      } else {
        fs.writeFile(`./src/${fileName}.html`, res, function (err) {
          if (err) {throw err};
          console.log(`Saved: /src/${fileName}.html`);
        });      }
    });
  });
});