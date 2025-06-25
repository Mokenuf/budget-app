export const MOCK_INCOMES = {
  data: [
    {
      id: 1,
      name: 'Salario',
      description: 'Salario mensual',
      amount: 1875000,
      type: 'fixed',
    },
    {
      id: 2,
      name: 'Freelance',
      description: 'Proyecto web',
      amount: 300000,
      type: 'extra',
    },
  ],
  metadata: {
    total: 2,
    page: 1,
    pageSize: 20,
  },
}

export const MOCK_EXPENSES = {
  data: [
    {
      id: 1,
      name: 'Alquiler',
      description: 'Depto 2 amb',
      amount: 750000,
      frequency: 'monthly',
    },
    {
      id: 2,
      name: 'Wowsito',
      description: 'Sub anual del wow',
      amount: 100000,
      frequency: 'yearly',
    },
  ],
  metadata: {
    total: 2,
    page: 1,
    pageSize: 20,
  },
}
