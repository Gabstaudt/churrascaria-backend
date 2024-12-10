require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const { Sequelize } = require('sequelize');

// Configuração do Sequelize com as variáveis do .env
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco de dados
  process.env.DB_USER, // Usuário do banco
  process.env.DB_PASSWORD, // Senha do banco
  {
    host: process.env.DB_HOST, // Host do banco de dados
    dialect: process.env.DB_DIALECT, // Dialeto do banco (MySQL, Postgres, etc.)
    logging: false, // Define se as queries SQL serão exibidas no console
  }
);

// Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  });

module.exports = sequelize;
