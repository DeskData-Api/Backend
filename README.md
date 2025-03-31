# ⚙️ DeskData Backend

> **Descrição breve**: DeskData Backend é o microsserviço responsável por processar e fornecer dados de atendimentos inteligentes através de uma API RESTful, construída com **TypeScript**, **Express** e **Prisma**, para suportar os dashboards do sistema DeskData.

---

## 📌 Status do Projeto

✅ **Sprint 1 Concluída - 30/03/2025**

✔ API RESTful com rotas para dashboards implementada  
🔜 Próximos passos: suporte a busca semântica e sumarização (Sprint 2)

📅 **Ciclo da Sprint 1**: 10/03/2025 - 30/03/2025

---

## 🎨 Visão Geral

🔹 **O que é?**  
O Backend do DeskData atua como uma camada intermediária entre o serviço de IA (Python) e o frontend, coletando dados tratados do PostgreSQL, aplicando regras de negócio e expondo endpoints HTTP para consulta e análise de chamados técnicos.

🔹 **Para quem?**  
Desenvolvedores e o frontend do DeskData, que consomem os dados para gerar insights visuais.

🔹 **Funcionalidades da Sprint 1:**  
✔ API para dashboards com estatísticas de chamados (total, abertos, fechados, resolvidos, tempo médio, etc.)  
✔ Listagem de chamados abertos  
✔ Consulta de chamados por ID  

🔹 **Próximos Recursos (Sprints Futuras):**  
- Suporte a busca semântica  
- Sumarização automática de interações  
- CRUD de usuários  
- Autenticação segura com JWT  
- Classificação de atendimentos  

---

## 📂 Estrutura do Projeto

```
/backend
├── src/
│   ├── controllers/     # Lógica dos endpoints
│   ├── routes/          # Definição das rotas
│   ├── services/        # Serviços de negócio (ex.: ChamadosService)
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração do TypeScript
├── prisma/              # Configuração do Prisma ORM
│   ├── schema.prisma    # Modelo do banco de dados
```

---

## 🛠 Tecnologias Utilizadas

- 📜 **TypeScript** (Linguagem principal)  
- ⚙️ **Express** (Framework de API)  
- 🗄️ **Prisma** (ORM para PostgreSQL)  
- 🐳 **Docker** (Containerização do banco de dados)  
- 🗄️ **PostgreSQL** (Banco de dados)  

---

## 🚀 Como Rodar o Projeto

### 🔧 **Pré-requisitos**  
- [Node.js](https://nodejs.org/) (versão LTS recomendada)  
- [DockerVite](https://vitejs.dev/) (opcional, para desenvolvimento rápido)  
- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/)  
- [Git](https://git-scm.com/)  
- Banco de dados PostgreSQL configurado (via Docker ou local)

### 🛠 **Passos de Instalação**

1️⃣ **Clone o repositório**  
```bash
git clone https://github.com/DeskData-Api/Backend.git
cd Backend
```

2️⃣ **Instale as dependências**  
```bash
npm install
```

3️⃣ **Configure as variáveis de ambiente**  
Crie um arquivo `.env` na raiz do projeto com:  
```
DATABASE_URL="postgresql://deskdata:deskdata@localhost:5432/chamados_db?schema=public"
PORT=3003
```

4️⃣ **Gere os arquivos do Prisma**  
```bash
npx prisma generate
```

5️⃣ **Inicie o banco de dados (via Docker)**  
Certifique-se de que o serviço Python-Services já populou o banco. Caso contrário, configure um container PostgreSQL:  
```bash
docker-compose up -d
```

6️⃣ **Inicie o servidor**  
```bash
npm run dev
```  
A API estará disponível em: `http://localhost:3003`

7️⃣ **Parando o container (se aplicável)**  
```bash
docker-compose down
```

---

## 🌐 Rotas da API

| Método | Endpoint              | Descrição                       | Resposta (Exemplo)                                                                                                                                                       |
| :----: | :-------------------- | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  GET   | `/chamados/dashboard` | Retorna dados para o dashboard  | `{ total: 150, abertos: 30, fechados: 100, resolvidos: 20, tempoMedio: 12.5, top5Categorias: [...], top5Elementos: [...], chamadosPorMes: [...], colaboradores: [...] }` |
|  GET   | `/chamados/abertos`   | Lista todos os chamados abertos | `[{ id: 1, titulo: "Erro no sistema", status: "Processando", ... }, ...]`                                                                                                |
|  GET   | `/chamados/:id`       | Retorna detalhes de um chamado  | `{ id: 1, titulo: "Erro no sistema", status: "Processando", ... }` ou `{ error: "Chamado não encontrado" }`                                                              |

---

## 📝 Contribuindo

1. Faça um fork do repositório.  
2. Crie uma branch (`feature/nova-funcionalidade`).  
3. Commit suas alterações (`git commit -m 'feat: adiciona nova funcionalidade'`).  
4. Envie um Pull Request.

---

### 🎯 **Gostou do projeto?**

Se esse projeto foi útil para você, deixe uma ⭐ no repositório! 😃