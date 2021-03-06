import axios from './axios';

interface UserData {
  AuthorizationToken: {
    Token: string;
    TokenExpires: string;
  };
  User: {
    Id: number;
    UserName: string;
    FullName: string;
  };
}

export const authorization = () => {
  return {
    async anonymousLogin(body: {}): Promise<UserData> {
      return await axios
        .post<UserData>('Authorization/SignIn', body, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.data);
    },
    async userLogin(body: {
      Username: string;
      Password: string;
    }): Promise<UserData> {
      return await axios
        .post<UserData>('Authorization/SignIn', body, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.data);
    },
    logout() {
      window.sessionStorage.removeItem('token');
    },
  };
};
