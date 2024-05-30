import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  capacity: number;

  @Column({
    type: 'int',
    nullable: false,
    unique: true,
  })
  userId: number;
}
