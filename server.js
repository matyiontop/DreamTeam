const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // statikus fájlok kiszolgálása

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/users', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Hiba a fájl olvasásakor');
        res.send(data);
    });
});

// Új felhasználó hozzáadása
app.post('/register', (req, res) => {
    const { username, password, rank } = req.body;
    if (!username || !password)
        return res.status(400).send('Hiányzó adat');
    const userRank = rank ? rank : 'U';
    fs.appendFile('comments.json', `\n${username};${password};${userRank}`, err => {
        if (err) return res.status(500).send('Hiba a fájl írásakor');
        res.send('Sikeres regisztráció');
    });
});

app.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);
});