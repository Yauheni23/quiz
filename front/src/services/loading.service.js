import {BehaviorSubject} from "rxjs";

let instance = null;

export class LoadingService {
    _loading = new BehaviorSubject(false);

    get loading() {
        return this._loading.asObservable();
    }

    setLoading(isLoading) {
        this._loading.next(isLoading);
    }

    static getInstance() {
        if (!instance) {
            instance = new LoadingService();
        }
        return instance;
    }
}