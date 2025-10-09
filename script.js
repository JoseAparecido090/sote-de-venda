// Dados dos produtos (simulando um "backend")
const produtos = [
    { id: 1, nome: "Camiseta de Algodão", preco: 49.90, descricao: "Camiseta básica de alta qualidade." },
    { id: 2, nome: "Calça Jeans Slim", preco: 129.90, descricao: "Jeans moderno e confortável." },
    { id: 3, nome: "Tênis Esportivo", preco: 199.99, descricao: "Ideal para corrida e atividades físicas." },
    { id: 4, nome: "Moletom com Capuz", preco: 99.50, descricao: "Quentinho e estiloso para o inverno." }
];

let carrinho = [];

const produtosDiv = document.getElementById('produtos');
const contadorCarrinhoSpan = document.getElementById('contador-carrinho');
const listaCarrinhoUl = document.getElementById('lista-carrinho');
const totalCarrinhoSpan = document.getElementById('total-carrinho');
const modalCarrinho = document.getElementById('modal-carrinho');
const btnVerCarrinho = document.getElementById('ver-carrinho');
const btnFecharModal = document.querySelector('.modal-conteudo .fechar');
const btnFinalizarCompra = document.getElementById('finalizar-compra');

// --- Funções de Renderização ---

function renderizarProdutos() {
    produtosDiv.innerHTML = ''; // Limpa a vitrine
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('produto-card');
        card.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
            <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
        `;
        produtosDiv.appendChild(card);
    });
}

function atualizarCarrinhoUI() {
    listaCarrinhoUl.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        const li = document.createElement('li');
        const precoItem = item.produto.preco * item.quantidade;
        total += precoItem;

        li.innerHTML = `
            ${item.produto.nome} (${item.quantidade}x)
            <span>R$ ${precoItem.toFixed(2)}</span>
        `;
        listaCarrinhoUl.appendChild(li);
    });

    // Atualiza o total e o contador no header
    totalCarrinhoSpan.textContent = total.toFixed(2);
    contadorCarrinhoSpan.textContent = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

    // Habilita/Desabilita o botão de finalizar
    btnFinalizarCompra.disabled = carrinho.length === 0;
}

// --- Funções de Lógica do Carrinho ---

function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;

    const itemExistente = carrinho.find(item => item.produto.id === produtoId);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ produto: produto, quantidade: 1 });
    }

    alert(`${produto.nome} foi adicionado ao carrinho!`);
    atualizarCarrinhoUI();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const total = totalCarrinhoSpan.textContent;
    alert(`Compra finalizada! Total: R$ ${total}. (Em um site real, esta etapa integraria um sistema de pagamento.)`);

    // Limpa o carrinho após a "compra"
    carrinho = [];
    atualizarCarrinhoUI();
    modalCarrinho.style.display = 'none'; // Fecha o modal
}

// --- Event Listeners ---

btnVerCarrinho.addEventListener('click', () => {
    modalCarrinho.style.display = 'block';
});

btnFecharModal.addEventListener('click', () => {
    modalCarrinho.style.display = 'none';
});

btnFinalizarCompra.addEventListener('click', finalizarCompra);

// Fecha o modal se o usuário clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === modalCarrinho) {
        modalCarrinho.style.display = 'none';
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    atualizarCarrinhoUI(); // Inicializa o contador
});