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


// const mainDoc = `
//   <!DOCTYPE html>
//   <html lang="ko">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>랜덤푸키먼</title>
//     </head>
//     <body>
//       <h1>눌러라! 그럼 나타나리라!</h1>
//       <div id="root"></div>
//       <button id="select">좋아하는 포켓몬을 골라보게나!</button>
//       <script>
//       function getRandomInt(min, max) {
//         const minCeiled = Math.ceil(min);
//         const maxFloored = Math.floor(max);
//         return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
//       }

//       function loadPokemonNames(path) {
//         try {
//           if (typeof(path) === "string") {
//             const pokemonValue = fs.readFileSync(path, 'utf8');
//             return JSON.parse(pokemonValue);
//           } 
//         } catch (error) {
//           console.error("에러 내용:", error);
//         }
//       }
      
//       const data = loadPokemonNames("./pokemonNames.json");

//       const root = document.getElementById('root');
  
//       const select = document.getElementById('select');
      
//       function popPoketmon(){
//         root.textContent = '';
//         let num = getRandomInt(0,data.length)
//         root.textContent = data[num];
//       }
      
//       select.addEventListener('click',popPoketmon);
//       </script>
//     </body>
//   </html>
// `

//   fs.writeFile(`./랜덤포켓몬.html`, mainDoc,(err)=>{
//     if(err){
//       console.error("에러발생! : ", err);
//     }
//   });







  const server = http.createServer((req,res)=>{
    fs.readFile("./랜덤포켓몬.html", "utf8",(err,datacell)=>{
      if(err){
        console.error("에러가발생! : ", err);
        return;
      }
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(datacell);
    });
  })

  server.listen(port);