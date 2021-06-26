export type Falsy = false | 0 | '' | null | undefined;

export const c = (...classes: (Falsy | string)[]) => classes.filter(v => v).join(' ');
