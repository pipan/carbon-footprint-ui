export default class ModelFetch {
    get(id, inputs) {
        let query = [];
        if (inputs) {
            for (let key in inputs) {
                query.push(key + "=" + encodeURI(inputs[key]))
            }
        }

        let queryString = query.join("&")
        if (queryString.length > 0) {
            queryString = "?" + queryString
        }
        
        const url = process.env.VUE_APP_API_HOST + "/api/model/" + encodeURI(id) + queryString

        return fetch(url)
    }

    create(model) {       
        const url = process.env.VUE_APP_API_HOST + "/api/model"

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
    }

    update(id, model) {       
        const url = process.env.VUE_APP_API_HOST + "/api/model/" + encodeURI(id)

        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
    }
}