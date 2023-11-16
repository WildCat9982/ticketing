import { Subjects, Publisher, TicketCreatedEvent } from '@ck-tickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
  }
  