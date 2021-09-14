const parser = require('fast-xml-parser');
const he = require("he");
const fs = require('fs');
const xmlFile = 'C:\\Users\\jasin\\HTML5come\\CommentGenerator0.0.8a\\comment.xml';
const watcher = require("chokidar").watch(xmlFile, {
    ignored: /[\/\\]\./, // 無視する対象
    persistent: true // 継続するか否か
});
let xml;
let doc;
let docLength;
let wsGlobal;

const options = {
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
let ws = require('ws')
let server = new ws.Server({ port: 23699 });

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
    let sendMessage = [];

    Object.keys(docText).filter(key => {
        if (key < docLength) {
            return;
        }
        else if (docText[key].ComText == undefined) {
            return;
        }
        console.log(docText[key].ComText);
        wsGlobal.send(docText[key].ComText);
    });

    docLength = docText.length;
}