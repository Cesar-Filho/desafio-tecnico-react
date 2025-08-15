# Desafio Técnico React Native

Este projeto foi criado utilizando `npx rn-new@latest`, uma ferramenta moderna para inicialização de projetos React Native com Expo, garantindo uma configuração otimizada e atualizada.

## 📱 Sobre o Projeto

Aplicativo móvel desenvolvido para técnicos agrícolas registrarem **notas** (observações) e **recomendações** durante seu trabalho de campo. O app funciona 100% offline com sincronização automática quando a conexão com a internet estiver disponível.

## 🛠️ Tecnologias

- React Native com Expo
- TypeScript
- Redux Toolkit + RTK Query
- AsyncStorage
- NetInfo
- React Navigation
- React Hook Form
- i18next para internacionalização (PT-BR e EN)

## 🏗️ Estrutura do Projeto

O projeto segue a metodologia **Atomic Design** para organização dos componentes, proporcionando uma estrutura escalável e modular:

```
src/
├── @types/          # Definições de tipos TypeScript
├── components/      # Componentes organizados por Atomic Design
│   ├── atoms/       # Elementos básicos (botões, inputs, etc.)
│   ├── molecules/   # Combinações de átomos
│   ├── organisms/   # Seções funcionais mais complexas
│   └── templates/   # Estruturas de página
├── navigation/      # Configuração de navegação
├── screens/         # Telas da aplicação
├── store/           # Gerenciamento de estado com Redux
│   ├── api/         # Configuração de API com RTK Query
│   ├── middlewares/ # Middlewares personalizados
│   └── slices/      # Reducers e actions do Redux
└── utils/           # Utilitários e funções auxiliares
```

### 🧩 Componentes e Atomic Design

A estrutura Atomic Design divide os componentes em níveis de complexidade crescente:

1. **Átomos**: Componentes básicos como botões, inputs, ícones
2. **Moléculas**: Combinações de átomos que formam elementos funcionais como cards, grupos de inputs
3. **Organismos**: Seções funcionais completas como formulários, listas
4. **Templates**: Estruturas de página que organizam organismos

Esta abordagem proporciona:

- Reutilização eficiente de código
- Consistência visual
- Facilidade de manutenção e teste
- Maior modularidade do código

## 🔄 Arquitetura Offline-First

Uma das principais características do aplicativo é o funcionamento offline com sincronização automática. A arquitetura implementada segue o fluxo:

```
[UI] → [Redux Action / RTK Query Mutation]
        ↓
     [Middleware Queue Handler]
        ↓
   Se OFFLINE → salva no AsyncStorage + Redux
   Se ONLINE → executa a mutation normalmente
        ↓
[Watcher de Conexão] (NetInfo)
        ↓
   Ao ficar online → processa fila
```

### Como funciona:

1. **Ações do Usuário**: Quando o usuário cria/edita/deleta uma nota
2. **Middleware de Offline**: Intercepta a ação e verifica a conectividade
   - Se online: Executa a mutação na API diretamente
   - Se offline: Armazena a ação em uma fila offline no Redux e persiste no AsyncStorage
3. **Monitor de Conectividade**: Utilizando NetInfo, observa mudanças na conectividade
4. **Processamento da Fila**: Quando a conexão é estabelecida, processa todas as ações pendentes na ordem

### Vantagens desta implementação:

- **UX Consistente**: Usuário não percebe diferença entre operações online/offline
- **Resiliência a Falhas**: Dados não são perdidos mesmo em áreas com conexão instável
- **Sincronização Bidirecional**: Dados são sincronizados em ambas as direções
- **Resolução de Conflitos**: Implementação de merge para resolução de conflitos entre dados locais e do servidor

## 🌐 Internacionalização

O aplicativo suporta completamente dois idiomas: Português do Brasil (PT-BR) e Inglês (EN), abrangendo:

- Textos de interface
- Mensagens de validação
- Datas e formatos específicos de cada localidade

## ♿ Acessibilidade

Todos os elementos interativos possuem:

- Propriedades `accessibilityLabel` adequadas
- `testID` para automação de testes
- Suporte a gestos e leitores de tela

## 🧪 Testes

O projeto utiliza Jest e React Testing Library para testes:

- Testes unitários para componentes

## � API Mock com JSON Server

O projeto foi testado utilizando o [json-server](https://github.com/typicode/json-server) como backend mock, permitindo simular completamente a API REST:

```bash
# Instalar json-server globalmente
npm install -g json-server

# Iniciar o servidor na porta 3000 com o arquivo db.json
json-server --watch db.json --port 3000

# Opcionalmente com delay para simular latência de rede (500ms)
json-server --watch db.json --port 3000 --delay 500
```

### Estrutura do db.json

O arquivo `db.json` na raiz do projeto contém a estrutura de dados para o json-server:

```json
{
  "notes": [
    {
      "id": "1",
      "category": "annotation",
      "title": "Observação Inicial",
      "description": "Descrição da observação...",
      "images": [{ "uri": "file:///path/to/image1.jpg" }],
      "createdAt": "2023-08-10T14:30:00.000Z",
      "updatedAt": "2023-08-10T14:30:00.000Z"
    }
  ]
}
```

Este setup permite testar completamente o fluxo offline/online da aplicação alternando a disponibilidade do servidor.

## �📋 Funcionalidades Principais

1. **Lista de Notas**
   - Visualização em cards (categoria, título, descrição, data, imagens)
   - Filtro por categoria (todas, anotações, recomendações)
   - Busca por texto em título ou descrição
   - Ordenação por data (mais recentes primeiro)

2. **Formulário de Notas**
   - Criação/edição de notas com validação de campos
   - Suporte a upload de imagens (máximo 5)
   - Diferenciação entre tipos de categoria

3. **Sincronização Offline**
   - Funcionalidade completa sem conexão
   - Sincronização automática quando online
   - Indicador visual de status de sincronização

## 🚀 Como Executar

```bash
# Instalar dependências
yarn install

# Iniciar o json-server para mock da API
json-server --watch db.json --port 3000

# Em outro terminal, iniciar o desenvolvimento
yarn start

# Executar no Android
yarn android

# Executar no iOS
yarn ios

# Executar testes
yarn test
```

## 📱 Considerações Finais

Este projeto demonstra uma implementação robusta de um aplicativo React Native com funcionalidade offline-first, arquitetura bem estruturada e práticas modernas de desenvolvimento, ideal para uso em condições de conectividade limitada como em áreas rurais.
