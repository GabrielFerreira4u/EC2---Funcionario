// Armazenamento em memória: array de objetos da classe Funcionario
let funcionarios = [];
let proximoId = 1;
let idEdicao = null; // null = cadastrando; número = editando

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const campoBusca = document.getElementById("campoBusca");
const tabela = document.getElementById("tabelaFuncionarios");
const tituloForm = document.getElementById("tituloForm");
const campos = {
  nome: document.getElementById("nome"),
  idade: document.getElementById("idade"),
  cargo: document.getElementById("cargo"),
  salario: document.getElementById("salario"),
};

const moeda = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

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

// ---------- Avisos com alert do Bootstrap ----------
const mostrarAviso = (mensagem, tipo = "success") => {
  const aviso = document.createElement("div");
  aviso.className = `alert alert-${tipo} alert-dismissible fade show`;
  aviso.setAttribute("role", "alert");
  aviso.textContent = mensagem;

  const fechar = document.createElement("button");
  fechar.type = "button";
  fechar.className = "btn-close";
  fechar.setAttribute("data-bs-dismiss", "alert");
  fechar.setAttribute("aria-label", "Fechar");
  aviso.appendChild(fechar);

  document.getElementById("avisos").appendChild(aviso);
  setTimeout(() => aviso.remove(), 3500);
};

// ---------- Formulário (arrow) ----------
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
  tituloForm.textContent = "Cadastrar funcionário";
};

// ---------- Resumo (cards do topo) ----------
const atualizarResumo = () => {
  const total = funcionarios.length;
  const media = total ? funcionarios.reduce((s, f) => s + f.salario, 0) / total : null;
  document.getElementById("resumoTotal").textContent = total;
  document.getElementById("resumoMedia").textContent = media === null ? "–" : moeda(media);
  document.getElementById("resumoCargos").textContent = new Set(funcionarios.map((f) => f.cargo)).size;
};

// ---------- Renderização ----------
const criarBotao = (texto, classe, aoClicar) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `btn btn-sm ${classe}`;
  btn.textContent = texto;
  btn.addEventListener("click", aoClicar);
  return btn;
};

const renderizarTabela = (lista = funcionarios) => {
  tabela.innerHTML = "";

  if (lista.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td colspan="6" class="text-center text-muted py-4">Nenhum funcionário encontrado.</td>';
    tabela.appendChild(tr);
  }

  lista.forEach((f) => {
    const tr = document.createElement("tr");

    [f.id, f.nome, f.idade, f.cargo, f.salarioFormatado()].forEach((valor) => {
      const td = document.createElement("td");
      td.textContent = valor;
      tr.appendChild(td);
    });

    const tdAcoes = document.createElement("td");
    tdAcoes.className = "text-end text-nowrap";
    tdAcoes.append(
      criarBotao("Editar", "btn-outline-warning", function () {
        const func = buscarPorId(f.id);
        campos.nome.value = func.nome;
        campos.idade.value = func.idade;
        campos.cargo.value = func.cargo;
        campos.salario.value = func.salario;
        idEdicao = func.id;
        btnSalvar.textContent = "Salvar alterações";
        btnCancelar.hidden = false;
        tituloForm.textContent = "Editar funcionário";
        console.log("Editando:", func.toString());
      }),
      " ",
      criarBotao("Excluir", "btn-outline-danger", function () {
        if (confirm(`Excluir ${f.nome}?`)) {
          remover(f.id);
          if (idEdicao === f.id) limparFormulario();
          renderizarTabela();
          mostrarAviso("Funcionário excluído com sucesso!", "danger");
          console.log("Excluído:", f.nome);
        }
      })
    );
    tr.appendChild(tdAcoes);
    tabela.appendChild(tr);
  });

  atualizarResumo();
};

// ---------- Eventos: funções anônimas nos cliques ----------
btnSalvar.addEventListener("click", function () {
  if (!formularioValido()) {
    mostrarAviso("Preencha todos os campos.", "warning");
    return;
  }

  const dados = lerFormulario();

  if (idEdicao === null) {
    adicionar(dados);
    mostrarAviso("Funcionário cadastrado com sucesso!");
    console.log("Cadastrado:", dados.nome);
  } else {
    atualizar(idEdicao, dados);
    mostrarAviso("Funcionário atualizado com sucesso!", "info");
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

// ---------- Relatórios (filter, map, reduce, Set) ----------
const relatorio = document.getElementById("relatorio");
const mostrar = (texto) => (relatorio.textContent = texto);

document.getElementById("btnAcima5000").addEventListener("click", () => {
  const ricos = funcionarios.filter((f) => f.salario > 5000);
  mostrar(
    ricos.length
      ? "Salário maior que R$ 5.000:\n" + ricos.map((f) => "- " + f.toString()).join("\n")
      : "Nenhum funcionário com salário acima de R$ 5.000."
  );
});

document.getElementById("btnMedia").addEventListener("click", () => {
  if (funcionarios.length === 0) return mostrar("Sem funcionários cadastrados.");
  const media = funcionarios.reduce((soma, f) => soma + f.salario, 0) / funcionarios.length;
  mostrar("Média salarial: " + moeda(media));
});

document.getElementById("btnCargos").addEventListener("click", () => {
  if (funcionarios.length === 0) return mostrar("Sem funcionários cadastrados.");
  const cargos = [...new Set(funcionarios.map((f) => f.cargo))];
  mostrar("Cargos únicos:\n" + cargos.map((c) => "- " + c).join("\n"));
});

document.getElementById("btnMaiusculo").addEventListener("click", () => {
  if (funcionarios.length === 0) return mostrar("Sem funcionários cadastrados.");
  const nomes = funcionarios.map((f) => f.nome.toUpperCase());
  mostrar("Nomes em maiúsculo:\n" + nomes.join("\n"));
});

renderizarTabela();
