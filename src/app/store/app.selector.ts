import { createSelector } from '@ngxs/store'
import { AppState } from './app.state'
import { AppStateModel } from './app.state.model'

/**
 * Application selectors. selects slice of state by provided  static key
 */
export class AppSelector {
	static sliceOf<K extends keyof AppStateModel>(
		stateKey: K
	): (state: AppStateModel) => AppStateModel[K] {
		return createSelector(
			[AppState],
			(state: AppStateModel) => state[stateKey] // by doing so, we can have its type when selecting.
		)
	}
}
