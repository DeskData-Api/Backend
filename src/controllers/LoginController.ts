import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioServices';
import { generateToken } from '../middlewares';
import { sha512 } from "sha512-crypt-ts";

const usuarioService = new UsuarioService();

export class LoginController {
    static async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
            }
            const user = await usuarioService.obterLogin(email, sha512.crypt(senha, "password"));

            if (user) {
                const token = await generateToken(user);
                return res.status(200).json({ token });
            }
            return res.status(401).json({ error: 'Credenciais inválidas.' });
            
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
}
