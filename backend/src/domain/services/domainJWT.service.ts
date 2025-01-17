import { IDomainJwtServicePayload } from "../interfaces.ts/JWT.interfaces";

export abstract class DomainJwtService {
  abstract checkToken(token: string): Promise<any>;
  abstract createToken(
    payload: IDomainJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string;
}