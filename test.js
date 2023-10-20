const itens = ['carne', 'carne', 'dog', 'fritas', 'refri'];

const contarItensRepetidos = (itens) => {
  const contagem = {};
  const novoArray = [];

  for (const item of itens) {
    if (contagem[item]) {
      contagem[item]++;
    } else {
      contagem[item] = 1;
    }
  }

  for (const item in contagem) {
    novoArray.push(`${contagem[item]} ${item}${contagem[item] > 1 ? 's' : ''}`);
  }

  return novoArray;
};

const novoArray = contarItensRepetidos(itens);

console.log(novoArray); // Deve imprimir: ["3 carne", "1 fritas", "1 refri"]
