// ---- navegação entre abas ----
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabButtons.forEach(b => b.classList.toggle('is-active', b === btn));
    tabPanels.forEach(p => p.classList.toggle('is-active', p.id === target));
  });
});

// ---- link para o grupo ----
// substitui o href abaixo pelo link de convite real do grupo de WhatsApp
document.getElementById('whatsapp-link').href = 'https://chat.whatsapp.com/FFXihqhCSKSJ2WfMtfE0RY?s=sw&p=i&mlu=4&ilr=4';

// ---- frases aleatórias na página inicial ----
// isto é só texto genérico do grupo (não letras de músicas) — edita à vontade
const homeLines = [
  'Lembrete: a aba dos rankings ainda não tem números a sério. Alguém que comece a contar.',
  'Faltam menos dias do que gostaríamos para a próxima era acabar em piada interna.',
  'Se ainda não puseste a tua era favorita na aba dos membros, hoje é um bom dia.',
  'Esta secção fica mais engraçada à medida que formos adicionando conteúdo real.'
];

const lineEl = document.getElementById('random-line');
const newLineBtn = document.getElementById('new-line-btn');

function showRandomLine() {
  const next = homeLines[Math.floor(Math.random() * homeLines.length)];
  lineEl.textContent = next;
}

newLineBtn.addEventListener('click', showRandomLine);

// ---- quiz ----
// perguntas de exemplo, sem letras — troca ou expande à vontade
const quizQuestions = [
  {
    question: 'Em que estado dos EUA nasceu a Taylor Swift?',
    options: ['Pensilvânia', 'Texas', 'Califórnia', 'Nova Iorque'],
    correctIndex: 0
  },
  {
    question: 'Qual foi o primeiro álbum de originais da Taylor Swift?',
    options: ['Fearless', 'Taylor Swift', 'Speak Now', 'Red'],
    correctIndex: 1
  },
  {
    question: 'Quantos álbuns de estúdio de originais tinha lançado até ao final de 2024?',
    options: ['8', '10', '11', '13'],
    correctIndex: 2
  }
];

let quizIndex = 0;
let quizScore = 0;

const quizQuestionEl = document.getElementById('quiz-question');
const quizOptionsEl = document.getElementById('quiz-options');
const quizFeedbackEl = document.getElementById('quiz-feedback');
const quizStartBtn = document.getElementById('quiz-start');

function loadQuizQuestion() {
  quizFeedbackEl.textContent = '';
  quizOptionsEl.innerHTML = '';

  if (quizIndex >= quizQuestions.length) {
    quizQuestionEl.textContent = `Acertaste ${quizScore} de ${quizQuestions.length}.`;
    quizStartBtn.textContent = 'jogar outra vez';
    quizIndex = 0;
    quizScore = 0;
    return;
  }

  const current = quizQuestions[quizIndex];
  quizQuestionEl.textContent = current.question;

  current.options.forEach((option, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.textContent = option;
    btn.addEventListener('click', () => checkAnswer(i, current.correctIndex));
    quizOptionsEl.appendChild(btn);
  });
}

function checkAnswer(chosenIndex, correctIndex) {
  const buttons = quizOptionsEl.querySelectorAll('.quiz-option-btn');
  buttons.forEach(b => b.disabled = true);

  if (chosenIndex === correctIndex) {
    quizScore++;
    quizFeedbackEl.textContent = 'certo!';
  } else {
    quizFeedbackEl.textContent = `não é essa — a resposta certa era "${quizQuestions[quizIndex].options[correctIndex]}"`;
  }

  quizIndex++;
  setTimeout(loadQuizQuestion, 1400);
}

quizStartBtn.addEventListener('click', () => {
  quizIndex = 0;
  quizScore = 0;
  quizStartBtn.textContent = 'reiniciar';
  loadQuizQuestion();
});

// ---- mostrar nomes ao clicar numa foto ----
const photoItems = document.querySelectorAll('.photo-item');

photoItems.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('is-revealed');
  });
});
