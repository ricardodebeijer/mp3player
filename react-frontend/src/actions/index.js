import * as PlayerActions from './player'
import * as PlaylistActions from './playlist'
import * as AdminActions from './admin'
import * as AuthenticationActions from './authentication'

export const ActionCreators = Object.assign({},
    PlayerActions,
    PlaylistActions,
    AdminActions,
    AuthenticationActions,
);
