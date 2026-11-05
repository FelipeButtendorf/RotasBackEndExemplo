import {Categoria} from '../model/categoria.js';
import {atualizar, buscarPorId, cadastrar, deletar, listar} from '../repository/categoriaRepository.js';

export  async function cadastrarCategoria(req, res) {

    try{
    const {nome, descricao} = req.body;
    if(!nome || !descricao) {
        return res.status(400).json({mensagem: 'Todos os campos são obrigatórios!'});
    }
    const categoria = new Categoria(nome, descricao);

    const id = await cadastrar(categoria);

    res.status(201).json({mensagem: 'Categoria cadastrada com sucesso!', id_categoria: id});
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao cadastrar categoria!' + erro});
    }
}

export async function listarCategorias(req, res) {
    try{
        const listaDeCategorias = await listar();
        res.status(200).json(listaDeCategorias);
    } catch(erro) {
        res.status(500).json({mensagem: 'Erro ao listar categorias!' + erro});
    }
}

export async function buscarCategoriaPorId(req, res) {
    try{
    const id = Number(req.params.id);
    
    const categoria = await buscarPorId(id);

    if(!categoria) {
       return res.status(404).json({mensagem: 'Categoria não encontrada!'});
    }
    res.status(200).json(categoria);
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao buscar categoria!' + erro});
    }
}

export async function atualizarCategoria(req, res) {
    try{
    const id = Number(req.params.id);

    const categoria = await buscarPorId(id);

    if(!categoria) {
        return res.status(404).json({mensagem: 'Categoria não encontrada!'});
    }

    const {nome, descricao} = req.body;

    if(nome !== undefined) {
        categoria.nome = nome;
    }
    if(descricao !== undefined) {
        categoria.descricao = descricao;
    }

    const resultado = await atualizar(id, categoria);

    if(resultado === 0) {
        return res.status(500).json({mensagem: 'Nenhuma categoria atualizada!'});
    }

    res.status(200).json({mensagem: 'Categoria atualizada com sucesso!'});
    
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao atualizar categoria!' + erro});
    }
}

export async function deletarCategoria(req, res) {
    try{
    const id = Number(req.params.id);

    const categoria = await buscarPorId(id);
    

    if(!categoria) {
        return res.status(404).json({mensagem: 'Categoria não encontrada!'});
    }

    const resultado = await deletar(id);

    if(resultado === 0) {
        return res.status(500).json({mensagem: 'Nenhuma categoria deletada!'});
    }

    res.status(200).json({mensagem: 'Categoria deletada com sucesso!'});
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao deletar categoria!' + erro});
    }
}