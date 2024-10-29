import { Document, DocumentIndex } from './map-index';

/**
 * Queries a DocumentIndex and returns all the Documents that contain
 * any of the words in the query, as a Set.
 */
export function queryIndex(index: DocumentIndex, query: string): Set<Document> {
  const words = query.toLocaleLowerCase().match(/\b(\w+)\b/g);
  const results = new Set<Document>();

  words?.forEach((word) => {
    const docs = index.get(word);

    docs?.forEach((doc) => {
      results.add(doc);
    });
  });

  return results;
}
