let listaDeNumerosSorteados = []; // lista para armazenar os números já sorteados
let numeroLimite = 10; // limite do número secreto
let numeroSecreto = gerarNumeroAleatorio(); // gera o número secreto aleatório
let tentativas = 5; // número de tentativas


function exibirTextoNaTela(tag, texto) {

    let campo = document.querySelector(tag); // seleciona o elemento HTML
    campo.innerHTML = texto; // exibe o texto no elemento
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // fala o texto
/*
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }*/
}




function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // exibe o título do jogo
    exibirTextoNaTela('p', 'Escolha um número entre 0 e 10'); // exibe a mensagem inicial
}

exibirMensagemInicial(); // chama a função para exibir a mensagem inicial

function verificarChute() {
    let chute = parseInt(document.querySelector('input').value); // obtém o valor do chute do usuário

    if (chute === numeroSecreto) { // verifica se o chute é igual ao número secreto
        exibirTextoNaTela('h1', 'Acertou!'); // exibe mensagem de acerto
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // define a palavra no singular ou plural
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; // cria a mensagem de tentativas
        exibirTextoNaTela('p', mensagemTentativas); // exibe a mensagem de tentativas
        document.getElementById('reiniciar').removeAttribute('disabled'); // habilita o botão de reiniciar jogo
    } else { // se o chute estiver errado
        if (chute > numeroSecreto) { // verifica se o chute é maior que o número secreto
            exibirTextoNaTela('p', 'O número secreto é menor'); // exibe mensagem de dica
        } else { // se o chute for menor que o número secreto
            exibirTextoNaTela('p', 'O número secreto é maior'); // exibe mensagem de dica
        }
        tentativas--; // diminui o número de tentativas
        limparCampo(); // limpa o campo de entrada
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // gera um número aleatório entre 1 e numeroLimite
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // obtém a quantidade de números já sorteados

    if (quantidadeDeElementosNaLista === numeroLimite) { // se todos os números já foram sorteados
        listaDeNumerosSorteados = []; // reseta a lista de números sorteados
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // verifica se o número já foi sorteado
        return gerarNumeroAleatorio(); // chama a função recursivamente para gerar um novo número
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // adiciona o número à lista de sorteados
        console.log(listaDeNumerosSorteados); // exibe a lista no console
        return numeroEscolhido; // retorna o número sorteado
    }
}

function limparCampo() {
    let chute = document.querySelector('input'); // seleciona o campo de entrada
    chute.value = ''; // limpa o campo de entrada
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // gera um novo número secreto
    tentativas = 5; // reseta o número de tentativas
    listaDeNumerosSorteados = []; // reseta a lista de números sorteados
    exibirMensagemInicial(); // exibe a mensagem inicial novamente
    document.getElementById('reiniciar').setAttribute('disabled', 'true'); // desabilita o botão de reiniciar jogo
}

