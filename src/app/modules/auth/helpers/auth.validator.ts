import { IsEmail, IsString, MaxLength } from 'class-validator';

export class REGISTRATION {
  @IsString() @MaxLength(50) name: string;
  @IsEmail() email: string;
  @IsString() password: string;
}

export class LOGIN {
  @IsEmail() email: string;
  @IsString() password: string;
}
