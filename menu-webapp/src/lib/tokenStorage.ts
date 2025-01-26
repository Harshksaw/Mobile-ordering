interface TokenData {
  value: number;
  expiry: number;
}

export const tokenStorage = {
  setToken: (token: number) => {
    const tokenData: TokenData = {
      value: token,
      expiry: new Date().getTime() + (2 * 60 * 60 * 1000) // 2 hours from now
    };
    localStorage.setItem('orderToken', JSON.stringify(tokenData));
  },

  getToken: (): number | null => {
    const tokenString = localStorage.getItem('orderToken');
    if (!tokenString) return null;

    const tokenData: TokenData = JSON.parse(tokenString);
    const now = new Date().getTime();

    if (now > tokenData.expiry) {
      localStorage.removeItem('orderToken');
      return null;
    }

    return tokenData.value;
  },

  clearToken: () => {
    localStorage.removeItem('orderToken');
  }
}; 