const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
	ResponseHandler.success({
		req,
		res,
		data: "Hello World",
		message: "Connection Success",
	});
});

app.listen(4000, () => {
	console.log("Example app listening on port 4000!");
});
export default app;