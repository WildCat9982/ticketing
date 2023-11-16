import { Publisher, OrderCancelledEvent, Subjects } from "@ck-tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;    
}
