
const wrapper = document.getElementById('fruits');
const jsonFile = "../public/js/words.json";
fetch(jsonFile)
     .then(res => res.json())
     .then(data => {
        const cardsHTML = data.fruits.map((words) => {
            const {id, word, img} = words;
            return `
            <div class="card">
                <div class="card-inner" onclick="flip(this)">
                    <div class="card_face color-yellow card_face--front">
                        <img src="${img}" class="card-img color-yellow">
                    </div>
                    <div class="card_face color-yellow card_face--back">
                        <img src="${img}" class="card-img color-yellow">
                        <p class="card-text color-yellow">${word}</p>
                    </div>
                </div>
            </div> 
            `

        })
        .join(' ');
        
        wrapper.insertAdjacentHTML('afterbegin', cardsHTML);
     })

function flip(event){
    event.classList.toggle('isFlipped');
}

const cardAdder = document.getElementById('modal-window')

function openWindow(){
    cardAdder.style.display = 'flex';
}

function closeWindow(){
    cardAdder.style.display = 'none';
}



const wrapper1 = document.getElementById('school');
fetch(jsonFile)
     .then(res => res.json())
     .then(data => {
        const cardsHTML = data.school.map((words) => {
            const {id, word, img} = words;
            return `
            <div class="card">
                <div class="card-inner" onclick="flip(this)">
                    <div class="card_face color-yellow card_face--front">
                        <img src="${img}" class="card-img color-yellow">
                    </div>
                    <div class="card_face color-yellow card_face--back">
                        <img src="${img}" class="card-img color-yellow">
                        <p class="card-text color-yellow">${word}</p>
                    </div>
                </div>
            </div> 
            `

        })
        .join(' ');
        
        wrapper1.insertAdjacentHTML('afterbegin', cardsHTML);
     })


    const wrapper2 = document.getElementById('bathroom');
        fetch(jsonFile)
        .then(res => res.json())
        .then(data => {
             const cardsHTML = data.bathroom.map((words) => {
             const {id, word, img} = words;
                return `
                    <div class="card">
                        <div class="card-inner" onclick="flip(this)">
                            <div class="card_face color-yellow card_face--front">
                                <img src="${img}" class="card-img color-yellow">
                            </div>
                            <div class="card_face color-yellow card_face--back">
                                <img src="${img}" class="card-img color-yellow">
                                <p class="card-text color-yellow">${word}</p>
                            </div>
                        </div>
                    </div> 
                    `

             })
             .join(' ');
                
            wrapper2.insertAdjacentHTML('afterbegin', cardsHTML);
        })