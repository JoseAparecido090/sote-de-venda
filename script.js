// Dados dos produtos
const produtos = [
    { id: 1, nome: "Smartphone Ultra V10", preco: 2599.90, descricao: "Câmera 50MP, 8GB RAM.", imagem: "smartphone.png" },
    { id: 2, nome: "Notebook Gamer X Pro", preco: 6800.00, descricao: "Core i7, RTX 4060.", imagem: "notebook.png" },
    { id: 3, nome: "Smartwatch Fit 2.0", preco: 450.50, descricao: "Monitoramento cardíaco e sono.", imagem: "smartwatch.png" },
    { id: 4, nome: "Fone Bluetooth Cancelamento", preco: 799.00, descricao: "Áudio Hi-Fi e ANC.", imagem: "fone.png" }
];

// Carrinho (Usaremos localStorage para manter o carrinho após o refresh da página)
let carrinho = JSON.parse(localStorage.getItem('carrinhoTechStore')) || [];

// Elementos do DOM
const produtosDiv = document.getElementById('produtos');
const contadorCarrinhoSpan = document.getElementById('contador-carrinho');
const listaCarrinhoUl = document.getElementById('lista-carrinho');
const totalCarrinhoSpan = document.getElementById('total-carrinho');
const modalCarrinho = document.getElementById('modal-carrinho');
const btnVerCarrinho = document.getElementById('ver-carrinho');
const btnFecharModal = document.querySelector('.modal-conteudo .fechar');
const btnFinalizarCompra = document.getElementById('finalizar-compra');

// --- Funções de Renderização e Atualização ---

/**
 * Renderiza todos os produtos na vitrine.
 */
function renderizarProdutos() {
    produtosDiv.innerHTML = ''; 
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('produto-card');
        
        // Simulação de imagem - em um projeto real, você precisaria criar a pasta 'img'
        // e adicionar imagens com os nomes: smartphone.png, notebook.png, etc.
        card.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
            <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
        `;
        produtosDiv.appendChild(card);
    });
}

/**
 * Salva o carrinho no Local Storage do navegador.
 */
function salvarCarrinho() {
    localStorage.setItem('carrinhoTechStore', JSON.stringify(carrinho));
}

/**
 * Atualiza o conteúdo do modal do carrinho e os totais.
 */
function atualizarCarrinhoUI() {
    listaCarrinhoUl.innerHTML = '';
    let total = 0;
    let totalItens = 0;

    carrinho.forEach(item => {
        const precoItem = item.produto.preco * item.quantidade;
        total += precoItem;
        totalItens += item.quantidade;

        const li = document.createElement('li');
        li.innerHTML = `
            ${item.produto.nome} (${item.quantidade}x)
            <span>R$ ${precoItem.toFixed(2)}</span>
        `;
        listaCarrinhoUl.appendChild(li);
    });

    // Atualiza o total e o contador no header
    totalCarrinhoSpan.textContent = total.toFixed(2);
    contadorCarrinhoSpan.textContent = totalItens;

    // Habilita/Desabilita o botão de finalizar
    btnFinalizarCompra.disabled = carrinho.length === 0;

    salvarCarrinho();
}

// --- Funções de Lógica do Carrinho ---

/**
 * Adiciona um produto ao carrinho.
 * @param {number} produtoId - O ID do produto a ser adicionado.
 */
function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;

    const itemExistente = carrinho.find(item => item.produto.id === produtoId);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ produto: produto, quantidade: 1 });
    }

    alert(`${produto.nome} adicionado!`);
    atualizarCarrinhoUI();
}

/**
 * Simula a finalização da compra (em um site real, esta etapa processaria o pagamento).
 */
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const total = totalCarrinhoSpan.textContent;
    alert(`🎉 Pedido Recebido!
    Total: R$ ${total}.
    Agradecemos sua compra na TechStore!
    (Em um sistema real, você seria redirecionado para a página de pagamento.)`);

    // Limpa o carrinho e fecha o modal
    carrinho = [];
    atualizarCarrinhoUI();
    modalCarrinho.style.display = 'none'; 
}

// --- Event Listeners ---

btnVerCarrinho.addEventListener('click', () => {
    modalCarrinho.style.display = 'block';
    atualizarCarrinhoUI(); // Garantir que o modal esteja atualizado ao abrir
});

btnFecharModal.addEventListener('click', () => {
    modalCarrinho.style.display = 'none';
});

btnFinalizarCompra.addEventListener('click', finalizarCompra);

// Fecha o modal se o usuário clicar fora da área de conteúdo
window.addEventListener('click', (event) => {
    if (event.target === modalCarrinho) {
        modalCarrinho.style.display = 'none';
    }
});

// Inicialização: Chama as funções para carregar o site
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    atualizarCarrinhoUI(); 
});