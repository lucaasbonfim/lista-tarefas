
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
