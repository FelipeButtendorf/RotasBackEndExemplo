import {Categoria} from '../model/Categoria.js'
import {cadastrar, listar, atualizar, deletar, buscarPorIndice} from '../repository/categoriaRepository.js'

export function cadastrarCategoria(req, res) {
    const {nome,descricao} = req.body;
    const categoria = new Categoria(nome,descricao);
    cadastrar(categoria);
    res.status(201).json({mensagem: 'Categoria cadastrada com sucesso!'})
}

export function listarCategorias(req, res) {
    const listaDeCategorias = listar();
    res.status(200).json(listaDeCategorias);
}

export function buscarCategoriaPorIndice(req, res) {
    const indice = Number(req.params.indice);
    const categoria = buscarPorIndice(indice);

    if(!categoria) {
        return res.status(404).json({mensagem: 'Categoria não encontrada!'});
    }

    res.status(200).json(categoria);
}

export function atualizarCategoria(req, res) {
    const indice = Number(req.params.indice);
    const categoria = buscarPorIndice(indice);

    if(!categoria) {
        return res.status(404).json({mensagem: 'Categoria não encontrada!'});
    }

    const {nome,descricao} = req.body;

    if(descricao != undefined) {
        categoria.descricao = descricao;
    }

    if(nome != undefined) {
        categoria.nome = nome;
    }

    atualizar(indice, categoria);
    res.status(200).json({mensagem: 'Categoria atualizada com sucesso!'});
}

export function deletarCategoria(req, res) {
    const indice = Number(req.params.indice);
    const categoria = buscarPorIndice(indice);

    if(!categoria) {
        return res.status(404).json({mensagem: 'Categoria não encontrada!'});
    }
    deletar(indice);
    res.status(200).json({mensagem: 'Categoria deletada com sucesso!'});
}
