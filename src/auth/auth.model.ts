export class UserLoginDetails{
    constructor(
        public userId: string,
        public username: string,
        public password: string,
        public userSession?: string
    ) { };
}
