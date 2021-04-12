export default class UrlBuilder {
    
    constructor(host = '', path = '/', queries = {}) {
        this.host = host
        this.path = path
        this.queries = queries
    }

    withQueries(queries) {
        return new UrlBuilder(this.host, this.path, Object.assign({}, this.queries, queries))
    }

    withPath(path) {
        return new UrlBuilder(this.host, path, this.queries)
    }

    withHost(host) {
        return new UrlBuilder(host, this.path, this.queries)
    }

    build() {
        let queryStrings = []
        for (let key in this.queries) {
            queryStrings.push(key + '=' + encodeURI(this.queries[key]))
        }
        let queryString = ''
        if (queryStrings.length > 0) {
            queryString = '?' + queryStrings.join('&')
        }
        return this.host + this.path + queryString
    }
}