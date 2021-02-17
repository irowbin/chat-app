import { Component, OnInit } from '@angular/core'
import {
	FormControl,
	FormGroup,
	ValidationErrors,
	Validators
} from '@angular/forms'
import { emailRegex, ValidationExtension } from '../shared/validation.extension'
import { UserModel } from '../../models/UserModel'
import { LoginAction, RegisterAction } from '../../store/app.actions'
import { filter, switchMap, takeUntil } from 'rxjs/operators'
import { AppSelector } from '../../store/app.selector'
import { Store } from '@ngxs/store'
import { ComponentBase } from '../shared/ComponentBase'
import { ChatDbContext } from '../../services/database.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ComponentBase implements OnInit {
	lForm: FormGroup
	constructor(
		public db: ChatDbContext,
		public toast: MatSnackBar,
		private store: Store,
		private router: Router
	) {
		super(db, toast)
		this.lForm = new FormGroup({
			username: new FormControl('', [
				Validators.required,
				Validators.pattern(emailRegex)
			]),
			password: new FormControl('', Validators.required)
		})
	}

	ngOnInit(): void {}
	_errors(key: string): ValidationErrors {
		return this.errors(this.lForm, key)
	}

	readonly login = (): void => {
		const value: UserModel = this.lForm.value
		this.store
			.dispatch(new LoginAction(value))
			.pipe(
				switchMap(() =>
					this.store.select(AppSelector.sliceOf('isUser'))
				),
				filter((v) => !!v),
				takeUntil(this.toDestroy$)
			)
			.subscribe({
				next: (v) => {
					this.notify(
						v === 'NOT_FOUND'
							? 'User not found.'
							: 'Login Successful.',
						v === 'NOT_FOUND' ? 'ERROR' : 'SUCCESS'
					)
					if (v === 'AVAILABLE') {
						this.router.navigate(['./chat-room'])
					}
				}
			})
	}
}
