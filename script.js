/* comentario com varias linhas 
let nome_variavel_let
var nome_variavel_var 
const nome_variavel // const: variavel fixa; ex:PI (o valor é sempre 3,14)

//var
if(true){
    var x = 10
}
console.log(x)

//let

if(true){
    let y = 20
    console.log(y)
}
console.log(y); */

let canvas = document.getElementById("snake");
let contexto = canvas.getContext("2d")
let caixa = 32;
let snake = [] // vetor: atribui varios valores dentro, diferente das variaveis

snake[0] ={
    x: 8 * caixa,
    y: 8 * caixa   
}

direcao = "direita";
 
let comida = { //Math.floor: 
    x: Math.floor(Math.random() * 15 + 1) * caixa,
    y: Math.floor(Math.random() * 15 + 1) * caixa
}

function criarFundo( ){
    contexto.fillStyle = "lightgreen";
    contexto.fillRect(0, 0, 16 * caixa, 16 * caixa);
}
criarFundo( );

function criarCobrinha( ){
    for (i=0; i < snake.length; i++){
        contexto.fillStyle = "blue";
        contexto.fillRect(snake[i].x, snake[i].y,caixa, caixa) 
        //contexto.fillrect() = desenha um retangulo prenchido no canvas
        //contexto.fillrect(coordenada x, coordenada y, largura, altura)
    }
}

function desenharComida(){
    contexto.fillStyle="red"
    contexto.fillRect(comida.x, comida.y,caixa, caixa)
}

document.addEventListener('keydown', atualizarDirecao);

function atualizarDirecao(evento){
    if (evento.keyCode == 37 && direcao != "direita") direcao ="esquerda";
    if (evento.keyCode == 38 && direcao != "baixo") direcao ="cima";
    if (evento.keyCode == 39 && direcao != "esquerda") direcao ="direita";
    if (evento.keyCode == 40 && direcao != "cima") direcao ="baixo";
}
function reiniciarJogo() {
    // Resetar o estado do jogo
    snake = [];
    snake[0] = {
        x: 8 * caixa,
        y: 8 * caixa
    };
    direcao = "direita";
    comida = {
        x: Math.floor(Math.random() * 15 + 1) * caixa,
        y: Math.floor(Math.random() * 15 + 1) * caixa
    };

    // Oculta a tela de fim de jogo
    document.getElementById("game-over").style.display = "none";

    // Reinicia o loop do jogo
    jogo = setInterval(iniciarJogo, 50);
}
function iniciarJogo() {
//teletransportar a cobra ao ultrapassar as bordas
    if(snake[0].x > 15 * caixa && direcao == "direita") snake[0].x=0;
    if(snake[0].x < 0 && direcao == "esquerda") snake[0].x=15 * caixa;
    if(snake[0].y > 15 * caixa && direcao == "baixo") snake[0].y=0;
    if(snake[0].y < 0 && direcao == "cima") snake[0].y = 16 * caixa;

//verificar a colisao da cabeça com o corpo
for (let i = 1; i< snake.length; i++){
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
        clearInterval(jogo)
        document.getElementById("game-over").style.display = "block";
        }
    }
    criarFundo();
    criarCobrinha();
    desenharComida();
    
    let snakeX =snake[0].x;
    let snakeY =snake[0].y;

    if (direcao == 'direita') snakeX += caixa;
    if (direcao == 'esquerda') snakeX -= caixa;
    if (direcao == 'cima') snakeY -= caixa;
    if (direcao == 'baixo') snakeY += caixa;

    //verifica se comeu a comida
    if (snakeX == comida.x && snakeY == comida.y) {
        // Comeu a comida, não remove a cauda e gera nova comida
        comida.x = Math.floor(Math.random() * 15 + 1) * caixa;
        comida.y = Math.floor(Math.random() * 15 + 1) * caixa;
    } else {
        // Não comeu, remove a cauda para movimentar
        snake.pop();
    }
    
    let novaCabeca = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(novaCabeca);

}

let jogo = setInterval(iniciarJogo, 100); 