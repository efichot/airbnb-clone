import React, { useContext } from 'react'
import { Menu, Container, Image } from 'semantic-ui-react'
import logo from 'assets/images/logo.png'
import context from '../context'
import { auth } from '../helpers/firebase'

export default function Header () {
  const { dispatch } = useContext(context)

  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
          Project Name
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>
      </Container>
      <Menu.Item
        as='a'
        onClick={async () => {
          await auth.signOut()
          dispatch({ type: 'logout' })
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  )
}
