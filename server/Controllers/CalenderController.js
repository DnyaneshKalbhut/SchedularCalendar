const { Router } = require("express");
const Event = require("../Models/Event");
const moment = require("moment");

const router = Router();

router.post("/create-event", async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.sendStatus(201);
        console.log("event data is :",event);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).send("Error creating event");
    }
});

router.get("/get-events", async (req, res) => {
    try {
        const events = await Event.find({
            start: { $gte: moment(req.query.start).toDate() },
            end: { $lte: moment(req.query.end).toDate() }
        });
        res.send(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send("Error fetching events");
    }
});

module.exports = router;
