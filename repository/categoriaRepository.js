import conexao from '../config/conexao.js';

export async function cadastrar(categoria) {
    const sql = 'INSERT INTO categorias (nome, descricao) VALUES (?, ?)';
    const [resultado] = await conexao.execute(sql, [categoria.nome, categoria.descricao]);
    return resultado.insertId;
}

export async function listar() {
    const sql = 'SELECT * FROM categorias';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}

export async function buscarPorId(id) {
    const sql = 'SELECT * FROM categorias WHERE id_categoria = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado[0];
}

export async function atualizar(id, categoria) {
    const sql = 'UPDATE categorias SET nome = ?, descricao = ? WHERE id_categoria = ?';
    const [resultado] = await conexao.execute(sql, [categoria.nome, categoria.descricao, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM categorias WHERE id_categoria = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}

