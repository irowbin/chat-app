import { io } from 'socket.io-client'
import { environment } from '../../environments/environment'

export const socket = !environment.production ? io('localhost:3000') : io()
