import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { encrypt, decrypt } from "encrypt-with-password";

import { UserLoginDetails } from "./auth.model";

const SECRET_TEXT = 'Encypt password secret!';

@Injectable()
export class AuthService {
    users: UserLoginDetails[] = [];
    sessions: string [] = [];

    registerUser(username: string, password: string): string {
        const userId = uuidv4();
        const encryptedPassword = encrypt(SECRET_TEXT, password);
        const user = new UserLoginDetails(userId, username, encryptedPassword);
        this.users.push(user);
        return userId;
    }

    login(username: string, password: string): string[] {
        try{
            const user = this.findUser(username);
            const decryptedText = decrypt(user.password, password);
            if (decryptedText !== SECRET_TEXT) {
                throw new UnauthorizedException('User details mismatched!');
            }
            if (user.userSession) {
                throw new UnauthorizedException('User logged in already!');
            }
            const newSession = uuidv4();
            user.userSession = newSession;
            this.sessions.push(newSession);
            return [user.userId, user.userSession];
        }catch(e){
            throw new UnauthorizedException('User details mismatched! login failed');
        }
    }

    logout(username: string, session: string): void {
        const user = this.findUser(username);
        if (user.userSession === session) {
            user.userSession = '';
            
            const sessionIndex = this.sessions.findIndex(s => s === session);
            this.sessions.splice(sessionIndex, 1);
        }else{
            throw new UnauthorizedException('Invalid request');
        }
        return;
    }

    varifySession(session){
        return this.sessions.includes(session);
    }

    private findUser(username: string) {
        const user = this.users.find(u => u.username === username);
        if (!user) {
            throw new NotFoundException('User details mismatched!');
        }
        return user;
    }
}