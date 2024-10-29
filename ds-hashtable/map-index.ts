export type Document = {
  title: string;
  content: string;
};

export type DocumentIndex = Map<string, Set<Document>>;

/**
 * Builds a DocumentIndex from a list of Documents.
 * The index's keys are the words in all the documents,
 * and the values are the documents the word appears in.
 */
export function buildIndex(docs: Document[]): DocumentIndex {
  const documentIndex: DocumentIndex = new Map();

  docs.forEach((doc) => {
    const words = doc.content.match(/\b(\w+)\b/g);
    words?.forEach((word) => {
      const indexWord = word.toLocaleLowerCase();
      const exists = documentIndex.has(indexWord);

      if (!exists) {
        documentIndex.set(indexWord, new Set<Document>());
      }

      const docSet = documentIndex.get(indexWord) as Set<Document>;

      docSet.add(doc);
    });
  });

  return documentIndex;
}
