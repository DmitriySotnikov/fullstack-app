import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaptchaEntity } from '../typeOrm/models/Captcha.orm.entity';
import { CaptchaEntityRepository } from 'src/domain/repositories/captcha.repository';
import { Captcha, NewCaptcha } from 'src/domain/entites/captcha.entity';
import { CaptchaMapper } from 'src/infrastructur/mappers/captcha.mapper';

@Injectable()
export class CaptchaRepository implements CaptchaEntityRepository {
  constructor(
    @InjectRepository(CaptchaEntity)
    private readonly captchaEntityRepository: Repository<CaptchaEntity>,
    private readonly captchaMapper: CaptchaMapper,
  ) {}

  async create(captcha: NewCaptcha): Promise<{ message: string }> {
    const result = await this.captchaEntityRepository.save(captcha);

    if (!result) {
      throw new Error('Captcha not created');
    }

    return { message: 'Captcha created' };
  }

  async delete({ captchaId }: { captchaId: string }): Promise<void> {
    await this.captchaEntityRepository.delete({
      captchaId,
    });
  }

  async getByCaptchaId({ captchaId }: { captchaId: string }): Promise<Captcha> {
    const captcha = await this.captchaEntityRepository.findOne({
      where: {
        captchaId,
      },
      select: [
        'id',
        'captchaId',
        'value',
        'isPassed',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!captcha) {
      throw new Error('Captcha not found');
    }

    return this.captchaMapper.formModelToEntity(captcha);
  }

  async getById({ id }: { id: number }): Promise<Captcha> {
    const captcha = await this.captchaEntityRepository.findOne({
      where: {
        id,
      },
      select: [
        'id',
        'captchaId',
        'value',
        'isPassed',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!captcha) {
      throw new Error('Captcha not found');
    }

    return this.captchaMapper.formModelToEntity(captcha);
  }

  async update(captcha: Captcha): Promise<void> {
    await this.captchaEntityRepository.save({
      ...captcha,
    });
  }
}
