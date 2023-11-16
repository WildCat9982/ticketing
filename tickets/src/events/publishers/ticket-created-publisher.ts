import { Publisher, Subjects, TicketCreatedEvent } from '@ck-tickets/common'

export class TicketCreatedPublisher extends Publisher <TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}
