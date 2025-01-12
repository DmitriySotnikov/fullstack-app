import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'captchas' })
export class CaptchaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  captchaId: string;

  @Column('varchar')
  value: string;

  @Column('boolean', { default: false })
  isPassed: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;
}
