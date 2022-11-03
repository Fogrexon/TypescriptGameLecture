export const awaitDOMContentLoaded = (): Promise<Document> =>
  new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve(document);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        resolve(document);
      });
    }
  });

export const awaitQuerySelector = async (qs: string) => {
  const doc = await awaitDOMContentLoaded();
  return doc.querySelector(qs);
};
