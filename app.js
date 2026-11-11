// Armazenamento em memória: array de objetos da classe Funcionario
let funcionarios = [];
let proximoId = 1;
let idEdicao = null; // null = cadastrando; número = editando

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

function limparFormulario() {
  document.getElementById("formFuncionario").reset();
  idEdicao = null;
  btnSalvar.textContent = "Cadastrar";
  btnCancelar.hidden = true;
}

// funções de manipulação do array (versão tradicional, com for)
function buscarPorId(id) {
  for (let i = 0; i < funcionarios.length; i++) {
    if (funcionarios[i].id === id) return funcionarios[i];
  }
  return null;
}

function removerPorId(id) {
  for (let i = 0; i < funcionarios.length; i++) {
    if (funcionarios[i].id === id) {
      funcionarios.splice(i, 1);
      return;
    }
  }
}

// onclick com função anônima
btnSalvar.onclick = function () {
  const nome = document.getElementById("nome").value.trim();
  const idade = document.getElementById("idade").value;
  const cargo = document.getElementById("cargo").value.trim();
  const salario = document.getElementById("salario").value;

  if (nome === "" || idade === "" || cargo === "" || salario === "") {
    alert("Preencha todos os campos.");
    return;
  }

  if (idEdicao === null) {
    funcionarios.push(new Funcionario(proximoId++, nome, Number(idade), cargo, Number(salario)));
  } else {
    // atualiza usando os setters da classe
    const f = buscarPorId(idEdicao);
    f.nome = nome;
    f.idade = Number(idade);
    f.cargo = cargo;
    f.salario = Number(salario);
  }

  limparFormulario();
  renderizarTabela();
};

btnCancelar.onclick = function () {
  limparFormulario();
};

function renderizarTabela() {
  const tbody = document.getElementById("tabelaFuncionarios");
  tbody.innerHTML = "";

  for (let i = 0; i < funcionarios.length; i++) {
    const f = funcionarios[i];
    const tr = document.createElement("tr");

    const valores = [f.id, f.nome, f.idade, f.cargo, f.salarioFormatado()];
    for (let j = 0; j < valores.length; j++) {
      const td = document.createElement("td");
      td.textContent = valores[j];
      tr.appendChild(td);
    }

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = function () {
      // carrega os dados no formulário
      document.getElementById("nome").value = f.nome;
      document.getElementById("idade").value = f.idade;
      document.getElementById("cargo").value = f.cargo;
      document.getElementById("salario").value = f.salario;
      idEdicao = f.id;
      btnSalvar.textContent = "Salvar alterações";
      btnCancelar.hidden = false;
    };

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = function () {
      if (confirm("Excluir " + f.nome + "?")) {
        removerPorId(f.id);
        if (idEdicao === f.id) limparFormulario();
        renderizarTabela();
      }
    };

    const tdAcoes = document.createElement("td");
    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(document.createTextNode(" "));
    tdAcoes.appendChild(btnExcluir);
    tr.appendChild(tdAcoes);

    tbody.appendChild(tr);
  }
}

renderizarTabela();
