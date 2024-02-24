type registerErrorType = {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};

type loginErrorType = {
  email?: string;
  password?: string;
};

type resetPasswordType = {
  password: string;
  confirm_password: string;
  token: string;
  email: string;
};
