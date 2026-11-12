// Armazenamento em memória: array de objetos da classe Funcionario
let funcionarios = [];
let proximoId = 1;
let idEdicao = null; // null = cadastrando; número = editando

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const campoBusca = document.getElementById("campoBusca");
const tabela = document.getElementById("tabelaFuncionarios");
const campos = {
  nome: document.getElementById("nome"),
  idade: document.getElementById("idade"),
  cargo: document.getElementById("cargo"),
  salario: document.getElementById("salario"),
};

// ---------- Funções lambda (arrow) de manipulação do array ----------
const buscarPorId = (id) => funcionarios.find((f) => f.id === id);
const buscarPorNome = (texto) =>
  funcionarios.filter((f) => f.nome.toLowerCase().includes(texto.toLowerCase()));
const adicionar = (d) =>
  funcionarios.push(new Funcionario(proximoId++, d.nome, d.idade, d.cargo, d.salario));
const atualizar = (id, d) => {
  const f = buscarPorId(id);
  f.nome = d.nome;
  f.idade = d.idade;
  f.cargo = d.cargo;
  f.salario = d.salario;
};
const remover = (id) => {
  funcionarios = funcionarios.filter((f) => f.id !== id);
};

// ---------- Auxiliares (arrow) ----------
const lerFormulario = () => ({
  nome: campos.nome.value.trim(),
  idade: Number(campos.idade.value),
  cargo: campos.cargo.value.trim(),
  salario: Number(campos.salario.value),
});

const formularioValido = () =>
  campos.nome.value.trim() !== "" &&
  campos.idade.value !== "" &&
  campos.cargo.value.trim() !== "" &&
  campos.salario.value !== "";

const limparFormulario = () => {
  document.getElementById("formFuncionario").reset();
  idEdicao = null;
  btnSalvar.textContent = "Cadastrar";
  btnCancelar.hidden = true;
};

// ---------- Renderização ----------
const renderizarTabela = (lista = funcionarios) => {
  tabela.innerHTML = "";

  lista.forEach((f) => {
    const tr = document.createElement("tr");

    [f.id, f.nome, f.idade, f.cargo, f.salarioFormatado()].forEach((valor) => {
      const td = document.createElement("td");
      td.textContent = valor;
      tr.appendChild(td);
    });

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", function () {
      const func = buscarPorId(f.id);
      campos.nome.value = func.nome;
      campos.idade.value = func.idade;
      campos.cargo.value = func.cargo;
      campos.salario.value = func.salario;
      idEdicao = func.id;
      btnSalvar.textContent = "Salvar alterações";
      btnCancelar.hidden = false;
      console.log("Editando:", func.toString());
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", function () {
      if (confirm(`Excluir ${f.nome}?`)) {
        remover(f.id);
        if (idEdicao === f.id) limparFormulario();
        renderizarTabela();
        console.log("Excluído:", f.nome);
      }
    });

    const tdAcoes = document.createElement("td");
    tdAcoes.append(btnEditar, " ", btnExcluir);
    tr.appendChild(tdAcoes);
    tabela.appendChild(tr);
  });
};

// ---------- Eventos: funções anônimas nos cliques ----------
btnSalvar.addEventListener("click", function () {
  if (!formularioValido()) {
    alert("Preencha todos os campos.");
    return;
  }

  const dados = lerFormulario();

  if (idEdicao === null) {
    adicionar(dados);
    console.log("Cadastrado:", dados.nome);
  } else {
    atualizar(idEdicao, dados);
    console.log("Atualizado:", dados.nome);
  }

  limparFormulario();
  renderizarTabela();
});

/*
  Como trocar uma função anônima tradicional por arrow function:

  Anônima tradicional:
    btnCancelar.addEventListener("click", function () {
      limparFormulario();
    });

  Arrow function equivalente (usada abaixo):
    btnCancelar.addEventListener("click", () => limparFormulario());
*/
btnCancelar.addEventListener("click", () => limparFormulario());

const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", () => renderizarTabela(buscarPorNome(campoBusca.value)));

document.getElementById("btnTodos").addEventListener("click", () => {
  campoBusca.value = "";
  renderizarTabela();
});

renderizarTabela();
