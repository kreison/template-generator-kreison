export const multiStorage = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem(key: string, value: any): void {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sessionSetItem(key: string, value: any): void {
    if (typeof value === 'object') {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.setItem(key, value);
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItem(key: string): any {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const localData = JSON.parse(localStorage.getItem(key)!);
      if (localData) return localData;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return JSON.parse(sessionStorage.getItem(key)!);
    } catch (e) {
      const localData = localStorage.getItem(key);
      if (localData) return localData;
      return sessionStorage.getItem(key);
    }
  },
  removeItem(key: string): void {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    } else {
      sessionStorage.removeItem(key);
    }
  },
  getAccessToken(): string {
    return this.getItem('FIX_ME ACCESS');
  },
};
