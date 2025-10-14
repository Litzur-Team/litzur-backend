import app from "./app.js";
import config from "./config/index.js";

const PORT: number = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});