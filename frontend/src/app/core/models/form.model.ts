export interface ILoginFormValue {
  username: string;
  password: string;
}

export interface ISignupFormValue extends ILoginFormValue {
  email: string;
}
