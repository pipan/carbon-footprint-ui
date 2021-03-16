export default class HistoryService {
    length = 0
    router = null

    constructor (router) {
        this.router = router;
    }

    back (fallbackRoute) {
        if (this.length > 0) {
            this.length--
            this.router.go(-1);
            return;
        }

        this.replace(fallbackRoute);
    }

    push (route) {
        this.length++
        this.router.push(route)
    }

    replace (fallbackPath) {
        this.router.replace(fallbackPath);
    }
}