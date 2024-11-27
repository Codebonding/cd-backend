export interface UserInput {
  name: string;
  email: string;
  phone: string;
  passedOutYear?: number;
  address?: string;
  district?: string;
  state?: string;
  pinCode?: string;
}

export interface UserOutput extends UserInput {
  id: number;
}
