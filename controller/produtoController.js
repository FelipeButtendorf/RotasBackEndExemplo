import {Produto} from '../model/produto.js';
import {atualizar, buscarPorIndice, cadastrar, deletar, listar} from '../repository/produtoRepository.js';

export function cadastrarProduto(req, res) {
    const {descricao, preco, peso} = req.body;

    const produto = new Produto(descricao, preco, peso);

    cadastrar(produto);

    res.status(201).json({mensagem: 'Produto cadastrado com sucesso!'});
}

export function listarProdutos(req, res) {
    const listaDeProdutos = listar();

    res.status(200).json(listaDeProdutos);
}

export function buscarProdutoPorIndice(req, res) {
    const indice = Number(req.params.indice);
    
    buscarPorIndice(indice);

    const produto = buscarPorIndice(indice);
    if(!produto) {
       return res.status(404).json({mensagem: 'Produto não encontrado!'});
    }
    res.status(200).json(produto);
}

export function atualizarProduto(req, res) {
    const indice = Number(req.params.indice);

    const produto = buscarPorIndice(indice);
    if(!produto) {
        return res.status(404).json({mensagem: 'Produto não encontrado!'});
    }

    const {descricao, preco, peso} = req.body;

    if(descricao != undefined) {
        produto.descricao = descricao;
    }else if(preco != undefined) {
        produto.preco = preco;
    }else if(peso != undefined) {
        produto.peso = peso;
    }

    atualizar(indice, produto);

    res.status(200).json({mensagem: 'Produto atualizado com sucesso!'});
}

export function deletarProduto(req, res) {
    const indice = Number(req.params.indice);

    const produto = buscarPorIndice(indice);

    if(!produto) {
        return res.status(404).json({mensagem: 'Produto não encontrado!'});
    }

    deletar(indice);

    res.status(204).json({mensagem: 'Produto deletado com sucesso!'});
}