# Cadastro de Funcionários

Sistema no navegador (HTML + JavaScript puro, dados em memória) para cadastrar,
listar, editar e excluir funcionários, com relatórios usando `filter`, `map`,
`reduce` e `Set`.

## Rodando com Docker
```bash
docker compose up --build
```
Acesse http://localhost:8080

## Estrutura
- `index.html` – formulário, tabela e botões de relatório
- `funcionario.js` – classe `Funcionario` (construtor, get/set, `toString()`)
- `app.js` – eventos, CRUD e relatórios
