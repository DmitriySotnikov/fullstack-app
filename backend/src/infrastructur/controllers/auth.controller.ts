import {
  Controller,
  Req,
  Res,
  Post,
  Body,
  Inject,
  UseGuards,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { routes } from '../routes';
import { CreateUserUseCase } from 'src/usecases/user/createUser.usecase';
import { CreateUserDto } from '../dtos/createUserDto';
import { LoginUseCases } from 'src/usecases/auth/login.usecase';
import { ErrorHandler } from '../decorators/errorHandlerDecorator';
import { AuthUseCasesProxyModule } from '../useCasesProxy/auth.usecases-proxy.module';
import { UseCaseProxy } from '../useCasesProxy/usecase-proxy';
// import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JWTUsecaseProxyModule } from '../useCasesProxy/jwt.usecase-proxi.module';
import { JWTUsecases } from 'src/usecases/JWT/JWT.usecases';
import { CaptchaUsecaseProxyModule } from '../useCasesProxy/captcha.usecases-proxy.module';
import { CaptchaUsecases } from 'src/usecases/captcha/captcha.usecases';
import { AccessJwtAuthGuard } from '../guards/accessJwt.guard';
import { GetUserByEmailUseCase } from 'src/usecases/user/getUserByEmail.usecase';
import { getTokensAndSetCookie } from './utils';
import { LoginUserDto } from '../dtos/loginUserDto';
import { UserWithPassword } from 'src/domain/entites/user.entity';
import { RefreshJwtAuthGuard } from '../guards/refreshJwt.guard';

@Controller()
export class AuthController {
  constructor(
    @Inject(CaptchaUsecaseProxyModule.CAPTCHA_USE_CASE_PROXY)
    private readonly captchaUsecaseProxy: UseCaseProxy<CaptchaUsecases>,

    @Inject(AuthUseCasesProxyModule.CREATE_USER_USE_CASE_PROXY)
    private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCase>,

    @Inject(AuthUseCasesProxyModule.LOGIN_USER_USE_CASE_PROXY)
    private readonly loginUserUsecaseProxy: UseCaseProxy<LoginUseCases>,

    @Inject(JWTUsecaseProxyModule.JWT_USE_CASE_PROXY)
    private readonly jwtUsecaseProxyModule: UseCaseProxy<JWTUsecases>,

    @Inject(AuthUseCasesProxyModule.GET_USER_BY_EMAIL_USE_CASE_PROXY)
    private readonly getUserByEmailUsecaseProxy: UseCaseProxy<GetUserByEmailUseCase>,
  ) {}

  @Post(routes.LOGIN)
  @ErrorHandler()
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: LoginUserDto,
  ) {
    ///
    const userWithoutPassword = await this.loginUserUsecaseProxy
      .getInstance()
      .execute({ email: body.email, pass: body.password });

    const { firstname, lastname, email, userCaptchaId } =
      userWithoutPassword as UserWithPassword;

    const result = await this.captchaUsecaseProxy
      .getInstance()
      .validateOrCreateCaptcha({ id: userCaptchaId });

    if (result.captchaId) {
      return response.send(result);
    }

    const { accessToken } = await getTokensAndSetCookie({
      firstname,
      lastname,
      email,
      response,
      usecase: this.jwtUsecaseProxyModule,
    });

    return response.send({ ...userWithoutPassword, accessToken });
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

  @UseGuards(RefreshJwtAuthGuard)
  @Get(routes.REFRESH_TOKEN)
  @ErrorHandler()
  async refreshToken(
    ///
    @Req()
    request: Request,
    @Res()
    response: Response,
  ) {
    const { firstname, lastname, email } = request?.user as any;
    const user = await this.getUserByEmailUsecaseProxy
      .getInstance()
      .execute({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const { accessToken } = await getTokensAndSetCookie({
      firstname,
      lastname,
      email,
      response,
      usecase: this.jwtUsecaseProxyModule,
    });

    return response.send({ accessToken });
  }

  @UseGuards(AccessJwtAuthGuard)
  @Post(routes.GET_USER_BY_EMAIL)
  @ErrorHandler()
  async getUserByEmail(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: { email: string },
  ) {
    const { email } = body;
    const user = await this.getUserByEmailUsecaseProxy
      .getInstance()
      .execute({ email });

    return response.send(user);
  }

  @UseGuards(AccessJwtAuthGuard)
  @Get(routes.LOGOUT)
  @ErrorHandler()
  async logout(@Req() request: Request, @Res() response: Response) {
    response.clearCookie('refreshToken');
    return response.send({ status: 'success' });
  }
}
