import * as authBusiness from "../business/authBusiness.js";

export async function registerUser(req, res) {
    const { username, email, password } = req.body;

    try {
        const result = await authBusiness.register({ username, email, password });
        res.status(201).json(result); 
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const result = await authBusiness.login({ email, password });
        res.status(200).json(result); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
