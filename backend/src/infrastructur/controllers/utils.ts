import { jwtConfig } from 'src/config/JWT.config';
import { Response } from 'express';

export const getTokensAndSetCookie = async ({
  firstname,
  lastname,
  email,
  response,
  usecase,
}: {
  firstname: string;
  lastname: string;
  email: string;
  response: Response;
  usecase: any;
}) => {
  const accessToken = await usecase.getInstance().getToken({
    firstname,
    lastname,
    email,
    expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRATION_TIME,
  });

  const refreshToken = await usecase.getInstance().getToken({
    firstname,
    lastname,
    email,
    expiresIn: jwtConfig.REFRESH_TOKEN_EXPIRATION_TIME,
  });

  response.cookie(
    ///
    jwtConfig.COOKIE_TOKEN_NAME,
    refreshToken,
    {
      domain: jwtConfig.DOMAIN,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: jwtConfig.COOKIE_EXPIRES_IN,
    },
  );
  return { accessToken };
};
