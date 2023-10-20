logo = document.getElementById('logo')
move_btn = document.getElementById('pr-text');
icon_mode = document.getElementById('icon-mode');
icon_btn = document.getElementById('icon-btn');
sidebar_img = document.getElementById('sidebar_img')
container = document.querySelector('.container');
all_p = document.querySelectorAll('p');

document.getElementById('menu').addEventListener('click', ()=>{
    logo.classList.toggle('hide');
    icon_mode.classList.toggle('hide');
    sidebar_img.classList.toggle('hide')
    if (container.style.width != '90px'){
        container.style.width = '90px';
    }
    else{
        container.style.width = '266px';
    }
    for (i of all_p){
        i.classList.toggle("hide");
    }
})




document.querySelector('.btn').addEventListener('click',()=>{
    document.querySelector('.circle').classList.toggle('change');
    document.querySelector('.container').classList.toggle('dark');
    if (move_btn.textContent == 'Light Mode'){
        move_btn.textContent = 'Dark Mode';
        icon_mode.textContent = 'dark_mode';
        icon_btn.textContent = 'light_mode';
    }
    else if (move_btn.textContent == 'Dark Mode'){
        move_btn.textContent = 'Light Mode';
        icon_mode.textContent = 'light_mode';
        icon_btn.textContent = 'dark_mode';
    }

})

