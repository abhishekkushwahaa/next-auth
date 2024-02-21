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
