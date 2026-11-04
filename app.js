import express from 'express';
import produtoRoutes from './routes/produtoRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import fornecedorRoutes from './routes/fornecedorRoutes.js';
import conexao from './config/conexao.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/produto', produtoRoutes);
app.use('/fornecedor', fornecedorRoutes);
app.use('/categoria', categoriaRoutes);

async function iniciarServidor() {
    console.log(PORT);
    try {
        const conexaoTeste = await conexao.getConnection();
        
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (erro) {
        console.log('Erro ao conectar com o banco de dados:');
        console.log(erro.mensagem);
        process.exit(1);
    }
}

iniciarServidor();
