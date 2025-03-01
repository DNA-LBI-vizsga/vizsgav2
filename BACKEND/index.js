const express = require('express');
const cors = require('cors');
const app = express();
const leltarRouters = require('./routes/leltarRouter');
const sequelize = require('./config.js');
require("./associations/associations.js");

app.use(express.json())

async function syncDatabase() {
    try {
        await sequelize.sequelize.sync({ force: false}); // force: false ensures it won't drop existing tables
        console.log('Database synced!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}


app.get("/",(req,res)=>
    { res.json({message:"Minden OK"})}
)

app.use(cors())
app.use('/leltar', leltarRouters)
app.use(
    (err, req, res, next)=>{
    
        console.log(req.headers)
        console.log(req.statusCode)
        console.log(req.originalUrl)
        console.log(req.body)

        console.log(err.message, err.stack)
        res.status(err.statusCode || 500).json({"message":err.message})
        return    
    }
)

syncDatabase();



app.listen(3000, () => {
    console.log('Server is running on port 3000');
    
});

