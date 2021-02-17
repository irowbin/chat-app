import { UserModel } from '../models/UserModel'

/**
 * Application state model
 */
export interface AppStateModel {
	/**
	 * An user info to share across application
	 */
	user: Partial<UserModel>

	/**
	 * User probability action types used to identify user status after action invoked.
	 */
	isUser: 'EXIST' | 'AVAILABLE' | 'NOT_FOUND' | undefined

	/**
	 * Collection of users
	 */
	users: Partial<UserModel[]>
}

/**
 * Initial state for store
 */
export const initialState: AppStateModel = {
	user: {},
	isUser: undefined,
	users: []
}
