import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoRepository } from './produto.repository';
import { ProdutoEntity } from './produto.entity';
import { ListarProdutoDTO } from './dto/listaProduto.dto';
import { AtualizarProdutoDTO } from './dto/atualizaProduto.dto';


@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    const produto = new ProdutoEntity();
    produto.id = uuid();
    produto.usuarioId = uuid();
    produto.nome = dadosProduto.nome;
    produto.valor = dadosProduto.valor;
    produto.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
    produto.descricao = dadosProduto.descricao;
    produto.caracteristicas = dadosProduto.caracteristicas;
    produto.imagens = dadosProduto.imagens;
    produto.categoria = dadosProduto.categoria;
    produto.dataCriacao = dadosProduto.dataCriacao;
    produto.dataAtualizacao = dadosProduto.dataAtualizacao;
    
    const produtoCadastrado = this.produtoRepository.salva(produto);
    return{
      produto: new ListarProdutoDTO(produto.id, produto.nome),
      messagem: 'Produto criado com sucesso'
    }
  
    return produtoCadastrado;
  }

  @Get()
  async listaProdutos() {
    const produtosSalvos = await this.produtoRepository.listaTodos();
    const produtoLista = produtosSalvos.map(
      produto => new ListarProdutoDTO(
        produto.id,
        produto.nome
      )
    );
    return produtoLista;
  }

  @Put('/:id')
  async atualizaProduto(@Param('id') id: string, @Body() dadosParaAtualizar: AtualizarProdutoDTO){
    const produtoAtualizado = await this.produtoRepository.atualiza(id, dadosParaAtualizar);

    return{
      produto: produtoAtualizado,
      menssage: "O produto foi atualizado"
    } 
  }

  @Delete('/:id')
  async deletaProduto (@Param('id') id :string) {
    const produtoRemovido = await this.produtoRepository.remove(id);

    return{
      produto: produtoRemovido,
      messagem: 'Produto removido com sucesso!'
    }
  }
}