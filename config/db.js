const mongoose = require('mongoose');

module.exports = async () => {
  const connection = await mongoose.connect(
    process.env.MONGO_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );

  console.log(`MongoDB connected at host=${connection.connection.host}`.cyan);
};
