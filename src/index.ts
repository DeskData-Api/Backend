import express from 'express';
import chamadosRoutes from './routes/chamadosRoutes';
import cors from 'cors';
import router from './routes';

const app = express();
const port = process.env.PORT ?? 3003;

app.use(cors());
app.use(express.json());
app.use(router);

app.use('/api', chamadosRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});