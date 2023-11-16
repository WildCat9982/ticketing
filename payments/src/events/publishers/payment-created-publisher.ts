import { Subjects, Publisher, PaymentCreatedEvent } from '@ck-tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated;

}