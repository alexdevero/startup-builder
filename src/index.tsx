import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'

import { BoardBuild } from './views/board-build'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #4bcffa;
  }
`

const Page = () => (<>
  <BoardBuild />

  <GlobalStyle />
</>)

ReactDOM.render(<Page />, document.getElementById('root'))
