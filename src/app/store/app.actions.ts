import { UserModel } from '../models/UserModel'

/**
 * Sign in an user with cred
 */
export class LoginAction {
	static readonly type = '[App] App User Login'
	constructor(public payload: UserModel) {}
}

/**
 * Sign in an user with cred
 */
export class LogoutAction {
	static readonly type = '[App] App User Logout'
}

/**
 * Register an user
 */
export class RegisterAction {
	static readonly type = '[LOGIN] App User Registration'
	constructor(public payload: UserModel) {}
}

/**
 * Fetch users
 */
export class FetchUsersAction {
	static readonly type = '[APP] Get Users'
}
