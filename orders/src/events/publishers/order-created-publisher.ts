import { Publisher, OrderCreatedEvent, Subjects } from "@ck-tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;    
}
