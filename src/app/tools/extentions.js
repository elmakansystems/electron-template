const {app} = require("electron")




const  view = (name) => `${app.getAppPath()}/src/app/views/${name}.html`




module.exports = { view}