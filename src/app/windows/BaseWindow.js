const {BrowserWindow , ipcMain : ipc , app} = require("electron")
const {view} = require("../tools/extentions");
const path = require("path");

class BaseWindow {
    #window;
    constructor( fileName , opt={} ) {
        opt = {
            ...opt,
            autoHideMenuBar : true,
            webPreferences : {
                preload :  path.join(app.getAppPath() , "src" ,"app", "config" , "preload.js" )
            }
        }
        this.#window = new BrowserWindow(opt)
        this.#window.loadFile(view(fileName))

        // this.receive();
    }



    // toggle dev tools
    dev(){
        this.#window.webContents.toggleDevTools()
    }

    // garbage collection
    close(){

        this.#window.once("closed" , ()=>{
            this.#window = null

        })
    }

    // handler functions

    send(channel , data){
        this.#window.webContents.removeAllListeners(channel)
        this.#window.webContents.send(channel , data)
    }

    get(channel , func){
        ipc.on(channel , (event , data)=>{
            func(data)

        })
    }

    pair(channel , func){
        ipc.on(channel , (evt , data)=>{
            this.send(channel , func(data))
        })
    }




}








module.exports = BaseWindow

