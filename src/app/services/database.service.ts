import { UserModel } from '../models/UserModel'
import { DbBaseExtension } from './db-base.extension'
import { Injectable } from '@angular/core'

/**
 * User Db Context
 */
@Injectable()
export class ChatDbContext extends DbBaseExtension {
	/**
	 * Searches by an user email and returns it if found.
	 *
	 * @param email an email address to search by.
	 */
	findUserByEmail = async (email: string): Promise<UserModel | undefined> =>
		this.users.filter((u) => u.username === email).first()

	/**
	 * Returns all users from the table
	 */
	getUsers = async (): Promise<Array<UserModel>> =>
		await this.users.orderBy('id').reverse().toArray()

	syncUsers = async (payload: UserModel[]): Promise<void> => {
		const users = await this.getUsers()
		const notInLocalUsers = payload
			.filter((u) => !users.some((p) => p.username === u.username))
			.map((u) => ({ ...u, id: undefined }))
		if (notInLocalUsers.some((u) => u)) {
			// it mean there is new data to the end peer so we need to sync locally
			await this.users.bulkAdd(notInLocalUsers)
		}
	}

	/**
	 * Gets an user by ID
	 *
	 * @param id An user ID to search for.
	 */
	getUser = async (id: number): Promise<UserModel  | undefined> =>
		await this.users.get(id)

	/**
	 * Adds an user
	 *
	 * @param payload An user information to add
	 */
	addUser = async (payload: UserModel): Promise<number> =>
		await this.users.add({ ...payload })

	/**
	 * Removes an user from the table
	 *
	 * @param id An user ID to remove for.
	 */
	deleteUser = async (id: number): Promise<number> =>
		this.users.where('employeeId').equals(id).delete()
}
