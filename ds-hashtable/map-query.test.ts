import { DocumentIndex, buildIndex } from './map-index';
import { queryIndex } from './map-query';

const fishDoc = { title: 'Fish', content: 'About fish.' };
const fishingDoc = { title: 'Fishing', content: 'Fish effectively.' };
const napsDoc = { title: 'Naps', content: 'Nap while fishing.' };
const dinnerDoc = { title: 'Dinner', content: 'Cook fish while grilling!' };
const shellyDoc = {
  title: 'Shelly',
  content: 'About fish effectively nap while fishing cook grilling',
};

const index: DocumentIndex = buildIndex([
  fishDoc,
  fishingDoc,
  napsDoc,
  dinnerDoc,
  shellyDoc,
]);

describe('queryIndex', () => {
  it('finds "fish"', () => {
    const actual = queryIndex(index, 'fish');
    const expected = [fishDoc, fishingDoc, dinnerDoc, shellyDoc];
    expect(actual).toEqual(expected);
  });

  it('finds "FISH"', () => {
    const actual = queryIndex(index, 'FISH');
    const expected = [fishDoc, fishingDoc, dinnerDoc, shellyDoc];
    expect(actual).toEqual(expected);
  });

  it('finds "fish while"', () => {
    const actual = queryIndex(index, 'fish while');
    const expected = [dinnerDoc, shellyDoc, fishDoc, fishingDoc, napsDoc];
    expect(actual).toEqual(expected);
  });

  it('finds nothing for "foo"', () => {
    const actual = queryIndex(index, 'foo');
    expect(actual).toEqual([]);
  });

  it('finds nothing for ""', () => {
    const actual = queryIndex(index, '');
    expect(actual).toEqual([]);
  });

  it('sorts shellyDoc to the top', () => {
    const actual = queryIndex(index, 'fish while nap cook');
    const expected = [shellyDoc, dinnerDoc, napsDoc, fishDoc, fishingDoc];
    expect(actual).toEqual(expected);
  });
});
