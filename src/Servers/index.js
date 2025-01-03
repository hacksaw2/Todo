
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import TodosModel from "./Todos";
import TodosModel from './Todos.js';
import axios from "axios";


const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Todos",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB",err))


app.post('/signup', (req, res) => {
    TodosModel.create(req.body)
    .then(Todos => res.json(Todos))
    .catch(err => res.json(err))

});

app.post("/login",(req,res)=>{
    const {email,password} = req.body;

    TodosModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json({success:true,email:user.email})

            }else{
                res.json({success:false,message:"The password is incorrect"})
            }}else{
                res.json({success:false,message:"No recorded existed"})
            }
    })
    .catch(err => res.status(500).json({success:false,message:"Server  error"}))
})



app.post('/home',(req,res) =>{
    const {email,todo} = req.body
    const newTodo = {todo:todo}

    if (!email || !todo) {
        return res.status(400).json({ success: false, message: "Email and todo are required" });
      }
    

    TodosModel.findOneAndUpdate(
        {email:email},
        {$push:{todo:newTodo}},
        {new:true}
    )
    .then(()=> res.json({success:true, message:"Todo post added successfully"}))
    .catch(err => res.status(500).json({success:false,message:"Failed to add blog post",error:err}));
})

app.delete('/home/:email/todo/:todoId', async (req, res) => {
  const { email, todoId } = req.params;

  if (!email || !todoId) {
    return res.status(400).json({ success: false, message: "Email and Todo ID are required" });
  }

  try {
    const updatedUser = await TodosModel.findOneAndUpdate(
      { email: email }, // Find user by email
      { $pull: { todo: { _id: todoId } } }, // Remove todo by _id
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User or Todo not found" });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      updatedUser, // Optionally return the updated user data
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete todo",
      error: err.message, // Return the specific error message
    });
  }
});


app.get('/home', (req, res) => {
    TodosModel.find()
      .then((users) => {
        if (!users || users.length === 0) {
          return res.status(404).json({ message: 'No users found' });
        }
        res.json(users);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error' });
      });
  });

  app.get('/profile',(req,res) => {
    TodosModel.find()
    .then(employees =>{
      res.json(employees)
    })
    .catch(err => {
      res.status(500).send('Server error')
    })
    
  })
  



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
