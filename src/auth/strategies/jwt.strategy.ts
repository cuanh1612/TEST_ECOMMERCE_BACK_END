import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPayload } from "../interfaces/aut-payload.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: AuthPayload) {
        return { name: payload.name, email: payload.email, id: payload.id };
    }
}