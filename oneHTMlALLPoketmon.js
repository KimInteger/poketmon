const http = require('http');

const port = process.env.PORT || 3000;

const fs = require('fs');

function loadPokemonNames(path) {
  try {


    if (typeof(path) === "string") {
      const pokemonValue = fs.readFileSync(path, 'utf8');
      return JSON.parse(pokemonValue);
    } 
    // else 를 사용하는 대신 try catch 문법을 사용해서 에러를 잡아내는 것이
    // '에러 처리'라는 것을 명시적으로 이야기 하는 좋은 어휘


  } catch (error) {


    // 매개변수 error는 catch구문이 실행될 때 자동으로 전달되는 변수
    console.error("에러 내용:", error);


  }
}

const data = loadPokemonNames("./pokemonNames.json");

const mainDoc = `
  <!DOCTYPE html>
  <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>포켓몬도감</title>
    </head>
    <body>
`;

let array = [];
for(let i = 0; i < data.length; i++){
  const h1Content = `
    <h1>코드번호${i}</h1>
    <h1>: ${data[i]}</h1>
  `
  array += h1Content;
}

const lastDoc = `
    </body>
  </html>
`

  fs.writeFile(`./포켓몬도감.html`, mainDoc + array + lastDoc,(err)=>{
    if(err){
      console.error("에러발생! : ", err);
    }
  });

  const server = http.createServer((req,res)=>{
    fs.readFile("./포켓몬도감.html", "utf8",(err,datacell)=>{
      if(err){
        console.error("에러가발생! : ", err);
        return;
      }
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(datacell);
    });
  })

  server.listen(port);