# Kiwiclone

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Projeto kiwify

Vamos trabalhar com 3 abas: dashboard, vendas, ajuda

### Dashboard
calendario: precisa fazer a soma de valores em períodos da maneira correta


### Ajuda
- na aba ajuda, eu consigo mudar a quantidade de vendas de um determinado dia, assim, modificando as vendas. Esses resultados ficam salvos em um banco de dados, então, se entre o dia 01 e dia 30 tinha 1000 vendas, após eu alterar a quantidade, a soma que o calendário faz dentro desse período também muda
- Logo, na aba ajuda, eu vou alterar apenas a quantidade de vendas de um determinado dia(s) e assim, a quantidade vendida se altera proporcionalmente

### Geral

- na barra superior direita fica uma barra de progresso com uma insígnia, que é o arredondamento do total de vendas, desde a data da primeira até a data de hoje (ajuda que não temos o valor de amanhã, pois o amanhã ainda não existe)

•a barra de progresso no canto superior direito se altera sempre que completa, zerado o progresso pro nível seguinte e alterando a insígnia que fica do lado

•todo dia as 00:00 o dia atual e criado com um Random de vendas, de 100 a 150 por exemplo e automaticamente salvo no banco de dados. Assim, eu não preciso criar a quantidade de vendas de cada dia, porque muitos vão ser criados automaticamente, mas se eu quiser alterar na aba "ajuda" eu posso
