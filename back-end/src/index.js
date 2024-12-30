import express from 'express';
import cors from 'cors';
import clientRoutes from './routes/clientRoute.js'; // No 'as', just default import

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', clientRoutes); // Correctly passes the router

app.listen(port, () => console.log(`Server running on port ${port}`));
