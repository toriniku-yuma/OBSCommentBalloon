import { useEffect, useRef, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import "./index.css";
import configData from "./config.json"
import CommentArray from './CommentArray';
import BalloonArray from './BalloonArray';
import { Msg } from './type';

function App() {
  const [commentArray,setCommentArray] = useState<[Msg, number][]>([]);
  const [keyCount,setkeyCount] = useState(0);
  const socketRef = useRef<ReconnectingWebSocket>();

  useEffect(()=>{
    const websocket = new ReconnectingWebSocket("ws://localhost:" + configData.port);
    socketRef.current = websocket;

    const onMessage = (e:MessageEvent<string>)=>{
      setkeyCount((keyCount) => {
        if(configData.viewType === "count"){
          setCommentArray((commentArray) => {
            return [[JSON.parse(e.data) as Msg, keyCount], ...commentArray.filter((value,index)=> index < configData.viewCount-1)];
          })
        }else if(configData.viewType === "time"){
          setCommentArray((commentArray) => {
            return [[JSON.parse(e.data) as Msg, keyCount], ...commentArray];
          })
          setTimeout(() => {
            setCommentArray((commentArray) => {
              return commentArray.filter((value) => value[1] !== keyCount)
            })
          }, configData.viewTime)
        }
        return keyCount + 1;
      });
    }
    websocket.addEventListener("message",onMessage)

    return()=>{
      websocket.close();
      websocket.removeEventListener("message",onMessage);
    }
  },[])

  return (
    <div>
        {configData.isArrayComponent === "Comment"
          ?<CommentArray message={commentArray}/>
          :configData.isArrayComponent === "Balloon"
          ?<BalloonArray message={commentArray}/>
          :<div>error</div>}
    </div>
  );
}

export default App;
