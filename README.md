# Projeto – Arquitetura de Solução com Microserviços em Java e Front-end com React
Tema: Plataforma de Venda de Ração para Animais

Este projeto representa uma arquitetura de uma solução de software
para uma plataforma de venda de ração para animais, utilizando o paradigma de
microserviços com Java (Spring Boot) no back-end e React no front-end. A plataforma deve
permitir que clientes naveguem por diferentes tipos de rações, realizem cadastros, efetuem
pedidos e acompanhem suas compras.

## Estrutura do Projeto

**1. Microserviços (Java Spring Boot):**
• Serviço de Catálogo de Produtos: gerenciamento de rações (nome, tipo, descrição,
peso, preço, disponibilidade).
• Serviço de Usuário: cadastro, login e gerenciamento de clientes.
• Serviço de Pedidos: criação e consulta de pedidos, vinculação com usuários e produtos.
• Serviço de Pagamento (simulado): simulação do processamento de pagamento com
status de confirmação ou falha.

**2. Front-end (React):**
• Tela de login e cadastro de usuários.
• Página principal com listagem de rações disponíveis.
• Tela de detalhamento do produto.
• Funcionalidade de adicionar ao carrinho e finalizar pedido.

##Documentação das APIs - Swagger
Catálogo: http://localhost:8081/swagger-ui.html

Usuário: http://localhost:8082/swagger-ui.html

Pedidos: http://localhost:8083/swagger-ui.html

Pagamento: http://localhost:8084/swagger-ui.html

##Execução com Docker
É necessário ter Docker e Docker Compose instalados.

Clone o repositório do projeto.
Navegue até o diretório do projeto.
Execute o comando docker-compose up --build

##Diagrama da arquitetura geral
![image](https://github.com/user-attachments/assets/41b23d4a-b1b7-435a-9eeb-3b1893752f8d)
