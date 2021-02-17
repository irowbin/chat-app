import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from './register.component'
import { RouterModule } from '@angular/router'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CompareDirective } from './compare.directive'
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
	declarations: [RegisterComponent, CompareDirective],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: '', component: RegisterComponent }]),
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,
		MatSnackBarModule
	]
})
export class RegisterModule {}
