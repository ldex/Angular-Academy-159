import { Component } from '@angular/core';
import { fadeInAnimation } from '@app/animations';

@Component({
    templateUrl: './home.component.html',
    // make the animation available to this component
    animations: [fadeInAnimation],
    // attach the animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': ''}
})
export class HomeComponent {
    constructor() { }

}