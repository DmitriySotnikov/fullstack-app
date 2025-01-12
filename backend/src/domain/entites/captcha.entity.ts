export interface INewCaptcha {
  captchaId: string;
  value: string;
  isPassed: boolean;
}

export interface ICaptcha extends INewCaptcha {
  id: number;
}

export class NewCaptcha implements INewCaptcha {
  public readonly captchaId: string;
  public readonly value: string;
  public readonly isPassed: boolean;
  constructor({ captchaId, value, isPassed }: INewCaptcha) {
    this.captchaId = captchaId;
    this.value = value;
    this.isPassed = isPassed;
  }
}

export class Captcha extends NewCaptcha {
  public readonly id: number;
  constructor({ id, captchaId, value, isPassed }: ICaptcha) {
    super({ captchaId, value, isPassed });
    this.id = id;
  }
}
