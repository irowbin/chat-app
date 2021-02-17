import { Component, OnDestroy } from '@angular/core'
import {
	FormControl,
	FormGroup,
	ValidationErrors,
	Validators
} from '@angular/forms'
import { ChatDbContext } from 'src/app/services/database.service'
import { UserModel } from '../../models/UserModel'
import { emailRegex } from '../shared/validation.extension'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ComponentBase } from '../shared/ComponentBase'
import { Store } from '@ngxs/store'
import { RegisterAction } from '../../store/app.actions'
import { filter, switchMap, takeUntil } from 'rxjs/operators'
import { AppSelector } from '../../store/app.selector'
import { Router } from '@angular/router'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends ComponentBase implements OnDestroy {
	rForm: FormGroup

	constructor(
		public db: ChatDbContext,
		public toast: MatSnackBar,
		private store: Store,
		private router: Router
	) {
		super(db, toast)
		this.rForm = new FormGroup({
			displayName: new FormControl('', Validators.required),
			username: new FormControl('', [
				Validators.required,
				Validators.pattern(emailRegex)
			]),
			password: new FormControl('', Validators.required),
			cPassword: new FormControl('', Validators.required)
		})
	}

	_errors(key: string): ValidationErrors {
		return this.errors(this.rForm, key)
	}

	ngOnDestroy(): void {
		this.toDestroy$.next()
		this.toDestroy$.complete()
	}

	readonly saveChanges = async (): Promise<void> => {
		const value: UserModel = this.rForm.value
		value.password = btoa(value.password)
		this.store
			.dispatch(new RegisterAction(value))
			.pipe(
				switchMap(() =>
					this.store.select(AppSelector.sliceOf('isUser'))
				),
				filter((v) => !!v),
				takeUntil(this.toDestroy$)
			)
			.subscribe({
				next: async (v) => {
					this.notify(
						v === 'AVAILABLE'
							? 'An account has been created successfully.'
							: v === 'EXIST'
							? 'Email already exist. Try another.'
							: '',
						v === 'AVAILABLE' ? 'SUCCESS' : 'ERROR'
					)
					if (v === 'AVAILABLE')
						await this.router.navigate(['./chat-room'])
				}
			})
	}
}
