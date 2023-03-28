//出題数
const questionNum = 20;

//変数定義
let questionCnt = 0;//現在回答中のindex
let acceptNum = 0;//正解数   
let expArray = [];//問題となる数式の配列
let selectOpeArray = [];//正解の演算子の配列
let ansArray = [];//数式の計算値
let integerIndexArray = [];//数式の配列を計算値が整数の数式のみにフィルターしたインデックス番号の配列
let integerArray = [];//数式の答えが整数の配列
let filteredExpArray = [];//数式の答えが整数の数式の配列
let filteredSelectOpeArray = [];//数式の答えが整数の演算子の配列

//変数初期化
function init() {
  questionCnt = 0;//現在回答中のindex
  acceptNum = 0;//正解数   
  expArray = [];//問題となる数式の配列
  selectOpeArray = [];//正解の演算子の配列
  ansArray = [];//数式の計算値
  integerIndexArray = [];//数式の配列を計算値が整数の数式のみにフィルターしたインデックス番号の配列
  integerArray = [];
  filteredExpArray = [];//整数の数式の配列
  filteredSelectOpeArray = [];
}

//数式を作成
function makeExp() {
  let expression;//数式
  let answer = 0;//数式の右辺
  let selectOpe;//演算子
  let firstTerm;
  let secondTerm;
  for (let i = 1; i <= questionNum * 4; i++) {
    firstTerm = Math.floor(Math.random() * 10);//第1項
    secondTerm = Math.floor(Math.random() * 10);//第2項
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
    // console.log(i);
  }
}

//数式の答えが整数のみフィルター
function arrayFilter() {
  integerArray = ansArray.filter((num, index) => {
    if (Math.round(num) === num /*&& makeQueCnt < questionNum*/) {
      integerIndexArray.push(index);
      // makeQueCnt++;
      return Math.round(num) === num;
    }
    // console.log(makeQueCnt);
  });
  // console.log("integerIndexArray:", integerIndexArray);
  // console.log("integerArray:", integerArray);

  //答えが整数となる数式と演算子のみフィルター
  //数式
  filteredExpArray = expArray.filter((value, index) => {
    for (const elem of integerIndexArray) {
      if (index === elem) {
        return true;
      }
    }
  });
  // console.log(filteredExpArray);
  //演算子
  filteredSelectOpeArray = selectOpeArray.filter((value, index) => {
    for (const elem of integerIndexArray) {
      if (index === elem) {
        return true;
      }
    }
  });
  // console.log(filteredSelectOpeArray);
}


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
 * @param {object} elem boxを入れるhtmlと紐づけられた場所 
 * @param {number} expNo 配列の要素を入れる枠番号
 * @param {number<Array>} Array 配列
 * @returns {string<Array>} 配列の要素を１つずつboxに入れて出力
 */
function arrayDisp(elem, expNo, Array) {
  for (let i = (expNo - 1) * questionNum; i < expNo * questionNum; i++) {
    const box = document.createElement("div");
    elem.appendChild(box);
    box.innerText = Array[i];
  }
}

function start() {
  makeExp();
  arrayFilter();
  const exp = document.getElementById("expression");
  arrayDisp(exp, 1, filteredExpArray);
  const exp2 = document.getElementById("expression2");
  arrayDisp(exp2, 2, filteredExpArray);
  document.getElementById("start").disabled = true;//スタートボタンの無効化
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
let passMS = 0;
let passSec = 0;
const createTimer = (() => {
  return (() => {
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
  //10ms毎に経過時間の表示を更新
  passegeID = setInterval(timer, 10);
}

//スタートボタンが押されたら数式を出力し，時間計測開始
const strt = document.getElementById("start");
strt.addEventListener("click", start);
strt.addEventListener("click", countTime);
// strt.addEventListener("click", selOpeDisp);


//矢印キーを押して回答入力
const acceptance = document.getElementById("acceptance");
const acceptance2 = document.getElementById("acceptance2");

//boxを作成して文字列を記入
/**
 * @param {object} elem - boxを作成するhtmlと紐づけられた場所
 * @param {string} str - boxに記入する文字列
*/
function fillInBox(elem, str) {
  const box = document.createElement("div");
  elem.appendChild(box);
  box.innerText = str;
}

/**
 * @param {string} e - 演算子の回答の入力
 * @returns {number} 演算子の番号
*/
//クロージャ使用
function outerfunc() {
  function innerfunc(e) {
    let ans;
    //回答に対する〇×出力
    // const box = document.createElement("div");
    // acceptance.appendChild(box);

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
      acceptNum++;
      if (questionCnt < 20) {
        fillInBox(acceptance, "〇");
      } else {
        fillInBox(acceptance2, "〇");
      }
      if (acceptNum === questionNum) {
        stopTime();
        timeRankFunc(passSec);
      }
    } else {
      if (questionCnt < 20) {
        fillInBox(acceptance, "🐊");
      } else {
        fillInBox(acceptance2, "🐊");
      }
    }
    // console.log(cnt);
    // box2.innerText = operatorObj[ans];
    questionCnt++;
    console.log(acceptNum);
  }
  return innerfunc;
}
const ansAccording = outerfunc();
document.addEventListener("keydown", ansAccording);

//設定問題数分正解すると時間停止
function stopTime() {
  clearInterval(passegeID);
}

//タイムと日付をランキングに表示
// function nowTime() {
//     const date = new date();
//     const [year, month, day] = [date.getfullyear(), date.getmonth(), date.getdate() ]
//     document.getElementById("ranking").innerText = date;
//     return [year, month, day];
// }
const timeRankArray = [];
function timeRankFunc(sec) {
  timeRankArray.push(sec);
  timeRankArray.sort((a, b) => a - b).filter(cnt => {
    cnt++;
    return cnt < 10;
  })
  const timeRank = document.getElementById("ranking");
  while (timeRank.firstElementChild) {
    timeRank.removeChild(timeRank.firstChild);
  }
  for (let i = 0; i < timeRankArray.length; i++) {
    const box = document.createElement("div");
    timeRank.appendChild(box);
    box.innerText = timeRankArray[i];
  }
}

//タイマーと数式をリセット
function resetFunc() {
  passMS = 0;//タイマーリセット
  stopTime();//タイマーストップ
  document.getElementById("start").disabled = false;//スタートボタン無効化解除
  document.getElementById("time").innerText = "";
  document.getElementById("acceptance").innerText = "";
  document.getElementById("acceptance2").innerText = "";
  document.getElementById("expression").innerText = "";
  document.getElementById("expression2").innerText = "";
  init();
  makeExp();
}
const reset = document.getElementById("reset");
reset.addEventListener("click", resetFunc);
