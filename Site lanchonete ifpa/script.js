// Encontrar o formulário e a área de resultado
const formulario = document.getElementById("formAgendamento");
const resultado = document.getElementById("resultado");
const campoData = document.getElementById("data");

// Impedir datas anteriores a hoje
const hoje = new Date();
hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
campoData.min = hoje.toISOString().split("T")[0];

// Executar quando o formulário for enviado
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // Ler os dados preenchidos
    const nome = document.getElementById("nome").value.trim();
    const seletor = document.getElementById("produto");
    const produto = seletor.value;
    const opcao = seletor.selectedOptions[0];
    const preco = Number(opcao.dataset.preco);
    const quantidade = Number(document.getElementById("quantidade").value);
    const data = campoData.value;
    const horario = document.getElementById("horario").value;

    // Validar os campos
    if (
        !nome ||
        !produto ||
        !data ||
        !horario ||
        !Number.isInteger(quantidade) ||
        quantidade < 1 ||
        quantidade > 20 ||
        data < campoData.min
    ) {
        alert("Confira os dados do seu agendamento.");
        return;
    }

    // Calcular o valor total
    const total = preco * quantidade;

    // Formatar a data para dia/mês/ano
    const partes = data.split("-");
    const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

    // Criar o título da confirmação
    const titulo = document.createElement("h3");
    titulo.textContent = "Pedido agendado! ☕";

    const detalhes = document.createElement("div");

    // Informações que serão exibidas
    const informacoes = [
        `Cliente: ${nome}`,
        `Produto: ${produto}`,
        `Quantidade: ${quantidade}`,
        `Data da retirada: ${dataFormatada}`,
        `Horário: ${horario}`,
        `Total: ${total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}`
    ];

    // Criar um parágrafo para cada informação
    informacoes.forEach(function(texto) {
        const paragrafo = document.createElement("p");
        paragrafo.textContent = texto;
        detalhes.appendChild(paragrafo);
    });

    // Exibir o resultado
    resultado.replaceChildren(titulo, detalhes);
    resultado.hidden = false;

    // Rolar até a confirmação
    resultado.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});