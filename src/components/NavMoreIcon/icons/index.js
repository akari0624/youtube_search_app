import React from 'react'
import PropTypes from 'prop-types'


export const HorizontalThreeDots = ({dotColor}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="30"
		height="30"
		viewBox="0 0 30 30"
	>
		<path
			fill={dotColor}
			fillRule="evenodd"
			d="M6.5 12C7.88 12 9 13.12 9 14.5S7.88 17 6.5 17 4 15.88 4 14.5 5.12 12 6.5 12zm8 0c1.38 0 2.5 1.12 2.5 2.5S15.88 17 14.5 17 12 15.88 12 14.5s1.12-2.5 2.5-2.5zm9 0c1.38 0 2.5 1.12 2.5 2.5S24.88 17 23.5 17 21 15.88 21 14.5s1.12-2.5 2.5-2.5z"
		/>
	</svg>
)
HorizontalThreeDots.propTypes = {
  dotColor: PropTypes.string,
}

HorizontalThreeDots.defaultProps = {
  dotColor: '#FFF',
}
