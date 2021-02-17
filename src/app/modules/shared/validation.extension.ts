import { FormGroup, ValidationErrors } from '@angular/forms'
export const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
export class ValidationExtension {
	readonly errors = (f: FormGroup, key: string): ValidationErrors => {
		const control = f.get(key)
		return (control?.touched && control?.invalid && control?.errors) || {}
	}
}
