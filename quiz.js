const start_btn = document.querySelector(".start button");
const quiz_box = document.querySelector(".quiz_box", ".buttons-s", ".restart");
const res = document.querySelector(".res");
const opt = document.querySelector(".opt");
const timeText = document.querySelector(".time .t");
const timeCount = document.querySelector(".time .timer");
start_btn.onclick = () => {
  quiz_box.classList.add("activeQuiz");
  showQuetions(0);
  queCounter(1);
  startTimer(10);
};
let timeValue = 10;
let que_count = 0;
let que_num = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restart_quiz = res.querySelector(".buttons-s .restart");
const quit_quiz = res.querySelector(".buttons-s .quit");
restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz");
  res.classList.remove("activeResult");
  timeValue = 10;
  que_count = 0;
  que_num = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count);
  queCounter(que_num);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  timeText.textContent = "Time Left";
  next_btn.classList.remove("show");
};
quit_quiz.onclick = () => {
  window.location.reload();
};
const next_btn = document.querySelector("footer .next");
const bottom_ques_counter = document.querySelector("header .ques");

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_num++;
    showQuetions(que_count);
    queCounter(que_num);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();
  }
};
function showQuetions(index) {
  const que_text = document.querySelector(".ques_text");
  let que_tag =
    "<span>" +
    questions[index].num +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag ='<div class="option"><span>' + questions[index].option[0] +
    "</span></div>" +
    '<div class="option"><span>' +questions[index].option[1] +
    "</span></div>" +
    '<div class="option"><span>' +questions[index].option[2] +
    "</span></div>" +
    '<div class="option"><span>' +questions[index].option[3] +
    "</span></div>";
  que_text.innerHTML = que_tag;
  opt.innerHTML = option_tag;
  const option = opt.querySelectorAll(".option");

  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correcAns = questions[que_count].answer;
  const allOptions = opt.children.length;
  if (userAns == correcAns) {
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);
    for (i = 0; i < allOptions; i++) {
      if (opt.children[i].textContent == correcAns) {
        opt.children[i].setAttribute("class", "option correct");
        opt.children[i].insertAdjacentHTML("beforeend", tickIconTag);
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    opt.children[i].classList.add("disabled");
  }
  next_btn.classList.add("show");
}
function showResult() {
  quiz_box.classList.remove("activeQuiz");
  res.classList.add("activeResult");
  const scoreText = res.querySelector(".score");
  if (userScore > 3) {
    let scoreTag =
      "<span>You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span>You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>You got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Time Off";
      const allOptions = opt.children.length;
      let correcAns = questions[que_count].answer;
      for (i = 0; i < allOptions; i++) {
        if (opt.children[i].textContent == correcAns) {
          opt.children[i].setAttribute("class", "option correct");
          opt.children[i].insertAdjacentHTML("beforeend", tickIconTag);
        }
      }
      for (i = 0; i < allOptions; i++) {
        opt.children[i].classList.add("disabled");
      }
      next_btn.classList.add("show");
    }
  }
}
function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length;
  bottom_ques_counter.innerHTML = totalQueCounTag;
}
let questions = [
    {
    num: 1,
    question: "Which of the following approach is used by C++?",
    answer: "Bottom-up",
    option: [
      "Right-left",
      "Bottom-up",
      "Top-down",
      "Left-right"
    ]
  },
    {
    num: 2,
    question: "Which of the following type is provided by C++ but not C?",
    answer: "bool",
    option: [
      "int",
      "float",
      "double",
      "bool"
    ]
  },
    {
    num: 3,
    question: "Who developed Python Programming Language?",
    answer: "Guido van Rossum",
    option: [
      "Rasmus Lerdorf",
      "Niene Stom",
      "Guido van Rossum",
      "Wick van Rossum"
    ]
  },
    {
    num: 4,
    question: "What will be the value of the following Python expression....? 4 + 3 % 5",
    answer: "7",
    option: [
      "2",
      "7",
      "4",
      "8"
    ]
  },
    {
    num: 5,
    question: "Which one of the following is not a keyword in Python language?",
    answer: "eval",
    option: [
      "eval",
      "pass",
      "assert",
      "nonloal"
    ]
  },
];