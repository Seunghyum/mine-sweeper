import { useCallback, useState } from 'react'

export default function useForceUpdate(): () => void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, dispatch] = useState<any>(Object.create(null))
  const memoizedDispatch = useCallback((): void => {
    dispatch(Object.create(null))
  }, [dispatch])

  return memoizedDispatch
}
