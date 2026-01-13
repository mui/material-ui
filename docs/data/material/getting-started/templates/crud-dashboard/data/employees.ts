import type { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';

type EmployeeRole = 'Market' | 'Finance' | 'Development';

export interface Employee {
  id: number;
  name: string;
  age: number;
  joinDate: string;
  role: EmployeeRole;
  isFullTime: boolean;
}

const INITIAL_EMPLOYEES_STORE: Employee[] = [
  {
    id: 1,
    name: 'Edward Perry',
    age: 25,
    joinDate: '2025-07-16T00:00:00.000Z',
    role: 'Finance',
    isFullTime: true,
  },
  {
    id: 2,
    name: 'Josephine Drake',
    age: 36,
    joinDate: '2025-07-16T00:00:00.000Z',
    role: 'Market',
    isFullTime: false,
  },
  {
    id: 3,
    name: 'Cody Phillips',
    age: 19,
    joinDate: '2025-07-16T00:00:00.000Z',
    role: 'Development',
    isFullTime: true,
  },
];

export function getEmployeesStore(): Employee[] {
  const stringifiedEmployees = localStorage.getItem('employees-store');
  return stringifiedEmployees ? JSON.parse(stringifiedEmployees) : INITIAL_EMPLOYEES_STORE;
}

export function setEmployeesStore(employees: Employee[]) {
  return localStorage.setItem('employees-store', JSON.stringify(employees));
}

export async function getMany({
  paginationModel,
  filterModel,
  sortModel,
}: {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
}): Promise<{ items: Employee[]; itemCount: number }> {
  const employeesStore = getEmployeesStore();

  let filteredEmployees = [...employeesStore];

  // Apply filters (example only)
  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredEmployees = filteredEmployees.filter((employee) => {
        const employeeValue = employee[field as keyof Employee];

        switch (operator) {
          case 'contains':
            return String(employeeValue).toLowerCase().includes(String(value).toLowerCase());
          case 'equals':
            return employeeValue === value;
          case 'startsWith':
            return String(employeeValue).toLowerCase().startsWith(String(value).toLowerCase());
          case 'endsWith':
            return String(employeeValue).toLowerCase().endsWith(String(value).toLowerCase());
          case '>':
            return employeeValue > value;
          case '<':
            return employeeValue < value;
          default:
            return true;
        }
      });
    });
  }

  // Apply sorting
  if (sortModel?.length) {
    filteredEmployees.sort((a, b) => {
      for (const { field, sort } of sortModel) {
        if (a[field as keyof Employee] < b[field as keyof Employee]) {
          return sort === 'asc' ? -1 : 1;
        }
        if (a[field as keyof Employee] > b[field as keyof Employee]) {
          return sort === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
  }

  // Apply pagination
  const start = paginationModel.page * paginationModel.pageSize;
  const end = start + paginationModel.pageSize;
  const paginatedEmployees = filteredEmployees.slice(start, end);

  return {
    items: paginatedEmployees,
    itemCount: filteredEmployees.length,
  };
}

export async function getOne(employeeId: number) {
  const employeesStore = getEmployeesStore();

  const employeeToShow = employeesStore.find((employee) => employee.id === employeeId);

  if (!employeeToShow) {
    throw new Error('Employee not found');
  }
  return employeeToShow;
}

export async function createOne(data: Omit<Employee, 'id'>) {
  const employeesStore = getEmployeesStore();

  const newEmployee = {
    id: employeesStore.reduce((max, employee) => Math.max(max, employee.id), 0) + 1,
    ...data,
  };

  setEmployeesStore([...employeesStore, newEmployee]);

  return newEmployee;
}

export async function updateOne(employeeId: number, data: Partial<Omit<Employee, 'id'>>) {
  const employeesStore = getEmployeesStore();

  let updatedEmployee: Employee | null = null;

  setEmployeesStore(
    employeesStore.map((employee) => {
      if (employee.id === employeeId) {
        updatedEmployee = { ...employee, ...data };
        return updatedEmployee;
      }
      return employee;
    }),
  );

  if (!updatedEmployee) {
    throw new Error('Employee not found');
  }
  return updatedEmployee;
}

export async function deleteOne(employeeId: number) {
  const employeesStore = getEmployeesStore();

  setEmployeesStore(employeesStore.filter((employee) => employee.id !== employeeId));
}

// Validation follows the [Standard Schema](https://standardschema.dev/).

type ValidationResult = { issues: { message: string; path: (keyof Employee)[] }[] };

export function validate(employee: Partial<Employee>): ValidationResult {
  let issues: ValidationResult['issues'] = [];

  if (!employee.name) {
    issues = [...issues, { message: 'Name is required', path: ['name'] }];
  }

  if (!employee.age) {
    issues = [...issues, { message: 'Age is required', path: ['age'] }];
  } else if (employee.age < 18) {
    issues = [...issues, { message: 'Age must be at least 18', path: ['age'] }];
  }

  if (!employee.joinDate) {
    issues = [...issues, { message: 'Join date is required', path: ['joinDate'] }];
  }

  if (!employee.role) {
    issues = [...issues, { message: 'Role is required', path: ['role'] }];
  } else if (!['Market', 'Finance', 'Development'].includes(employee.role)) {
    issues = [
      ...issues,
      { message: 'Role must be "Market", "Finance" or "Development"', path: ['role'] },
    ];
  }

  return { issues };
}
