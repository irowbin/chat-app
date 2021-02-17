import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { UserModel } from '../../../models/UserModel'
import { Select, Store } from '@ngxs/store'
import { AppSelector } from '../../../store/app.selector'
import { ComponentBase } from '../../shared/ComponentBase'
import { ChatDbContext } from '../../../services/database.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { debounceTime, takeUntil } from 'rxjs/operators'
import { LogoutAction } from '../../../store/app.actions'
import { Router } from '@angular/router'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent
	extends ComponentBase
	implements OnDestroy, AfterViewInit {
	userSession!: Partial<UserModel>

	constructor(
		public db: ChatDbContext,
		public toast: MatSnackBar,
		private store: Store,
		private router: Router
	) {
		super(db, toast)
	}

	ngOnDestroy(): void {
		this.toDestroy$.next()
		this.toDestroy$.complete()
	}

	ngAfterViewInit(): void {
		this.store
			.select(AppSelector.sliceOf('user'))
			.pipe(debounceTime(200), takeUntil(this.toDestroy$))
			.subscribe({ next: (u) => (this.userSession = u) })
	}

	readonly logout = () => {
		this.store.dispatch(new LogoutAction())
		this.notify('Logout successful.', 'SUCCESS')
		this.router.navigate(['./login'])
	}
}
