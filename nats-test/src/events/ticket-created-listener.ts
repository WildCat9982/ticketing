import { Message } from 'node-nats-streaming'
import { Subjects, Listener, TicketCreatedEvent } from '@ck-tickets/common'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly  subject = Subjects.TicketCreated;
    queueGroupName: string = "payment-service";
    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        console.log('Event Data!', data)
        msg.ack();
    }
}