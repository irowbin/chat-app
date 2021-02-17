import { Dexie, Table } from 'dexie'
import { UserModel } from '../models/UserModel'

export class DbBaseExtension extends Dexie {
	// user table
	users: Table<UserModel, number>

	constructor() {
		// create database
		super('chat-app')

		this.version(1).stores({
			// schemas with columns
			users: '++id,displayName,username,password'
		})

		// init table instances
		this.users = this.table('users')
	}
}
