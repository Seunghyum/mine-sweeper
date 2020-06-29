import { createContext } from 'react'

import boardStore from '~stores/board'

export const StoreContext = createContext<boardStore>({} as boardStore)
export const StoreProvider = StoreContext.Provider
