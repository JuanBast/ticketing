import { Publisher, OrderCancelledEvent, Subjects } from '@jbtickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
