import React, { Fragment } from 'react';
import {Button, Image, Menu, Dropdown, Header} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const SignedInLinks = (props) => {
  return (
    <Fragment>
      <Menu.Item>
        <Header as='h5' inverted>
          People
        </Header>
      </Menu.Item>
      <Menu.Item>
        <Header as='h5' inverted>
          <Button inverted positive>Create Event</Button>
        </Header>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Image circular size='mini' src='/assets/user.png' alt="logo"/>
          <Dropdown text='Random' pointing className='link item navbar-dropdown'>
            <Dropdown.Menu>
              <Dropdown.Item icon='plus' text='Create Event'/>
              <Dropdown.Item icon='calendar alternate' text='My Event'/>
              <Dropdown.Item icon='users' text='My Community'/>
              <Dropdown.Item icon='user' text='My Profile' onClick={() => props.history.push('/user/123')}/>
              <Dropdown.Item icon='settings' text='Setting'/>
              <Dropdown.Item icon='power' text='Logout'/>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu.Menu>
    </Fragment>
  );
};

export default withRouter(SignedInLinks);
