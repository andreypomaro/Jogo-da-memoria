const grid = document.querySelector('.grid');

const personagens = [
  'bulma',
  'freeza',
  'gohan',
  'gokuadulto',
  'gokucrianca',
  'kuririn',
  'mestrekami',
  'piccolo',
  'trunks',
  'vegeta'
]

const criarElemento = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let primeiraCarta = '';
let segundaCarta = '';

const checarFinal = () => {
  const desabilitar = document.querySelectorAll('.desabilitar-carta');

  if (desabilitar.length === 20) {
    alert('Parabéns, Você Venceu! De Ok e recarregue a pagina para reiniciar o jogo')
  }
}

const checarCartas = () => {
  const primeiroPersonagem = primeiraCarta.getAttribute('nome-personagem');
  const segundoPersonagem = segundaCarta.getAttribute('nome-personagem');

  if (primeiroPersonagem === segundoPersonagem) {
    primeiraCarta.firstChild.classList.add('desabilitar-carta');
    segundaCarta.firstChild.classList.add('desabilitar-carta');
    primeiraCarta = '';
    segundaCarta = '';

    checarFinal();

  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove('revelarCarta');
      segundaCarta.classList.remove('revelarCarta');

      primeiraCarta = '';
      segundaCarta = '';
    }, 500)

  }
}

const revelarCarta = ({ target }) => {

  if (target.parentNode.className.includes('revelarCarta')) {
    return;
  }

  if (primeiraCarta === '') {
    target.parentNode.classList.add('revelarCarta');
    primeiraCarta = target.parentNode;

  } else if (segundaCarta === '') {
    target.parentNode.classList.add('revelarCarta');
    segundaCarta = target.parentNode;

    checarCartas();
  }

}

const criarCarta = (personagem) => {
  const cartao = criarElemento('div', 'cartao');
  const frente = criarElemento('div', 'face frente');
  const costa = criarElemento('div', 'face costa');

  frente.style.backgroundImage = `url('/assets/img/${personagem}.jpg')`;

  cartao.appendChild(frente);
  cartao.appendChild(costa);

  cartao.addEventListener('click', revelarCarta)

  cartao.setAttribute('nome-personagem', personagem)

  return cartao;
}

const loadGame = () => {

  const personagemDuplicado = [...personagens, ...personagens];

  const sortearPersonagens = personagemDuplicado.sort(() => Math.random() - 0.5);


  sortearPersonagens.forEach((personagem) => {
    const carta = criarCarta(personagem);
    grid.appendChild(carta);
  });
}

loadGame();