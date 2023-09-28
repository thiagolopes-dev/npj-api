
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        // private userService: UserService,
        private jwtService: JwtService
    ) { }
}
