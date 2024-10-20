import express from "express";
import actorRoutes from "./routes/actorRoutes";
import productRoutes from "./routes/productRoutes";
import transferRoutes from "./routes/transferRoutes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/actors", actorRoutes);
app.use("/api/products", productRoutes);
app.use("/api/transfers", transferRoutes);

// 404 errors
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
