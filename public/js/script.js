const cardAdder = document.getElementById('modal-window')
let login = document.getElementById('card-face-login');
let btn1 = document.getElementById('sign-up-btn');
let signup = document.getElementById('card-face-signup');
let btn2 = document.getElementById('login-btn');
let btn3 = document.getElementById('way-to-login');
let btn4 = document.getElementById('way-to-signup')
let username_login = document.getElementById('username-login');
let password_login = document.getElementById('password-login');
let a_login = document.getElementById('a-login');
let username_signup = document.getElementById('username-signup');
let email_signup = document.getElementById('email-signup');
let password_signup = document.getElementById('password-signup');
let repeat_password_signup = document.getElementById('repeat-password-signup');


function openWindow(){
    cardAdder.style.display = 'flex';
}

function closeWindow(){
    cardAdder.style.display = 'none';
}

btn1.onclick = function(){
    login.style.left = `-${70}%`
    signup.style.left = `${14}%`
}

btn2.onclick = function(){
    signup.style.left = `${100}%`
    login.style.left = `${14}%`
}

btn3.onclick = function(){
    if(username_login.value == ''){
        username_login.style.backgroundColor = 'rgb(251, 194, 194)';
    }
    if(password_login.value === ''){
        password_login.style.backgroundColor = 'rgb(251, 194, 194)';
    }else if(password_login.value != '' && username_login.value != ''){
        password_login.style.backgroundColor = 'white';
        username_login.style.backgroundColor = 'white';
        checkUser();
    }
}



btn4.onclick = function(){
    if(username_signup.value == ''){
        username_signup.style.backgroundColor = 'rgb(251, 194, 194)';
    }
    if(email_signup.value === ''){
        email_signup.style.backgroundColor = 'rgb(251, 194, 194)';
    }
    if(password_signup.value === ''){
        password_signup.style.backgroundColor = 'rgb(251, 194, 194)';
    }
    if(repeat_password_signup.value === ''){
        repeat_password_signup.style.backgroundColor = 'rgb(251, 194, 194)';
    }else if(username_signup.value != '' && email_signup.value != '' && password_signup.value != '' && repeat_password_signup.value != ''){
        username_signup.style.backgroundColor = 'white';
        email_signup.style.backgroundColor = 'white';
        password_signup.style.backgroundColor = 'white';
        repeat_password_signup.style.backgroundColor = 'white';
        if(password_signup.value != repeat_password_signup.value){
            alert('Password do not match');
        }else{
                saveUser();
        }
      }
} 



function saveUser(){
    const username = username_signup.value;
    const email = email_signup.value;
    const password = password_signup.value;

    const data = {username, email, password};


    fetch('/saveData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                console.log('Data stored successfully');
                signup.style.left = '615px'
                login.style.left = '75px'
            } else {
                alert('Username exists');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function checkUser(){
    const username = username_login.value;
    const password = password_login.value;

    fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        })
        .then(response => {
            if (response.ok) {
                a_login.href = '/topics';
                console.log('Login successful');
            } else {
                console.error('Invalid username or password');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
