
document.addEventListener('DOMContentLoaded', function () {
    // Seleção de elementos do DOM usando IDs
    const lancheSelector = document.getElementById('lanche-selector');
    const addButton = document.getElementById('add-button');

    const lancheDiv = document.getElementById('form-container');
    const showlanches = document.getElementById('show-lanches');

    const bebidasDiv = document.getElementById('form-bebidas')
    const showBebidas = document.getElementById('show-bebidas')
    showlanches.style.backgroundColor = '#18198d'
    // showlanches.style.color = '#FFF'

    const pedidoTable = document.getElementById('pedido-table').getElementsByTagName('tbody')[0];

    const saveButton = document.getElementById('save-button');
    const historicoSelector = document.getElementById('historico-selector');
    const deleteButton = document.getElementById('delete-button');
    const historicoTable = document.getElementById('historico-table').getElementsByTagName('tbody')[0];

    // para esconder a div lanches

    function mostrarLanches() {
        lancheDiv.style.display = 'block'
        bebidasDiv.style.display = 'none'
        showlanches.style.backgroundColor = '#18198d'
        showBebidas.style.backgroundColor = ''
        // showlanches.style.color = '#FFF'
        // showBebidas.style.color = '#000'
    }

    showlanches.addEventListener('click', function () {
        mostrarLanches()
    })

    function mostrarBebidas() {
        bebidasDiv.style.display = 'block'
        lancheDiv.style.display = 'none'
        showlanches.style.backgroundColor = ''
        showBebidas.style.backgroundColor = '#18198d'
        // showlanches.style.color = '#000'
        // showBebidas.style.color = '#fff'

    }

    showBebidas.addEventListener('click', function () {
        mostrarBebidas()
    })



    // Para recuperar a lista de lanches

    const clearButton = document.getElementById('clear-button');

    // botoes importar e exportar

    const exportButton = document.getElementById('export-button');
    exportButton.addEventListener('click', exportarHistorico);

    const importFileInput = document.getElementById('import-file');
    const importButton = document.getElementById('import-button');

    importButton.addEventListener('click', function () {
        importFileInput.click();
    });

    importFileInput.addEventListener('change', importarHistorico);

    // deletar historico
    const deleteHistoryButton = document.getElementById('delete-history-button');

    deleteHistoryButton.addEventListener('click', function () {
        if (confirm("Tem certeza de que deseja deletar o histórico?")) {
            limparHistorico();
        }
    });

    // Adicionando ouvintes de eventos a botões e elementos de seleção
    addButton.addEventListener('click', adicionarLanche);
    saveButton.addEventListener('click', salvarPedido);
    historicoSelector.addEventListener('change', exibirPedidoSalvo);
    deleteButton.addEventListener('click', apagarPedido);
    clearButton.addEventListener('click', limparLista);

    // Função para adicionar um lanche à tabela de pedidos
    function adicionarLanche() {
        const lancheSelecionado = lancheSelector.value; // Obtém o valor selecionado no menu suspenso
        const valor = obterValorLanche(lancheSelecionado); // Obtém o valor do lanche

        if (lancheSelecionado !== "" || null || undefined) {
            const row = pedidoTable.insertRow(); // Insere uma nova linha na tabela de pedidos
            const cell1 = row.insertCell(0); // Insere a primeira célula na linha (lanche)
            const cell2 = row.insertCell(1); // Insere a segunda célula na linha (valor)
            cell1.innerHTML = lancheSelecionado; // Define o lanche na primeira célula
            cell2.innerHTML = `R$ ${valor}`; // Define o valor formatado na segunda célula

            // Limpar o seletor de lanches após adicionar um lanche
            lancheSelector.value = '';
        }

    }

    function obterValorLanche(nomeDoLanche) {
        const listaLanchesSalva = localStorage.getItem('listaLanches');
        if (listaLanchesSalva) {
            const lanches = JSON.parse(listaLanchesSalva);
            for (const lanche of lanches) {
                if (lanche.nome === nomeDoLanche) {
                    return parseFloat(lanche.preco);
                }
            }
        }
        return null; // Retorna null se o lanche não for encontrado
    }

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
        limparTabelaPedido(); // Limpa a tabela de pedidos após salvar o pedido
    }

    // Função para limpar a lista de lanches
    function limparLista() {
        pedidoTable.innerHTML = ''; // Limpa a tabela de pedidos
        lancheSelector.value = ''; // Limpa o seletor de lanches
    }

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

    // Função para limpar a tabela de pedidos
    function limparTabelaPedido() {
        pedidoTable.innerHTML = '';
    }

    atualizarHistoricoSelector(); // Atualiza o seletor de histórico quando a página é carregada

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

    // Função para limpar o histórico no LocalStorage
    function limparHistorico() {
        localStorage.removeItem('historicoPedidos');
        atualizarHistoricoSelector();
        historicoTable.innerHTML = '';
    }

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
    }

    // Carregar a lista de lanches
    carregarListaLanches();

    const bebidaSelector = document.getElementById('bebida-selector');
    const adicionarBebidaButton = document.getElementById('adicionar-bebida');


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

    // Função para adicionar uma bebida à tabela
    adicionarBebidaButton.addEventListener('click', function () {
        const bebidaSelecionada = bebidaSelector.value;
        const valorDaBebida = encontrarValorDaBebida(bebidaSelecionada);
        if (bebidaSelecionada !== "" || null || undefined) {
        const row = pedidoTable.insertRow(); // Insere uma nova linha na tabela de pedidos
        const cell1 = row.insertCell(0); // Insere a primeira célula na linha (lanche)
        const cell2 = row.insertCell(1); // Insere a segunda célula na linha (valor)
        cell1.innerHTML = bebidaSelecionada; // Define o lanche na primeira célula
        cell2.innerHTML = `R$ ${valorDaBebida}`; // Define o valor formatado na segunda célula

        // Limpar o seletor de lanches após adicionar um lanche
        bebidaSelector.value = '';
        }
    });

    // Função para encontrar o valor de uma bebida
    function encontrarValorDaBebida(nomeDaBebida) {
        const listaBebidasSalva = localStorage.getItem('listaBebidas');
        if (listaBebidasSalva) {
            const bebidas = JSON.parse(listaBebidasSalva);
            for (const bebida of bebidas) {
                if (bebida.nome === nomeDaBebida) {
                    return parseFloat(bebida.preco);
                }
            }
        }
        return null; // Retorna null se o lanche não for encontrado
    }
});
