# 概要
KILINBOX氏制作の[HTML5コメントジェネレータ](https://www.kilinbox.net/2016/01/HCG.html)を参考に、Reactで作成したコメントジェネレータです。

主な機能として

- WebSocketでコメントを受信し、OBSの画面上へ表示を行う。
- 従来のコメントジェネレータ同様、リスト形式で上から下へコメントを表示する。
- コメントを[バーチャルキャスト](https://virtualcast.jp/)のようにフキダシでポップさせる。
- フキダシを被らせたくない場所を選択出来る。

などの機能があります。

現在は、[MultiCommentViewer](https://ryu-s.github.io/app/multicommentviewer)と[棒読みちゃん](https://chi.usamimi.info/Program/Application/BouyomiChan/)からのコメントに対応しておりますが、WebSocketで受信したJSONテキストであれば何でも表示することが出来るので、その他アプリケーションなどからのコメントなども受信することが可能です。

参考動画

# 使い方
**※現在、α版として公開しております。そのため、設定の反映にはビルド、もしくは開発モードを使用しないといけない仕様となっております。**

<br>

1. DLしたzipファイルを解凍
2. MultiCommentViewerのフォルダ内にあるpluginsフォルダに解凍したフォルダ内のWSComeGeneフォルダをドラッグ&ドロップ

    棒読みちゃんの場合は、BouyomiChan.exeのあるフォルダ内に解凍したフォルダ内のBouyomiPluginフォルダの**中身**をドラッグ&ドロップ
3. OBSを起動し、ソース追加からブラウザを選択、解凍したフォルダ内のindex.htmlを選択し、画面サイズを配信画面のサイズと合わせる
4. MultiCommentViewerで接続を押せばコメントがOBS画面に流れ始めます

WebSocketポートを変更したい場合、Reactコメントジェネレータ側はConfig.jsonを、プラグイン側はWebSocketConfig.jsonファイルをテキストエディタで開き、portの値を書き換えてください

# カスタム
## α版現在のコンフィグやレイアウトの変更方法
現在、コンフィグやレイアウトを変更する際にnode.jsを使用して頂くことで対応しております。

[こちら](https://nodejs.org/ja/download/)からnode.jsをv18.12.1以降のバージョンでインストールして頂き、コマンドプロンプトを開いてcdコマンドでsourceフォルダに移動して頂き、

