const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');
dotenv.config({path: path.join(__dirname, 'config', 'config.env')})

const products = require('./routes/product');
const orders = require('./routes/order');
const User = require('./models/userModel');
const { log } = require('console');
connectDatabase();

app.use(express.json());
app.use(cors());
app.use('/api/v1/',products);
app.use('/api/v1/',orders);

app.post('/login',async(req,res) =>{
    const {email,password} = req.body;
   await User.findOne({email,password}).then(user=>{
        if(user){
            if(user.password === password){
                res.json('Success')
            }
            else{
                res.json('The Password is incorrect')
            }
        }
        else{
            res.json('No user exist')
        }
    })
})

// // app.post('/user',async(req,res)=>{
//    await createUser.create(req.body).then(user=>{res.json(user)}}).catch(err=>console.log(err)) })

app.post('/user',async(req,res)=>{
    

    // try {
    //    const userexit = await User.findOne({email});
    //    if(userexit){
    //      return res.status(409).json({message: 'user already exists'})
    //    }
       
       
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({message:'error'})
    // }
    
      
        
       const { name, email, password } = req.body;
       const existsEmail = await User.findOne({email})
      if(existsEmail && existsEmail.password == password){
        return res.json('ERROR')
      }
      else if(existsEmail && existsEmail.password !== password){
        return res.json('INCORRECT')
      }
      else {
       await User.create({ name, email, password }).then(user=>res.status(201).json(user)).catch(err=>console.log(err))
      }
       
    

})



// app.post('/user', async (req, res) => {
//     const { name, email, password } = req.body;
  
//     try {
//       // Check if the user already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(409).json({ message: 'User already exists' });
//       }
  
//       // Create a new user
//       const newUser = new User({ name, email, password });
//       await newUser.save();
//       return res.status(201).json({ message: 'Success' });
  
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Server error' });
//     }
//   });






if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '..', 'frontend',  'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
    });
}

app.listen(process.env.PORT, () => {
    console.log(`Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});