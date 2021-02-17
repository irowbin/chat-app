import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WelcomeComponent } from './modules/layout/welcome/welcome.component'

const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: '', component: WelcomeComponent },
	{
		path: 'login',
		loadChildren: () =>
			import('./modules/login/login.module').then(
				({ LoginModule }) => LoginModule
			)
	},
	{
		path: 'register',
		loadChildren: () =>
			import('./modules/register/register.module').then(
				({ RegisterModule }) => RegisterModule
			)
	},
	{
		path: 'users',
		loadChildren: () =>
			import('./modules/users/users.module').then(
				({ UsersModule }) => UsersModule
			)
	},
	{
		path: 'chat-room',
		loadChildren: () =>
			import('./modules/chat-room/chat-room.module').then(
				({ ChatRoomModule }) => ChatRoomModule
			)
	},
	{
		path: 'user-manual',
		loadChildren: () =>
			import('./modules/user-manual/user-manual.module').then(
				({ UserManualModule }) => UserManualModule
			)
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
