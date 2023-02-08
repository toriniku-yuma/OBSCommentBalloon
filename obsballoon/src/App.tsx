import React, { useEffect, useRef, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import configData from './config';
import "./index.css";
import Comment from './Comment';

type Msg = {
  attr:{
      handle:string
  }
  ComText:string
}

function App() {
  const [commentArray,setCommentArray] = useState<Msg[]>([]);
  const [keyCount,setKeyCount] = useState(0);
  const socketRef = useRef<ReconnectingWebSocket>();

  useEffect(()=>{
    if (configData.debugComment){
      setInterval(()=>{
        setCommentArray((commentArray)=>{
          const newCommentArray = commentArray.filter((comment,index) => index<configData.viewCount);
          return [{
            "attr":{
              "handle":"テストさん"
            },
            "ComText":"テストテストテストテストテストテストテストテスト"
          },...newCommentArray]
        })
      },1000)
    }

    const websocket = new ReconnectingWebSocket("ws://localhost:" + configData.port);
    socketRef.current = websocket;

    const onMessage = (e:MessageEvent<string>)=>{
      if (configData.isScroll === "top"){
        setCommentArray((commentArray) => {
          const newCommentArray = commentArray.filter((comment,index) => index<configData.viewCount);
          return [JSON.parse(e.data),...newCommentArray]
        });
      }else if(configData.isScroll === "bottom"){
        setCommentArray((commentArray) => {
          const newCommentArray:Msg[] = [];
          commentArray.forEach((value,index) => {
            if(index>=configData.viewCount){
              newCommentArray.shift();
              newCommentArray.push(value);
            }else{
              newCommentArray.push(value)
            }            
          });
          return [...newCommentArray,JSON.parse(e.data)]
        }); 
      }else{
        console.error("error")
      }
    }
    websocket.addEventListener("message",onMessage)

    return()=>{
      websocket.close();
      websocket.removeEventListener("message",onMessage);
    }
  },[])

  return (
    <div className="App">
      <div className='m-10'>test</div>
      {commentArray.map((value,index)=>{
        ()=>setKeyCount(keyCount + 1)
          return(
            <Comment
            index={index}
            value={value}
            key={keyCount}/>
          )
      })}
    </div>
  );
}

export default App;
