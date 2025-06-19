import type { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';

type EmployeeRole = 'Market' | 'Finance' | 'Development';

export interface Employee {
  id: number;
  name: string;
  age: number;
  joinDate: string;
  role: EmployeeRole;
}

export function getEmployeesStore(): Employee[] {
  const stringifiedEmployees = localStorage.getItem('employees-store');
  return stringifiedEmployees ? JSON.parse(stringifiedEmployees) : [];
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
            return (employeeValue as number) > value;
          case '<':
            return (employeeValue as number) < value;
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

export async function deleteOne(employeeId: number) {
  const employeesStore = getEmployeesStore();

  setEmployeesStore(employeesStore.filter((employee) => employee.id !== employeeId));
}
