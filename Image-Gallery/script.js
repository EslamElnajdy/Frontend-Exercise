const filterButtons = document.querySelectorAll(".filter_buttons button");
const Cards = document.querySelectorAll(".filter_cards .cards");

const filterCards = e => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");

    Cards.forEach(card => {
        if (!(card.dataset.name === e.target.dataset.name || e.target.dataset.name === "all"))
            card.classList.add("hide");
        else 
            card.classList.remove('hide');
    });
    console.log(e.target);
}

filterButtons.forEach( button => button.addEventListener("click", filterCards));