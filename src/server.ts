import config from "./config/index.js";
import app from "./app.js";
import swaggerUI from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger.config.js";


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

const PORT: number = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});