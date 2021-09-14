const ws = new WebSocket("ws://localhost:23699");
const commentArray = [];
ws.onopen = function() {
    ws.send("クライアントからの接続がありました");
    ws.onmessage = function(msg){
        console.log(msg.data);
        commentGenerate(msg.data);
    }
}

function commentGenerate(msg){
    commentArray.unshift(msg);
    if (commentArray.length >= 10){
        commentArray.pop();
    }
    let result = document.createElement("div");
    commentArray.filter(comment =>{
        const createNode = document.createElement("p");
        const appendText = document.createTextNode(comment);
        createNode.appendChild(appendText);
        result.appendChild(createNode);
    })
    document.body.innerHTML= "";
    document.body.appendChild(result);
}