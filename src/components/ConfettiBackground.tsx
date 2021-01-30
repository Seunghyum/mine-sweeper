import React, { ReactElement } from 'react'

function ConfettiBackground({ toggle }: { toggle: boolean }): ReactElement {
  return (
    toggle && (
      <div className="ct-wrapper">
        {Array(140)
          .fill(null)
          .map((_, i) => (
            <div className={`confetti-${i}`} />
          ))}
      </div>
    )
  )
}

export default React.memo(ConfettiBackground)
