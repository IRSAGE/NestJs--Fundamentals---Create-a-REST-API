import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return { msg: 'I am signed up' };
  }

  signUp() {
    return 'I am signed in';
  }
}
