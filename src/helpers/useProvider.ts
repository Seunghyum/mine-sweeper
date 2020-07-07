import { createContext } from 'react'

import { RootStoreType } from '~stores/index'

export const StoreContext = createContext<RootStoreType>({} as RootStoreType)
export const StoreProvider = StoreContext.Provider
