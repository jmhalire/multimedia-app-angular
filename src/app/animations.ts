import { trigger, transition, style, animate, state, animateChild, query, group } from "@angular/animations";

const weatherInput =
    trigger('weatherInput',
        [transition(':enter',
            [style({ opacity: 1, transform: 'rotateY(180deg)', height: '0px' }), animate('300ms')
            ])
        ]);

const weatherDate =
    trigger('weatherDate',
        [transition(':enter',
            [style({ opacity: 0, transform: 'translateX(-100%) rotate(-180deg)' }), animate('200ms')]),
        ]);

const fileAnimation = {
    left: trigger('left',
        [transition(':enter',
            [style({ opacity: 0, transform: 'translateX(-100%)' }), animate('300ms')
            ])
        ]),
    right: trigger('right',
        [transition(':enter',
            [style({ opacity: 0, transform: 'translateX(100%)' }), animate('300ms ease-in')
            ])
        ]),
    title: trigger('title',
        [transition(':enter',
            [style({ opacity: 0, transform: 'translateY(-200%)' }), animate('300ms')
            ])
        ])
}

const listFileAnimation = {
    InsertRemove: trigger('InsertRemove', [
        transition(':enter', [style({ opacity: 0, transform: 'translateX(800px)'}), animate('100ms 400ms'),]),
        transition(':leave', [animate('100ms ease-out', style({ opacity: 0, transform: 'translateX(500px)' }))])
    ]),
    table: trigger('table', [
        transition(':enter',
            [style({ opacity: 0, transform: 'translateX(-200%)' }), animate('300ms')
            ]),

    ])
}

const upload = trigger('upload', [
    transition(':enter', [style({ opacity: 1, transform: 'translateY(-100%)', backgroundColor: 'black' }), animate('250ms')]),
])

const openClose = trigger('openClose', [
    state('open', style({ height: '100%', opacity: 1 })),
    state('closed', style({ height: '0px', opacity: 1, transform: 'translateX(-100%)' })),
    transition('open => closed', [animate('200ms')]),
    transition('closed => open', [animate('200ms')]),
])


const initiation = {
    logo: trigger('logo',
        [transition(':enter',
            [style({ opacity: 1, height: '0px' }), animate('300ms')])
        ]),
    welcome: trigger('welcome',
        [transition(':enter',
            [style({ opacity: 1, transform: 'translateY(-100%)' }), animate('300ms')])
        ]),
    definition: trigger('definition',
        [transition(':enter',
            [style({ opacity: 0, transform: 'translateX(200%)' }), animate('250ms 200ms')])
        ])
}

const profile = trigger('profile',
    [transition(':enter',
        [style({ opacity: 1, transform: 'translateY(-60%) scale3d(0.1,0.1,0.1)' }), animate('300ms')])
    ])

const signinAnimations = {
    signin: trigger('signin', 
        [transition(':enter',
            [style({ opacity: 0, transform: 'translateX(100%) rotate(120deg)'}), animate('300ms')])
    ]),
    logo: trigger('logo', 
        [transition(':enter',
            [style({ opacity: 0,height:'0px'}), animate('350ms')])
        ])
}

const signupAnimation = {
    signup: trigger('signup', 
        [transition(':enter',
            [style({ opacity: 0, transform: 'translateX(100%) rotate(120deg)'}), animate('300ms')])
        ]),
    logo: trigger('logo', 
        [transition(':enter',
            [style({ opacity: 0,height:'0px'}), animate('350ms')])
    ])    
}

const body = {
    body: trigger('body', [
        transition(':enter', [style({ opacity: 1, transform: 'translateX(-250%)'}), animate('200ms'),]),
        transition(':leave', [animate('180ms', style({ opacity: 1, transform: 'translateX(-150%)' }))])
    ])
}

export {
    weatherDate,
    weatherInput,
    fileAnimation,
    listFileAnimation,
    upload,
    openClose,
    initiation,
    profile,
    signinAnimations,
    signupAnimation,
    body
}