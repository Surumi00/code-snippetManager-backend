

require("dotenv").config();
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const app=express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI).then(
    ()=>{
        console.log("DB connected");
        
    }
).catch(
    (error)=>{
        console.log(error);
        
    }
)


const Snippet=mongoose.model("Snippets",new mongoose.Schema(
    {
        title: String,
        language: String,
        code: String,
        description: String,
        tags : [String],
        createdAt: {
            type : Date,
            default : Date.now
        }
    }
))


app.post("/add-snippet",async(req,res)=>{
    await Snippet.create(req.body)
    res.json({"status":"success"})
})

app.get("/view-snippet",async(req,res)=>{
    const snipp=await Snippet.find()
    res.json(snipp)
})

app.delete("/delete-snippet/:id",async(req,res)=>{
    
    try{
        await Snippet.findByIdAndDelete(req.params.id)
        res.json({"status":"success"})
    }
    catch(error){
        res.status(500).json({"status":"error"})
    }
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});