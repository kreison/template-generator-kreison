interface IValues {
  [key: string]: string
}

export const cookie = {
  setItem(key: string, value: unknown, max_age = 2678400): void {
    try {
      document.cookie = `${key}=${JSON.stringify(value)};max-age=${max_age};secure';path=/`;
    }
    catch (e) {
      document.cookie = `${key}=${value};max-age=${max_age};secure;path=/`;
    }
  },
  getItem(key: string): unknown {
    const values: IValues = {};
    const cookies = document.cookie.split(/; /);
    for (let i = 0, len = cookies.length; i < len; i++) {
      const cookie = cookies[ i ].split(/=/);
      values[ cookie[ 0 ] ] = cookie[ 1 ];
    }
    try {
      return JSON.parse(values[ key ]);
    } catch (e) {
      return values[ key ];
    }
  },
  getRefreshToken(): unknown {
    return this.getItem('refresh');
  },
  removeItem(key: string): void {
    document.cookie = `${key}=;max-age=-1;secure;path=/`;
  },
};
