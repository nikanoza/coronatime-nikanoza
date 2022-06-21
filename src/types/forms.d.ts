export type LoginFormValues = {
  username: string;
  password: string;
  remember: boolean;
};

export type NewPasswordFormValues = {
  new_password: string;
  repeat_password: string;
};

export type RegistrationFormValues = {
  username: string;
  email: string;
  password: string;
  repeat_password: string;
};

export type ResetFormValues = {
  email: string;
};
