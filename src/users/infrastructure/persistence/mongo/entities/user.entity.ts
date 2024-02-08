import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class UserEntity extends Document {
  @Prop()
  nickName: string;

  @Prop()
  displayName: string;

  @Prop()
  email: string;

  @Prop()
  hash: string;

  @Prop()
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
