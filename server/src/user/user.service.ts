import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import validateInitData from 'src/utils/validateInitData';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto, initDataRaw: string) {
    if (!process.env.DEV) {
      validateInitData(initDataRaw);
    }
    const existingUser = await this.userModel
      .findOne({ telegramId: this.getUserIdFromInitData(initDataRaw) })
      .exec();

    if (existingUser) {
      throw new ConflictException('User with this Telegram ID already exists');
    }
  
    await new this.userModel(createUserDto).save();
  }

  async findOne(telegramId: number, initDataRaw: string) {
    if (!process.env.DEV) {
      validateInitData(initDataRaw);
    }
    const existingUser = await this.userModel
    .findOne({ telegramId })
    .exec();
    
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return existingUser;
  }

  private getUserIdFromInitData(encodedString: string): number | null {
    const params = new URLSearchParams(encodedString);
    const userEncoded = params.get('user');

    if (!userEncoded) {
      return null;
    }

    const userDecoded = decodeURIComponent(userEncoded);

    try {
      const userObject = JSON.parse(userDecoded);
      return userObject.id;
    } catch (error) {
      console.error('Failed to parse user object:', error);
      return null;
    }
  }
}
