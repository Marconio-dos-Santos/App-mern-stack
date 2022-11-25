import express from 'express'
import dotenv from 'dotenv'
const port = process.env.PORT || 2121

dotenv.config()
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!!')
})
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}, you better catch it!`);
});
