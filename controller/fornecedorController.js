import {Fornecedor} from '../model/fornecedor.js';
import {atualizar, buscarPorId, cadastrar, deletar, listar} from '../repository/fornecedorRepository.js';

export  async function cadastrarFornecedor(req, res) {

    try{
    const {nome, cnpj, telefone} = req.body;
    if(!nome || !cnpj || !telefone) {
        return res.status(400).json({mensagem: 'Todos os campos são obrigatórios!'});
    }
    const fornecedor = new Fornecedor(nome, cnpj, telefone);

    const id = await cadastrar(fornecedor);

    res.status(201).json({mensagem: 'Fornecedor cadastrado com sucesso!', id_fornecedor: id});
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao cadastrar fornecedor!' + erro});
    }
}

export async function listarFornecedores(req, res) {
    try{
        const listaDeFornecedores = await listar();
        res.status(200).json(listaDeFornecedores);
    } catch(erro) {
        res.status(500).json({mensagem: 'Erro ao listar fornecedores!' + erro});
    }
}

export async function buscarFornecedorPorId(req, res) {
    try{
    const id = Number(req.params.id);
    
    const fornecedor = await buscarPorId(id);

    if(!fornecedor) {
       return res.status(404).json({mensagem: 'Fornecedor não encontrado!'});
    }
    res.status(200).json(fornecedor);
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao buscar fornecedor!' + erro});
    }
}

export async function atualizarFornecedor(req, res) {
    try{
    const id = Number(req.params.id);

    const fornecedor = await buscarPorId(id);

    if(!fornecedor) {
        return res.status(404).json({mensagem: 'Fornecedor não encontrado!'});
    }

    const {nome, cnpj, telefone} = req.body;

    if(nome !== undefined) {
        fornecedor.nome = nome;
    }
    if(cnpj !== undefined) {
        fornecedor.cnpj = cnpj;
    }
    if(telefone !== undefined) {
        fornecedor.telefone = telefone;
    }

    const resultado = await atualizar(id, fornecedor);

    if(resultado === 0) {
        return res.status(500).json({mensagem: 'Nenhum fornecedor atualizado!'});
    }

    res.status(200).json({mensagem: 'Fornecedor atualizado com sucesso!'});
    
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao atualizar fornecedor!' + erro});
    }
}

export async function deletarFornecedor(req, res) {
    try{
    const id = Number(req.params.id);

    const fornecedor = await buscarPorId(id);
    

    if(!fornecedor) {
        return res.status(404).json({mensagem: 'Fornecedor não encontrado!'});
    }

    const resultado = await deletar(id);

    if(resultado === 0) {
        return res.status(500).json({mensagem: 'Nenhum fornecedor deletado!'});
    }

    res.status(200).json({mensagem: 'Fornecedor deletado com sucesso!'});
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao deletar fornecedor!' + erro});
    }
}