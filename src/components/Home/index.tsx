import React, { ReactElement } from 'react'
import RestList from 'components/RestList'
import withErrorBoundary from 'hoc/withErrorBoundary'

const Home = (): ReactElement => (
	<main>
		<RestList />
	</main>
)

export default withErrorBoundary(Home)
