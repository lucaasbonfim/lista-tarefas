
window.onload = () => {
    get_task();
}


async function get_task() {
    try {
        const response = await fetch(`${window.location.origin}/api/task`);

        if (response.status === 200) {
            let tarefas = await response.json();

            tarefas.sort((a, b) => a.order - b.order);

            if (tarefas.length === 0) {
                document.querySelector("#no_task").classList.remove("d-none");
            } else {
                document.querySelector('#tasks-container').innerHTML = '';

                tarefas.forEach(tarefa => {
                    const taskRow = document.createElement('div');
                    taskRow.classList.add('row', 'mb-3');

                    taskRow.innerHTML = `
                        <div class="col-12 border border-secondary rounded p-3 shadow">
                            <div class="row h5 align-items-center">
                                <div class="col">${tarefa.name}</div>
                                <div class="col">R$${tarefa.cost}</div>
                                <div class="col">${new Date(tarefa.deadline).toLocaleDateString('pt-BR')}</div>
                                <div class="col-1 text-info">
                                    <i class="fa-solid fa-circle-arrow-up edit_link" onclick="order_task_up('${tarefa.id}')"></i>
                                </div>
                                <div class="col-1 text-info">
                                    <i class="fa-solid fa-circle-arrow-down edit_link" onclick="order_task_down('${tarefa.id}')"></i>
                                </div>
                                <div class="col-1">
                                    <a href="#" id="btn-edit-task" class="">
                                        <i class="fa-solid fa-pen-to-square edit_link" onclick="edit_task('${tarefa.id}')"></i>
                                    </a>
                                </div>
                                <div class="col-1 text-danger">
                                    <i class="fa-solid fa-trash edit_link delete-button" data-id-task="${tarefa.id}"></i>
                                </div>
                            </div>
                        </div>
                    `;

                    document.querySelector("#tasks-container").appendChild(taskRow);
                });

                document.querySelector("#tasks-container").classList.remove("d-none");

                document.querySelectorAll(".delete-button").forEach(button => {
                    button.addEventListener("click", function () {
                        delete_task(this.getAttribute("data-id-task"));
                    });
                });
            }
        } else {
            console.log('Erro ao buscar as tarefas');
        }
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
    }
}

async function createTask() {
    const name = document.getElementById("task-name").value.trim() || null;
    const cost = document.getElementById("task-cost").value.trim() || null;
    const deadline = document.getElementById("task-deadline").value.trim() || null;


    const taskData = {
        name,
        cost,
        deadline
    };

    console.log(taskData)

    try {
        const response = await fetch('http://localhost:3000/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        console.log(response);

        if (!response.ok) {
            throw new Error("Erro ao criar a tarefa");
        }

        document.getElementById("new-task").close();
        await get_task();
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
    }
}


async function edit_task(id) {
    try {
        const response = await fetch(`http://localhost:3000/task/${id}`);
        
        if (!response.ok) {
            throw new Error("Erro ao buscar a tarefa");
        }

        const task = await response.json();

        let nome = document.getElementById("edit-name");
        let custo = document.getElementById("edit-cost");
        let data = document.getElementById("edit-data");

        nome.value = task.name;
        custo.value = task.cost;
        data.value = new Date(task.deadline).toLocaleDateString('pt-BR');

        document.querySelector("#edit-task").showModal();

        const bottonAtualizar = document.getElementById("btn_atualizar");

        bottonAtualizar.onclick = async function () {

            nome = document.getElementById("edit-name");
            custo = document.getElementById("edit-cost");
            data = document.getElementById("edit-data");

            let erros = [];

            if (nome.value.trim() === "") {
                erros.push("Nome está vazio.");
            }
        
            // Valida o campo de custo (precisa ser um número válido)
            if (!validarFloat(custo.value)) {
                erros.push("Custo está inválido.");
            }
        
            // Valida o campo de data (precisa ser no formato DD/MM/YYYY)
            if (!validarData(data.value)) {
                erros.push("Data está inválida.");
            }

            if (erros.length > 0) {
                alert("Os seguintes campos estão incorretos:\n\n" + erros.join("\n"));
                return 0;
            }            

            const dados = {
                name: nome.value,
                cost: custo.value,
                deadline: data.value
            };

            const json = JSON.stringify(dados);

            try {
                const updateResponse = await fetch(`http://localhost:3000/task/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'  
                    },
                    body: json  
                });

                if (updateResponse.ok) {
                    document.querySelector("#edit-task").close();
                    console.log("Tarefa atualizada com sucesso");
                    window.location.reload();
                } else {
                    alert("Nome da tarefa já existe!");
                    console.error("Erro ao atualizar a tarefa");
                }

            } catch (error) {
                console.error("Erro ao realizar a requisição PUT:", error);
            }
        }

    } catch (error) {
        console.error("Erro ao editar a tarefa:", error);
    }
}


function delete_task(id) {
    const deleteConfirm = document.getElementById("delete-task-confirm");
    const buttonConfirm = document.getElementById("btn_confirmar");
    const buttonCancelar = document.getElementById("button-cancelar");

    deleteConfirm.showModal();

    buttonConfirm.onclick = async function () {
        console.log("Excluindo tarefa com ID:", id);

        try {
            const response = await fetch(`http://localhost:3000/task/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log(`Tarefa com ID ${id} deletada com sucesso.`);
                deleteConfirm.close();
                get_task();
            } else {
                throw new Error("Erro ao deletar a tarefa");
            }
        } catch (error) {
            console.error("Erro ao realizar a exclusão:", error);
        }
    };

    buttonCancelar.onclick = function () {
        deleteConfirm.close();
    };
}

async function order_task_down(id) {
    try {
        // Busca todas as tarefas
        const response = await fetch(`http://localhost:3000/task`);
        
        if (!response.ok) {
            throw new Error("Erro ao buscar as tarefas");
        }

        const tarefas = await response.json();

        // Busca a tarefa atual
        const task = tarefas.find(t => t.id === id);
        
        if (!task) {
            console.log("Tarefa não encontrada.");
            return;
        }

        // Verifica se é a última tarefa
        const isLastTask = task.order === Math.max(...tarefas.map(t => t.order));

        if (isLastTask) {
            console.log("Essa já é a última tarefa!");
        } else {
            // Busca a próxima tarefa com o próximo valor de "order"
            const nextTask = tarefas.find(t => t.order === task.order + 1);
            
            if (nextTask) {
                // Inverte os valores de "order" entre a tarefa atual e a próxima
                const updatedTask = { ...task, order: nextTask.order };
                const updatedNextTask = { ...nextTask, order: task.order };

                // Atualiza a tarefa atual
                await fetch(`http://localhost:3000/task/${task.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedTask)
                });

                // Atualiza a próxima tarefa
                await fetch(`http://localhost:3000/task/${nextTask.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedNextTask)
                });

                window.location.reload();
                console.log("Ordem das tarefas atualizada com sucesso!");
            } else {
                console.log("Próxima tarefa não encontrada.");
            }
        }
    } catch (error) {
        console.error("Erro ao atualizar a ordem das tarefas:", error);
    }
}

async function order_task_up(id) {
    try {
        // Busca todas as tarefas
        const response = await fetch(`http://localhost:3000/task`);
        
        if (!response.ok) {
            throw new Error("Erro ao buscar as tarefas");
        }

        const tarefas = await response.json();

        // Verifica se existe apenas uma tarefa
        if (tarefas.length === 1) {
            console.log("Existe apenas uma tarefa, nada para ordenar.");
            return;
        }

        // Busca a tarefa atual
        const task = tarefas.find(t => t.id === id);
        
        if (!task) {
            console.log("Tarefa não encontrada.");
            return;
        }

        // Verifica se é a primeira tarefa
        const isFirstTask = task.order === Math.min(...tarefas.map(t => t.order));

        if (isFirstTask) {
            console.log("Essa já é a primeira tarefa!");
        } else {
            // Busca a tarefa anterior com o valor de "order" imediatamente menor
            const previousTask = tarefas.find(t => t.order === task.order - 1);
            
            if (previousTask) {
                // Inverte os valores de "order" entre a tarefa atual e a anterior
                const updatedTask = { ...task, order: previousTask.order };
                const updatedPreviousTask = { ...previousTask, order: task.order };

                // Atualiza a tarefa atual
                await fetch(`http://localhost:3000/task/${task.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedTask)
                });

                // Atualiza a tarefa anterior
                await fetch(`http://localhost:3000/task/${previousTask.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedPreviousTask)
                });

                window.location.reload();
                console.log("Ordem das tarefas atualizada com sucesso!");
            } else {
                console.log("Tarefa anterior não encontrada.");
            }
        }
    } catch (error) {
        console.error("Erro ao atualizar a ordem das tarefas:", error);
    }
}
