"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
const historyFilePath = path_1.default.join(__dirname, 'queryHistory.json');
app.use(express_1.default.json());
const readQueryHistory = () => {
    try {
        const data = fs_1.default.readFileSync(historyFilePath, 'utf8');
        return JSON.parse(data);
    }
    catch (err) {
        return [];
    }
};
const saveQueryHistory = (history) => {
    fs_1.default.writeFileSync(historyFilePath, JSON.stringify(history, null, 2), 'utf8');
};
app.get('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter "q" is required' });
        }
        const response = yield axios_1.default.get('http://api.duckduckgo.com/', {
            params: { q: query, format: 'json' }
        });
        const results = response.data.RelatedTopics.map((topic) => ({
            title: topic.Text,
            url: topic.FirstURL,
        }));
        res.json(results);
    }
    catch (error) {
        console.error('Erro ao buscar resultados:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/api/history', (req, res) => {
    const queryHistory = readQueryHistory();
    res.json(queryHistory);
});
app.post('/api/history', (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    const queryHistory = readQueryHistory();
    if (!queryHistory.includes(query)) {
        queryHistory.push(query);
        saveQueryHistory(queryHistory);
    }
    res.status(201).json({ message: 'Query added to history' });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
