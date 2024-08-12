const mongoose = require('mongoose')

const connectDataBase = ()=>{
     
    
    		

    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((con)=>{

       
        console.log(`the db is connected to ${con.connection.host} `);
        
    })
};

module.exports = connectDataBase;





