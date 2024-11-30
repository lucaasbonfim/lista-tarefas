import bcrypt from "bcrypt";
import * as authDatasource from "../datasource/authDatasource.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function register({ username, email, password }) {
    const userExists = await authDatasource.getUserByEmail(email);
    if (userExists) {
        throw new Error("Email já está em uso");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authDatasource.createUser({ username, email, password: hashedPassword });

    return { message: "Usuário registrado com sucesso", userId: newUser.id };
}

export async function login({ email, password }) {
    const user = await authDatasource.getUserByEmail(email);
    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Senha inválida");
    }
    
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, 
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
    );

    return token;
}
