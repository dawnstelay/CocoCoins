import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url = "http://localhost:5200";
    users$ = signal<User[]>([]);
    user$ = signal<User>({} as User);

    constructor(private httpClient: HttpClient) { }

    private refreshUsers() {
        this.httpClient.get<User[]>(`${this.url}/users`)
        .subscribe(users => {
            this.users$.set(users);
        });
    }

    getUsers() {
        this.refreshUsers();
        return this.users$()
    }

    getUser(id: string) {
        this.httpClient.get<User>
        (`${this.url}/users/${id}`).subscribe(user => {
            this.user$.set(user);
            return this.user$();
        });
    }

    createUser(user: User) {
        return this.httpClient.post(`${this.url}/users`, user, {responseType: 'text'});
    }

    updateUser(id: string, user: User) {
        return this.httpClient.put(`${this.url}/users/${id}`, user, {responseType: 'text'});
    }

    deleteUser(id: string) {
        return this.httpClient.delete(`${this.url}/users/${id}`, {responseType: 'text'});
    }
}