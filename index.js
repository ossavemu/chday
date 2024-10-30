import { fetchData } from './data.js';
import { cleanBibleText, getChapterForDay } from './utils.js';

const name = document.getElementById('name');
const content = document.getElementById('root');
const readButton = document.getElementById('readButton');
let isReading = false;
let speechUtterance = null;

// Mostrar capítulo del día
const result = getChapterForDay();
name.innerHTML = `${result.book} ${result.chapter}`;

// Cargar contenido bíblico
fetchData(result.book, result.chapter)
  .then((text) => {
    content.innerHTML = cleanBibleText(text);
  })
  .catch((error) => {
    content.innerHTML = 'Error loading data';
    console.error(error);
  });

// Función para alternar la lectura
readButton.addEventListener('click', () => toggleReading());

function toggleReading() {
  if (isReading) {
    stopReading();
  } else {
    startReading();
  }
}

function startReading() {
  if (!window.speechSynthesis) {
    alert('Your browser does not support speech synthesis');
    return;
  }

  speechUtterance = new SpeechSynthesisUtterance(content.textContent);
  speechUtterance.lang = 'en-EN';
  speechUtterance.rate = 0.7;
  speechUtterance.pitch = 1.5;

  speechUtterance.onstart = () => {
    isReading = true;
    readButton.classList.add('reading');
    readButton.innerHTML = '<i class="fas fa-stop"></i>';
  };

  speechUtterance.onend = stopReading;

  window.speechSynthesis.speak(speechUtterance);
}

function stopReading() {
  window.speechSynthesis.cancel();
  isReading = false;
  readButton.classList.remove('reading');
  readButton.innerHTML = '<i class="fas fa-volume-up"></i>';
}

window.onbeforeunload = stopReading;
