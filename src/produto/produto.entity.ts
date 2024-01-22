export class ProdutoEntity{
    id: string;
    usuarioId: string;
    nome: string;
    valor: number;
    quantidadeDisponivel: number;
    descricao: string;
    caracteristicas: CaracteristicaProduto[];
    imagens: ImagemProduto[];
    categoria: string;
    dataCriacao: string;
    dataAtualizacao: string;
}

class CaracteristicaProduto {
    nome: string;
    descricao: string;
  }
  
  class ImagemProduto {
    url: string;
    descricao: string;
  }