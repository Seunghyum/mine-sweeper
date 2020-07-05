import { useCallback, useState } from 'react'

export default function useForceUpdate(): () => void {
  const [, dispatch] = useState<any>(Object.create(null))
  const memoizedDispatch = useCallback((): void => {
    dispatch(Object.create(null))
  }, [dispatch])

  return memoizedDispatch
}
