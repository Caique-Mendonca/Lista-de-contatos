let contador = 0
let contadorTarefa = 0
let todosOsContatos = []
let botaoAdicionarContato = document.querySelector(".botao-add-contato")
botaoAdicionarContato.addEventListener('click', ()=>{
    let inputArea = document.querySelector(".input-area")
    if (contador%2 == 0) {
        inputArea.classList.remove("input-area-animation-top")
        inputArea.classList.add("input-area-animation-down")
    }
    else if (contador%2 !== 0){
        inputArea.classList.remove("input-area-animation-down")
        inputArea.classList.add("input-area-animation-top")
    }
    contador ++
})

let adicionarContato = document.querySelector(".botao-adicionar")
adicionarContato.addEventListener('click', (e)=>{
    try {
        e.preventDefault()
        let inputNome = document.querySelector("#input-nome").value
        let inputNumero = document.querySelector("#input-numero").value
        let inputEmail = document.querySelector("#input-email").value

        console.log(inputNome);
        console.log(inputNumero);
        console.log(inputEmail);

        contadorTarefa ++

        let listaDeContatos = document.querySelector(".contatos")
        listaDeContatos.innerHTML += `
        <li class="contato" id='contato-${contadorTarefa}'>
            <div>
                <img src="Img/user_placeholder.png" alt="User imagem" class="imagem-usuario">
            </div>
            <div style="display: flex; flex-direction: column; margin-left: 8px;">
                <p class="nome-lista">${inputNome}</p>
                <p class="numero-lista">${inputNumero}</p>
            </div>
        </li>`

        let novoContato ={
            id: contadorTarefa,
            nome: inputNome,
            numero: inputNumero,
            email: inputEmail,
            idHtml: `contato-${contadorTarefa}`
        }

        todosOsContatos.push(novoContato)

        document.querySelector("#input-nome").value = ""
        document.querySelector("#input-numero").value = ""
        document.querySelector("#input-email").value = ""

    } catch (error) {
        mensagemErro(error)
    }
})


function formatarNumero(input) {
    // Remove todos os caracteres não numéricos do número de telefone
    let numeroLimpo = ('' + input.value).replace(/\D/g, '');
    
    // Formatação do número de telefone com traços e colchetes, considerando DDI
    let formatado = '';
    if (numeroLimpo.length > 11) { // Se tiver mais de 11 dígitos, inclui DDI
        formatado = numeroLimpo.replace(/(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})/, '+$1 ($2) $3$4-$5');
    } else if (numeroLimpo.length === 11) { // Números nacionais com 9
        formatado = numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    else if (numeroLimpo.length === 10) { // Números nacionais
        formatado = numeroLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        formatado = numeroLimpo;
    }
    // Define o valor formatado de volta no campo de entrada
    input.value = formatado;
}

function mensagemErro(erro){
    console.error(erro)
}