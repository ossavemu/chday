import { writeFile } from 'fs/promises';

const apostles = [
  { name: 'Matthew', lastChapter: 28 },
  { name: 'Mark', lastChapter: 16 },
  { name: 'Luke', lastChapter: 24 },
  { name: 'John', lastChapter: 21 },
];

// Base URL for the Bible API
const apiUrl = 'https://bible.helloao.org/api/BSB/';

// Function to get the chapters of a Gospel
async function getGospelChapters(bookId, lastChapter) {
  const chapters = [];

  for (let chapterNumber = 1; chapterNumber <= lastChapter; chapterNumber++) {
    try {
      // Fetch chapter data from the API
      const response = await fetch(`${apiUrl}${bookId}/${chapterNumber}.json`);
      const data = await response.json();

      // wait for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (data.chapter) {
        // Extract only the verse content (filter out headings, line breaks, etc.)
        const chapterContent = data.chapter.content
          .filter((item) => item.type === 'verse')
          .map(
            (item) =>
              `${item.number}. ${item.content
                .filter((c) => typeof c === 'string')
                .join(' ')}`
          )
          .join(' ');

        chapters.push(chapterContent);
      } else {
        console.error(
          `No chapter content found for ${bookId}, chapter ${chapterNumber}`
        );
        break;
      }
    } catch (error) {
      console.error(
        `Error fetching ${bookId}, chapter ${chapterNumber}:`,
        error
      );
      break;
    }
  }

  return chapters;
}

// Function to get all Gospels and save them to a JSON file
async function getApostlesGospels() {
  const result = {};

  for (const apostle of apostles) {
    console.log(`Fetching chapters for ${apostle.name}...`);
    const chapters = await getGospelChapters(apostle.name, apostle.lastChapter);
    result[apostle.name] = chapters;
  }

  // Write the result to a file
  await writeFile('god_word.json', JSON.stringify(result, null, 2));
  console.log('Gospels saved to god_word.json');
}

// Execute the function
getApostlesGospels();
