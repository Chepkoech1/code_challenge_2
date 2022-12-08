setPage();

function setPage() {
    getAnimalsNames();
}
// function to display animal's details when an animal name is clicked
function toggleAnimalDescription() {
    let description = document.querySelectorAll('.description');
    let title = document.querySelectorAll('.title');
    let animalIndex;

    title.forEach((element, index) => {
        element.addEventListener('click', () => {
            if (animalIndex >= 0) {
                description[animalIndex].style.display = "none";
                title[animalIndex].classList.remove("active");
                title[animalIndex].parentElement.classList.remove("active");
            }
            animalIndex = index;
            description[index].style.display = "block";
            element.classList.add('active');
            element.parentElement.classList.add('active');
        })
    })
}
//Function that adds vote for every animal
function submitVoteBtn() {
    const btn = document.querySelectorAll('button');
    const votesCount = document.querySelectorAll('.description p span');
    btn.forEach((element, btnindex) => {
        element.addEventListener('click', () => {
            votesCount.forEach((element, voteindex) => {
                if (btnindex == voteindex) {
                    let voteId = btn[btnindex].dataset.id;
                    let numVotes = parseInt(element.textContent) + 1;
                    element.textContent = numVotes;
                    addVote(voteId, numVotes);
                }
            })
        })
    })
}
//Function that sends the vote to the database
function addVote(id, number) {
    fetch(`http://localhost:3000/characters/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(
            {
                "votes": number
            }
        ),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err.message));
}
//Function that gets data from the database and dispays it on the webpage
async function getAnimalsNames() {
    const animalsNames = document.querySelector('.animalsNames');
    let output = '';

    await fetch('http://localhost:3000/characters')
        .then(res => res.json())
        .then(res => {
            res.forEach(element => {
                output += ` <div class="singleAnimal">
                <p class="title">${element.name}</p>
                <div class="description">
                    <img src="${element.image}" alt="">
                    <p>Votes: <span>${element.votes}</span></p>
                    <button data-id=${element.id}>Add Vote</button>
                </div>
                </div>`
            });

            animalsNames.innerHTML = output;
        })
        .catch(err => console.log(err.message));
    
    toggleAnimalDescription();
    submitVoteBtn();
}