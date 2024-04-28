let contador = 0
let botaoAdicionarContato = document.querySelector(".botao-add-contato")
botaoAdicionarContato.addEventListener('click', ()=>{
    let inputArea = document.querySelector(".input-area")
    if (contador%2== 0) {
        inputArea.classList.remove("input-area-animation-top")
        inputArea.classList.add("input-area-animation-down")
    }
    else if (contador%2 !== 0){
        inputArea.classList.remove("input-area-animation-down")
        inputArea.classList.add("input-area-animation-top")
    }
    contador ++
})



function formatarNumero(input) {
    // Remove todos os caracteres não numéricos do número de telefone
    var numeroLimpo = ('' + input.value).replace(/\D/g, '');
    
    // Formatação do número de telefone com traços e colchetes, considerando DDI
    var formatado = '';
    if (numeroLimpo.length > 11) { // Se tiver mais de 11 dígitos, inclui DDI
        formatado = numeroLimpo.replace(/(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})/, '+$1 ($2) $3 $4-$5');
    } else if (numeroLimpo.length === 11) { // Números nacionais com 9
        formatado = numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    else if (numeroLimpo.length === 10) { // Números nacionais
        formatado = numeroLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        formatado = numeroLimpo;
    }
    
    // Define o valor formatado de volta no campo de entrada
    input.value = formatted;
}