export async function fetchData(book, chapter) {
  const currentURL = window.location.href;
  const resource = 'apostles_gospels.json';
  const apiUrl = `${currentURL}${resource}`;
  console.log(apiUrl);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data[book][chapter - 1];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
