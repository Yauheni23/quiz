import {BehaviorSubject} from "rxjs";
import {serverAddress} from "../constants/server";
import axios from "axios";
import {map} from "rxjs/operators";

let instance = null;

export class UserService {
    _users = new BehaviorSubject([]);

    get users() {
        return this._users.asObservable()
            .pipe(
                map(item => this.mapResults(item))
            );
    }

    createUser(user) {
        axios.post(`${serverAddress}/user`, user)
            .then(() => this.updateUsers());
    }

    updateUsers() {
        axios.get(`${serverAddress}/user`)
            .then((response) => this._users.next(response.data))
    }

    mapResults(results) {
        return results.sort((prev, next) => prev.result < next.result ? 1 : -1)
            .map((el, index) => ({
                ...el,
                place: index + 1,
            }))
    }

    static getInstance() {
        if (!instance) {
            instance = new UserService();
        }
        return instance;
    }
}