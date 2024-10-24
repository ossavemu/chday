let speechUtterance = null;
let isReading = false;
let isPaused = false;
let currentFragmentIndex = 0;
let fragments = []; // Para almacenar los fragmentos

// Inicializamos la síntesis de voz
export function initializeSpeech() {
  speechUtterance = new SpeechSynthesisUtterance();
  speechUtterance.lang = 'en-EN';
  speechUtterance.rate = 0.7;
  speechUtterance.pitch = 1.5;

  // Cuando termine de leer un fragmento, pasa al siguiente
  speechUtterance.onend = () => {
    if (!isPaused) {
      highlightFragment(currentFragmentIndex, false); // Quita el subrayado
      currentFragmentIndex++;

      if (currentFragmentIndex < fragments.length) {
        highlightFragment(currentFragmentIndex, true); // Subraya el siguiente fragmento
        startReading(fragments[currentFragmentIndex]);
      } else {
        isReading = false;
        document.getElementById('readButton').innerHTML =
          '<i class="fas fa-volume-up"></i>';
      }
    }
  };
}

// Función para alternar entre empezar, pausar, reanudar o parar la lectura
export function toggleReading(textFragments) {
  fragments = textFragments; // Guarda los fragmentos en el array
  if (isReading && !isPaused) {
    pauseReading();
  } else if (isPaused) {
    resumeReading();
  } else {
    currentFragmentIndex = 0; // Reinicia la lectura
    highlightFragment(currentFragmentIndex, true); // Subraya el primer fragmento
    startReading(fragments[currentFragmentIndex]);
  }
}

// Función para iniciar la lectura de un fragmento
function startReading(fragment) {
  if (!window.speechSynthesis) {
    alert('Your browser does not support speech synthesis');
    return;
  }

  speechUtterance.text = fragment;
  window.speechSynthesis.speak(speechUtterance);

  isReading = true;
  isPaused = false;
  document.getElementById('readButton').innerHTML =
    '<i class="fas fa-pause"></i>';
}

// Función para pausar la lectura
function pauseReading() {
  window.speechSynthesis.pause();
  isPaused = true;
  document.getElementById('readButton').innerHTML =
    '<i class="fas fa-play"></i>';
}

// Función para reanudar la lectura
function resumeReading() {
  window.speechSynthesis.resume();
  isPaused = false;
  document.getElementById('readButton').innerHTML =
    '<i class="fas fa-pause"></i>';
}

// Función para detener la lectura y limpiar los subrayados
export function stopReading() {
  window.speechSynthesis.cancel();
  isReading = false;
  isPaused = false;
  currentFragmentIndex = 0; // Reinicia el índice de fragmentos
  clearAllHighlights(); // Limpia los subrayados
  document.getElementById('readButton').innerHTML =
    '<i class="fas fa-volume-up"></i>';
}

// Función para resaltar o quitar el resaltado de un fragmento
function highlightFragment(index, highlight) {
  const fragmentElement = document.getElementById(`fragment-${index}`);
  if (fragmentElement) {
    if (highlight) {
      fragmentElement.classList.add('highlighted'); // Añadir la clase de resaltado
    } else {
      fragmentElement.classList.remove('highlighted'); // Quitar la clase de resaltado
    }
  }
}

// Función para quitar el subrayado de todos los fragmentos
function clearAllHighlights() {
  fragments.forEach((_, index) => {
    highlightFragment(index, false); // Elimina el subrayado de cada fragmento
  });
}
