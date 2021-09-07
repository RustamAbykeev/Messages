let MESSAGES = JSON.parse(DATA)
console.log(MESSAGES)
const showcaseEl = document.getElementById('showcase')
const searchFormEl = document.getElementById('searchForm')
const messagesEl = document.getElementById('messages')
// const sortSelectEl = document.getElementById('sortSelect')
renderCards(showcaseEl, MESSAGES)

// {
//     "id": 1,
//     "phone": "+63 (924) 979-2252",
//     "name": "Guss Marvelley",
//     "text": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
//     "avatar": "https://robohash.org/repellendusimpeditnisi.png?size=50x50&set=set1",
//     "date": 1609595510000,
//     "seen": false
//   },
function unreadMessagesCounter(status) {
    const messagesCount = MESSAGES.length
    let unreadMessages = 0;
    
    for (i = 0; i < messagesCount; i++) {
        if (status === false) {
            unreadMessages += 1;
        }
    }
    //пробежаться по циклу и прочитать значения свойства seen если false то положить в счетчик +1
    // если статус true то cчетчик не изменяется
    return unreadMessages;
}



function convertDateToHours(date) {
    convertedDate = new Date(date);
    if ((convertedDate.getHours()) < 10) {
        return '0' + (convertedDate.getHours())
    }
        return (convertedDate.getHours())
} 

function convertDateToMinutes(date) {
    convertedDate = new Date(date);
    if ((convertedDate.getMinutes()) < 10) {
        return '0' + (convertedDate.getMinutes())
    }
        return (convertedDate.getMinutes())
} 

function convertDateFormat(date) {
    convertedDate = new Date(date);
    return convertedDate.toLocaleDateString();
} 

function renderCards(showcaseEl = document, messagesArray = []) {
    showcaseEl.innerHTML = createCardTemplateList(messagesArray).join('')
}

function createCardTemplateList (messagesArray = []) {
    return messagesArray.map(messagesData => createCardTemplate(messagesData))
}

function createCardTemplate(messagesData = {}) {
    return `<div class="card">
    <div class="left-column">
                <img class="card-img" src="${messagesData.avatar}" alt="${messagesData.name}" width="1" height="1" loading="lazy" decoding="async">
                <div class="name-phone">
                <h4 class="name">${messagesData.name}</h4>
        <a href="tel:${messagesData.phone}" class="phone">${messagesData.phone}</a>
        </div>
        </div>
        <div class="message-text">${messagesData.seen ? `<p>${messagesData.text}</p>` : `<p><strong>${messagesData.text}</strong></p>`}</div>
        <span>${convertDateToHours(messagesData.date)}:${convertDateToMinutes(messagesData.date)}</span>
        <span>${convertDateFormat(messagesData.date)}</span>
</div>`
}



searchFormEl.addEventListener('submit', e => {
    e.preventDefault()
    const query = e.target.search.value.trim().toLowerCase().split(' ').filter(Boolean)
    console.log(query);
    const searchFields = ['name', 'phone', 'text']
    MESSAGES = JSON.parse(DATA).filter(message => { 
        return query.every(word => {
            return searchFields.some(field => {
                return String(message[field]).toLowerCase().includes(word)
            })
        })
    })
    // console.table(MESSAGES);
    renderCards(showcaseEl, MESSAGES);
})