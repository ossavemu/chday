export function getDayOfYear() {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = new Date() - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function getBook(month) {
  const order = {
    2: 'Matthew',
    5: 'Mark',
    8: 'Luke',
    11: 'John',
  };

  if (month > 8) return order[8];
  if (month > 5) return order[5];
  if (month > 2) return order[2];
  return order[11];
}

export function getChapterForDay() {
  const currentMonth = new Date().getMonth();
  const dayOfYear = getDayOfYear();
  const book = getBook(currentMonth);

  const chapters = {
    Matthew: 28,
    Mark: 16,
    Luke: 24,
    John: 21,
  };

  const startOfBookInYear = {
    John: 1,
    Matthew: 91,
    Mark: 182,
    Luke: 273,
  };

  const dayInBookRange = dayOfYear - startOfBookInYear[book];
  const chapter = (dayInBookRange % chapters[book]) + 1;

  return { book, chapter };
}

export function cleanBibleText(text) {
  return text.replace(/\d+\.\s/g, '').trim();
}
