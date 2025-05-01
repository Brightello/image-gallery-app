import React from "react"

function Icon({ IconComponent, size, color }) {
  return (
    <>
      <IconComponent size={size} color={color ? color : ""} />
    </>
  )
}

export default Icon
