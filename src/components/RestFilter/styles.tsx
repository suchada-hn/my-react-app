import styled from 'styled-components'
import { breakpoints } from 'styles/breakpoints'

export const Form = styled.form`

	display: flex;
	justify-content: center;
	max-width: 542px;
	
	margin: 0px auto;
	
	box-sizing: border-box;
	


	@media (min-width: ${breakpoints.tablet}) {
		max-width: ${breakpoints.tablet};
	}

	@media (min-width: ${breakpoints.desktop}) {
		max-width: 1010px;
	}
`

export const Label = styled.label`
	display: inline-block;
	margin-right: 16px;
	flex-basis: 25%;

	&:last-of-type {
		margin-right: 0;
	}
`

