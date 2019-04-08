import { NgModule } from '@angular/core';

import { YmirSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [YmirSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [YmirSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class YmirSharedCommonModule {}
