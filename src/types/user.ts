export interface Group {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  groups: Group[];
}
