import {Fornecedor} from '../model/Fornecedor.js';
import {cadastrar, listar, atualizar, deletar, buscarPorIndice} from '../repository/fornecedorRepository.js';

export function cadastrarFornecedor(req, res) {
    const {nome,cnpj,telefone} = req.body;
    const fornecedor = new Fornecedor(nome,cnpj,telefone);
    cadastrar(fornecedor);
    res.status(201).json({mensagem: 'Fornecedor cadastrado com sucesso!'});
}

export function listarFornecedores(req, res) {
    const fornecedores = listar();
    res.status(200).json(fornecedores);
}

export function atualizarFornecedor(req, res) {
    const indice = Number(req.params.indice);
        const fornecedor = buscarPorIndice(indice);
    
        if(!fornecedor) {
            return res.status(404).json({mensagem: 'Fornecedor não encontrado!'});
        }
    
        const {nome,cnpj,telefone} = req.body;
        
        if(nome != undefined) {
            fornecedor.nome = nome;
        }
    
        if(cnpj != undefined) {
            fornecedor.cnpj = cnpj;
        }

        if(telefone != undefined) {
            fornecedor.telefone = telefone;
        }
    
        atualizar(indice, fornecedor);
        res.status(200).json({mensagem: 'Fornecedor atualizado com sucesso!'});
}

export function deletarFornecedor(req, res) {
    const indice = Number(req.params.indice);
    const fornecedor = buscarPorIndice(indice);

    if(!fornecedor) {
        return res.status(404).json({mensagem: 'Fornecedor não encontrado!'});
    }
    deletar(indice);
    res.status(200).json({mensagem: 'Fornecedor deletado com sucesso!'});
}

export function buscarFornecedorPorIndice(req, res) {
    const indice = Number(req.params.indice);
    const fornecedor = listar()[indice];
    if (fornecedor) {
        res.status(200).json(fornecedor);
    } else {
        res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
}