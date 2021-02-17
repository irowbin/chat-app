import { AfterViewInit, Component } from '@angular/core'
import { socket as io, socket } from './services/socket-io.extension'
import { ChatDbContext } from './services/database.service'
import { Socket } from 'socket.io'
import { SocketMethods } from './models/socket-methods'
import { FetchUsersAction } from './store/app.actions'
import { Store } from '@ngxs/store'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
	constructor(private db: ChatDbContext, private store: Store) {}
	ngAfterViewInit(): void {
		this.db.getUsers().then((u) => this.initSocket(u))
	}
	private readonly initSocket = (u) => {
		io.on('connect', (s: Socket) => {
			socket.emit('syncUsers', u)
			console.log('connected')
			io.on(SocketMethods.USER_SYNCED, async (p) => {
				console.log(p)
				await this.db
					.syncUsers(p)
					.then(() => this.store.dispatch(new FetchUsersAction()))
			})
		})
	}
}
