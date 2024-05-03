let contador = 0 // contador para alterar a animação da inputArea
let contadorTarefa = 0 // contador para contar os contatos
let todosOsContatos = []

window.onload = function(){
    try {
        let contatosArmazenados = localStorage.getItem('contatos')
        if(contatosArmazenados){
            todosOsContatos = JSON.parse(contatosArmazenados)
            contadorTarefa = todosOsContatos.length
            exibirContatos()
        }
        contador = 1
    } catch (error) {
        mensagemErro(error)
    }
} 

function exibirContatos(){
    let listaDeContatos = document.querySelector(".contatos")
    listaDeContatos.innerHTML = ''
    todosOsContatos.forEach((contato)=>{
        listaDeContatos.innerHTML += `
        <li class="contato" id='${contato.id}'>
            <div style="display:flex;">
                <div>
                    <img src="Img/user_placeholder.png" alt="User imagem" class="imagem-usuario">
                </div>
                <div style="display: flex; flex-direction: column; margin-left: 8px;">
                    <p class="nome-lista">${contato.nome}</p>
                    <p class="numero-lista">${contato.numero}</p>
                </div>
            </div>
            <div>
                <i class='fa-solid fa-trash-can botao-excluir' onclick="deletarContato('${contato.id}')" style="margin: 5px"></i>
                <i class="fa-solid fa-pen botao-editar" style="margin: 5px"></i>
            </div>
        </li>`
    })
}

let botaoAdicionarContato = document.querySelector(".botao-add-contato")
botaoAdicionarContato.addEventListener('click', ()=>{
    let inputArea = document.querySelector(".input-area")
    if (contador%2 == 0) {
        inputArea.classList.remove("input-area-animation-down")
        inputArea.classList.add("input-area-animation-top")
    }
    else if (contador%2 !== 0){
        inputArea.classList.remove("input-area-animation-top")
        inputArea.classList.add("input-area-animation-down")
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
        if(inputNome && inputNumero && inputEmail){
            document.querySelector("#erro").innerText = ""
        }
        if(!inputNome || !inputNumero || !inputEmail){
            throw "Preencha todas as informações"
        }
        contadorTarefa ++

        let listaDeContatos = document.querySelector(".contatos")
        listaDeContatos.innerHTML += `
        <li class="contato" id='contato-${contadorTarefa}'>
            <div style="display:flex;">
                <div>
                    <img src="Img/user_placeholder.png" alt="User imagem" class="imagem-usuario">
                </div>
                <div style="display: flex; flex-direction: column; margin-left: 8px;">
                    <p class="nome-lista">${inputNome}</p>
                    <p class="numero-lista">${inputNumero}</p>
                </div>
            </div>
            <div>
                <i class='fa-solid fa-trash-can botao-excluir' onclick="deletarContato('contato-${contadorTarefa}')" style="margin: 5px"></i>
                <i class="fa-solid fa-pen botao-editar" style="margin: 5px"></i>
            </div>
        </li>`

        let novoContato ={
            nome: inputNome,
            numero: inputNumero,
            email: inputEmail,
            id: `contato-${contadorTarefa}`
        }

        todosOsContatos.push(novoContato)

        document.querySelector("#input-nome").value = ""
        document.querySelector("#input-numero").value = ""
        document.querySelector("#input-email").value = ""
        
        let inputArea = document.querySelector(".input-area")
        inputArea.classList.add("input-area-animation-top")
        inputArea.classList.remove("input-area-animation-down")
        contador +=1 // impedir que eu clique 2 vezes pra aparecer o inputArea
        // Armazenando os contatos no localStorage
        localStorage.setItem('contatos', JSON.stringify(todosOsContatos))
    } catch (error) {
        mensagemErro(error)
    }
})

function deletarContato(id) {
    try{
        // Removendo o contato do html
        let tarefaRemover = document.querySelector(`#${id}`)
        tarefaRemover.remove()
        // Removendo o contato do localStrorage
        todosOsContatos = todosOsContatos.filter(contato => contato.id !== id)
        localStorage.setItem('contatos', JSON.stringify(todosOsContatos))
    }
    catch(error){
        mensagemErro(error)
    }
}

// Formatar o número de telefone
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
    document.querySelector("#erro").innerText = "Erro: "+erro
}