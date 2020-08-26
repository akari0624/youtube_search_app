import styled from 'styled-components'

export const WrapperToPositioned = styled.div`
  position: relative;
  z-index: 8000;
`

export const PopoverWrapper = styled.div`
	position: fixed;
  transform: ${props => `translate3d(${props.top || 0}px, ${props.left || 0}px, 20px);`};
  display: ${props => props.isShow ? 'block' : 'none'};
	right: ${props => (props.onRightEdge && '6px')};
  transform: ${({offsetUpPX}) => `translate3d(0px, ${offsetUpPX ? `-${offsetUpPX}px` : '0px'}, 20px);`};
`

export const PointUpTriangle = styled.div`
  position: absolute;
  top: -8px;
  right: ${props => (props.onRightEdge && `7px`)};
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 7.5px 13.0px 7.5px;
  border-color: ${props => `transparent transparent ${props.color || '#FFFFFF'} transparent;`};
  /* right: ${props => (props.onRightEdge && `5px`)};
  top: */
`

export const TransparentWholeWindowLightBox = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  opacity: 0;
  display: ${props => props.isShow ? 'block' : 'none'}
`
