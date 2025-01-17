export interface IAuthState {
    isAuthenticated: boolean;
    captcha: string | null;
    captchaId: string | null;
    isCaptchaVerified: boolean;
    user: {
      firstName: string | null;
      lastName: string | null;
      email: string | null;
    };
    accessToken: string | null;
  }