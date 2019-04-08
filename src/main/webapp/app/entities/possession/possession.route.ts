import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Possession } from 'app/shared/model/possession.model';
import { PossessionService } from './possession.service';
import { PossessionComponent } from './possession.component';
import { PossessionDetailComponent } from './possession-detail.component';
import { PossessionUpdateComponent } from './possession-update.component';
import { PossessionDeletePopupComponent } from './possession-delete-dialog.component';
import { IPossession } from 'app/shared/model/possession.model';

@Injectable({ providedIn: 'root' })
export class PossessionResolve implements Resolve<IPossession> {
    constructor(private service: PossessionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPossession> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Possession>) => response.ok),
                map((possession: HttpResponse<Possession>) => possession.body)
            );
        }
        return of(new Possession());
    }
}

export const possessionRoute: Routes = [
    {
        path: '',
        component: PossessionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Possessions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PossessionDetailComponent,
        resolve: {
            possession: PossessionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Possessions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PossessionUpdateComponent,
        resolve: {
            possession: PossessionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Possessions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PossessionUpdateComponent,
        resolve: {
            possession: PossessionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Possessions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const possessionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PossessionDeletePopupComponent,
        resolve: {
            possession: PossessionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Possessions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
