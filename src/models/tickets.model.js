import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    purchase_datetime: Date,
    amount: Number,
    purcharser: {
        type: String,
        index: true
    }
})

export const ticketsModel = mongoose.model('tickets', ticketSchema)
