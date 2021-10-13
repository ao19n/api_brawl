const { json } = require('express');
const fetch = require('node-fetch');
const token = "{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjJlM2M5NzY4LTEyODgtNDYzYy04ZGE5LTU1N2FkYTliMTA3ZCIsImlhdCI6MTYyMjA5ODI1MSwic3ViIjoiZGV2ZWxvcGVyL2NjYmQ3MjkyLWQ2YjAtOTUzOC00YTUyLThlZDU0NzhkODkxNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTE4LjIzOC4yMzkuMjAyIl0sInR5cGUiOiJjbGllbnQifV19.POycW2dk4fVdzgKsrowSf28Q8PdgELESMHRaj6GqcwYDPJqEHfmIWki_OJopKOYHxbUUbGFmVvae_v9VUQdwCQ}";
  //任意のトークン
const URL = 'https://api.brawlstars.com/v1'

const tag = '2LJL2V22Q';
  //任意のユーザータグ
const endpoint = URL + "/players/%23" + tag;

  fetch(endpoint, {
    method: 'get',
    headers: {"Authorization": "Bearer " + token}})
    .then(res => res.json())
    .then(json => {
      const obj = JSON.parse(JSON.stringify(json));
      console.log("name" + obj.name);
      console.log(obj.club.tag)
    //任意の出力結果
    })

