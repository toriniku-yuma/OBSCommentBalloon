import React, { useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import configData from './config';

type Msg = {
  attr:{
    handle:string
  }
  ComText:string
}

function App() {
  const commentArray:string[] = [];
  const [cArray,setCArray] = useState<string[]>([]);
  const ws = new ReconnectingWebSocket("ws://localhost" + configData.port)

  ws.onopen = function () {
    console.log("サーバーに接続できました")
    ws.send("クライアントからの接続がありました");
    ws.onmessage = function (msg) {
        const msgJSON = JSON.parse(msg.data);
        console.log(msgJSON);
        commentGenerate(msgJSON);
    }
  }
  function commentGenerate(msg:Msg) {
    commentArray.unshift(msg.attr.handle,msg.ComText);
    if (commentArray.length >= 10) {
        commentArray.pop();
    }
    setCArray(commentArray);
  }

  return (
    <div className="App">
      {cArray.map((value,index)=>{
        return(
          <div>
            <span>{value[0]}</span><span>「{value[1]}」</span>
          </div>
        )
      })}
    </div>
  );
}

export default App;
