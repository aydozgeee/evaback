const express = require('express')
const { sequelize } = require('./models') 
const tradeRouter = require('./routes/trade')
const { seedDatabase } = require('./scripts/seed')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/trade', tradeRouter)
//{ force: true }
sequelize
	.sync()
	.then(() => {
		return seedDatabase()
	})
	.then(() => {
		startServer()
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err)
	})

function startServer() {
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`)
	})
}
