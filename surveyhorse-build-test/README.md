# surveyhorse

**surveyhorse** är en fiktiv SaaS-tjänst som vi ska jobba med i kursens olika moment. I tjänsten kan man skicka ut ett enkelt formulär

Repot består av olika appar (microservices) och kodbibliotek. Det är skapat som monorepo med hjälp av [Nx](https://nx.dev).

## Komma igång

```bash
npm install
```

## Komponenter

### surveyhorse-api

Rest-api som används av React-siten.

```bash
npx nx serve surveyhorse-api
```

### survey-spa

React-sajt där man kan logga in och se sina todo-listor

```bash
npx nx serve surveyhorse-survey-spa
```

### surveyhorse-ui

Komponentbibliotek med React-komponenter som kan användas på Reactsajten, Hemsidan eller andra platser. Använder Storybook för att visa upp komponenter.

```bash
npx nx serve surveyhorse-api
```

### surveyhorse-lib

Bibliotek för funktioner, types och annan kod som kan användas i olika appar