import { trigger, state, style, animate, transition } from '@angular/animations';

export function visibility() {
  return trigger(
    'visibility', [
      state('show', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition("* => *", animate('0.5s ease-in-out'))
    ]
  )
}

export function flyInOut() {
  return trigger('flyInOut',[
      state('*', style({ opacity: 1, transform: 'translateX(0)'})),
      transition(':enter', [
          style({ transform: 'translateX(-100%)', opacity:0 }),
          animate('500ms ease-in')
      ]),
      transition(':leave', [
          animate('500ms ease-out', style({ transform: 'translateX(100%)', opacity: 0}))
      ])
  ]);
}