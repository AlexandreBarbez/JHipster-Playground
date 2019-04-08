import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPossession } from 'app/shared/model/possession.model';
import { AccountService } from 'app/core';
import { PossessionService } from './possession.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';

@Component({
    selector: 'jhi-possession',
    templateUrl: './possession.component.html'
})
export class PossessionComponent implements OnInit, OnDestroy {
    possessions: IPossession[];
    currentAccount: any;
    eventSubscriber: Subscription;
    categories: ICategory[];

    constructor(
        protected possessionService: PossessionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected categoryService: CategoryService
    ) {}

    loadAll() {
        this.possessionService
            .query()
            .pipe(
                filter((res: HttpResponse<IPossession[]>) => res.ok),
                map((res: HttpResponse<IPossession[]>) => res.body)
            )
            .subscribe(
                (res: IPossession[]) => {
                    this.possessions = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.categoryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICategory[]>) => response.body)
            )
            .subscribe((res: ICategory[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPossessions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPossession) {
        return item.id;
    }

    registerChangeInPossessions() {
        this.eventSubscriber = this.eventManager.subscribe('possessionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
