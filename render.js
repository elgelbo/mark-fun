const fs = require('fs')
const createGlobal = require('./utils/createGlobal')

generate = async () => {
  try {
    const data = createGlobal.grey();
    const nav = createGlobal.nav(data);
    createGlobal.render(data, nav);
  } catch (e) {

  }
};
generate();