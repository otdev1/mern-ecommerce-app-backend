import express from 'express';
import path from 'path';
import data from './data';
// import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from "cors";
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
//import uploadRoute from './routes/uploadRoute';

// dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());

app.use(cors());
//app.use('/api/uploads', uploadRoute);
app.use("/api/users", userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

//app.use(express.static(path.join(__dirname, '/../frontend/build')));

//app.use(express.static(path.join(__dirname, 'https://ot-amazona.onrender.com/frontend/build')));

//app.get('*', (req, res) => res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`)));
//app.get('*', (req, res) => res.sendFile(path.join(`https://ot-amazona.onrender.com/frontend/build/index.html`)));

//app.listen(config.PORT, () => {console.log('Server started at http://localhost:5000');});

//app.get('*', (req, res) => res.redirect('https://ot-amazona.onrender.com'));

//app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
//allows a file stored in uploads folder to be displayed in the frontend

// app.use("/api/products/:id", (req, res) => {

//     const productId = req.params.id;

//     const product = data.products.find(x => x._id === productId);

//     if(product)
//         res.send(product);
//     else
//         res.status(404).send( {msg: "Product Not Found."})
// });

// app.use("/api/products", (req, res) => {
//     res.send(data.products)
// });

app.listen(5000, () => { console.log('Server started'); })
