const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('micro-cors')();

module.exports = cors(async (req, res) => {
  const termoPesquisa = req.query.termo || '';
  const url = `https://www.pensador.com/busca.php?q=${encodeURIComponent(termoPesquisa)}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

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
