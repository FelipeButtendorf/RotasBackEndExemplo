const fornecedores = []

export function cadastrar(fornecedor) {
    fornecedores.push(fornecedor)
}

export function listar() {
    return fornecedores
}

export function buscarPorIndice(indice) {
    return fornecedores[indice]
}

export function atualizar(indice, fornecedor) {
    fornecedores[indice] = fornecedor
}

export function deletar(indice) {
    fornecedores.splice(indice, 1)
}
