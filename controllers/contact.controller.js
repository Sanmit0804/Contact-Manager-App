const asyncHandler = require('express-async-handler')
const Contact = require('../models/contact.model')

// @desc: GET all contacts
// @route: GET /api/contacts
// @access: Private 
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ userId: req.user.id });
    res.status(200).json(contacts);
})

// @desc: Create new contact
// @route: POST /api/contacts
// @access: Private 
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        userId: req.user.id
    })
    res.status(201).json(contact)
})

// @desc: Get contact
// @route: GET /api/contacts/:id
// @access: Private 
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact);
})

// @desc: Update contact
// @route: PUT /api/contacts/:id
// @access: Private 
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    if (contact.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})

// @desc: Delete contact
// @route: DELETE /api/contacts/:id
// @access: Private  
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to Delete other user contacts")
    }

    res.status(200).json({ message: `Deleted contact with id: ${req.params.id}` });
});


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }