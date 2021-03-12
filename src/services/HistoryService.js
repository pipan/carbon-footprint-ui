export default class HistoryService {
    originalIndex = 0
    router = null

    constructor (router) {
        this.router = router;
        this.originalIndex = window.history.length
    }

    back (fallbackPath) {
        if (window.history.length > this.originalIndex) {
            this.router.go(-1);
            return;
        }

        this.router.replace(fallbackPath);
    }
}