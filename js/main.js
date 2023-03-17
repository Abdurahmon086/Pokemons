let product = document.querySelector('.product');
let form = document.querySelector('.form');
let elSelect = document.querySelector('.from__select')
let elInput = document.querySelector('.form__search')
let elAz = document.querySelector('.from__select-size')

let candies = []

returnUi(pokemons)

function returnUi(arr) {
    product.innerHTML = '';
    arr.forEach((item, i, p) => {
        let card = document.createElement('div');
        card.setAttribute("class", "product__card")
        card.setAttribute("class", "card")
        card.innerHTML = `
            <div class="card__top">
            <img src="${item.img}" alt="${item.name}" class="card__img">
        </div>
        <div class="card__bottom">
            <div class="card__wrapper">
                <div class="card__inner">
                    <h4 class="card__title">${item.name}</h4>
                    <p class="card__text">${item.type}</p>
                </div>
                <img src="./img/heart.svg" alt="heart icon">
            </div>
            <div class="card__sp-wrapper">
                <span class="card__sp">${item.weight}</span>
                <span class="card__sp">${item.avg_spawns} age</span>
            </div>
        </div>
        `;
        product.append(card)
    });
}


function candy() {
    pokemons.forEach(function (item) {
        if (!candies.includes(item.candy)) {
            candies.push(item.candy);
        }
    })

    candies.forEach((item) => {
        const option = document.createElement('option')
        option.textContent = item;
        elSelect.append(option)
    });
};

candy()

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const selectValue = elSelect.value

    if (selectValue === 'all') {
        returnUi(pokemons)
        search(pokemons)
    } else {
        let filArr = pokemons.filter(item => {
            return item.candy === selectValue;
        })

        console.log(filArr);
        returnUi(filArr)
        search(filArr)
    }
})

search(pokemons)

function search(arr) {
    elInput.addEventListener('keyup', (e) => {
        let text = e.target.value

        console.log(arr);
        let fillArr = arr.filter(item => {
            return item.name.includes(text);
        });

        returnUi(fillArr)
    })
}

elAz.addEventListener("change", (e) => {
    let selectValue = e.target.value

    console.log(selectValue);

    if (selectValue === 'Az') {
         AZ([...pokemons], true)
    } else if (selectValue === 'Za') {
         AZ([...pokemons], false)
    } else if (selectValue === 'Ha') {
        minAge([...pokemons], false)
    } else {
        minAge([...pokemons], true)
    }

})

function AZ(arr, bool) {
    arr.sort((a, b) => {
        if (a.name > b.name) {
            return bool ? 1 : -1
        }
        if (a.name < b.name) {
            return bool ? -1 : 1
        }

        return 0
    })

    returnUi(arr)
}

function minAge(arr, bool) {
    arr.sort((a, b) => {
        return bool ? a.avg_spawns - b.avg_spawns : b.avg_spawns - a.avg_spawns
    })

    returnUi(arr)
}
