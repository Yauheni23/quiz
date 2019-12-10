import {BehaviorSubject} from "rxjs";
import {serverAddress} from "../constants/server";
import {LoadingService} from "./loading.service";

let instance = null;

export class QuestionService {
    _questions = new BehaviorSubject([]);

    getQuestions(category = 1) {
        LoadingService.getInstance().setLoading(true);
        fetch(`${serverAddress}/game?category=${category}`)
            .then((response) => response.json())
            .then(data => {
                this._questions.next(data.game.sort(() => Math.random() - 0.5));
                LoadingService.getInstance().setLoading(false);
            });

        return this._questions.asObservable();
    }

    static getInstance() {
        if (!instance) {
            instance = new QuestionService();
        }
        return instance;
    }
}