const bcrypt = require('bcryptjs');

export default class Password {
    async generateSalt(length: number = 10): Promise<string> {
        return bcrypt.genSalt(length);
    }

    async generateHash(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async check(hash1: string, hash2: string): Promise<boolean> {
        return bcrypt.compare(hash1, hash2);
    }
}
