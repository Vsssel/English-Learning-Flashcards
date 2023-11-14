let topic = document.querySelector('.header-topic');
let question = document.querySelector('.question');
let options = document.querySelector('.option-list');
let score = document.querySelector('.header-score');
const btn = document.querySelector('.next-btn');
const total = document.querySelector('.question-total');
const resultSection = document.querySelector('.result-section');
const quizBox = document.querySelector('.quiz-box');

let qIndex = 0;
let userScore = 0;
let qCount = 1;
let qLength = 0;
let userAnswer = "";

loadQuestion();

async function loadQuestion(){
  const jsonFile = "../public/js/quiz.json";
  const res = await fetch(jsonFile);
  const data = await res.json();
  qLength = data.bathroom.length;
  showQuestion(data);
}

function showQuestion(data){
  total.innerHTML = `${qCount} of ${data.bathroom.length} Questions`
  score.innerHTML = `Score: ${userScore} / ${data.bathroom.length}`
  question.src = data.bathroom[qIndex].question;
  options.innerHTML = `${data.bathroom[qIndex].options.map((option) => `
          <div class="option color-yellow">${option}</div>
  `).join('')}
  `;

  selectOption(data);
}



function selectOption(data){
  const answers = document.querySelectorAll('.option');
  for(let i = 0; i<answers.length; i++){
     answers[i].onclick = function(){
      userAnswer = answers[i].textContent;
      let correctAnswer = data.bathroom[qIndex].answer;
      if(userAnswer === correctAnswer){
        userScore++;
        score.innerHTML = `Score: ${userScore} / ${data.bathroom.length}`
        answers[i].style.backgroundColor = 'green';
      }else{
        answers[i].style.backgroundColor = 'red';
        for(let i = 0; i<answers.length; i++){
          if(answers[i].textContent === correctAnswer){
            answers[i].style.backgroundColor = 'green';
          }
        }
      }

      for(let i = 0; i<answers.length; i++){
        answers[i].classList.add('disabled');
      }
     }
  }
}

btn.onclick = function(){
  if(qCount === qLength){
    console.log('finish');
    showResultBox();
  }else{
    qIndex++;
    qCount++;
    loadQuestion();
  }
}


function showResultBox(){
  quizBox.style.display = 'none';
  resultSection.style.display = 'flex';

  const scoreText = document.querySelector('.score-text');
  scoreText.innerHTML = `Your score ${userScore} out of ${qLength}`;
  const circularProgress = document.querySelector('.circular-progress');
  const progressValue = document.querySelector('.progress-value');
  let progressStartValue = 0;
  let progressEndValue = 0;
  if(userScore == 0){
    progressEndValue = 0;
  }else{
    progressEndValue = Math.round((userScore/qLength) * 100);
  }
  if(userScore == 0){
    progressEndValue = 0;
  }else{
    progressEndValue = Math.round((userScore/qLength) * 100);
  }
  console.log(progressEndValue);
  let speed = 20


  let progress = setInterval(() =>{
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`
    circularProgress.style.background = `conic-gradient(#eec849 ${progressStartValue * 3.6}deg, rgba(35, 34, 34, 0.1) 0deg)`;
    if(progressStartValue == progressEndValue){
      clearInterval(progress);
    }
  }, speed);


}



loadQuestion();