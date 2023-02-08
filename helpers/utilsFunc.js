export const delay = async() => {
    return new Promise((resolve, reject) => {
        return setTimeout(resolve, 3000)
    })
}

export const handleQueries = (values, router) => {
    const formattedValues = Object.keys(values).filter(value => values[value] !== '')
    const currentQuerries = Object.keys(router.query).map(query => {
        return {
            key: query,
            value: router.query[query]
        }
    }).map(query => {
        if(formattedValues.includes(query.key)) {
            return {
                key: query.key,
                value: values[query.key]
            }
        } else return query
    }).filter(query => values[query.key] !== '')
    formattedValues.forEach(key => {
        if(!Object.keys(router.query).includes(key)) {
            currentQuerries.push({
                key: key,
                value: values[key]
            })
        }
    })
    return currentQuerries
}

export const emptyTable = (numb) => {
    return Array(numb).fill('--')
}

