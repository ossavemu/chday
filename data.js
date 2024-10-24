import gospels from './apostles_gospels.json' with { type: 'json' };

export async function getData(book, chapter) {
  return gospels[book][chapter - 1];
}
