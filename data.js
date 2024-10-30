export async function fetchData(book, chapter) {
  const host = location.origin;
  const resource = 'apostles_gospels.json'; // Cambia si la ruta es distinta
  const apiUrl = `${host}/${resource}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data[book][chapter - 1];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
