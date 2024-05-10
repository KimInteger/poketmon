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

let arrayA = [];
let arrayB = [];
for(let i = 0; i < data.length; i++){
  if(data[i].length ===3 ){
    const h1ContentA = `
    <h1>코드번호${i+1}</h1>
    <h1>: ${data[i]}</h1>
    `;
    arrayA += h1ContentA;
  } else {
    const h1ContentB = `
    <h1>코드번호${i+1}</h1>
    <h1>: ${data[i]}</h1>
    `;
    arrayB += h1ContentB;
  }
}

const lastDoc = `
    </body>
  </html>
`

  fs.writeFile(`./3글자포켓몬.html`, mainDoc + arrayA + lastDoc,(err)=>{
    if(err){
      console.error("에러발생! : ", err);
    }
  });

  fs.writeFile(`./3글자가아님.html`, mainDoc + arrayB + lastDoc,(err)=>{
    if(err){
      console.error("에러발생! : ", err);
    }
  });

  // ! 예상은 html파일이 2개가 생성이 될 것이다.
  // ! 하나는 3글자인 포켓몬
  // ! 다른 하나는 이외의 포켓몬.
  // ! 예상대로 실행이 되었다.


  const server = http.createServer((req,res)=>{
    fs.readFile("./3글자가아님.html", "utf8",(err,datacell)=>{
      if(err){
        console.error("에러가발생! : ", err);
        return;
      }
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(datacell);
    });
  })

  server.listen(port);