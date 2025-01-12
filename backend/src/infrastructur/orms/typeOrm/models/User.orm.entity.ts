import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CaptchaEntity } from './Captcha.orm.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  firstname: string;

  @Column('varchar')
  lastname: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @OneToOne(() => CaptchaEntity)
  @JoinColumn({ name: 'userCaptchaId' })
  userCaptcha: CaptchaEntity;

  @Column({ name: 'userCaptchaId', select: true })
  userCaptchaId: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;
}
