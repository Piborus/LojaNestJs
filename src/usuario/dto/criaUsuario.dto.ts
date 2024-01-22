import { IsEmail, IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validator/email-eh-unico.validator';


export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailEhUnico({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @Min(6, { message: 'A senha precisa ter pelo menos 6 numeros' })
  senha: string;
}