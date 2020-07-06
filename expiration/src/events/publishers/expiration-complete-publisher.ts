import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@jbtickets/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete;
}
