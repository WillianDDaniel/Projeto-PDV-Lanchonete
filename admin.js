document.addEventListener('DOMContentLoaded', function () {
    // Selecao DOM - inputs, botao e lista - ID - (Lanches)
    const novoLancheNome = document.getElementById('novo-lanche-nome');
    const novoLanchePreco = document.getElementById('novo-lanche-preco');
    const adicionarLancheButton = document.getElementById('adicionar-lanche');
    const listaLanches = document.getElementById('lista-lanches');

    // Selecao DOM - inputs, botao e lista - ID - (Bebidas)
    const novoBebidaNome = document.getElementById('novo-bebida-nome');
    const novoBebidaPreco = document.getElementById('novo-bebida-preco');
    const adicionarBebidaButton = document.getElementById('adicionar-bebida');
    const listaBebidas = document.getElementById('lista-bebidas');

    //Ovintes do combo // MELHORAR COMENTARIOO
    const btnSalvarCombo = document.getElementById('btn-salvar-combo')
    const btnSalvarCombo2 = document.getElementById('btn-salvar-combo2')
    const ComboTable = document.getElementById('combo-table').getElementsByTagName('tbody')[0];
    const listaCombos = document.getElementById('lista-combos')
    const itemCombo = document.getElementById('item-combo')
    const precoitem = document.getElementById('preco-item')

    //Selecao DOM - LinksNAV (Bebidas, Lanches) - para alternar visualizacao de tela
    const addBebidas = document.getElementById('add-bebidas')
    const addLanches = document.getElementById('add-lanches')
    const addCombos = document.getElementById('add-combos')

    //Selecao DOM - DIV's que serão expostas ou escondidas conforme alternancia nos links acima (Bebidas)
    const appBebidas = document.getElementById('appbebidas')
    const tabelaBebidas = document.getElementById('tabela-bebidas')
    //Selecao DOM - DIV's que serão expostas ou escondidas conforme alternancia nos links acima (Lanches)
    const appLanche = document.getElementById('applanche')
    const tabelaLanches = document.getElementById('tabela-lanches')
    //Selecao DOM - DIV's que serão expostas ou escondidas conforme alternancia nos links acima (Lanches)
    const appCombo = document.getElementById('appcombo')
    const tabelaCombos = document.getElementById('tabela-combos')
    //Valos inicial para as DIV's(telas) de Bebidas e Combos é "none" (Hiden - Escondido)
    appBebidas.style.display = 'none'
    tabelaBebidas.style.display = 'none'
    appCombo.style.display = 'none'
    tabelaCombos.style.display = 'none'

    //Funcao para mostrar as DIV's(telas) dos Lanches e Esconder as DIV's(telas) de Bebidas
    function showAddLanches() {
        appLanche.style.display = 'block'
        tabelaLanches.style.display = 'block'
        appBebidas.style.display = 'none'
        tabelaBebidas.style.display = 'none'
        appCombo.style.display = 'none'
        tabelaCombos.style.display = 'none'
    }
    //Ouvinte - Botao - da função acima
    addLanches.addEventListener('click', function () {
        showAddLanches()
    })

    //Funcao para mostrar as DIV's(telas) dos Bebidas e Esconder as DIV's(telas) dos Lanches
    function showAddBebidas() {
        appBebidas.style.display = 'block'
        tabelaBebidas.style.display = 'block'
        appLanche.style.display = 'none'
        tabelaLanches.style.display = 'none'
        appCombo.style.display = 'none'
        tabelaCombos.style.display = 'none'
    }
    //Ouvinte - Botao - da função acima
    addBebidas.addEventListener('click', function () {
        showAddBebidas()
    })

    //Funcao para mostrar as DIV's(telas) dos Bebidas e Esconder as DIV's(telas) dos Lanches
    function showAddCombos() {
        appCombo.style.display = 'block'
        tabelaCombos.style.display = 'block'
        appBebidas.style.display = 'none'
        tabelaBebidas.style.display = 'none'
        appLanche.style.display = 'none'
        tabelaLanches.style.display = 'none'

    }
    //Ouvinte - Botao - da função acima
    addCombos.addEventListener('click', function () {
        showAddCombos()
    })

    // Função para adicionar um novo lanche à lista e Salvar no LocalStorage
    adicionarLancheButton.addEventListener('click', function () {
        const nome = novoLancheNome.value;
        const preco = novoLanchePreco.value;
        if (nome && preco) {
            const lanches = { nome, preco }
            const listaDeLanches = JSON.parse(localStorage.getItem('listaLanches')) || []; // Obtém a lista atual de lanche do LocalStorage ou cria um array vazio
            listaDeLanches.push(lanches); // Adiciona o lanche atual a lista de lanches
            localStorage.setItem('listaLanches', JSON.stringify(listaDeLanches)); // Atualiza e salva a lista de lanches
            carregarListaLanches()
            novoLancheNome.value = ""
            novoLanchePreco.value = ""
        }
    });

    // Função para carregar a lista de lanches do localStorage e exibir la tabela Lista de Lanches
    function carregarListaLanches() {
        const listaLanchesSalva = localStorage.getItem('listaLanches');
        listaLanches.innerHTML = ''; // Limpar a tabela antes de carregar os lanches
        if (listaLanchesSalva) {
            const lanches = JSON.parse(listaLanchesSalva);
            for (const lanche of lanches) {
                const listItem = document.createElement('li');
                const nomeLanche = lanche.nome;
                const precoLanche = lanche.preco;
                listItem.innerHTML = `${nomeLanche} - $${precoLanche} <button class="apagar-lanche">Apagar</button>`;
                listaLanches.appendChild(listItem);

                // Adicionar evento de clique para apagar o item da lista
                const apagarBotao = listItem.querySelector('.apagar-lanche');
                apagarBotao.addEventListener('click', function () {
                    apagarLanche(nomeLanche);
                });
            }
        }
    }
    //Chama a funcao acima (carregarListaLanches()) quando a pagina é inicializada ou atualiza
    carregarListaLanches()

    // Função para apagar um lanche da lista
    function apagarLanche(nomeDoLanche) {
        const listaLanchesSalva = localStorage.getItem('listaLanches');
        if (listaLanchesSalva) {
            const lanches = JSON.parse(listaLanchesSalva);
            const novaListaLanches = lanches.filter(lanche => lanche.nome !== nomeDoLanche);
            localStorage.setItem('listaLanches', JSON.stringify(novaListaLanches));
            carregarListaLanches();
        }
    }

    // Função para adicionar uma nova bebida à lista
    adicionarBebidaButton.addEventListener('click', function () {
        const nome = novoBebidaNome.value;
        const preco = novoBebidaPreco.value;
        if (nome && preco) {
            const bebidas = { nome, preco }
            const listaDeBebidas = JSON.parse(localStorage.getItem('listaBebidas')) || []; // Obtém a lista de bebidas atual do LocalStorage ou cria um array vazio
            listaDeBebidas.push(bebidas); // Adiciona a bebida atual a lista de bebidas
            localStorage.setItem('listaBebidas', JSON.stringify(listaDeBebidas)); // Atualiza e salva a lista de bebidas no LocalStorage
            carregarListaBebidas()
            novoBebidaNome.value = '';
            novoBebidaPreco.value = '';
        }
    });

    // Função para carregar a lista de Bebidas do localStorage e exibir la tabela Lista de Bebidas
    function carregarListaBebidas() {
        const listaBebidasSalva = localStorage.getItem('listaBebidas');
        listaBebidas.innerHTML = ''; // Limpar a tabela antes de carregar as bebidas
        if (listaBebidasSalva) {
            const bebidas = JSON.parse(listaBebidasSalva);
            for (const bebida of bebidas) {
                const listItem = document.createElement('li');
                const nomeBebida = bebida.nome;
                const precoBebida = bebida.preco;
                listItem.innerHTML = `${nomeBebida} - $${precoBebida} <button class="apagar-bebida">Apagar</button>`;
                listaBebidas.appendChild(listItem);

                // Adicionar evento de clique para apagar o item da lista
                const apagarBotao = listItem.querySelector('.apagar-bebida');
                apagarBotao.addEventListener('click', function () {
                    apagarBebida(nomeBebida);
                });
            }
        }
    }
    //Chama a funcao acima (carregarListaBebidas()) quando a pagina é inicializada ou atualiza
    carregarListaBebidas()

    // Função para apagar uma bebida da lista
    function apagarBebida(nomeDaBebida) {
        const listaBebidasSalva = localStorage.getItem('listaBebidas');
        if (listaBebidasSalva) {
            const bebidas = JSON.parse(listaBebidasSalva);
            const novaListaBebidas = bebidas.filter(bebida => bebida.nome !== nomeDaBebida);
            localStorage.setItem('listaBebidas', JSON.stringify(novaListaBebidas));
            carregarListaBebidas();
        }
    }

    //Adiciona o Produto e valor digitado pelo usuário a tabela de composicao do combo
    btnSalvarCombo.addEventListener('click', function () {
        const nome = itemCombo.value
        const preco = precoitem.value
        if(nome && preco) {
        const row = ComboTable.insertRow()
        const cell1 = row.insertCell(0); // Insere a primeira célula na linha (lanche)
        const cell2 = row.insertCell(1); // Insere a segunda célula na linha (valor)
        cell1.innerHTML = nome; // Define o lanche na primeira célula
        cell2.innerHTML = `R$ ${preco}`; // Define o valor formatado na segunda célula
        itemCombo.value = ""
        precoitem.value = ""
        }
    })

    // Função para salvar o pedido no histórico
    function salvarCombo() {
        const nomeCombo = document.getElementById('nome-combo').value
        if (nomeCombo !== '') {
            const itens = obterItensPedido(); // Obtém a lista de itens do pedido
            const valorTotal = calcularValorTotal(); // Calcula o valor total do combo
            const combo = {
                nomeCombo,
                itens,
                valorTotal
            };

            const listaDeCombos = JSON.parse(localStorage.getItem('listaDeCombos')) || []; // Obtém o histórico de pedidos do LocalStorage ou cria um array vazio
            listaDeCombos.push(combo); // Adiciona o pedido atual ao histórico
            localStorage.setItem('listaDeCombos', JSON.stringify(listaDeCombos)); // Atualiza o histórico no LocalStorage
            carregarCombos()

            ComboTable.innerHTML = ''
        } else { alert('Você precisar dar um nome ao Combo!') }
    }
    btnSalvarCombo2.addEventListener('click', function () {
        salvarCombo();
    })

    function obterItensPedido() {
        const itens = [];
        const rows = ComboTable.rows;
        for (let i = 0; i < rows.length; i++) {
            const lanche = rows[i].cells[0].innerHTML;
            itens.push(lanche);
        }
        return itens;
    }

    function calcularValorTotal() {
        const rows = ComboTable.rows;
        let total = 0;
        for (let i = 0; i < rows.length; i++) {
            const valorStr = rows[i].cells[1].innerHTML.replace('R$ ', '');
            total += parseFloat(valorStr);
        }
        return total.toFixed(2);
    }

    //Agrupa os itens com mesmo nome e devolve um novo array com o numero de itens seguido do nome
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
       
    // // Função para carregar a lista de lanches do localStorage e atualizar a tabela
    function carregarCombos() {
        let listaDeCombosSalva = localStorage.getItem('listaDeCombos');
        listaCombos.innerHTML = ''; // Limpar a tabela antes de carregar os lanches
        if (listaDeCombosSalva) {
            const combos = JSON.parse(listaDeCombosSalva);
            for (const combo of combos) {
                const listItem = document.createElement('li');
                const nomeCombo = combo.nomeCombo;
                // const itensCombo = combo.itens;
                const valorTotal = combo.valorTotal;
                listItem.innerHTML = `${nomeCombo} - ${contarItensRepetidos(combo.itens)} - $${valorTotal} <button class="apagar-combo">Apagar</button>`;
                listaCombos.appendChild(listItem);

                // Adicionar evento de clique para apagar o item da lista
                const apagarBotao = listItem.querySelector('.apagar-combo');
                apagarBotao.addEventListener('click', function () {
                    apagarCombo(nomeCombo);
                });
            }
        }
    }
     carregarCombos()

    //Função para apagar um lanche da lista
    function apagarCombo(nomeDoCombo) {
        const listaDeCombos = localStorage.getItem('listaDeCombos');

        if (listaDeCombos) {
            const combos = JSON.parse(listaDeCombos)
            const novaListaDeCombos = combos.filter(combos => combos.nomeCombo !== nomeDoCombo);
            localStorage.setItem('listaDeCombos', JSON.stringify(novaListaDeCombos));
            carregarCombos()

        }
    }

})

