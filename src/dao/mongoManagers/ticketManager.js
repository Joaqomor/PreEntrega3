import {ticketsModel} from "../../models/tickets.model.js"

class ticketManager {

  async findTicket(){
    return await ticketsModel.find();
}

async createTicket(total, email){
    const ticket = {
        purchase_datetime: new Date().toLocaleString(),
        amount: total,
        purchaser: email
    }

    return await ticketsModel.create(ticket);
}

async deleteMany(){
    await ticketsModel.deleteMany();

    return "All tickets were removed."
}

};
  
  
export default new ticketManager()