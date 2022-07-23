import {
  Body,
  Controller,
  Req,
  Get,
  Header,
  HttpStatus,
  NotFoundException,
  Delete,
  UploadedFile,
  UseInterceptors,
  Param,
  Post,
  Put,
  Query,
  Res,
  BadRequestException,
  UnauthorizedException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserDocument } from './schema/user.schema';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud, defaultPaginate } from 'nestjs-mongoose-crud';
import {
  CrudQuery,
  ICrudQuery,
} from 'nestjs-mongoose-crud/dist/crud-query.decorator';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Crud({
  model: User,
})
@Controller('user')
export class UserController {
  crudOptions = {};
  model: ModelType<UserDocument>;

  constructor(public service: UserService) {
    this.model = service.model;
  }
}
