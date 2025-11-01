import { GetUserByEmailUseCase } from "../../application/useCases/GetUserByEmailUseCase.js";
import UserRepository from "../../core/repositories/userRepository.js";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/jwt.js';

export class AuthController{
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase;

    constructor(){
        const userRepository = new UserRepository();
        this.getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);
    }

    async login(req: Request, res: Response){
        try {
            const { email, password } = req.body;
            const user = await this.getUserByEmailUseCase.execute(email)

            if (!user) {
                return res.status(404).json({error: "User not found"})
            }

            const isPasswordValid = await bcrypt.compare(password ?? "", user.password ?? "");

            if (!isPasswordValid) {
                return res.status(401).json({error: "Invalid password"});
            }

            const token = generateToken({ id: user.id, email: user.email});

            return res.status(200).json({token})
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }

}