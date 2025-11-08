const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SAVES_DIR = '/app/saves';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('/usr/share/nginx/html'));

// Asegurar que el directorio de saves existe
async function ensureSavesDir() {
    try {
        await fs.mkdir(SAVES_DIR, { recursive: true });
    } catch (error) {
        console.error('Error creando directorio de saves:', error);
    }
}

// Endpoint para guardar estado
app.post('/api/save', async (req, res) => {
    try {
        const { romName, state, timestamp } = req.body;
        
        if (!romName || !state) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }
        
        await ensureSavesDir();
        
        const fileName = `save_${romName.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
        const filePath = path.join(SAVES_DIR, fileName);
        
        const saveData = {
            romName,
            state,
            timestamp: timestamp || new Date().toISOString()
        };
        
        await fs.writeFile(filePath, JSON.stringify(saveData, null, 2), 'utf8');
        
        res.json({ success: true, message: 'Estado guardado correctamente' });
    } catch (error) {
        console.error('Error guardando estado:', error);
        res.status(500).json({ error: 'Error al guardar estado: ' + error.message });
    }
});

// Endpoint para cargar estado
app.get('/api/load/:romName', async (req, res) => {
    try {
        const { romName } = req.params;
        
        if (!romName) {
            return res.status(400).json({ error: 'Nombre de ROM requerido' });
        }
        
        const fileName = `save_${romName.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
        const filePath = path.join(SAVES_DIR, fileName);
        
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const saveData = JSON.parse(data);
            res.json({ success: true, data: saveData });
        } catch (error) {
            if (error.code === 'ENOENT') {
                return res.status(404).json({ error: 'No hay estado guardado para este juego' });
            }
            throw error;
        }
    } catch (error) {
        console.error('Error cargando estado:', error);
        res.status(500).json({ error: 'Error al cargar estado: ' + error.message });
    }
});

// Endpoint para verificar si existe un estado guardado
app.get('/api/check/:romName', async (req, res) => {
    try {
        const { romName } = req.params;
        const fileName = `save_${romName.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
        const filePath = path.join(SAVES_DIR, fileName);
        
        try {
            await fs.access(filePath);
            res.json({ exists: true });
        } catch (error) {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error verificando estado: ' + error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor backend ejecutándose en puerto ${PORT}`);
    ensureSavesDir();
});

