import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChatRoomComponent } from './chat-room.component'
import { RouterModule } from '@angular/router'

@NgModule({
	declarations: [ChatRoomComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: '', component: ChatRoomComponent }])
	]
})
export class ChatRoomModule {}
