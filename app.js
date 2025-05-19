let numeroLimite = 100;
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();

let tentativas = 1;

function exibirTextoTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

}

function exibirTextoMenu() {

    exibirTextoTela('h1', 'Jogo do número Secreto');
    exibirTextoTela('p', 'Escolha um  número entre 1 e ' + numeroLimite);
    console.log(numeroSecreto);

}

exibirTextoMenu();

function verificarChute() {

    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'Tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa} !`;
        exibirTextoTela('h1', 'Acertou !');
        exibirTextoTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled')


    }
    else {

        if (chute < numeroSecreto) {

            exibirTextoTela('p', 'O número secreto é maior');

        }
        else {
            exibirTextoTela('p', 'O número secreto é menor');
        }
        tentativas++;
        limparCampo();
    }
}

function novoJogo() {

    limparCampo();
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirTextoMenu();
    document.getElementById('reiniciar').setAttribute('disabled', true);


}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
        console.log('Lista limpa')

    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //.includes comando para validar se existe o item na lista
        return gerarNumeroAleatorio();
    }
    else {
        listaDeNumerosSorteados.push(numeroEscolhido); //push comando para colocar item na lista
        console.log(`Numeros da lista ${listaDeNumerosSorteados}`);
        return numeroEscolhido;

    }

}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';

}