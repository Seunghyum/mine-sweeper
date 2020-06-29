import { useContext } from 'react'

import BoardStore from '~stores/board'

import { StoreContext } from './useProvider'

export const useStores = (): BoardStore => useContext(StoreContext)
