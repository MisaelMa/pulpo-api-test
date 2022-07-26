import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { PATTERN_VALID_EMAIL } from '../../config/config.constants';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { JwtPayload, PayloadToken } from '../../common/interfaces/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(userData: string, password: string): Promise<User> {
    // Verify if userData is email or username
    const data: { name?: string; email?: string } = {};
    !PATTERN_VALID_EMAIL.test(userData)
      ? (data.name = userData)
      : (data.email = userData);

    const user = await this.userService.getByUser(data);
    if (!user) {
      throw new NotFoundException('Your account does not exist');
    }
    // Maybe in the future watch this feature
    // if (!user.enabled) {
    //     throw new ForbiddenException('Account is disabled, contact with administrator');
    // }
    const isMatch = compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    delete user.password;
    return user;
  }

  async login(user: User) {
    const payload: JwtPayload = { name: user.name, id: user._id };
    const getUser: any = await this.userService.model
      .findOne({ _id: user._id })
      .select(['type']);
    let expire: string;

    if (getUser.type == 'customer') {
      expire = '20d';
    } else {
      expire = '1d';
    }
    const accessToken = await this.signToken(payload, expire);

    await this.userService.model.findOneAndUpdate(
      { _id: user._id },
      { token: accessToken },
    );

    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      picture: user.picture,
      email_checked: user.email_checked,
      token: accessToken,
    };
  }

  async signToken(payload: JwtPayload, expiration: string | number) {
    console.log(expiration);
    return this.jwtService.sign(payload, { expiresIn: expiration });
  }

  async verifyToken(token) {
    return this.jwtService.verify(token);
  }

  async validateToken(token: string) {
    return 'amir'; //this.jwtService.verifyAsync(token);
  }

  public async refreshToken(token: string) {
    const decode = this.jwtService.decode(token) as JwtPayload & PayloadToken;
    const payload = { id: decode?.id, name: decode?.name };
    const access_token = await this.signToken(payload, '1d');
    return {
      refresh_token: access_token,
      decode: this.jwtService.decode(access_token) as JwtPayload & PayloadToken,
    };
  }
}
