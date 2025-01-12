import { Injectable } from '@nestjs/common';
import { CaptchaEntity } from '../orms/typeOrm/models/Captcha.orm.entity';
import { Captcha } from 'src/domain/entites/captcha.entity';

@Injectable()
export class CaptchaMapper {
  formModelToEntity(capchaModel: CaptchaEntity) {
    return new Captcha({
      id: capchaModel.id,
      value: capchaModel.value,
      captchaId: capchaModel.captchaId,
      isPassed: capchaModel.isPassed,
    });
  }
}
