let speechUtterance = null;
let isReading = false;
let isPaused = false;
let currentFragmentIndex = 0;
let fragments = [];

// Inicializamos el objeto SpeechSynthesisUtterance
export function initializeSpeech() {
  speechUtterance = new SpeechSynthesisUtterance();
  speechUtterance.lang = 'en-EN';
  speechUtterance.rate = 0.7;
  speechUtterance.pitch = 1.5;

  speechUtterance.onend = () => {
    if (!isPaused) {
      highlightFragment(currentFragmentIndex, false); // Elimina el resaltado
      currentFragmentIndex++;

      if (currentFragmentIndex < fragments.length) {
        highlightFragment(currentFragmentIndex, true); // Resalta el siguiente fragmento
        startReading(fragments[currentFragmentIndex]);
      } else {
        isReading = false;
        document.getElementById('readButton').innerHTML =
          '<i class="fas fa-volume-up"></i>';
      }
    }
  };

  // Detectar cambios de visibilidad de la pestaña
  document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Función para alternar entre empezar o pausar la lectura
export function toggleReading(textFragments) {
  fragments = textFragments;
  if (isReading && !isPaused) {
    pauseReading();
  } else if (isPaused) {
    resumeReading();
  } else {
    currentFragmentIndex = 0;
    highlightFragment(currentFragmentIndex, true);
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

// Función para detener la lectura por completo
export function stopReading() {
  window.speechSynthesis.cancel();
  isReading = false;
  isPaused = false;
  currentFragmentIndex = 0;
  clearAllHighlights();
  document.getElementById('readButton').innerHTML =
    '<i class="fas fa-volume-up"></i>';
}

// Resaltar o quitar el resaltado de un fragmento
function highlightFragment(index, highlight) {
  const fragmentElement = document.getElementById(`fragment-${index}`);
  if (fragmentElement) {
    if (highlight) {
      fragmentElement.classList.add('highlighted');
    } else {
      fragmentElement.classList.remove('highlighted');
    }
  }
}

// Limpiar todos los resaltados
function clearAllHighlights() {
  fragments.forEach((_, index) => {
    highlightFragment(index, false);
  });
}

function handleVisibilityChange() {
  if (document.hidden) {
    if (isReading && !isPaused) {
      pauseReading();
    }
  } else {
    if (isReading && isPaused) {
      resumeReading();
    }
  }
}
