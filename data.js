export async function getData(book, chapter) {
  const { default: gospels } = await import('./apostles_gospels.json', {
    assert: { type: 'json' },
    with: { type: 'json' },
  });

  return gospels[book][chapter - 1];
}
