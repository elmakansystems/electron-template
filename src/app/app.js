const {app , BrowserWindow} = require("electron")

const MainWindow = require("./windows/MainWindow")

let main;
app.once("ready" , async ()=>{
        
        // console.log("on ready")
        main = new MainWindow()
        // main.dev()
        // main.close()




})
