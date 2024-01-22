import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { AtualizarUsuarioDTO } from './dto/atualizarUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.id = uuid();

    this.usuarioRepository.salvar(usuarioEntity);
    return{
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      message: "Usuario criado com sucesso"
    }

    /*this.usuarioRepository.salvar(usuarioEntity);
    return {id: usuarioEntity.id, 
      message: "Usuario Criado com sucesso!"};*/
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      usuario => new ListaUsuarioDTO(
        usuario.id,
        usuario.nome
      )
    );
    return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() dadosParaAtualizar: AtualizarUsuarioDTO){
      const usuarioAtualizado = await this.usuarioRepository.atualiza(id, dadosParaAtualizar);

      return{
        usuario: usuarioAtualizado,
        mensagem: "usuario atualizado com sucesso"
      }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string){
    const usuarioRemovido = await this.usuarioRepository.remove(id);

    return{
      usuario: usuarioRemovido,
      mensagem: 'Usuário removido com sucesso!'
    }
  }

 
}