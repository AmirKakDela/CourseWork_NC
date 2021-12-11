require("dotenv").config();
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require('./routes/auth.router');
const songRouter = require('./routes/song.router');
const artistRouter = require('./routes/artist.router');
const searchRouter = require('./routes/search.router');


const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/song', songRouter);
app.use('/api/artist', artistRouter);
app.use('/api/search', searchRouter);



const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    } catch (e) {
        console.log(`Error before start`)
    }
}

start();

