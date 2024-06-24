import {Component} from '@angular/core';

@Component({
    selector: 'app-loading',
    template: `
        <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `,
    styleUrls: ['loading.component.css']
})
export class LoadingComponent {
}
