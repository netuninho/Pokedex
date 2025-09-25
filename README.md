<h1 align="center">Pokédex Interativa</h1>
<p align="center">Este projeto foi desenvolvido como parte de um desafio técnico para a vaga de Pessoa Desenvolvedora Front End.</p>

Para acessar o projeto clique [aqui](https://gerador-senha-iota.vercel.app)

### Tabela de conteúdos

<p align="center">
 <a href="#objetivo">Objetivo</a> •
 <a href="#funcionalidades"> Funcionalidades</a> • 
 <a href="#uso">Uso</a> • 
 <a href="#instalação">Instalação</a> • 
 <a href="#tecnologias">Tecnologias</a> 
</p>


### Objetivo

O objetivo deste projeto é criar uma **Pokédex interativa** com base em um design fornecido no Figma.  
A aplicação consome dados da [PokéAPI](https://pokeapi.co/), exibe os Pokémon de forma paginada, permite busca por nome ou tipo e é totalmente responsiva.


### Funcionalidades

- **Listagem de Pokémon**: Exibe uma lista de Pokémon, carregados dinamicamente da PokéAPI.
- **Busca**: Permite pesquisar Pokémon por **nome** (pt/en) ou por **tipo** (pt/en).
- **Paginação**: Exibição de Pokémon em páginas, com botões de navegação (anterior, próximo e números).
- **Tipos em português**: Os tipos dos Pokémon são exibidos em português.
- **Loader**: Exibe uma animação de carregamento durante requisições.
- **Responsividade**: Layout adaptado para dispositivos **mobile, tablet e desktop**.


### Uso

1. **Abra o site**: Ao carregar, a página exibe a primeira listagem de Pokémon.
2. **Navegue entre as páginas**: Use os botões de paginação para avançar ou voltar.
3. **Pesquise por nome**: Digite o nome de um Pokémon e pressione **Enter** ou clique no botão de busca.
4. **Pesquise por tipo**: Digite o tipo (ex.: fogo, água, planta ou fire, water, grass) para filtrar os resultados.
5. **Volte para a Home**: Clique no botão **Home** ou no **Logo** para limpar os filtros e retornar à listagem inicial.


### Instalação

Para executar este projeto localmente, siga estas etapas:

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    ```

2. **Navegue até o diretório do projeto**:
    ```bash
    cd nome-do-repositorio
    ```
3. **Instale as dependências**:
    ```bash
    npm install
    ```

4. **Execute o servidor local com Vite**:
    ```bash
    npm run dev
    ```

### Tecnologias

As seguintes ferramentas foram usadas na construção desse projeto: 
- **HTML** – Estrutura da aplicação
- **SASS** – Organização e reuso de estilos
- **JavaScript (Vanilla JS - ES Modules)** – Requisito do desafio
- **Vite** – Dev server + build (rápido e prático)
