//出題数
const questionNum = 20;

const expArray = [];//問題となる数式の配列
const selectOpeArray = [];//正解の演算子の配列
const ansArray = [];//数式の計算値

//数式を作成
for (let i = 1; i <= questionNum * 4; i++) {
  let expression;//数式
  let answer = 0;//数式の右辺
  let selectOpe;//演算子
  let firstTerm = Math.floor(Math.random() * 10);//第1項
  let secondTerm = Math.floor(Math.random() * 10);//第2項
  selectOpe = Math.ceil(Math.random() * 4);//演算子をランダムで作成
  if (selectOpe === 1) {
    answer = firstTerm + secondTerm;
  } else if (selectOpe === 2) {
    answer = firstTerm - secondTerm;
  } else if (selectOpe === 3) {
    answer = firstTerm * secondTerm;
  } else {
    answer = firstTerm / secondTerm;
  }
  expression = `${firstTerm} □ ${secondTerm} = ${answer}`
  expArray.push(expression);
  selectOpeArray.push(selectOpe);
  ansArray.push(answer);
}

//数式の答えが整数のみフィルター
const integerIndexArray = [];//数式の配列を計算値が整数の数式のみにフィルターしたインデックス番号の配列
let makeQueCnt = 0;
const integerArray = ansArray.filter((num, index) => {
  if (Math.round(num) === num /*&& makeQueCnt < questionNum*/) {
    integerIndexArray.push(index);
    makeQueCnt++;
    return Math.round(num) === num;
  }
  // console.log(makeQueCnt);
});
// console.log("integerIndexArray:", integerIndexArray);
// console.log("integerArray:", integerArray);

//答えが整数となる数式と演算子のみフィルター
//数式
const filteredExpArray = expArray.filter((value, index) => {
  for (const elem of integerIndexArray) {
    if (index === elem) {
      return true;
    };
  }
})
// console.log(filteredExpArray);
//演算子
const filteredSelectOpeArray = selectOpeArray.filter((value, index) => {
  for (const elem of integerIndexArray) {
    if (index === elem) {
      return true;
    };
  }
})
// console.log(filteredSelectOpeArray);


//数式を作成(mapを使用)
// for (let i = 1; i <= num; i++) {
//     const firstTermArray = [];//第1項の配列
//     const secondTermArray = [];//第2項の配列
//     let answer = 0;//数式の右辺
//     let selectOpe;//演算子
//     const firstTerm = Math.floor(Math.random() * 10);//第1項
//     const secondTerm = Math.floor(Math.random() * 10);//第2項
//     selectOpe = Math.ceil(Math.random() * 4);//演算子をランダムで作成
//     firstTermArray.push(firstTerm);
//     secondTermArray.push(secondTerm);
//     selectOpeArray.push(selectOpe);
// }
// function calc(num1, num2, calc) {
//     if (calc === 1) {
//         return answer = num1 + num2;
//     } else if (calc === 2) {
//         return answer = num1 - num2;
//     } else if (calc === 3) {
//         return answer = num1 * num2;
//     } else {
//         return answer = num1 / num2;
//     }
// }
// let ansArray = firstTermArray.map(calc);


/**
 * @returns {string<Array>} 四則演算の数式を出力
 */
function arrayDisp(elem, expNo, Array) {
  for (let i = (expNo - 1) * questionNum; i < expNo * questionNum; i++) {
    const box = document.createElement("div");
    elem.appendChild(box);
    box.innerText = Array[i];
  }
}
function start() {
  const exp = document.getElementById("expression");
  arrayDisp(exp, 1, filteredExpArray);
  const exp2 = document.getElementById("expression2");
  arrayDisp(exp2, 2, filteredExpArray);
}

/**
 * @returns {string<Array>} 演算子の答えを出力
 */
function selOpeDisp() {
  const selectOpe = document.getElementById("selectOpe");
  for (let i = 0; i < questionNum; i++) {
    const box2 = document.createElement("div");
    selectOpe.appendChild(box2);
    box2.innerText = filteredSelectOpeArray[i];
  }
  return expArray;
}

//時間計測
//クロージャ使用
// const createTimer = function () {
//     let passMS = 0;
//     return function () {
//         let passSec;
//         passMS++;
//         if (passMS < 10) {
//             passSec = `00.0${passMS}`;
//         } else if (passMS > 10 && passMS < 100) {
//             passSec = `00.${passMS}`;
//         } else if (passMS > 100 && passMS < 100) {
//             passSec = `0${passMS / 100}`;
//         } else {
//             passSec = `${passMS / 100}`;
//         }
//         document.getElementById("time").innerText = passSec;
//     }
// } 
const createTimer = (() => {
  let passMS = 0;
  return (() => {
    let passSec;
    passMS++;
    if (passMS < 10) {
      passSec = `00.0${passMS}`;
    } else if (passMS > 10 && passMS < 100) {
      passSec = `00.${passMS}`;
    } else if (passMS > 100 && passMS < 100) {
      passSec = `0${passMS / 100}`;
    } else {
      passSec = `${passMS / 100}`;
    }
    document.getElementById("time").innerText = passSec;
  })
});
timer = createTimer();

function countTime() {
  // passMS = 0;
  //10ms毎に経過時間の表示を更新
  passegeID = setInterval(timer, 10);
  document.getElementById("start").disabled = true;
}

//スタートボタンが押されたら数式を出力し，時間計測開始
const strt = document.getElementById("start");
strt.addEventListener("click", start);
strt.addEventListener("click", countTime);
// strt.addEventListener("click", selOpeDisp);


//矢印キーを押して回答入力
const acceptance = document.getElementById("acceptance");
document.addEventListener("keydown", ansAccording);
let questionCnt = 0;//現在回答中のindex
/**
 * @param {string} e - 演算子の回答の入力
 * @returns {number} 演算子の番号
*/
let acceptNum = 0;//正解数
function ansAccording(e) {
  let ans;
  //回答に対する〇×出力
  const box = document.createElement("div");
  acceptance.appendChild(box);

  // const box2 = document.createElement("div");
  // const selectOpe = document.getElementById("selectOpe");
  // selectOpe.appendChild(box2);

  // const operatorObj = { 1: "+", 2: "-", 3: "*", 4: "/" };
  switch (e.key) {
    case "ArrowLeft":
      ans = 1;
      break;
    case "ArrowRight":
      ans = 2;
      break;
    case "ArrowUp":
      ans = 3;
      break;
    case "ArrowDown":
      ans = 4;
      break;
  }
  // console.log(ans);
  if (ans === filteredSelectOpeArray[questionCnt]) {
    box.innerText = "〇";
    acceptNum++;
    if (acceptNum === questionNum) {
      stopTime();
    }
  } else {
    box.innerText = "×";
  }
  // console.log(cnt);
  // box2.innerText = operatorObj[ans];
  questionCnt++;
  console.log(acceptNum);
}

//設定問題数分正解すると時間停止
function stopTime() {
  clearInterval(passegeID);
  document.getElementById("start").disabled = false;
}

//タイムと日付をランキングに表示
// let date = new date();
// document.getElementById("ranking").innerText = date;

