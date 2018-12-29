// const fs = require('fs')
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // data: fs.readFileSync('src/assets/styles/global.scss', 'utf-8')
        data: `@import "@/assets/styles/global.scss";`
      }
    }
  }
}