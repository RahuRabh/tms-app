export interface loginResponse {
  login: {
    token: string;
    user: {
      id: string;
      name: string;
      role: string;
      email: string;
    };
  };
}

export interface loginVariables {
  email: string;
  password: string;
}
