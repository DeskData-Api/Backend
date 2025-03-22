import express from 'express';
import chamadosRoutes from './routes/chamadosRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', chamadosRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});