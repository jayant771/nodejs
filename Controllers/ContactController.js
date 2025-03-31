const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @disc all contact
// @route GET All /api/contacts
// @access private   
const getContacts= asyncHandler(async(req,res)=>{
    const contacts = await Contact.find( {user_id: req.user.id});
    res.status(200).json(contacts);
});

// @disc create new contact
// @route POST /api/contact
// @access private 
const createContact = asyncHandler(async(req,res)=>{
    console.log("The requeast body is ", req.body);
    const {name,phone,email} = req.body; 

    // Basic validation
    if(!name || !phone || !email){
        res.status(400);
        throw new Error("all fields are Mandatory!");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact);
});

// @Disc get contact
// @route Get /api/contact:id
// @access private 
const getContact = asyncHandler(async(req,res)=>{
    const contact = await contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

// @Disc update contact
// @route PUT /api/contact:id
// @access private 
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    if (contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error ("User don't have permission to update other user's contacts")
    } 

    const updatedContact = await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true }
    );
    res.status(200).json(updatedContact);
});

// @Disc delete contact
// @route Delete /api/contact:id
// @access private  
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    if (contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error ("User don't have permission to update other user's contacts")
    }

    await contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports= {getContact,createContact,getContacts,updateContact,deleteContact};