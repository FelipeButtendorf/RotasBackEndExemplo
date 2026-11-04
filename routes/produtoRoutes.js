import express from 'express';
import {cadastrarProduto, listarProdutos, atualizarProduto, deletarProduto, buscarProdutoPorId} from '../controller/produtoController.js';


const router = express.Router();

router.post('/', cadastrarProduto);
router.get('/', listarProdutos);
router.get('/:id', buscarProdutoPorId);
router.patch('/:id', atualizarProduto);
router.put('/:id', atualizarProduto);
router.delete('/:id', deletarProduto);

export default router;
