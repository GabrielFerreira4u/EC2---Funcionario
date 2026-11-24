# Cadastro de Funcionários (Bootstrap)

Sistema no navegador (HTML + JavaScript puro, dados em memória) para cadastrar,
listar, editar e excluir funcionários, com interface em Bootstrap 5 e relatórios
usando `filter`, `map`, `reduce` e `Set`.

O Bootstrap é carregado por CDN, então é preciso ter internet ao abrir a página.

## Rodando com Docker
```bash
docker compose up --build
```
Acesse http://localhost:8080

## Estrutura
- `index.html` – layout Bootstrap: resumo, formulário, tabela com busca e relatórios
- `funcionario.js` – classe `Funcionario` (construtor, get/set, `toString()`)
- `app.js` – eventos, CRUD e relatórios
