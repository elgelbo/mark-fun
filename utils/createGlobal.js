const fs = require('fs')
const matter = require('gray-matter');
const md = require('markdown-it')();
const nunjucks = require('nunjucks')
const pages = './pages/';
nunjucks.configure('views', { autoescape: false });

nunjucks.configure('views', { autoescape: false });

function compare(a,b) {
  if (a.data.rating < b.data.rating)
    return -1;
  if (a.data.rating > b.data.rating)
    return 1;
  return 0;
}

exports.grey = () => {
  const rawMatter = new Array();
  const pages = fs.readdirSync('./pages');
  pages.forEach(page => {
    var str = fs.readFileSync(`./pages/${page}`, "utf8");
    const data = matter(str);
    const fileName = page.split('.')[0];
    data.slug = fileName;
    rawMatter.push(data);
  })
  rawMatter.sort(function (a, b) {
    return a.data.rating - b.data.rating;
  });
  return rawMatter;
};

exports.nav = (data) => {
  const navData = new Array();
  data.forEach(item => {
    navData.push(item.slug);
  });
  return navData;
};

exports.render = (data, nav) => {
  data.forEach(item => {
    const prettyDown = md.render(item.content);
    nunjucks.render(`${item.slug}.njk`, { content: prettyDown, data: item.data, navData: nav }, function (err, res) {
      if (!res) {
        const pretty = nunjucks.render(`base.njk`, { placeContent: prettyDown, data: item.data, navData: nav });
        fs.writeFile(`./src/${item.slug}.html`, pretty, function (err) {
          if (err) { throw err };
          console.log(`Saved: /src/${item.slug}.html`);
        });
      } else {
        fs.writeFile(`./src/${item.slug}.html`, res, function (err) {
          if (err) { throw err };
          console.log(`Saved: /src/${item.slug}.html`);
        });
      }
    });
  });
};