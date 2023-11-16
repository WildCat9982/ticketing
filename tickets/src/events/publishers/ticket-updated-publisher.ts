import { Publisher, Subjects, TicketUpdatedEvent } from '@ck-tickets/common'

export class TicketUpdatedPublisher extends Publisher <TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}
