const router = require("express").Router();
const authenticateToken = require("../middleware/auth.js");
// Corrected casing for getAllEvents controller import to match common conventions
const {
  getAllEvents,
} = require("../controller/event/getAllEvent.controller.js");
const { getEventById } = require("../controller/event/getevent.controller.js");
const { createEvent } = require("../controller/event/postevent.controller.js");
const { updateEvent } = require("../controller/event/putevent.controller.js");
const {
  deleteEvent,
} = require("../controller/event/deleteevent.controller.js");
const { createTicket } = require(
  `../controller/ticket/createTicket.controller.js`,
);
const { getTicket } = require("../controller/ticket/getticket.controller.js");
const {
  getAllTicket,
} = require("../controller/ticket/getallticket.controller.js");
const {
  deleteTicket,
} = require("../controller/ticket/deleteticket.controller.js");
const {
  registerForEvent,
} = require("../controller/event/registerevent.controller.js");

router.get("", authenticateToken, getAllEvents);
router.get("/:id", authenticateToken, getEventById);
router.post("", authenticateToken, createEvent);
router.put("/:id", authenticateToken, updateEvent);
router.delete("/:id", authenticateToken, deleteEvent);

//ticket routes
router.post("/:id/ticket", authenticateToken, createTicket);
router.get("/ticket/:ticketId", authenticateToken, getTicket);
router.get("/:id/ticket", authenticateToken, getAllTicket);
router.delete("/ticket/:ticketId", authenticateToken, deleteTicket);

router.post(
  "/:eventId/ticket/:ticketId/register",
  authenticateToken,
  registerForEvent,
);

module.exports = router;
