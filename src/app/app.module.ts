import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './modules/layout/navbar/navbar.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ChatDbContext } from './services/database.service'
import { NgxsModule } from '@ngxs/store'
import { environment } from '../environments/environment'
import { AppState } from './store/app.state'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { WelcomeComponent } from './modules/layout/welcome/welcome.component'

@NgModule({
	declarations: [AppComponent, NavbarComponent, WelcomeComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		NgxsModule.forRoot([AppState], {
			developmentMode: !environment.production
		}),
		MatSnackBarModule
	],
	providers: [ChatDbContext],
	bootstrap: [AppComponent]
})
export class AppModule {}
