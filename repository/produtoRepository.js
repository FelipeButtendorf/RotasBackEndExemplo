const produtos = []

export function cadastrar(produto) {
    produtos.push(produto);
}

export function listar() {
    return produtos;
}

export function atualizar(indice, produto) {
    produtos[indice] = produto;
}

export function deletar(indice) {
    produtos.splice(indice, 1);
}

export function buscarPorIndice(indice){
    return produtos[indice]
}