import express from "express";
import actorRoutes from "./routes/actorRoutes";
import productRoutes from "./routes/productRoutes";
import transferRoutes from "./routes/transferRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/actors", actorRoutes);
app.use("/api/products", productRoutes);
app.use("/api/transfers", transferRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
