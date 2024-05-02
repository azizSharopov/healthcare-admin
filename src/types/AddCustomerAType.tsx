export interface Customer {
    id?: number;
    nickname: string;
    name: string;
    password: string;
    confirmPassword: string;
    gender: string;
    phoneNumber: string;
    birthday: string;
    group: string;
    registrationPath: string;
    email: string;
    registrationDate?: string;
    status: string;
  }
  
  export interface Item {
    header1: string;
    info1: string;
    header2: string;
    info2: string;
    id: number;
    type?: 'input' | 'select' | 'checkbox' | 'info';
    value?: string;
    checked?: boolean;
}