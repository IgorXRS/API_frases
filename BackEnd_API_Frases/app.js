const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors());

app.get('/buscar-frases', async (req, res) => {
    const termoPesquisa = req.query.termo || '';
  
    const url = `https://www.pensador.com/busca.php?q=${encodeURIComponent(termoPesquisa)}`;

    try {
        // Realize a solicitação HTTP e processe o conteúdo HTML com Cheerio
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Extraia as frases da página
        const frases = [];
        $('p.frase').each((index, element) => {
            frases.push($(element).text().trim());
        });

        res.json({ frases });
    } catch (error) {
        console.error('Erro na solicitação HTTP ou manipulação de HTML:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
