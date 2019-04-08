import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPossession } from 'app/shared/model/possession.model';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-possession-detail',
    templateUrl: './possession-detail.component.html'
})
export class PossessionDetailComponent implements OnInit {
    possession: IPossession;
    categories: ICategory[];

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected jhiAlertService: JhiAlertService,
        protected categoryService: CategoryService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ possession }) => {
            this.possession = possession;
        });
        this.categoryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICategory[]>) => response.body)
            )
            .subscribe((res: ICategory[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }
    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
