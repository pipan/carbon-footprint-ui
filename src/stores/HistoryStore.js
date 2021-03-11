export default class HistoryStore {
    state = {
        originalIndex: window.history.length
    };
    router = null

    constructor (router) {
        this.router = router;
    }

    back (fallbackPath) {
        if (window.history.length > this.state.originalIndex) {
            this.router.go(-1);
            return;
        }

        this.router.replace(fallbackPath);
    }
}