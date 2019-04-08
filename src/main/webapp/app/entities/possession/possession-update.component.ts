import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPossession } from 'app/shared/model/possession.model';
import { PossessionService } from './possession.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';

@Component({
    selector: 'jhi-possession-update',
    templateUrl: './possession-update.component.html'
})
export class PossessionUpdateComponent implements OnInit {
    possession: IPossession;
    isSaving: boolean;

    categories: ICategory[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected possessionService: PossessionService,
        protected categoryService: CategoryService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
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

    save() {
        this.isSaving = true;
        if (this.possession.id !== undefined) {
            this.subscribeToSaveResponse(this.possessionService.update(this.possession));
        } else {
            this.subscribeToSaveResponse(this.possessionService.create(this.possession));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPossession>>) {
        result.subscribe((res: HttpResponse<IPossession>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCategoryById(index: number, item: ICategory) {
        return item.id;
    }
}
