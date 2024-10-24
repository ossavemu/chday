import { getData } from './data.js';
import {
  initializeSpeech,
  readFromFragment,
  stopReading,
  toggleReading,
} from './speech.js';
import { cleanBibleText, getChapterForDay } from './utils.js';

const name = document.getElementById('name');
const content = document.getElementById('root');
const readButton = document.getElementById('readButton');
const stopButton = document.getElementById('stopButton');

const result = getChapterForDay();

name.innerHTML = `${result.book} ${result.chapter}`;

const gospel = cleanBibleText(await getData(result.book, result.chapter));

const fragments = gospel.split('. ').map((fragment, index) => {
  return `<a id="fragment-${index}" href="#" class="fragment">${fragment}.</a>`;
});

content.innerHTML = fragments.join(' ');

initializeSpeech();

fragments.forEach((_, index) => {
  const fragmentElement = document.getElementById(`fragment-${index}`);
  fragmentElement.addEventListener('click', (e) => {
    e.preventDefault();
    readFromFragment(
      index,
      fragments.map((f) => f.replace(/<\/?a[^>]*>/g, ''))
    );
  });
});

readButton.addEventListener('click', () => {
  toggleReading(fragments.map((f) => f.replace(/<\/?span[^>]*>/g, '')));
});

stopButton.addEventListener('click', () => {
  stopReading();
});

stopReading();
