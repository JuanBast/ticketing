import { Publisher, PaymentCreatedEvent, Subjects } from '@jbtickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
