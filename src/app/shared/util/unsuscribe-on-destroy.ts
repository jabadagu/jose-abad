import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: 'unsubscribeOnDestroy',
})
export abstract class UnsubscribeOnDestroy implements OnDestroy {
  unsubscribeDestroy$: Subject<boolean> = new Subject();

  ngOnDestroy(): void {
    this.unsubscribeDestroy$.next(true);
    this.unsubscribeDestroy$.complete();
  }
}