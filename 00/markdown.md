# Esqueleto React + Vite + Node/Express + TypeScript

Octfit é uma aplicação simples para gerenciar workouts (treinos). O repositório tem duas partes: `server` (API em Node/Express + TypeScript) e `client` (front-end com Vite + React).

## Quick Start (desenvolvimento)

- Iniciar servidor (PowerShell):
```powershell
cd C:\Repo2024\OctfitG\server
npm install
npm run dev
```

- Iniciar client (PowerShell):
```powershell
cd C:\Repo2024\OctfitG\client
npm install
npm run dev
```

> O servidor roda por padrão em `http://localhost:4000`. O cliente (Vite) geralmente roda em `http://localhost:5173`.

## Endpoints principais (API)
- `GET /api/health` — verifica saúde da API
- `GET /api/hello` — mensagem de saudação
- `GET /api/workouts` — lista todos os workouts
- `GET /api/workouts/:id` — obtém um workout por id
- `POST /api/workouts` — cria um workout (body: JSON com `title` obrigatório)
- `PUT /api/workouts/:id` — atualiza um workout
- `DELETE /api/workouts/:id` — remove um workout

## Exemplos rápidos (PowerShell)
- Listar workouts:
```powershell
curl http://localhost:4000/api/workouts
```

- Criar um workout:
```powershell
curl -Method POST http://localhost:4000/api/workouts `
	-Body (@{ title = "Treino A"; notes = "Exemplo" } | ConvertTo-Json) `
	-ContentType "application/json"
```

## Persistência
Os dados são gravados em `server/data/workouts.json`. O `server/src/db.ts` faz leitura/escrita síncrona desse arquivo.

## Estrutura do repositório
- `server/` — API Node/Express + TypeScript
- `client/` — Front-end com React + Vite

## Contribuindo

## style
:root {
  --fundo-principal: #f5f5f5;
  --texto: #222222;
  --texto-inverso: #ffffff;
  --destaque: #007BFF;
  --destaque-inverso: #88a8c9;
  --fundo-card: #ffffff;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--fundo-principal);
}

code {
  background: var(--fundo-card);
  padding: 2px 6px;
  border-radius: 4px;
}
## Contato
Para dúvidas ou colaboração, abra uma issue ou envie uma mensagem no repositório.

