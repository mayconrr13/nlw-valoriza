import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import { Tag } from './Tag';

import { v4 as uuidv4 } from 'uuid'
import { User } from './User';

@Entity("compliments")
class Compliment {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_sender: string;

  @JoinColumn({ name: "user_sender"})
  @ManyToOne(() => User)
  userSender: User;
  
  @Column()
  user_reciever: string;

  @JoinColumn({ name: "user_reciever"})
  @ManyToOne(() => User)
  userReciever: User;
  
  @Column()
  tag_id: string;

  //relacionamento
  @JoinColumn({ name: "tag_id"})
  @ManyToOne(() => Tag)
  tag: Tag;
  
  @Column()
  message: string;
  
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Compliment }