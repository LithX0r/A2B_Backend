import express from "express";

const app = express();
const port: number = 3000;
app.get('/', (req, res) => {
	res.send("test");
});
app.listen(port, () => {console.log(`Server is running on port ${port}`)});
