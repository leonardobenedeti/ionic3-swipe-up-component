import { NgModule } from '@angular/core';
import { ContentDrawer } from './content-drawer/content-drawer';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [ContentDrawer],
	imports: [
		IonicModule,
	],
	exports: [ContentDrawer]
})
export class ComponentsModule {}
