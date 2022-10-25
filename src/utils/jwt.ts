import { VerifyCallback } from "jsonwebtoken";

const jwt = require('jsonwebtoken');

export default class Jwt {
    public generate(
        payload: Object,
        expiresIn: string|number = '1d'
    ) {
        return jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn }
        );
    };

    public decode(token:string) {
        return jwt.decode(token);
    }

    public destroy(token:string) { return jwt.destroy(token); }

    public checkToken(token: string, callback: VerifyCallback) {
        return jwt.verify(token, process.env.JWT_SECRET, callback);
    }
}
