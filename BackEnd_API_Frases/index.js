import app from './server'


function Home(){

    async function buscarNovaFrase() {
        const termoPesquisa = document.getElementById('termoPesquisa').value;

        try {
            const response = await fetch(`/buscar-frases?termo=${encodeURIComponent(termoPesquisa)}`, { mode: 'cors' });
            const data = await response.json();

            if (data.frases && data.frases.length > 0) {
                const novaFrase = data.frases[Math.floor(Math.random() * data.frases.length)];
                document.getElementById('frase').innerText = novaFrase;
            } else {
                document.getElementById('frase').innerText = 'Nenhuma frase encontrada.';
            }
        } catch (error) {
            console.error('Erro ao buscar nova frase:', error);
            document.getElementById('frase').innerText = 'Erro ao buscar nova frase.';
        }
    }

    return (

        <div>
            <h1>Frase do Dia</h1>
            <input type="text" id="termoPesquisa" placeholder="Digite o termo" />
            <button onclick="buscarNovaFrase()">Nova Frase</button>
            <p id="frase"></p>
        </div>
    )
}


export default Home;