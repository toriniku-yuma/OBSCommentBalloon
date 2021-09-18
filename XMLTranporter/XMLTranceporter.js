const parser = require('fast-xml-parser');
const he = require("he");
const fs = require('fs');
const settingData = require("./setting.json");
const xmlFile = settingData.path;
const watcher = require("chokidar").watch(xmlFile, {
    ignored: /[\/\\]\./, // 無視する対象
    persistent: true // 継続するか否か
});
let xml;
let doc;
let docLength;
let wsGlobal;

const options = {
    attributeNamePrefix : "",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "ComText",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: true,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false,
    attrValueProcessor: a => he.decode(a, { isAttributeValue: true }),//default is a=>a
    tagValueProcessor: a => he.decode(a) //default is a=>a
};
(async () => {
    try {
        xml = await fs.promises.readFile(xmlFile, "utf-8");
        doc = parser.parse(xml, options);
        docLength = doc.log.comment.length;

    } catch (err) {
        console.log(err);
    }
})();

// WebSocketのサーバの生成

/* 

WebSocket周りの挙動に関して大注意！ 
JSはシングルスレッドのため、同期状態で複数クライアントからの接続を試みると
すでに接続されているクライアントへの処理が中断され、エラーログや例外なども出ることなく
先に接続したクライアントの動作が停止します！
これは、一度接続を受けたクライアントの処理を非同期にすることで回避可能…だといいなあと思っています
めちゃくちゃめんどくさいけど、同期非同期がいかに大事かを理解しました

追記：非同期同期ではなく、wsGlobal変数が上書きされることが原因かと思われます
対策としては、wsGlobalを配列にし、filterで繰り返し処理を行うことで回避出来るかなと思っております

*/

let ws = require('ws')
let server = new ws.Server({ port: settingData.port });

// 接続時に呼ばれる
server.on('connection', ws => {
    wsGlobal = ws;
    console.log("start");

    watcher.on("change", function (path) {
        (async () => {
            try {
                xml = await fs.promises.readFile(xmlFile, "utf-8");
                wsSend(xml);
            } catch (err) {
                console.log(err);
            }
        })();
    });

    // 切断時に呼ばれる
    ws.on('close', () => {
        console.log('close');
    });
});

function wsSend(come) {
    console.log("更新確認");
    doc = parser.parse(come, options);
    let docText = doc.log.comment;

    Object.keys(docText).filter(key => {
        if (key < docLength) {
            return;
        }
        else if (docText[key].ComText == undefined) {
            return;
        }
        console.log(docText[key].ComText);
        wsGlobal.send(JSON.stringify(docText[key]));
    });

    docLength = docText.length;
}