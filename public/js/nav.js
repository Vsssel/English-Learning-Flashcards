const menuBtn = document.querySelector('.menu');
const navBar = document.querySelector('.navigator');
const fontContainer = document.querySelector('.font-container');


menuBtn.onclick = function(){
    if(navBar.style.right == '-150px'){
        navBar.style.right = '0px';
    }else{
        navBar.style.right = '-150px';
    }
}
