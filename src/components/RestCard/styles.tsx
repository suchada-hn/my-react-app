import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
	tertiaryTextColor,
	secondaryColor,
	primaryTextColor,
	secondaryTextColor,
	backgroundColor,
} from 'styles/theme'
import { breakpoints } from 'styles/breakpoints'

export const StyledLink = styled(Link)`
	width: 100%;
	display: inline-block;
	background-color: ${secondaryColor};
	border-radius: 20px 0 20px 0;
	text-decoration: none;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0), 0 6px 10px 0 rgba(0, 0, 0, 0.1);
`

export const Img = styled.img`
	width: 100%;
	height: 150px;
	size: 100%;
	border-radius: 20px 0 0 0;

`

export const Title = styled.h2`
padding: 10px;
margin:5px;
	font-size: 24px;
	font-weight: 700;
	color: ${primaryTextColor};

	@media (min-width: ${breakpoints.tablet}) {
		overflow: hidden;
		text-overflow: ellipsis;
	}
`

export const Details = styled.div`
padding: 5px 0 0 15px;
	@media (min-width: ${breakpoints.tablet}) {
		padding: 5px 0 0 15px;
		white-space: nowrap;
	}
`
//description tag
export const Description = styled.p`
	font-size: 14px;
	margin: 0 8px 8px 0;
	color: ${secondaryTextColor};
	

	@media (min-width: ${breakpoints.tablet}) {
		overflow: hidden;
		text-overflow: ellipsis;
		
	}
`

export const Icon = styled.p`
padding: 2px 4px 2px;
margin: 0 8px 8px 15px;
border-radius: 4px;
font-size: 12px;
font-weight: bold;
color: ${tertiaryTextColor};

float: left;
`

export const Genre = styled.p`
	padding: 2px 4px;
	margin: 0 15px 15px 15px;
	border-radius: 4px;
	font-size: 12px;
	font-weight: bold;
	color: ${tertiaryTextColor};
	background-color: ${backgroundColor};
	float: right;
`
