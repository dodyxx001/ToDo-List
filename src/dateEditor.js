const editDate = (() => {

    function editDate () {
        let allDates = Array.from(document.getElementsByClassName('task-date'));
        allDates.forEach((date) => {
            let year = date.textContent.substr(0, 4);
            let month = date.textContent.substr(5, 2);
            let day = date.textContent.substr(8,2)
            date.textContent = day + '.' + month + '.' + year;
        })
    }

    return {
        editDate,
    }
})();

export {editDate};