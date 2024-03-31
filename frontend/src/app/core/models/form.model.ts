export interface ILoginFormValue {
  email: string;
  password: string;
}

export interface ISignupFormValue extends ILoginFormValue {
  username: string;
}
