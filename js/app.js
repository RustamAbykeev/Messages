let MESSAGES = JSON.parse(DATA)
console.log(MESSAGES)
const showcaseEl = document.getElementById('showcase')
const searchFormEl = document.getElementById('searchForm')
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
        <div class="message-text"><p>${messagesData.text}</p></div>
        <span>Time</span>
        <span>Date</span>
</div>`
}


//посчитать непрочитанные и прочитанные
