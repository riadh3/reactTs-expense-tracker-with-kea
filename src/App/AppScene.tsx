import { resetContext, useValues } from 'kea'
import { formsPlugin } from 'kea-forms'
import { routerPlugin } from 'kea-router'
import Layout from '../layouts/GeneralLayout'
import { scenesLogic } from './appLogic'
resetContext({
  plugins: [formsPlugin, routerPlugin],
})

const App = () => {
  const { params, Component } = useValues(scenesLogic)
  return (
    <Layout>
      <Component {...params} />
    </Layout>
  )
}

export default App
