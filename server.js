import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// obsługa JSON
app.use(express.json({ limit: '1mb' }));

// serwowanie plików statycznych (HTML, JS, CSS, Harper.txt)
app.use(express.static(__dirname));

// endpoint do zapisu Harper.txt
app.post('/saveHarper', (req, res) => {
    const { content } = req.body;
    if (typeof content !== 'string') {
        return res.status(400).json({ error: 'Brak poprawnej treści pliku.' });
    }

    const filePath = path.join(__dirname, 'Harper.txt');

    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
            console.error('Błąd zapisu Harper.txt:', err);
            return res.status(500).json({ error: 'Nie udało się zapisać pliku.' });
        }
        console.log('Zapisano Harper.txt');
        res.json({ status: 'ok' });
    });
});

app.listen(PORT, () => {
    console.log(`Harper Editor działa na http://localhost:${PORT}`);
});