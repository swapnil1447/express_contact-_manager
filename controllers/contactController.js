const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels")
//@desc get all contact
//@routes GET /api/contact 
//@access public  

const getContacts = asyncHandler(async (req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
})

//@desc get all contact
//@routes PUT /api/contact/:id 
//@access public 

const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("contact not found to update")

    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact);
})

//@desc get all contact
//@routes POST /api/contact/
//@access public 

const createContact =asyncHandler(async  (req,res)=>{
    
    console.log("the req body is : ", req.body)
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory ")
    }
    const contact=await Contact.create({
        name,email,phone,
        user_id:req.user.id
    })
    res.status(201).json(contact);
})

//@desc get all contact
//@routes GET /api/contact/:id
//@access public 

const getContact = asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }

    res.status(200).json(contact);
})

//@desc get all contact
//@routes DELETE /api/contact/:id 
//@access public 

const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("contact not found to update")

    }
    await Contact.remove
    res.status(200).json(contact);
})
module.exports =  {getContacts,getContact,updateContact,deleteContact,createContact};