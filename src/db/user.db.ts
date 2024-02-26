import { UserDbType } from "./types";

const defaultUser: UserDbType = {
    name: '',
    socket: '',
    index: 0,
    password: ''
}

class UserDb {
    private users: UserDbType[] = []

    getUser(name: string): UserDbType | undefined {
        return this.users.find((user) => user.name === name);
    }

    getUserBySocketId(socketId: string) {
        console.log('getUserBySocketId', this.users);
        return this.users.find((user) => user.socket === socketId) || defaultUser;
    }

    getUserList()  {

    }

    addUser(newUser: UserDbType) {
        this.users = [...this.users, newUser]
    }

    updateUser(name: string, user: UserDbType) {

    }
}


export const userDb = new UserDb()