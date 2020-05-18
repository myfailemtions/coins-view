export const formatData = (data) => {
  return data.map(item => ({
    id: item.s,
    firstValueOfPair: item.b,
    secondValueOfPair: item.q,
    openPrice: item.o,
    prevPrice: item.l,
    currentPrice: item.c,
    volume: item.qv,
    primaryMarket: item.pm,
    primaryMarketCategory: item.pn,
  }));
}
