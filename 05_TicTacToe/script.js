const boxes=document.querySelectorAll('.box');
let audioTurn=new Audio('ting.mp3')
let turn='X';
let isGameOver=false;
 const resetElement=document.getElementById('reset-btn');
 const line=document.querySelector('.line');

function changeTurn(){
   turn=turn==='X'?'0':'X';
   return turn;
}

function checkWin(){
   const wins = [
      [0, 1, 2, 0,5, 0],
      [3, 4, 5, 0, 16, 0],
      [6, 7, 8, 0, 27 ,0],
      [0, 3, 6, -11, 16, 90],
      [1, 4, 7, 0, 16, 90],
      [2, 5, 8, 11, 16, 90],
      [0, 4, 8, 0, 16, 45],
      [2, 4, 6, 0, 16, 135],
  ]

   wins.forEach(e=>{
      if((boxes[e[0]].innerText !== '') &&(boxes[e[0]].innerText===boxes[e[1]].innerText) && (boxes[e[1]].innerText===boxes[e[2]].innerText)){
          document.getElementById('turnfor').innerHTML=`${boxes[e[0]].innerText} Won`
          isGameOver=true;
          line.style.display="block";
          line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      }
   });
}
boxes.forEach(box=>{
   box.addEventListener('click',e=>{
         
         if(e.target.innerHTML===''){
              e.target.innerHTML=turn;
              changeTurn();
               audioTurn.play();
               checkWin();
              if(!isGameOver){
               document.getElementById('turnfor').innerHTML=`Turn for ${turn}`;
               
              }
         }
   });
});



resetElement.addEventListener('click',e=>{
   boxes.forEach(box=>{
      box.innerText="";
   });
   turn='X';
   isGameOver=false;
   document.getElementById('turnfor').innerHTML=`Turn for ${turn}`;
   line.style.display = "none";
});