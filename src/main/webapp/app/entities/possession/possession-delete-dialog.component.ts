import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPossession } from 'app/shared/model/possession.model';
import { PossessionService } from './possession.service';

@Component({
    selector: 'jhi-possession-delete-dialog',
    templateUrl: './possession-delete-dialog.component.html'
})
export class PossessionDeleteDialogComponent {
    possession: IPossession;

    constructor(
        protected possessionService: PossessionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.possessionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'possessionListModification',
                content: 'Deleted an possession'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-possession-delete-popup',
    template: ''
})
export class PossessionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ possession }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PossessionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.possession = possession;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/possession', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/possession', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
