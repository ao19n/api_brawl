/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
var app = express();
var ejs = require("ejs");
var fetch = require('node-fetch');
var bodyParser = require('body-parser');
const { json, text } = require("express");
app.engine("ejs", ejs.renderFile);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
/* 2. listen()メソッドを実行して任意又は3000番ポートで待ち受け。*/
var server = app.listen(process.env.PORT || 3000, function(){
    console.log("localhost:" + server.address().port);
});

// View EngineにEJSを指定。
app.set('view engine', 'ejs');

// "/"へのGETリクエストでindex.ejsを表示する。
app.get("/", function(req, res, next){
    var msg = "ブロスタIDを入力することであなたのスタッツがわかります！"
    res.render("index", {
        title: "BrawlAPI",
        name: "",
        icon: "",
        content: msg,
        userTrp:"",
        trp: "",
        userHTrp: "",
        hTrp: "",
        userClub: "",
        club: "",
        userVictory: "",
        victory: "",
        userSVictory: "",
        soloVictory: "",
        userDVictory: "",
        duoVictory: "",
    });
});

app.post("/", (req, res) => {
    console.log(req.body.id);
    msg = req.body.id;
    getApi(req.body.id)
    .then(function (resolve) {
      res.render("result.ejs", {
        title: "Result",
        name: "UserName",
        icon: resolve.icon.id,
        content: resolve.name + " (" + resolve.tag + ")",
        userTrp: "Trophies",
        trp: resolve.trophies,
        userHTrp: "Highest Trophies",
        hTrp: resolve.highestTrophies,
        userClub: "Club Name",
        club: resolve.club.name + " (" + resolve.club.tag + ")",
        userVictory: "3vs3 Victories",
        victory: resolve['3vs3Victories'],
        userSVictory: "Solo Victories",
        soloVictory: resolve.soloVictories,
        userDVictory: "Duo Victories",
        duoVictory: resolve.duoVictories,
      }); //
    })
    .catch(function (error) {
        // 非同期処理失敗。
        res.render("index.ejs", {
          title: "Error",
          content: "エラーが起きました" + error,
        });
      });
})

function getApi(msg) {
    return new Promise(function(resolve, reject){
      // 任意のトークンアドレス
        const token = "{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImVlZmU5Mzk3LWVlYzQtNDdkYS04ZmE4LTQ2NTE5OTIwMzMzZSIsImlhdCI6MTYzMjQzOTc1MSwic3ViIjoiZGV2ZWxvcGVyL2NjYmQ3MjkyLWQ2YjAtOTUzOC00YTUyLThlZDU0NzhkODkxNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTE4LjIzOC4yMzkuMjAyIiwiMTI2LjIxNi4xNDEuNTgiXSwidHlwZSI6ImNsaWVudCJ9XX0.vR2gVgh2qfB7TDM4oqofgCr1UHr_zORf0zl5WndOsKyfd5KAKFmx1vNUNyMXZawkmJ1MUOIHs0W53YJaHYDJZw}";
        const URL = 'https://api.brawlstars.com/v1'
        const tag = msg;
        const endpoint = URL + "/players/%23" + tag;
        // get
        fetch(endpoint, {
        method: 'get',
        headers: {"Authorization": "Bearer " + token}})
        .then(res => res.json())
        .then(json => {
            const tex = json
            return new Promise((resolve) => {
                resolve(tex);
              })
        })
        // 出力
        .then((result) => {
            resolve(jsonParse(result));
          })
        .catch(function (err) {
            reject(err);
          });
    });
  }

  function jsonParse(result) {
    const obj = JSON.parse(JSON.stringify(result));
    const pAll = obj;
    console.log(pAll)
    return (pAll);
}