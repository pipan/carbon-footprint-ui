import UrlBuilder from "./UrlBuilder";

export default class SearchFetch {
    search(query, options) {
        return this.filter(query, { ...options, output: 9 })
    }

    filter(query, options) {
        let url = (new UrlBuilder()).withHost(process.env.VUE_APP_API_HOST)
            .withPath('/api/search')
            .withQueries(Object.assign({}, options, { query: query }))
            .build()
        return fetch(url)
    }
}