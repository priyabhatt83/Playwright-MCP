export type EmployeeCase = {
  firstName: string;
  lastName: string;
  expectedOutcomeId: 'john123Doe456Profile';
};

export type EmployeeOutcomes = {
  employeeProfiles: Record<EmployeeCase['expectedOutcomeId'], string>;
};
