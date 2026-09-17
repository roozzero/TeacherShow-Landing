export type UserRole = 'teacher' | 'student' | 'manager';

export type AuthMode = 'password' | 'otp';

export interface LoginFormData {
  username: string;
  password?: string;
  role: UserRole;
  otp?: string;
  otpCode?: string;
  captchaInput?: string;
  rememberMe?: boolean;
  authMode?: AuthMode;
}

export interface ToastMessage {
  id: string;
  type: 'sms' | 'success' | 'info' | 'error';
  title: string;
  message: string;
  code?: string;
}
