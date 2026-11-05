import express from 'express';
import {cadastrarCategoria, listarCategorias, atualizarCategoria, deletarCategoria, buscarCategoriaPorId} from '../controller/categoriaController.js';


const router = express.Router();

router.post('/', cadastrarCategoria);
router.get('/', listarCategorias);
router.get('/:id', buscarCategoriaPorId);
router.patch('/:id', atualizarCategoria);
router.delete('/:id', deletarCategoria);

export default router;
