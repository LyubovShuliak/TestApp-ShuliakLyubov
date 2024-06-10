import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConstants } from '../constants/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.session) {
      return req.cookies.session;
    }

    return null;
  }

  async validate(payload: any) {
    const user = { name: payload.name };
    console.log(user);
    if (!payload.name) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
