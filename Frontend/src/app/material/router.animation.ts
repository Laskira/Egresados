import {
  trigger,
  animate,
  style,
  group,
  transition,
  query,
} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition(':decrement', [
    query(
      ':enter, :leave',
      style({
        position: 'fixed',
        top: '64px',
        left: '265px',
        bottom: '0',
        right: '15px',
      }),
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({
            transform: 'translateY(-100%)',
            opacity: '0',
          }),
          animate(
            '.7s ease-in-out',
            style({
              transform: 'translateY(0%)',
              opacity: '1',
            })
          ),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({
            transform: 'translateY(0%)',
            opacity: '1',
          }),
          animate(
            '.7s ease-in-out',
            style({
              transform: 'translateY(100%)',
              opacity: '0',
            })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
  transition(':increment', [
    group([
      query(
        ':enter, :leave',
        style({
          position: 'fixed',
          top: '64px',
          left: '265px',
          bottom: '0',
          right: '15px',
        }),
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({
            transform: 'translateY(100%)',
            opacity: '0',
          }),
          animate(
            '.7s ease-in-out',
            style({
              transform: 'translateY(0%)',
              opacity: '1',
            })
          ),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({
            transform: 'translateY(0%)',
            opacity: '1',
          }),
          animate(
            '.7s ease-in-out',
            style({
              transform: 'translateY(-100%)',
              opacity: '0',
            })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
