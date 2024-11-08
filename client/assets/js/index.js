
// botoes nova tarefa
const buttonAdd = document.getElementById("button-newtask")
const buttonCancelar = document.getElementById("btn-cancelar")
const buttonSalvar = document.getElementById("btn-salvar")
const newTask = document.getElementById("new-task")

//botoes editar tarefa
const editTask = document.getElementById("edit-task")
const buttonEdit = document.getElementById("btn-edit-task")
const buttonCancel = document.getElementById("button-cancelar")


buttonEdit.onclick = function () {
    editTask.showModal()
}

buttonCancel.onclick = function () {
    editTask.close()
}

buttonAdd.onclick = function () {
    newTask.showModal()
}

buttonCancelar.onclick = function () {
    newTask.close()
}
    
buttonSalvar.addEventListener("click", function (event) {
    event.preventDefault(); 
    createTask();
});

document.getElementById("edit-data").addEventListener("input", function(event) {
    let valor = event.target.value;
    
    // Remove todos os caracteres não numéricos
    valor = valor.replace(/\D/g, '');

    // Impede a digitação de mais de 8 caracteres
    if (valor.length > 8) {
        valor = valor.substring(0, 8); // Limita a 8 caracteres
    }

    // Formata a data automaticamente com as barras em tempo real
    if (valor.length <= 2) {
        valor = valor.replace(/(\d{2})(\d+)/, '$1/$2'); // Adiciona a barra após o dia
    } else if (valor.length <= 4) {
        valor = valor.replace(/(\d{2})(\d{2})(\d+)/, '$1/$2/$3'); // Adiciona a barra após o mês
    } else {
        valor = valor.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); // Adiciona a barra após o ano
    }

    // Atualiza o valor do campo com a data formatada
    event.target.value = valor;
});

document.getElementById("task-deadline").addEventListener("input", function(event) {
    let valor = event.target.value;
    
    // Remove todos os caracteres não numéricos
    valor = valor.replace(/\D/g, '');

    // Impede a digitação de mais de 8 caracteres
    if (valor.length > 8) {
        valor = valor.substring(0, 8); // Limita a 8 caracteres
    }

    // Formata a data automaticamente com as barras em tempo real
    if (valor.length <= 2) {
        valor = valor.replace(/(\d{2})(\d+)/, '$1/$2'); // Adiciona a barra após o dia
    } else if (valor.length <= 4) {
        valor = valor.replace(/(\d{2})(\d{2})(\d+)/, '$1/$2/$3'); // Adiciona a barra após o mês
    } else {
        valor = valor.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); // Adiciona a barra após o ano
    }

    // Atualiza o valor do campo com a data formatada
    event.target.value = valor;
});



document.getElementById("edit-cost").addEventListener("input", function(event) {
    let valor = event.target.value;

    // Remove caracteres não numéricos, exceto ponto e vírgula
    valor = valor.replace(/[^0-9,\.]/g, '');

    // Substitui a vírgula por ponto, pois o float usa ponto como separador decimal
    valor = valor.replace(',', '.');

    // Verifica se o valor é válido como número float
    if (!validarFloat(valor)) {
        event.target.setCustomValidity("Por favor, insira um número válido.");
    } else {
        event.target.setCustomValidity("");
    }

    // Atualiza o valor do campo com a entrada limpa e convertida
    event.target.value = valor;
});

document.getElementById("task-cost").addEventListener("input", function(event) {
    let valor = event.target.value;

    // Remove caracteres não numéricos, exceto ponto e vírgula
    valor = valor.replace(/[^0-9,\.]/g, '');

    // Substitui a vírgula por ponto, pois o float usa ponto como separador decimal
    valor = valor.replace(',', '.');

    // Verifica se o valor é válido como número float
    if (!validarFloat(valor)) {
        event.target.setCustomValidity("Por favor, insira um número válido.");
    } else {
        event.target.setCustomValidity("");
    }

    // Atualiza o valor do campo com a entrada limpa e convertida
    event.target.value = valor;
});

function validarFloat(valor) {
    // Regex para validar números decimais com ponto (permitindo apenas um ponto)
    const regexFloat = /^[+-]?\d+(\.\d+)?$/;
    return regexFloat.test(valor);
}


function validarData(valor) {
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    return regexData.test(valor);
}

document.getElementById("btn-salvar").addEventListener("click", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    let nome = document.getElementById("task-name").value;
    let custo = document.getElementById("task-cost").value;
    let data = document.getElementById("task-deadline").value;

    let erros = [];

    if (nome.trim() === "") {
        erros.push("Nome está vazio.");
    }

    if (!validarFloat(custo)) {
        erros.push("Custo está inválido.");
    }

    if (!validarData(data)) {
        erros.push("Data está inválida.");
    }

    if (erros.length > 0) {
        alert("Os seguintes campos estão incorretos:\n\n" + erros.join("\n"));
    }
});