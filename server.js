const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/topics', (req, res) => {
    res.sendFile(path.join(__dirname, 'topics.html'));
})

app.get('/fruits', (req, res) => {
    res.sendFile(path.join(__dirname, 'fruits.html'));
})

app.get('/school', (req, res) => {
    res.sendFile(path.join(__dirname, 'school.html'));
})

app.get('/bathroom', (req, res) => {
    res.sendFile(path.join(__dirname, 'bathroom.html'));
})

app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'quiz.html'));
})

app.get('/quiz1', (req, res) => {
    res.sendFile(path.join(__dirname, 'quiz1.html'));
})

app.get('/quiz2', (req, res) => {
    res.sendFile(path.join(__dirname, 'quiz2.html'));
})

app.get('/mypage', (req, res) => {
    res.sendFile(path.join(__dirname, 'mypage.html'));
})

app.get('/currData', (req, res) =>{
    res.json(currUser);
})

app.post('/updatePassword', (req, res) =>{
    const {user, oldPassword, newPass} = req.body;
    fs.readFile('user_data.json', 'utf8', (err, data) => {
        if(err){
            res.status(500).send('Error reading file');
        }else{
            const userData = JSON.parse(data);
            for(let i = 0; i<userData.length; i++){
                console.log(userData[i]);
                console.log(oldPassword);
                if(userData[i].username === user && userData[i].password === oldPassword){
                    console.log(newPass);
                    console.log(userData);
                    userData[i].password = newPass;
                }
            }
            console.log(userData);
            fs.writeFile('user_data.json', JSON.stringify(userData, null, 2), 'utf8', err => {
                if (!err) {
                    res.send('Data stored successfully');
                } else {
                    res.status(500).send('Error writing file');
                }
            })
        }
    })
})


function emailExists(email, data) {
    return data.some(user => user.username == email);
}


app.post('/saveData', (req, res) => {
    const {username, email ,password} = req.body;
    const userData = {username, email, password};
    fs.readFile('user_data.json', 'utf8', (err, data) => {
        if (err) {
            fs.writeFile('user_data.json', JSON.stringify([userData], null, 2), 'utf8', err => {
                if (err) {
                    res.status(500).send('Error writing file');
                } else {
                    res.send('Data stored successfully');
                }
            });
        } else {
            const existingData = JSON.parse(data);
            if (emailExists(username, existingData)) {
                res.status(400).send('Email already exists');
            }else{
                existingData.push(userData);
                fs.writeFile('user_data.json', JSON.stringify(existingData, null, 2), 'utf8', err => {
                if (err) {
                    res.status(500).send('Error writing file');
                } else {
                    res.send('Data stored successfully');
                }
            });
            }

        }
    });
});



const currUser ={
    username: ''
}
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('user_data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('User data not found');
        } else {
            const users = JSON.parse(data);
            const foundUser = users.find(user => user.username === username && user.password === password);
            
            if (foundUser) {
                res.send('Login successful');
                currUser.username = username;
                console.log(currUser)
            } else {
                res.status(401).send('Invalid username or password');
            }
        }
    });
});




app.listen(7007, () => {
      console.log("Started at port 7007")
});