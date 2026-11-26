import type { CredentialId } from './credentials';

export type LoginCase = {
  credentialId: CredentialId;
  expectedOutcomeId: 'dashboard' | 'invalidCredentials';
};

export type LoginOutcomes = {
  dashboard: {
    path: string;
    heading: string;
  };
  invalidCredentials: {
    message: string;
  };
};
