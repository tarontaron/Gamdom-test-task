// Form types
export type TLoginForm = {
  email: string;
  password: string;
};

export type TRegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Api payloads
export type TLoginPayload = TLoginForm;

export type TRegisterPayload = Omit<TRegisterForm, 'confirmPassword'>;

// Api responses
export type TAuthResponse = {
  accessToken: string;
};
