class Charts {

    static get12HoursChart (data) {
        return (data.filter((elem, index) => index % 12 === 0)).map(([elem, elem1]) => [new Date(elem), elem1]).map(([elem, elem1]) => ({
            "label":elem.getHours(), 
            "value":elem1
        }))
    }

    static getDayChart (data) {
        return (data.filter((elem, index) => index % 24 === 0)).map(([elem, elem1]) => [new Date(elem), elem1]).map(([elem, elem1]) => ({
            "label":elem.getHours(), 
            "value":elem1
        }))
    }

    static getWeekChart (data) {
        return (data.filter((elem, index) => index % 24 === 0)).map(([elem, elem1]) => [new Date(elem), elem1]).map(([elem, elem1]) => ({
            "label":elem.getDay(), 
            "value":elem1
        })).slice(-7)
    }

    static getMonthChart (data) {
        return (data.filter((elem, index) => index % 24 === 0)).map(([elem, elem1]) => [new Date(elem), elem1]).map(([elem, elem1]) => ({
            "label":elem.getDay(), 
            "value":elem1
        })).slice(-30)
    }
}
module.exports.Charts = Charts;