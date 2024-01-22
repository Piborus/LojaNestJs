import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  async salva(produto: ProdutoEntity) {
    this.produtos.push(produto);
  }

  async listaTodos() {
    return this.produtos;
  }

  async existeProduto(nome: string){
    const possiveProduto = this.produtos.find(
      (produto) => produto.nome === nome);

      possiveProduto !== undefined;
  }

  private buscaPorId(id: string){
    const possivelProduto = this.produtos.find(
      produtoSalvo => produtoSalvo.id === id);
      if(!possivelProduto){
        throw new Error('Não foi encontrado o produto solicitado');
      }
      return possivelProduto;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<ProdutoEntity>){
    const produto = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if(chave === 'id'){
        return;
      }

      produto[chave] = valor;
    });
    return produto;
  }

  async remove(id: string){
    const produto = this.buscaPorId(id);
    this.produtos = this.produtos.filter(
      produtoSalvo => produtoSalvo.id !== id
    );
    return produto;
  }
}  

  


