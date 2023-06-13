import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from 'socket.io';
import session from "express-session";
import viewsRouter from "./routes/view.router.js";
import userRouter from "./routes/users.router.js"
import cartsRouter from "./routes/carts.router.js"
import productsRouter from "./routes/products.router.js"
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import passport from "passport";
import "./passport/passport.config.js";
import config from "./config.js";



const app = express();
const PORT = config.port;
 
app.use(express.json());
app.use(express.urlencoded( {extended : true}));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public")); 
 


const URI = config.mongoUrl;

app.use(session({
    store:MongoStore.create({
        mongoUrl:URI,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 40
    }),
    secret:"CoderS3cret", 
    resave: false,
    saveUninitialized: true
}))



app.use(passport.initialize());
app.use(passport.session());



app.use("/users", userRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/views', viewsRouter); 

const connectMongoDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Conected to mongoDB.');
    } catch (error) {
        console.log('Error whit mongoDB.');
        console.log(error)
    } 
};

connectMongoDB();

const httpServer = app.listen(PORT, ()  => {
    console.log(`Express server running on local host : ${PORT}.`);
}); 

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado con el ID ${socket.id}.`);
    socket.emit('fetchProducts');
    socket.on('updateProducts', () => {
        socket.emit('fetchProducts')
    });
    socket.on('disconnect', () => {
        console.log(`Usuario con ID ${socket.id} se ha desconectado.`)
    })
})