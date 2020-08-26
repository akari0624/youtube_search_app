import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
	WrapperToPositioned,
	PopoverWrapper,
	PointUpTriangle,
	TransparentWholeWindowLightBox
} from './styled'

const Popover = ({
	children,
	CompToRender,
	onRightEdge,
	offsetUpPX,
	...rest
}) => {
	const [isShow, setIsShow] = useState(false)

	return (
		<>
		  {/* 為了在按到Popover有打開的時候，按到Popover以外的區域會把Popover關閉，必須要有這個跟Popover是sibling的Lightbox */}
			<TransparentWholeWindowLightBox
				isShow={isShow}
				onClick={() => {
					setIsShow(false)
				}}
			/>
			<WrapperToPositioned>
				<div
					onClick={() => {
						setIsShow(prev => !prev)
					}}
				>
					{children}
				</div>
				<PopoverWrapper
					isShow={isShow}
					onRightEdge={onRightEdge}
					offsetUpPX={offsetUpPX}
					{...rest}
				>
					<PointUpTriangle onRightEdge={onRightEdge} />

					<CompToRender />
				</PopoverWrapper>
			</WrapperToPositioned>
		</>
	)
}

Popover.propTypes = {}

export default Popover
