let MESSAGES = JSON.parse(DATA)
// console.log(MESSAGES)
// console.log(MESSAGES)
const showcaseEl = document.getElementById('showcase')
const searchFormEl = document.getElementById('searchForm')
const messageCountersEl = document.getElementById('messageCounters')
const allCount = messagesCounters.firstElementChild.firstElementChild
const unreadCount = messagesCounters.lastElementChild.firstElementChild
const messageTextEl = document.getElementById('MessageText')
const resetEl = document.getElementById('reset')
// const sortSelectEl = document.getElementById('sortSelect')
renderCards(showcaseEl, MESSAGES)

// const messagesIds = MESSAGES.map((messageData) => messageData.id);
const filteredMessages = JSON.parse(JSON.stringify(MESSAGES))

showcaseEl.addEventListener('click', e => {
    const clickedText = e.target.closest('.message-text');
    if (clickedText) {
        const id = clickedText.closest('.card').dataset.id
        const idIdx = filteredMessages.findIndex(messageIdx => messageIdx.id === +id);
        // const text = clickedText.firstElementChild
        (filteredMessages[idIdx].seen) ? filteredMessages.splice(idIdx, 1) : filteredMessages[idIdx].seen = true
        // if (filteredMessages[idIdx].seen === false) {
        //     filteredMessages[idIdx].seen = true
        // } else {
        //     filteredMessages.splice(idIdx, 1);
        // }
        renderCards(showcaseEl, filteredMessages)
    }
})

resetEl.addEventListener('click', e => {
    const clickedResetBtn = e.target.closest('.reset-box')
    if (clickedResetBtn) {
        renderCards(showcaseEl, MESSAGES)
    }
})
    // const targetText = clickedText.firstElementChild
    // if (clickedText && targetText.classList === 'unread-text') {
    // console.log(targetText)
    // console.log(id);
    // console.log(targetText.classList)
    //вытащить id сообщения по которому кликнуля  чяч ч  с  
    
        
    // }

// {
//     "id": 1,
//     "phone": "+63 (924) 979-2252",
//     "name": "Guss Marvelley",
//     "text": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
//     "avatar": "https://robohash.org/repellendusimpeditnisi.png?size=50x50&set=set1",
//     "date": 1609595510000,
//     "seen": false
//   },


// function messagesCountBlock(messagesData = {}) {
//     return `<div class="messages-count" id="messages">
//     <h3 class="text">Сообщений: 50</h3>
// <h3 class="text">Непрочитанных: 30</h3>
// </div>`
// }

// function renderHeader(headerEl = document, messagesArray = []) {
//     showcaseEl.innerHTML = createHeader(messagesArray).join('')
// }


function renderCards(showcaseEl = document, messagesArray = []) {
    allCount.textContent = `${messagesArray.length}`
    unreadCount.textContent = messagesArray.filter(message => !message.seen).length
    //переписать строчку используя order
    messagesArray.sort((a, b) => a.seen - b.seen || b.date - a.date)
    // console.dir(messagesArray)
    // console.log(typeof(messagesArray))
    showcaseEl.innerHTML = createCardTemplateList(messagesArray).join('')
}

// console.dir(MESSAGES.map(messagesData => createCardTemplate(messagesData)));

function createCardTemplateList (messagesArray = []) {
    return messagesArray.map(messagesData => createCardTemplate(messagesData))
}

function createCardTemplate(messagesData = {}) {
    return `<div class="card" data-id="${messagesData.id}">
    <div class="left-column">
                <img class="card-img" src="${messagesData.avatar}" alt="${messagesData.name}" width="1" height="1" loading="lazy" decoding="async">
                <div class="name-phone">
                <h4 class="name">${messagesData.name}</h4>
        <a href="tel:${messagesData.phone}" class="phone">${messagesData.phone}</a>
        </div>
        </div>
        <div class="message-text">${messagesData.seen ? `<p class="read-text">${messagesData.text}</p>` : `<p class="unread-text">${messagesData.text}</p>`}</div>
        <span>${new Date(messagesData.date).toLocaleDateString()}</span>
        <span>${new Date(messagesData.date).toLocaleTimeString().slice(0, 5)}</span>
</div>`
}


searchFormEl.addEventListener('submit', e => {
    e.preventDefault()
    const query = e.target.search.value.trim().toLowerCase().split(' ').filter(Boolean)
    // console.log(query);
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

// const filteredMessages = MESSAGES.map(id => MESSAGES[i][id]);
// console.log(filteredMessages);

