const express = require("express");
const router = express.Router();
const { getContact,createContact,getContacts,updateContact,deleteContact } = require ("../Controllers/ContactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getContacts).put(updateContact).delete(deleteContact);

module.exports = router;

