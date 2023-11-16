import { Listener, OrderCreatedEvent } from "@ck-tickets/common";
import { Subjects } from "@ck-tickets/common/build/events/subjects";
import { OrderStatus } from "@ck-tickets/common/build/events/types/order-status";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/queue-expiration";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime()
        console.log('Waiting this many milliseconds to process the job: ', delay)

        await expirationQueue.add(
            {
                orderId: data.id,
            }, 
            {
                delay
            }
        )
        msg.ack();
    }

}