const commentArray = [];
let ws = new ReconnectingWebSocket(
    "ws://localhost:" + port,
    null,
    {
        //debug: true,
        reconnectInterval: 3000
    }
);

ws.onopen = function () {
    console.log("サーバーに接続できました")
    ws.send("クライアントからの接続がありました");
    ws.onmessage = function (msg) {
        const msgJSON = JSON.parse(msg.data);
        console.log(msgJSON);
        commentGenerate(msgJSON);
    }
}

function commentGenerate(msg) {
    commentArray.unshift([msg.attr.handle,"「" + msg.ComText + "」"]);
    if (commentArray.length >= 10) {
        commentArray.pop();
    }
    let result = document.createElement("div");
    result.setAttribute("class","base")
    commentArray.filter(comment => {
        let commentGroup = document.createElement("p");
        commentGroup.appendChild(nodeCreate(comment[0],"handle-name"));
        commentGroup.appendChild(nodeCreate(comment[1],"commentText"));

        result.appendChild(commentGroup);
    })
    document.body.innerHTML = "";
    document.body.appendChild(result);
}

function nodeCreate(textNode,className) {
    let createNode = [];
    createNode.push(document.createElement("span"));
    createNode[0].setAttribute("class","stroke " + className);
    createNode.push(document.createElement("span"));
    createNode[1].setAttribute("class","fuchiue");
    createNode[0].appendChild(document.createTextNode(textNode));
    createNode[0].appendChild(createNode[1]);
    return createNode[0];
}