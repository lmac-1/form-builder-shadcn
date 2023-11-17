# Welcome

This is a form builder built using React, Typescript, Next.js, Dnd-kit, PostgreSQL, Prisma and Tailwind.

This is an application built by following [this tutorial](https://www.youtube.com/watch?v=QGXUUXy0AMw) by [Code with Kliton](https://www.youtube.com/@codewithkliton)

It uses shadcn-ui components.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

``
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Interesting things learnt

- You can update the entire colour scheme of the application at https://ui.shadcn.com/themes and then pasting the code into globals.css
- You can run `npx shadcn-ui@latest add` to select multiple (or all) components to install
- `error.tsx` pages need to be client components
- When you use `asChild` in the button component (shadcn), it means that the child will be the element rather than there being a button html element
