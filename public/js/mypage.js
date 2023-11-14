const changePassword = document.querySelector('.change-password');
const changePasswordContainer = document.getElementById('change-password-container');
const apply = document.getElementById('apply');
const currPassword = document.getElementById('curr-password');
const newPassword = document.getElementById('new-password');
const sNewPassword = document.getElementById('2new-password');
const username = document.querySelector('.username');
const email = document.querySelector('.email');
const avatar = document.getElementById('avatar');


async function loadAvatar(){
  const jsonFile = "../public/js/avatar.json";
  const res = await fetch(jsonFile);
  const data = await res.json();
  let ind = Math.floor(Math.random() * 4);
  avatar.src = data[ind];
  console.log(ind);
}

loadAvatar();

fetch('/currData')
    .then(response => response.json())
    .then(data => {
        username.innerHTML = data.username;
    })
    .catch(error => {
        console.error('Error:', error);
    });


changePassword.onclick = function(){
    changePasswordContainer.style.display = 'flex';
}

apply.onclick = function(){
    if(currPassword.value === ''){
        currPassword.style.backgroundColor = 'rgb(251, 194, 194)'
    }
    if(newPassword.value === ''){
        newPassword.style.backgroundColor = 'rgb(251, 194, 194)'
    }
    if(sNewPassword.value === ''){
        sNewPassword.style.backgroundColor = 'rgb(251, 194, 194)'
    }
    else if(currPassword.value != '' && newPassword.value != '' && sNewPassword.value != ''){
        currPassword.style.backgroundColor = 'white'
        newPassword.style.backgroundColor = 'white'
        sNewPassword.style.backgroundColor = 'white'
        if(currPassword.value == newPassword.value){
            alert('New password matches to old password');
        }else{
            if(newPassword.value != sNewPassword.value){
                alert('Passwords do not match');
            }else{
                alert('Password changed');
                changePasswordContainer.style.display = 'none';
                updatePassword();
            }
        }
    }
}

document.getElementById("new-password").addEventListener("change", updatePassword);


function updatePassword(){
    let user = username.textContent;
    let oldPassword = document.getElementById('curr-password').value;
    let newPass = document.getElementById('new-password').value;
    console.log(newPass);
    const data = {user, oldPassword, newPass}
    fetch('/updatePassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                console.log('Passowrd updated sucsessfully');
            } else {
                alert('Username exists');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}