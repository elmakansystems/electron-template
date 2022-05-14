const { contextBridge : bridge , ipcRenderer : ipc} =require("electron")


bridge.exposeInMainWorld("send" , (channel , data)=> send(channel , data))

bridge.exposeInMainWorld("pair" , (channel, data , func) => pair(channel , data , func))

bridge.exposeInMainWorld("get" , (channel , func)=>get(channel , func))



function send(channel , data) {
    ipc.removeAllListeners(channel)
    ipc.send(channel , data)
}


function get(channel , func) {
    ipc.on(channel , (event , data)=> func(data) )
}

function pair(channel , data , func) {

    send(channel , data)

    get(channel , func)


}



