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


for(let i = 0; i < data.length; i++) {
  let numbering = i + 1;
  const mainDoc = `
  <!DOCTYPE html>
  <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1,0">
      <title>오늘의 포켓몬은 뭘까아아용?</title>
    </head>
    <body>
      <h1>${data[i]}</h1>
    </body>
  </html>
  `;
  

  fs.writeFile("코드번호"+numbering+data[i]+".html", mainDoc,(err)=>{
    if(err){
      console.error("에러발생! : ", err);
    }
  });
};