const express = require('express');
const { default: mongoose } = require('mongoose')
const menu=require('./Schema.js')
require('dotenv').config()
const { resolve } = require('path');
const { error } = require('console');
const MONGO_DB_URL=process.env.MONGO_DB_URL;
const app = express();
const port = 3010;
app.use(express.json())
app.use(express.static('static'));
mongoose.connect(MONGO_DB_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>console.log("database connected successfully"))
.catch((error)=>{
  console.log("an error occured",error)
})
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
app.post('/menu',(req,res)=>{
  const newMenu=new menu(req.body);
  newMenu.save()
  .then(()=>res.status(201).json({ message: "Menu item added successfully!" }))
  .catch((error)=>{
    res.status(500).json({ message: "An error occurred", error: error.message })
  })
})
app.get('/menu',(req,res)=>{
  menu.find()
  .then((items)=>{
    res.status(200).json(items)
  })
  .catch((err)=>{
    res.status(500).json({ message: "An error occurred", error: err.message })
  })
})
app.put('/menu/:id',(req,res)=>{
  const id=req.params.id
  const updatedData=req.body
  menu.findByIdAndUpdate(id,updatedData,{new:true})
  .then((updatedItem)=>{
    if (!updatedItem){
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item updated successfully", updatedItem })
  })
  .catch((err)=>{
    res.status(500).json({message:"An error occured",error:err.message})
  })
})
app.delete('/menu/:id',(req,res)=>{
  const id=req.params.id
  menu.findByIdAndDelete(id)
  .then((deletedItem)=>{
    if(!deletedItem){
        return res.status(404).json({ message: "Menu item not found" });
      }
      return res.status(200).json({ message: "Menu item deleted successfully", deletedItem });
  })
  .catch((err)=>{
    res.status(500).json({ message: "An error occurred", error: error.message });
  })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
