export type CredentialId = 'admin' | 'fakeUser' | 'essUser1';

export type Credential = {
  username: string;
  password: string;
};

export type Credentials = Record<CredentialId, Credential>;
