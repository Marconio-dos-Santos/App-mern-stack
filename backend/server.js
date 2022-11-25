import express from 'express'
import dotenv from 'dotenv'
import data from './data.js'

dotenv.config()
const app = express()

app.get('/api/services', (req, res) => {
    res.send(data)
})
const port = process.env.PORT || 2121
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}, you better catch it!`);
});
