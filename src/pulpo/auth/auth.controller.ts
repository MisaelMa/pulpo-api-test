import {
    BadRequestException,
    Body,
    Controller,
    NotFoundException,
    Post,
    Res,
    UnauthorizedException,
    UseGuards,
    Req,
} from '@nestjs/common';
import {
    ApiOperation,
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
    ApiBadGatewayResponse,
    ApiBody,
    ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../common/decorator';
import { LoginDto } from './dto/LoginDto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response, Request } from 'express';
import { User } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        //       private readonly mailService: MailService,
        private readonly userService: UserService,
    ) { }

    /**
     * Login user authentication
     * @param dto User Form
     * @example /auth/login
     */
    @ApiOperation({
        summary: 'Login user authentication',
        description: 'In this way you will get the Token for Bearer authentication',
    })
    @ApiCreatedResponse({
        status: 201,
        description: 'Login success, you will receive the "accessToken" there',
    })
    @ApiBadRequestResponse({ status: 400, description: 'Invalid credentials' })
    @ApiForbiddenResponse({
        status: 403,
        description: 'Account is disabled, contact with administrator',
    })
    @ApiNotFoundResponse({
        status: 404,
        description: 'Your account does not exist',
    })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBadGatewayResponse({
        status: 502,
        description: 'Login user authentication',
    })
    @ApiBody({ type: LoginDto })
    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    async login(@Req() req, @Body() loginDto: LoginDto) {
        const user = await this.authService.login(req.user);
        return user;
    }

    /**
     * Register user customer
     * @param dto User Form
     * @example POST /customer/register
     */
    @ApiTags('Users single operation')
    @ApiOperation({
        summary: 'Create one user type customer',
        description:
            'In this way you will register a new user and get the Token for Bearer authentication',
    })
    @ApiCreatedResponse({
        status: 201,
        description: 'User created successfully',
        type: User,
    })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
    @ApiBadRequestResponse({
        status: 400,
        description: 'You will prompt with the validation issues',
    })
    @Public()
    @Post('register')
    async registerCustomer(@Body() userDto: User) {
        const user = await this.userService.createCustomer(userDto);
        const token = await this.authService.signToken(
            { id: user.id, name: user.name },
            '20d',
        );
        const tokenCode = await this.authService.signToken(
            { id: user.id, name: user.name },
            '10m',
        );
        // const url = process.env.URL_DIRTYTALKS;
        // const verificationCode = Math.floor(100000 + Math.random() * 900000);
        // await this.mailService.sendUserConfirmationDT(user, tokenCode);
        // await this.mailService.sendUserWelcome(user);
        return { ...user, token, tokenCode, verificationCode: 0 };
    }

    // @Public()
    // @Post('auth/forgot-password')
    // async sendForgotPassword(@Body('email') email: string, @Res() res) {
    //     if (!email) {
    //         throw new BadRequestException('Email is required');
    //     }

    //     const user = await this.userService.model.findOne({ email: email });
    //     if (!user) {
    //         throw new NotFoundException('User not found');
    //     }

    //     const token = await this.authService.signToken(
    //         { id: user.id, nick_name: user.nick_name },
    //         '15m',
    //     );

    //     const link = app.isDirty
    //         ? `${process.env.URL_DIRTYTALKS}forgot-password?token=${token}`
    //         : `${process.env.URL_TALKB}forgot-password?token=${token}`;

    //     const data = {
    //         email: email,
    //         date: moment().format('YYYY-MM-DD HH:mm'),
    //         link,
    //     };

    //     const info = await this.mailService.sendRestorePassword(data);
    //     return res.status(201).json({ message: `send email successfully `, user });
    // }

    // @Public()
    // @Put('auth/restore-password/:id')
    // async newPassword(@Req() req, @Res() res) {
    //     const { id } = req.params;
    //     const { newPassword, repeatNewPassword, token } = req.body;
    //     let tokenValid = false;
    //     if (!id)
    //         return res.status(400).json({ message: `id is required for action` });
    //     if (!token) return res.status(400).json({ message: `token is required` });

    //     const result = await this.authService.verifyToken(token);
    //     if (result == undefined)
    //         return res
    //             .status(201)
    //             .json({ message: `the token to expired`, tokenValid });

    //     if (!newPassword)
    //         return res.status(400).json({ message: `New password is required` });
    //     if (!repeatNewPassword)
    //         return res
    //             .status(400)
    //             .json({ message: `The new password is required repeated` });
    //     if (newPassword != repeatNewPassword)
    //         return res
    //             .status(400)
    //             .json({ message: `Repeated passwords are not the same` });

    //     const customer = await this.userService.model.findOne({ _id: id });
    //     const salt = await genSalt(10);
    //     const credentials = await hash(newPassword, salt);
    //     if (!customer) return res.status(400).json({ message: `User no found` });
    //     await this.userService.model.findOneAndUpdate(
    //         { _id: id },
    //         { password: credentials },
    //         { new: true },
    //     );

    //     tokenValid = true;
    //     return res
    //         .status(201)
    //         .json({ message: `password was updated successfully`, tokenValid });
    // }

    // @Public()
    // @Put('auth/change-password/:id')
    // async changePassword(@Req() req, @Res() res) {
    //     const { id } = req.params;
    //     const { oldPassword, newPassword, repeatNewPassword } = req.body;
    //     let tokenValid = false;
    //     if (!id)
    //         return res.status(400).json({ message: `id is required for action` });
    //     if (!oldPassword)
    //         return res.status(400).json({ message: `oldPassword is required` });
    //     if (!newPassword)
    //         return res.status(400).json({ message: `New password is required` });
    //     if (!repeatNewPassword)
    //         return res
    //             .status(400)
    //             .json({ message: `The new password is required repeated` });
    //     if (newPassword != repeatNewPassword)
    //         return res
    //             .status(400)
    //             .json({ message: `Repeated passwords are not the same` });

    //     let customer = await this.userService.model.findOne({ _id: id });
    //     const salt = await genSalt(10);
    //     const credentials = await hash(newPassword, salt);
    //     if (!customer) return res.status(400).json({ message: `User no found` });

    //     const TYPE = 'customer';

    //     customer = await this.userService.model.findOneAndUpdate(
    //         { _id: id, type: TYPE },
    //         { password: credentials },
    //         { new: true },
    //     );

    //     tokenValid = true;
    //     return res
    //         .status(201)
    //         .json({ message: `password was updated successfully`, customer });
    // }

    // @Public()
    // @Post('auth/refresh-token')
    // async refresToken(@Req() req, @Res() res, @Body('token') token: string) {
    //     try {
    //         const jwt = await this.authService.refreshToken(token);
    //         if (jwt) {
    //             res.status(201).json({
    //                 ...jwt,
    //             });
    //         } else {
    //             throw new UnauthorizedException('Not Found Token');
    //         }
    //     } catch (e) {
    //         throw new UnauthorizedException('Not Found Token');
    //     }
    // }
}
