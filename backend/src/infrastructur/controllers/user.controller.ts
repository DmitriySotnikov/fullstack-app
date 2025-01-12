import { Controller, Req, Res, Post, Body, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { routes } from '../routes';
import { CreateUserUseCase } from 'src/usecases/user/createUser.usecase';
import { CreateUserDto } from '../dtos/createUserDto';
import { LoginUserUseCase } from 'src/usecases/user/loginUser.usecase';
import { ErrorHandler } from '../decorators/errorHandlerDecorator';
import { LoginUserDto } from '../dtos/loginUserDto';
import { UserUseCasesProxyModule } from '../useCasesProxy/user.usecases-proxy.module';
import { UseCaseProxy } from '../useCasesProxy/usecase-proxy';

@Controller()
export class UserController {
  constructor(
    @Inject(UserUseCasesProxyModule.CREATE_USER_USE_CASE_PROXY)
    private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCase>,

    @Inject(UserUseCasesProxyModule.LOGIN_USER_USE_CASE_PROXY)
    private readonly loginUserUsecaseProxy: UseCaseProxy<LoginUserUseCase>,
  ) {}

  @Post(routes.LOGIN)
  @ErrorHandler()
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: LoginUserDto,
  ) {
    const result = await this.loginUserUsecaseProxy.getInstance().execute({
      email: body.email,
      password: body.password,
    });

    return response.send(result);
  }

  @Post(routes.REGISTRATION)
  @ErrorHandler()
  async registration(
    ///
    @Req()
    request: Request,
    @Res()
    response: Response,
    @Body() body: CreateUserDto,
  ) {
    const result = await this.createUserUsecaseProxy
      .getInstance()
      .execute({ user: body });
    return response.send(result);
  }
}
