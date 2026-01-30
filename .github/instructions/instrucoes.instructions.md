---
applyTo: '**'
---

Princípios principais: 
- Escreva um código limpo, conciso e fácil de manter, seguindo princípios do SOLID e Clean Code.
- Use nomes de variáveis descrituvos (exemplos: isLoading, hasError).
- Use kebab-case para nomes de pastas e arquivos
- Sempre use TypeScript para escrever código
- DRY (Don't repeat yourself). Evite duplicidade de código. Quando necessário, crie funções/componentes reutilizáveis.

React/Nest.js
- Sempre use Tailwind para estilização
- Use componentes da biblioteca shadcn/ui o máximo possível ao criar/modificar componentes (veja https://ui.shadcn.com/docs/components para a lista de componentes disponíveis).
- Sempre use Zod para validação de formulários.
- Sempre use React Hook Form para criação e validação de formulários. Use o componente src/components/ui/form.tsx para criar esses formulários. (exemplo: src/app/(protected)/doctors/components/upsert-doctor-form.tsx)
- Quando necessário, crie componentes e funções reutilizáveis para reduzir a duplicidade de código.
- Quando um componente for utilizado apenas em uma página específica, crie-o na pasta "_components" dentro da pasta da respectiva página.
- Sempre use a biblioteca "next-safe-action" ao criar com Server Actions. Use a Server Exemplo: src/actions/upsert-doctor/index.ts
- Sempre use o hook "useAction" da biblioteca "next-safe-actions" ao chamar Server Actions em componentes. Exemplo:src/app/(protected)/doctors/_components/upsert-doctor-form.tsx
- As Server Actions devem ser armazenadas em src/actions (siga o padrão de nomenclatura das já existentes).
- Sempre que for necessário interagir com o banco de dados, use o src/db/index.ts
- Usamos a biblioteca "dayjs" para manipular e formatar datas.
- Ao criar páginas, use os componentes dentro de src/components/ui/page-container.tsx para manter os padrões de margin, padding e spacing nas páginas. Exemplo: src/app/(protected)/doctors/page.tsx
- Sempre use a biblioteca "react-number-format" ao criar máscaras para inputs.
- Sempre use a biblioteca react-number-format ao criar máscaras para inputs