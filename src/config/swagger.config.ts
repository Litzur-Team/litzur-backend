import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Operation = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Litzur',
            version: '1.0.0',
            description: 'Documentação API REST - Litzur'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'teste'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: [
        './src/api/controllers/*.ts', 
        './src/api/routes/*.ts'
    ]
};

export const swaggerSpec = swaggerJsdoc(options);