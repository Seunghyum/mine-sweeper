import { useContext } from 'react'

import RootStore from '~stores'

// import BoardStore from '~stores/BoardStore'
import { StoreContext } from './useProvider'

export const useStores = (): RootStore => useContext(StoreContext)
