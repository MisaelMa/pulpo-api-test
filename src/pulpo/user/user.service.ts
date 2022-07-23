import {
  BadGatewayException,
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { RoleEnum, User, UserDocument } from './schema/user.schema';
import { genSalt, hash } from "bcrypt";
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) public model: ModelType<UserDocument, User>,
  ) { }

  async getOneById(id: string): Promise<User> {
    return (
      (await this.model.findOne({ _id: id }).catch((err) => {
        throw new BadGatewayException('Something happened', err);
      })) || null
    );
  }

  async getByUser(data: { name?: string; email?: string }) {
    if (data.email) {
      return this.model.findOne({ email: data.email }).catch((err) => {
        throw new BadGatewayException('Something happened', err);
      });
    }
    return this.model.findOne({ name: data.name }).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  async createCustomer(dto: User): Promise<any> {
    const isFindEmail = await this.model.findOne().where({
      email: dto.email,
    })

    const isFindAccount = await this.model.findOne().where({
      name: dto.name,
    })

    if (!isFindEmail && !isFindAccount) {
      let salt = await genSalt(10);
      const passwordHash = await hash(dto.password, salt);
      const userData: User = {
        email: dto.email,
        password: passwordHash,
        name: dto.name,
      } as User
      const user = new this.model(userData);
      await user.save();
      return {
        _id: user._id,
        role: user.role,
        picture: user.picture,
        name: user.name,
        email: user.email,
      }
    } else {
      let message = ""
      if (isFindEmail) {
        message = "Email"
      }
      if (isFindAccount) {
        if (isFindEmail) {
          message = message + " & Account"
        } else {
          message = "Account"
        }
      }
      throw new BadRequestException(`This ${message} is already taken. Please choose another.`);
      // alert('this username is already taken. Please choose another.')
    }
  }
}
