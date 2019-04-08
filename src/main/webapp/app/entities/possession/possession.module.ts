import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YmirSharedModule } from 'app/shared';
import {
    PossessionComponent,
    PossessionDetailComponent,
    PossessionUpdateComponent,
    PossessionDeletePopupComponent,
    PossessionDeleteDialogComponent,
    possessionRoute,
    possessionPopupRoute
} from './';

const ENTITY_STATES = [...possessionRoute, ...possessionPopupRoute];

@NgModule({
    imports: [YmirSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PossessionComponent,
        PossessionDetailComponent,
        PossessionUpdateComponent,
        PossessionDeleteDialogComponent,
        PossessionDeletePopupComponent
    ],
    entryComponents: [PossessionComponent, PossessionUpdateComponent, PossessionDeleteDialogComponent, PossessionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YmirPossessionModule {}
