import { useContext } from 'react'

import RootStore from '~stores/index'

// import BoardStore from '~stores/BoardStore'
import { StoreContext } from './useProvider'

export const useStores = (): RootStore => useContext(StoreContext)
