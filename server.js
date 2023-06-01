//================================================================================ [공통] Express 라이브러리 import
const express = require('express');
//================================================================================ [공통] https 관련 라이브러리 import
//const expressSanitizer = require("express-sanitizer");

//const https = require("https");
//const fs = require("fs");

//const options = {
//  key: fs.readFileSync("./secrets/cert.key"),
//  cert: fs.readFileSync("./secrets/cert.crt"),
//};
//================================================================================ [공통] dotenv 환경변수 등록
require('dotenv').config({ path:'./secrets/.env'})

//================================================================================ [공통] react router 관련 라이브러리 import
const path = require('path');

//================================================================================ [공통] passport 라이브러리 import
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

//================================================================================ [공통] body-parser 라이브러리 import
const bodyParser= require('body-parser')
//================================================================================ [공통] connect-flash 라이브러리 import
const flash= require('connect-flash')

//================================================================================ [공통] axios AJAX 라이브러리 import
const { default: axios } = require('axios');

//================================================================================ [공통] maria DB 라이브러리 import
//const {strFunc, insertFunc, batchInsertFunc, batchInsertOnDupliFunc, whereClause, truncateTable} = require ('./dbconns/maria/thisdb');

//================================================================================ [공통] OS타입 라이브러리
//const { type } = require('os');

//================================================================================ [공통] bcrypt 라이브러리 import
const bcrypt = require('bcrypt');
const saltRounds = 1;

//================================================================================ [공통] jwt 라이브러리 import
const jwt = require("jsonwebtoken");

//================================================================================ [공통] Express 객체 생성
const app = express();

//================================================================================ [공통 미들웨어] json
app.use(express.json({limit: '10mb'}))
//================================================================================ [공통 미들웨어] https 관련
//app.use(express.urlencoded({ extended: true }));
//app.use(expressSanitizer());
//app.use("/", express.static("public"));

//================================================================================ [공통 미들웨어] body-parser
app.use(bodyParser.urlencoded({extended: true})) 
app.use(express.urlencoded({limit: '10mb', extended: true}))
//================================================================================ [공통 미들웨어] connect-flash
app.use(flash())

//================================================================================ [공통 미들웨어] passport
const expireTimeMinutes=10
app.use(session({secret : process.env.passport_secret_code, resave : false, saveUninitialized: false, cookie: { maxAge : expireTimeMinutes*60000 }, rolling:true})); //cookie: { maxAge : 60000 } 제외함
app.use(passport.initialize());
app.use(passport.session());
//================================================================================ [공통 미들웨어] react router 관련
app.use(express.static(path.join(__dirname, process.env.react_build_path)));

//================================================================================ [공통 기능] 서버실행
app.listen(8080, function() {
    console.log('listening on '+ 8080)
  })

//================================================================================ https 의존성으로 certificate와 private key로 새로운 서버를 시작
//https.createServer(options, app).listen(process.env.PORT, () => {console.log('HTTPS server started on port '+ process.env.PORT)});



  //================================================================================ [공통 기능] 모든 route를 react SPA로 연결 (이 코드는 맨 아래 있어야함)
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, process.env.react_build_path+'index.html'));
  });

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, process.env.react_build_path+'index.html'));
  });