import React from 'react'
import PropTypes from 'prop-types'
import { HorizontalThreeDots } from './icons'



function NavMoreIcon({dotColor, ...rest}) {
	return (
		<span {...rest}>
			<HorizontalThreeDots dotColor={dotColor} />
		</span>
	)
}

NavMoreIcon.propTypes = {
  onClick: PropTypes.func,
}

export default NavMoreIcon
