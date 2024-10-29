import { Document, DocumentIndex } from './map-index';

type QueryResult = {
  document: Document;
  appearances: number;
};

type QueryResults = {
  [index: string]: QueryResult;
};

/**
 * Queries a DocumentIndex and returns all the Documents that contain
 * any of the words in the query, as a Set.
 */
export function queryIndex(index: DocumentIndex, query: string): Document[] {
  const words = query.toLocaleLowerCase().match(/\b(\w+)\b/g);
  const results: QueryResults = {};

  words?.forEach((word) => {
    const docs = index.get(word);

    docs?.forEach((doc) => {
      const result = results[doc.title];

      if (result) {
        result.appearances++;
      } else {
        results[doc.title] = { document: doc, appearances: 1 };
      }
    });
  });

  const sortedResults = Object.values(results).sort(
    (a, b) => b.appearances - a.appearances
  );

  const simplifiedResults = sortedResults.map((result) => result.document);

  return simplifiedResults;
}
