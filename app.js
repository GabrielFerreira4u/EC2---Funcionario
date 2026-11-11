// Armazenamento em memória: array de objetos da classe Funcionario
let funcionarios = [];
let proximoId = 1;

function cadastrarFuncionario() {
  const nome = document.getElementById("nome").value.trim();
  const idade = document.getElementById("idade").value;
  const cargo = document.getElementById("cargo").value.trim();
  const salario = document.getElementById("salario").value;

  if (nome === "" || idade === "" || cargo === "" || salario === "") {
    alert("Preencha todos os campos.");
    return;
  }

  const funcionario = new Funcionario(proximoId, nome, Number(idade), cargo, Number(salario));
  proximoId++;
  funcionarios.push(funcionario);

  document.getElementById("formFuncionario").reset();
  renderizarTabela();
}

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
    tbody.appendChild(tr);
  }
}

renderizarTabela();
