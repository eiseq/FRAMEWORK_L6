const Application = require('./src/lib/application');
const app = new Application();
const routes = require('./src/routes/v1');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const bodyParser = require('./src/middlewares/bodyParser');

app.use(bodyParser);

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(routes.handle());
app.onError(errorMiddleware);

app.get('/api', (req, res) => {
    res.json({
        endpoints: [
            "GET v1/equipment - Получить список всего оборудования",
            "GET v1/equipment/:id - Получить оборудование по ID",
            "POST v1/equipment - Создать новое оборудование",
            "PUT v1/equipment/:id - Обновить оборудование",
            "PATCH v1/equipment/:id - Частично обновить оборудование",
            "DELETE v1/equipment/:id - Удалить оборудование",
            "GET v1/experiments - Получить список всех экспериментов",
            "GET v1/experiments/:id - Получить эксперимент по ID",
            "POST v1/experiments - Создать новый эксперимент",
            "PUT v1/experiments/:id - Обновить эксперимент",
            "PATCH v1/experiments/:id - Частично обновить эксперимент",
            "DELETE v1/experiments/:id - Удалить эксперимент"
        ]
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});