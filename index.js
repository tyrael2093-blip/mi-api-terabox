const express = require('express');
const axios = require('axios');
const app = express();

app.get('/play', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send("Falta la URL");

    try {
        // Este es un bypass público que busca el link directo por ti
        const apiRes = await axios.get(`https://workers.dev{url.split('/').pop()}`);
        const directLink = apiRes.data.downloadRes.dlink;
        
        // Redirige al reproductor al archivo MP3
        res.redirect(directLink);
    } catch (e) {
        res.status(500).send("Error al extraer música. Asegúrate que el link sea válido.");
    }
});

app.listen(process.env.PORT || 3000, () => console.log("Servidor funcionando"));
