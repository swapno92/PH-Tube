const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories = data.data;
    displayCategories(categories);
}

function displayCategories(categories) {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const div = document.createElement('div')
        div.classList = ` `
        div.innerHTML = `
                 <button onclick="showCategoryCard('${category.category_id}')"
                     class="focus:bg-[#FF1F3D] w-full px-4 py-1 bg-[#25252533] visited:bg-red-800 text-base font-medium rounded-md text-[rgba(37,37,37,0.70)]">${category.category}
                 </button>
         `;
        categoriesContainer.appendChild(div)
    });
}

const showCategoryCard = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const cards = data.data;
    displayCards(cards);
}

function displayCards(cards) {

    if (cards.length === 0) {
        const emptyCard = document.getElementById('empty-container')
        emptyCard.innerHTML = ''
        // emptyPage
        const div = document.createElement('div');
        div.classList = `mt-20 h-16`
        div.innerHTML = `
        <div class="flex  justify-center items-center"><img src="./images/Icon.png" alt=""></div>
        <h1 class="text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h1>
            `;
        emptyCard.appendChild(div)

    }

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ''
    cards.forEach(card => {
        const seconds = `${card.others.posted_date}`
        const hours = Math.floor(seconds / 3600);
        const excludingHoursNewSeconds = seconds % 3600;
        const minutes = Math.floor(excludingHoursNewSeconds / 60);
        const showtime = (hours + ' ' + 'hrs ' + minutes + ' ' + 'min ago');

        const div = document.createElement('div');
        cardContainer.classList = `grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 md:px-3 px-8`
        div.innerHTML = `
            <img src="${card.thumbnail}" alt="" class="rounded-lg h-44 w-full">
            <div class='show-time ${card.others.posted_date ? 'block' : 'hidden'} w-[170px] text-center text-sm absolute -mt-8 lg:ml-28 ml-44 bg-[rgba(23,23,23)] px-1 text-white'>${card.others.posted_date ? showtime : ''}</div>
                <div class="mt-4 flex gap-3 space-y-2">
                    <div><img src="${card.authors[0].profile_picture}" alt="" class="rounded-full w-12 h-12 "></div>
                    <div class=" space-y-1">
                        <h2 class="text-base font-bold">${card.title}</h2>
                        <p class="text-sm font-normal text-[rgba(23,23,23,.70)]">${card.authors[0].profile_name}<span> ${card?.authors[0]?.verified === true ? `<i class="fa fa-solid fa-circle-check" style="color: #1565ef;"></i>` : ''}</span></p>
                        <p class="text-sm font-normal text-[rgba(23,23,23,.70)]"><span>${card.others.views}</span> views</p>
                    </div>
                </div>
            `
        cardContainer.appendChild(div)
    });

    document.querySelector('#sort-date-btn').addEventListener('click', () => {

        const sortedData = cards.sort(
            (a, b) =>
                Number(b.others.views.slice(0, -1)) -
                Number(a.others.views.slice(0, -1))
        );
        cardContainer.textContent = ''

        sortedData.forEach((card) => {
            const seconds = `${card.others.posted_date}`
            const hours = Math.floor(seconds / 3600);
            const excludingHoursNewSeconds = seconds % 3600;
            const minutes = Math.floor(excludingHoursNewSeconds / 60);
            const showtime = (hours + ' ' + 'hrs ' + minutes + ' ' + 'min ago');

            const div = document.createElement('div');
            cardContainer.classList = `grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 md:px-3 px-8`
            div.innerHTML = `
                    <img src="${card.thumbnail}" alt="" class="rounded-lg h-44 w-full">
                    <div class='show-time ${card.others.posted_date ? 'block' : 'hidden'} w-[170px] text-center text-sm absolute -mt-8 lg:ml-28 ml-44 bg-[rgba(23,23,23)] px-1 text-white'>${card.others.posted_date ? showtime : ''}</div>
                        <div class="mt-4 flex gap-3 space-y-2">
                            <div><img src="${card.authors[0].profile_picture}" alt="" class="rounded-full w-12 h-12 "></div>
                            <div class=" space-y-1">
                                <h2 class="text-base font-bold">${card.title}</h2>
                                <p class="text-sm font-normal text-[rgba(23,23,23,.70)]">${card.authors[0].profile_name}<span> ${card?.authors[0]?.verified === true ? `<i class="fa fa-solid fa-circle-check" style="color: #1565ef;"></i>` : ''}</span></p>
                                <p class="text-sm font-normal text-[rgba(23,23,23,.70)]"><span>${card.others.views}</span> views</p>
                            </div>
                        </div>
                    `
            cardContainer.appendChild(div)
        });
    });
}


showCategoryCard(1000)
loadCategories()