function Question(text,choices,answer){ //dışarıdan parametrelerimizi alıyoruz
    this.text= text;
    this.choices=choices;
    this.answer=answer;
}//Bir question construction oluşturduk.

//Question Prototype
Question.prototype.checkAnswer =function(answer){
     return this.answer === answer;
 }//question'dan türetilen bir nesnenin (bunlar q1 q2 veya q3 olabilir) answer alanı ile dışarıdan gönderilen answer alanı eşit ise true değeri getir.

//Quiz Constructor
function Quiz(questions){
    this.questions = questions;//this question içerisine dışarıdan gönderdiğimiz questionlar gelecek
    this.score = 0; //kullanıcının kaç tane soruya cevap verdiğini hesap tutan ve artan bir this.score oluşturuyoruz.
    this.questionIndex = 0 ; //kullanıcın karşına gelecek sorular 0 dan başlayarak birer birer artacak.
}

//Quiz Prototype
Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex]; //Quizin içerisnde bulunan questionlar içerisinden hangisini gönderceğini belirttik.
}

//Quiz isFinish
Quiz.prototype.isFinish = function (){   //Quizin bitip bitmediğini gösterecek
    return this.questions.length === this.questionIndex; // true değerini döndürüyorsa Quizimiz bitmiş demektir
}

//Quiz Guess
Quiz.prototype.guess = function(answer){
    var question = this.getQuestion(); // O anki index numarasını söylediği question gelir.
    if (question.checkAnswer(answer)) {
        this.score++; //true değeri gelirse score u bir arttır
    }
    this.questionIndex++; //diyoruz ki bir sonraki oruya geçsin
}

var q1 = new Question("What is the general name for the physical parts that make up a computer, such as computer case, central processing unit, monitor, mouse, keyboard, and motherboard?",["Software","Hardware","Window","Icon"],"Hardware");
var q2 = new Question("It is basically a set of commands and data that tells the computer how to operate ?",["Software","Hardware","Window","Icon"],"Software");
var q3 = new Question("What makes a program that the user interacts with be displayed?",["Software","Hardware","Window","Icon"],"Window");

var questions = [q1,q2,q3];

// STAR QUIZ
var quiz = new Quiz(questions);
/*
console.log(quiz.isFinish());

console.log(quiz.getQuestion());
quiz.guess('Javascript');

console.log(quiz.getQuestion());
quiz.guess('Javascript');

console.log(quiz.getQuestion());
quiz.guess('Javascript');

console.log(quiz.score);
console.log(quiz.isFinish());*/

loadQuestion();

function loadQuestion(){

    if(quiz.isFinish() ){
        showScore();
    }
    else{
        var question = quiz.getQuestion();
        var choices = question.choices;
        
        document.querySelector('#question').textContent = question.text;

        for (let i = 0; i < choices.length; i++) {
            let element = document.querySelector('#choice'+ i);
            element.innerHTML = choices[i];
            
            guess('btn' + i, choices[i]); 
        }
        showProgress();
    }
}

function guess(id, guess){
    var btn =  document.getElementById(id);

    btn.onclick = function(){
        quiz.guess(guess);

        loadQuestion();
    }
}

function showScore(){
    var html =`<h2> Score: ${quiz.score} </h2>`;

    document.querySelector('.card-body').innerHTML = html
}

function showProgress(){
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex + 1;

    document.querySelector('#progress').innerHTML = 'Question ' + questionNumber + ' of ' + totalQuestion;
}