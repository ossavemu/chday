import { fetchData } from './data.js';
import { initializeSpeech, stopReading, toggleReading } from './speech.js';
import { cleanBibleText, getChapterForDay } from './utils.js';

const name = document.getElementById('name');
const content = document.getElementById('root');
const readButton = document.getElementById('readButton');
const stopButton = document.getElementById('stopButton');

const result = getChapterForDay();
name.innerHTML = `${result.book} ${result.chapter}`;

const gospel = cleanBibleText(await fetchData(result.book, result.chapter));

const fragments = gospel
  .split('. ')
  .map((fragment, index) => `<span id="fragment-${index}">${fragment}.</span>`);

content.innerHTML = fragments.join(' ');

initializeSpeech();

readButton.addEventListener('click', () => {
  toggleReading(fragments.map((f) => f.replace(/<\/?span[^>]*>/g, ''))); // Solo el texto
});

stopButton.addEventListener('click', () => {
  stopReading();
});

stopReading();
