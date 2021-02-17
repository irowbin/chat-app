import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from '@ngxs/store'
import { FetchUsersAction } from '../../store/app.actions'
import { UserModel } from '../../models/UserModel'
import { ComponentBase } from '../shared/ComponentBase'
import { ChatDbContext } from '../../services/database.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { switchMap, takeUntil } from 'rxjs/operators'
import { AppSelector } from '../../store/app.selector'
import { socket as io } from '../../services/socket-io.extension'
import { SocketMethods } from '../../models/socket-methods'
import { Socket } from 'socket.io'

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent
	extends ComponentBase
	implements AfterViewInit, OnInit, OnDestroy {
	users: Partial<UserModel[]> = []

	constructor(
		public db: ChatDbContext,
		public toast: MatSnackBar,
		private store: Store
	) {
		super(db, toast)
	}

	ngOnInit(): void {
    this.initSlice()
  }



	private readonly initSlice = () => {
		this.store
			.dispatch(new FetchUsersAction())
			.pipe(
				switchMap(() =>
					this.store.select(AppSelector.sliceOf('users'))
				),
				takeUntil(this.toDestroy$)
			)
			.subscribe({ next: (u) => (this.users = u) })
	}

	ngAfterViewInit(): void {

	}

	ngOnDestroy(): void {
		this.toDestroy$.next()
		this.toDestroy$.complete()
	}
}
