(function() {
	const myQuestions = [
	  {
		question: "What type of boats did the Vikings use when exploring and raiding??",
		answers: {
		  a: "Deck Boats",
		  b: "Bowrider Boats",
		  c: "Longships",
		  d: "Cruise ship"
		},
		correctAnswer: "c"
	  },
	  {
		question: "In Ancient Rome, what was a thermae??",
		answers: {
		  a: "Sauna",
		  b: "Thermal river",
		  c: "Public baths",
		  d: "Shower"
		},
		correctAnswer: "c"
	  },
	  {
		question: "Who discovered penicillin?",
		answers: {
		  a: "Rosalind Franklin",
		  b: "Alexander Fleming",
		  c: "Marie Curie",
		  d: "Rachel Carson"
		},
		correctAnswer: "b"
	  },
	  {
		question: "Which 3 countries made up the Triple Entente in World War I?",
		answers: {
		  a: "Great Britain, France & Germany",
		  b: "Germany, China, USA",
		  c: "Germany, Belgium , France",
		  d: "Great Britain, France & Russia"
		},
		correctAnswer: "d"
	  },
	  {
		question: "Who was the first human to travel into space?",
		answers: {
		  a: "Yuri Gagarin",
		  b: "John Glenn",
		  c: "Scott Kelly",
		  d: "Neil Amstrong"
		},
		correctAnswer: "a"
	  },
	  {
		question: "Who was the first President of the United States?",
		answers: {
		  a: "James Monroe",
		  b: "Thomas Jefferson",
		  c: "John Adams",
		  d: "George Washington"
		},
		correctAnswer: "d"
	  },
	  {
		question: "Which English king was defeated at the Battle of Hastings?",
		answers: {
		  a: "George IV",
		  b: "George III",
		  c: "Alfred the Great",
		  d: "Harold Godwinson"
		},
		correctAnswer: "d"
	  },
	  {
		question: "How many wives did Henry VIII have?",
		answers: {
		  a: "6",
		  b: "10",
		  c: "5",
		  d: "3"
		},
		correctAnswer: "a"
	  },
	  {
		question: "Francisco Franco ruled which European country from 1939 to 1975?",
		answers: {
		  a: "France",
		  b: "Spain",
		  c: "Romania",
		  d: "Italy"
		},
		correctAnswer: "b"
	  },
	  {
		question: "What language was spoken in Ancient Rome??",
		answers: {
		  a: "Latin",
		  b: "Tamil",
		  c: "Sanskrit",
		  d: "Greek"
		},
		correctAnswer: "a"
	  },
	];
  
	function buildQuiz() {
	  // we'll need a place to store the HTML output
	  const output = [];
  
	  // for each question...
	  myQuestions.forEach((currentQuestion, questionNumber) => {
		// we'll want to store the list of answer choices
		const answers = [];
  
		// and for each available answer...
		for (letter in currentQuestion.answers) {
		  // ...add an HTML radio button
		  answers.push(
			`<label>
			   <input type="radio" name="question${questionNumber}" value="${letter}">
				${letter} :
				${currentQuestion.answers[letter]}
			 </label>`
		  );
		}
  
		// add this question and its answers to the output
		output.push(
		  `<div class="slide">
			 <div class="question"> ${currentQuestion.question} </div>
			 <div class="answers"> ${answers.join("")} </div>
		   </div>`
		);
	  });
  
	  // finally combine our output list into one string of HTML and put it on the page
	  quizContainer.innerHTML = output.join("");
	}
  
	function showResults() {
	  // gather answer containers from our quiz
	  const answerContainers = quizContainer.querySelectorAll(".answers");
  
	  // keep track of user's answers
	  let numCorrect = 0;
  
	  // for each question...
	  myQuestions.forEach((currentQuestion, questionNumber) => {
		// find selected answer
		const answerContainer = answerContainers[questionNumber];
		const selector = `input[name=question${questionNumber}]:checked`;
		const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
		// if answer is correct
		if (userAnswer === currentQuestion.correctAnswer) {
		  // add to the number of correct answers
		  numCorrect++;
  
		  // color the answers green
		  answerContainers[questionNumber].style.color = "lightgreen";
		} else {
		  // if answer is wrong or blank
		  // color the answers red
		  answerContainers[questionNumber].style.color = "red";
		}
	  });
  
	  // show number of correct answers out of total
	  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
	}
  
	function showSlide(n) {
	  slides[currentSlide].classList.remove("active-slide");
	  slides[n].classList.add("active-slide");
	  currentSlide = n;
	  
	  if (currentSlide === 0) {
		previousButton.style.display = "none";
	  } else {
		previousButton.style.display = "inline-block";
	  }
	  
	  if (currentSlide === slides.length - 1) {
		nextButton.style.display = "none";
		submitButton.style.display = "inline-block";
	  } else {
		nextButton.style.display = "inline-block";
		submitButton.style.display = "none";
	  }
	}
  
	function showNextSlide() {
	  showSlide(currentSlide + 1);
	}
  
	function showPreviousSlide() {
	  showSlide(currentSlide - 1);
	}
  
	const quizContainer = document.getElementById("quiz");
	const resultsContainer = document.getElementById("results");
	const submitButton = document.getElementById("submit");
  
	// display quiz right away
	buildQuiz();
  
	const previousButton = document.getElementById("previous");
	const nextButton = document.getElementById("next");
	const slides = document.querySelectorAll(".slide");
	let currentSlide = 0;
  
	showSlide(0);
  
	// on submit, show results
	submitButton.addEventListener("click", showResults);
	previousButton.addEventListener("click", showPreviousSlide);
	nextButton.addEventListener("click", showNextSlide);

	function resetQuiz() {
		// reset the score to 0
		score = 0;
		
		// reset the question index to 0
		currentQuestion = 0;
		
		// shuffle the questions
		questions.sort(function() { return 0.5 - Math.random() });
		
		// reset the choices and feedback
		choices = [];
		feedback = [];
		
		// display the first question
		displayQuestion();
	  }
	  
  })();