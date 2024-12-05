type CoinValue = {
  name: string;
  value: number;
};

function getChange(money: number): void {
  let remainder = money;
  const values: CoinValue[] = [
    { name: 'quarters', value: 25 },
    { name: 'dimes', value: 10 },
    { name: 'nickels', value: 5 },
    { name: 'pennies', value: 1 },
  ];
  const coins: Record<string, number> = {};
  values.forEach((coin) => {
    coins[coin.name] = 0;
    while (remainder > coin.value) {
      coins[coin.name]++;
      remainder -= coin.value;
    }
  });
  console.log(coins);
}

getChange(578);
