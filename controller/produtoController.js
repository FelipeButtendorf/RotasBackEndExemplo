import {Produto} from '../model/produto.js';
import {atualizar, buscarPorId, cadastrar, deletar, listar} from '../repository/produtoRepository.js';

export  async function cadastrarProduto(req, res) {

    try{
    const {descricao, preco, peso} = req.body;
    if(!descricao || !preco || !peso) {
        return res.status(400).json({mensagem: 'Todos os campos são obrigatórios!'});
    }
    const produto = new Produto(descricao, preco, peso);

    const id = await cadastrar(produto);
    
    cadastrar(produto);

    res.status(201).json({mensagem: 'Produto cadastrado com sucesso!', id_produto: id});
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao cadastrar produto!' + erro});
    }
}

export async function listarProdutos(req, res) {
    try{
        const listaDeProdutos = await listar();
        res.status(200).json(listaDeProdutos);
    } catch(erro) {
        res.status(500).json({mensagem: 'Erro ao listar produtos!' + erro});
    }
}

export async function buscarProdutoPorId(req, res) {
    try{
    const id = Number(req.params.id);
    
    const produto = await buscarPorId(id);

    if(!produto) {
       return res.status(404).json({mensagem: 'Produto não encontrado!'});
    }
    res.status(200).json(produto);
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao buscar produto!' + erro});
    }
}

export async function atualizarProduto(req, res) {
    try{
    const id = Number(req.params.id);

    const produto = await buscarPorId(id);

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

    const resultado = await atualizar(id, produto); 

    if(resultado === 0) {
        return res.status(500).json({mensagem: 'Nenhum produto atualizado!'});
    }

    res.status(200).json({mensagem: 'Produto atualizado com sucesso!'});
    
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao atualizar produto!' + erro});
    }
}

export async function deletarProduto(req, res) {
    try{
    const id = Number(req.params.id);

    const produto = await buscarPorId(id);
    

    if(!produto) {
        return res.status(404).json({mensagem: 'Produto não encontrado!'});
    }

    const resultado = await deletar(id);

    if(resultado === 0) {
        return res.status(500).json({mensagem: 'Nenhum produto deletado!'});
    }

    res.status(204).json({mensagem: 'Produto deletado com sucesso!'});
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao deletar produto!' + erro});
    }
}