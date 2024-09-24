interface RangeReport {
  total: number;
  range: number[];
  odds: number[];
  evens: number[];
  average: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRangeReport(start: number, end: number): RangeReport {
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  let total = 0;
  range.forEach((number) => {
    total += number;
  });

  const odds: number[] = [];
  range.forEach((number) => {
    if (number % 2) {
      odds.push(number);
    }
  });

  const evens: number[] = [];
  range.forEach((number) => {
    if (!(number % 2)) {
      evens.push(number);
    }
  });

  const average = total / range.length;

  return { total, range, odds, evens, average };
}
