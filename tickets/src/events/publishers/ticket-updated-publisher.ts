import { TicketUpdatedEvent, Publisher, Subjects } from '@jbtickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
