import { Directive, forwardRef, Attribute } from '@angular/core'
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms'

/**
 * Value comparer directive
 */
@Directive({
	selector:
		'[appEqual][formControlName],[appEqual][formControl],[appEqual][ngModel]',
	providers: [
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => CompareDirective),
			multi: true
		}
	]
})
export class CompareDirective implements Validator {
	constructor(@Attribute('appEqual') public validateEqual: string) {}

	validate = (c: AbstractControl): { [key: string]: any } | null => {
		// self value (e.g. retype password)
		const v = c.value

		// control value (e.g. password)
		const e = c.root.get(this.validateEqual)
		// returns compare state
		return e && v !== e.value ? { unequal: true } : null
	}
}
