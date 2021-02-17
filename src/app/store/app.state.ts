import { Action, State, StateContext } from '@ngxs/store'
import { Injectable } from '@angular/core'
import { AppStateModel, initialState } from './app.state.model'
import {
	FetchUsersAction,
	LoginAction,
	LogoutAction,
	RegisterAction
} from './app.actions'
import { ChatDbContext } from '../services/database.service'
import { socket } from '../services/socket-io.extension'
import { SocketMethods } from '../models/socket-methods'

@Injectable()
@State<AppStateModel>({
	name: 'appState',
	defaults: initialState
})
export class AppState {
	constructor(private db: ChatDbContext) {}

	// register user in indexed db
	@Action(RegisterAction)
	async r(ctx: StateContext<AppStateModel>, a: RegisterAction): Promise<any> {
		const exist = await this.db.findUserByEmail(a.payload.username)
		if (exist) {
			ctx.patchState({ isUser: 'EXIST' })
			return
		}
		const id = await this.db.addUser(a.payload)
		const user = await this.db.getUser(id)
    await this.db.getUsers().then(u=> socket.emit(SocketMethods.SYNC_USERS, u))
		ctx.patchState({ user, isUser: 'AVAILABLE' })

		setTimeout(() => ctx.patchState({ isUser: undefined }), 500)
	}

	// get an user from indexed db
	@Action(LoginAction)
	async l(ctx: StateContext<AppStateModel>, a: LoginAction): Promise<any> {
		ctx.patchState({ user: undefined, isUser: undefined })
		const user = await this.db.findUserByEmail(a.payload.username)
		if (user && atob(user.password ?? '') === a.payload.password) {
			ctx.patchState({ user, isUser: 'AVAILABLE' })
			return
		} else {
			ctx.patchState({ user: undefined, isUser: 'NOT_FOUND' })
		}
	}

	// get all user from indexed db
	@Action(FetchUsersAction)
	async u(
		ctx: StateContext<AppStateModel>,
		a: FetchUsersAction
	): Promise<any> {
		const users = await this.db.getUsers()
		ctx.patchState({ users })
	}

	// get all user from indexed db
	@Action(LogoutAction)
	async o(ctx: StateContext<AppStateModel>): Promise<any> {
		ctx.patchState({ user: undefined, isUser: undefined })
	}
}
