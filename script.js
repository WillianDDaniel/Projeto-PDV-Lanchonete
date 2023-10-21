document.addEventListener('DOMContentLoaded', function () {
    // Seleção de selectores do DOM usando IDs
    const lancheSelector = document.getElementById('lanche-selector')
    const bebidaSelector = document.getElementById('bebida-selector')
    const comboSelector = document.getElementById('combo-selector')
    // Seletor historico de pedidos
    const historicoSelector = document.getElementById('historico-selector')

    // Botoes para adicionar produtos ao pedido atual
    const venderLanche = document.getElementById('vender-lanche-button')
    const venderBebida = document.getElementById('vender-bebida-button')
    const venderCombo = document.getElementById('vender-combo-button')
    
    // Links Navbar para mostrar ou ocultar categoria de produtos
    const showLanches = document.getElementById('show-lanches')
    const showBebidas = document.getElementById('show-bebidas')
    const showCombos = document.getElementById('show-combos')

    // Campos de seleção de produtos, que serão ocultos ou revelados ao clicar nos links da NavBar
    const lanchesDiv = document.getElementById('form-lanches')
    const bebidasDiv = document.getElementById('form-bebidas')
    const combosDiv = document.getElementById('form-combos')
    
    // A categoria inicial revelada é a categoria de lanches, recebe o Background/Destaque inicial
    showLanches.style.backgroundColor = '#18198d'
    
    // Tabela para vizualização de dados, de pedidos e de historico de pedidos
    const pedidoTable = document.getElementById('pedido-table').getElementsByTagName('tbody')[0]
    const historicoTable = document.getElementById('historico-table').getElementsByTagName('tbody')[0]

    // Botoes para salvar pedidos na tabela ou limpar a tabela
    const saveButton = document.getElementById('save-button')
    const deleteButton = document.getElementById('delete-button')

    // Para apagar lanches do pedido atual
    const clearButton = document.getElementById('clear-button')

    // Conexões DOM dos botoes importar e exportar
    const exportButton = document.getElementById('export-button')
    const importButton = document.getElementById('import-button')
    // FileInput fica escondido // Para melhorar a aparencia
    const importFileInput = document.getElementById('import-file')

    // deletar historico
    const deleteHistoryButton = document.getElementById('delete-history-button')

    // Função para carregar a lista de lanches do localStorage e atualizar o seletor de lanches
    function carregarListaLanches() {
        const listaLanchesSalva = localStorage.getItem('listaLanches');
        if (listaLanchesSalva) {
            const lanches = JSON.parse(listaLanchesSalva);
            for (const lanche of lanches) {
                const option = document.createElement('option');
                option.value = lanche.nome;
                option.textContent = lanche.nome;
                lancheSelector.appendChild(option);
            }
        }
    } // Carregar a lista de lanches ao abrir a pagina
    carregarListaLanches();

    // Função para carregar a lista de lanches do localStorage e atualizar o seletor de lanches
    function carregarListaBebidas() {
        const listaBebidasSalva = localStorage.getItem('listaBebidas');
        if (listaBebidasSalva) {
            const bebidas = JSON.parse(listaBebidasSalva);
            for (const bebida of bebidas) {
                const option = document.createElement('option');
                option.value = bebida.nome;
                option.textContent = bebida.nome;
                bebidaSelector.appendChild(option);
            }
        }
    }
    carregarListaBebidas();

    // Função para carregar a lista de combos do localStorage e atualizar o seletor de combos
    function carregarListaCombos() {
        const listaCombosSalva = localStorage.getItem('listaDeCombos');
        if (listaCombosSalva) {
            const combos = JSON.parse(listaCombosSalva)
            for (const combo of combos) {
                const option = document.createElement('option')
                option.value = combo.nome
                option.textContent = combo.nome
                comboSelector.appendChild(option)
            }
        }
    } // Carregar a lista de combos ao abrir a pagina
    carregarListaCombos()
    
    // Funcao para mostrar a div lanches e ocultar as demais
    function mostrarLanches() {
        lanchesDiv.style.display = 'block'
        bebidasDiv.style.display = 'none'
        combosDiv.style.display = 'none'
        showLanches.style.backgroundColor = '#18198d'
        showBebidas.style.backgroundColor = ''
        showCombos.style.backgroundColor = ''
    } 
    // Captura o Click no link NavBar (Lanches)
    showLanches.addEventListener('click', function () {
        mostrarLanches()
    })

    // Funcao para mostrar a div bebidas e ocultar as demais
    function mostrarBebidas() {
        bebidasDiv.style.display = 'block'
        lanchesDiv.style.display = 'none'
        combosDiv.style.display = 'none'

        showLanches.style.backgroundColor = ''
        showBebidas.style.backgroundColor = '#18198d'
        showCombos.style.backgroundColor = ''
    }
    // Captura o Click no link NavBar (Bebidas)
    showBebidas.addEventListener('click', function () {
        mostrarBebidas()
    })
    
    // Funcao para mostrar a div Combos e ocultar as demais
    function mostrarCombos() {
        combosDiv.style.display = 'block'
        bebidasDiv.style.display = 'none'
        lanchesDiv.style.display = 'none'

        showLanches.style.backgroundColor = ''
        showBebidas.style.backgroundColor = ''
        showCombos.style.backgroundColor = '#18198d'
    }
    // Captura o Click no link NavBar (Combos)
    showCombos.addEventListener('click', function () {
        mostrarCombos()
    })

    // Funcao para adicionar um lanche ao pedido atual
    venderLanche.addEventListener('click', function () {
        const lanche = lancheSelector.value
        listadeProdutos = localStorage.getItem('listaLanches')
        venderProdutoSelecionado(lanche, obterValorDoProduto, listadeProdutos)

        // Limpar o seletor de lanches após adicionar um lanche
        lancheSelector.value = ''
    })

    // Funcao para adicionar uma bebida ao pedido atual
    venderBebida.addEventListener('click', function () {
        const bebida = bebidaSelector.value
        listadeProdutos = localStorage.getItem('listaBebidas')
        venderProdutoSelecionado(bebida, obterValorDoProduto, listadeProdutos)

        // Limpar o seletor de bebidas após adicionar uma bebida
        bebidaSelector.value = ''
    })

    // Funcao para adicionar uma bebida ao pedido atual
    venderCombo.addEventListener('click', function () {
        const combo = comboSelector.value
        listadeProdutos = localStorage.getItem('listaDeCombos')
        venderProdutoSelecionado(combo, obterValorDoProduto, listadeProdutos)

        // Limpar o seletor de combos após adicionar um combo
        comboSelector.value = ''
    })


    //Funçao para Colocar o item do seletor na tebela de pedidos atual
    function venderProdutoSelecionado(seletorValue, encontrarValor, listadeProdutos) {
        const ProdutoSelecionado = seletorValue;
        const valorDoProduto = encontrarValor(ProdutoSelecionado, listadeProdutos);
        if (ProdutoSelecionado !== "" || null || undefined) {
            const row = pedidoTable.insertRow(); // Insere uma nova linha na tabela de pedidos
            const cell1 = row.insertCell(0); // Insere a primeira célula na linha (Produto)
            const cell2 = row.insertCell(1); // Insere a segunda célula na linha (Valor)
            cell1.innerHTML = ProdutoSelecionado; // Define o produto na primeira célula
            cell2.innerHTML = `R$ ${valorDoProduto}`; // Define o valor formatado na segunda célula
        }
    }

    // Função para encontrar o valor de um Produto
    function obterValorDoProduto(nomeDoProduto, listadeProdutos) {
        const listadeProdutosSalvos = listadeProdutos
        if (listadeProdutosSalvos) {
            const produtos = JSON.parse(listadeProdutosSalvos);
            for (const produto of produtos) {
                if (produto.nome === nomeDoProduto) {
                    return parseFloat(produto.preco)
                }
            }
        }
        return null; // Retorna null se o produto não for encontrado
    }

    // Função para limpar a lista de lanches
    function limparLista() {
        pedidoTable.innerHTML = ''; // Limpa a tabela de pedidos
    }
    clearButton.addEventListener('click', limparLista)
    
    // Função para salvar o pedido no histórico
    function salvarPedido() {
        const data = new Date().toLocaleDateString(); // Obtém a data atual
        const numeroPedido = Math.floor(Math.random() * 10000); // Gera um número de pedido aleatório
        const itensPedido = obterItensPedido(); // Obtém a lista de itens do pedido
        const valorTotal = calcularValorTotal(); // Calcula o valor total do pedido
        const pedido = {
            data,
            numeroPedido,
            itensPedido,
            valorTotal
        };
        const historicoPedidos = JSON.parse(localStorage.getItem('historicoPedidos')) || []; // Obtém o histórico de pedidos do LocalStorage ou cria um array vazio
        historicoPedidos.push(pedido); // Adiciona o pedido atual ao histórico
        localStorage.setItem('historicoPedidos', JSON.stringify(historicoPedidos)); // Atualiza o histórico no LocalStorage
        atualizarHistoricoSelector(); // Atualiza o seletor de histórico
        limparLista(); // Limpa a tabela de pedidos após salvar o pedido
    }
    saveButton.addEventListener('click', salvarPedido);
    
    // Função para obter os itens do pedido
    function obterItensPedido() {
        const itens = [];
        const rows = pedidoTable.rows;
        for (let i = 0; i < rows.length; i++) {
            const lanche = rows[i].cells[0].innerHTML;
            itens.push(lanche);
        }
        return itens;
    }

    // Função para calcular o valor total do pedido
    function calcularValorTotal() {
        const rows = pedidoTable.rows;
        let total = 0;
        for (let i = 0; i < rows.length; i++) {
            const valorStr = rows[i].cells[1].innerHTML.replace('R$ ', '');
            total += parseFloat(valorStr);
        }
        return total.toFixed(2);
    }

    // Função para atualizar o seletor de histórico
    function atualizarHistoricoSelector() {
        historicoSelector.innerHTML = '<option value="">Selecionar Pedido Salvo</option>';
        const historicoPedidos = JSON.parse(localStorage.getItem('historicoPedidos')) || [];

        historicoPedidos.forEach((pedido, index) => {

            historicoSelector.innerHTML +=
                `<option value="${index}">Pedido #${pedido.numeroPedido} - ${pedido.data}</option>`;
        });
    }
    // Atualiza o seletor de histórico quando a página é carregada
    atualizarHistoricoSelector() 

    // Função para exibir um pedido salvo
    function exibirPedidoSalvo() {
        const index = historicoSelector.value;
        if (index !== '') {
            const historicoPedidos = JSON.parse(localStorage.getItem('historicoPedidos')) || [];
            const pedido = historicoPedidos[index];
            historicoTable.innerHTML = `
                <tr>
                    <td>${pedido.data}</td>
                    <td>${pedido.numeroPedido}</td>
                    <td>${pedido.itensPedido.join(', ')}</td>
                    <td>R$ ${pedido.valorTotal}</td>
                </tr>
            `;
        } else {
            historicoTable.innerHTML = '';
        }
    }
    historicoSelector.addEventListener('change', exibirPedidoSalvo);
    
    // Função para apagar um pedido do histórico
    function apagarPedido() {
        const index = historicoSelector.value;
        if (index !== '') {
            const historicoPedidos = JSON.parse(localStorage.getItem('historicoPedidos')) || [];
            historicoPedidos.splice(index, 1);
            localStorage.setItem('historicoPedidos', JSON.stringify(historicoPedidos));
            atualizarHistoricoSelector();
            historicoSelector.value = '';
            historicoTable.innerHTML = '';
        }
    }
    deleteButton.addEventListener('click', apagarPedido);

    // Função para exportar o histórico de pedidos
    function exportarHistorico() {
        const historicoPedidos = JSON.parse(localStorage.getItem('historicoPedidos')) || [];
        const historicoTexto = JSON.stringify(historicoPedidos, null, 2);
        const blob = new Blob([historicoTexto], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'historico.txt';
        a.click();
        URL.revokeObjectURL(url);
    }
    exportButton.addEventListener('click', exportarHistorico);

    // Função para importar o histórico de pedidos a partir de um arquivo de texto
    function importarHistorico(event) {

        if (confirm("Tem certeza de que deseja Substituir o histórico?")) {

            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const historicoPedidos = JSON.parse(e.target.result);
                localStorage.setItem('historicoPedidos', JSON.stringify(historicoPedidos));
                atualizarHistoricoSelector();
            };

            reader.readAsText(file);
        }
    }
    importFileInput.addEventListener('change', importarHistorico);
    importButton.addEventListener('click', function () {
        importFileInput.click();
    })

    // Função para limpar o histórico no LocalStorage
    function limparHistorico() {
        localStorage.removeItem('historicoPedidos');
        atualizarHistoricoSelector();
        historicoTable.innerHTML = '';
    }
    // Botão para Limpar o histórico de pedidos
    deleteHistoryButton.addEventListener('click', function () {
        if (confirm("Tem certeza de que deseja deletar o histórico?")) {
            limparHistorico();
        }
    });
});
