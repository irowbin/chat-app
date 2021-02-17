import { ChatDbContext } from '../../services/database.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ValidationExtension } from './validation.extension'
import { Subject } from 'rxjs'
import { socket } from '../../services/socket-io.extension'
import { SocketMethods } from '../../models/socket-methods'
export class ComponentBase extends ValidationExtension {
	readonly toDestroy$ = new Subject<void>()
	constructor(public db: ChatDbContext, public toast: MatSnackBar) {
		super()
	}


	readonly notify = (message: string, type: 'ERROR' | 'SUCCESS'): void => {
		this.toast.open(message, '', {
			panelClass: [
				type === 'ERROR' ? 'bg-danger' : 'bg-success',
				'text-white',
				'mat-elevation-z4',
				'mx-1',
				'mt-1',
				'mb-1'
			],
			horizontalPosition: 'center',
			verticalPosition: 'top',
			duration: 5000
		})
	}
}
