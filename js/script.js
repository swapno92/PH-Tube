const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories = data.data;
    displayCategories(categories);
    // console.log(categories);
}

function displayCategories(categories) {
    const categoriesContainer = document.getElementById('categories-container');
    // console.log(categories.length);
    categories.forEach(category => {
        // console.log(category.length);
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
    const cardContainer = document.getElementById('card-container')
    cardContainer.textContent = ''
    if (cards.length === 0) {

        // emptyPage
        const div = document.createElement('div');
        cardContainer.classList = `grid-cols-1`
        div.classList = `mt-20 `
        div.innerHTML = `
        <div class="flex  justify-center items-center"><img src="./images/Icon.png" alt=""></div>
        <h1 class="text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h1>
            `;
        cardContainer.appendChild(div)

    }
    else {
        // console.log(cardContainer.length);
        // console.log(cards);
        cards.forEach(card => {
            // console.log(card);
            const div = document.createElement('div');
            cardContainer.classList = `grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 md:px-3 px-8`
            div.innerHTML = `
            <img src="${card.thumbnail}" alt="" class="rounded-lg h-44 w-full">
                    <div class="mt-4 flex gap-3 space-y-2">
                        <div class=" "><img src="${card.authors[0].profile_picture}" alt="" class="rounded-full w-12 h-12 "></div>
                        <div class=" space-y-1">
                            <h2 class="text-base font-bold">${card.title}</h2>
                            <p class="text-sm font-normal text-[rgba(23,23,23,.70)]">${card.authors[0].profile_name}<span></span></p>
                            <p class="text-sm font-normal text-[rgba(23,23,23,.70)]"><span>${card.others.views}</span> views</p>
                        </div>
                    </div>
            `
            cardContainer.appendChild(div)
        });
    }
}


showCategoryCard(1000)
// console.log(showCategoryCard(1001));




loadCategories()