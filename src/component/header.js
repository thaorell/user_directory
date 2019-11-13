import React from 'react'
import { PageHeader } from '@patternfly/react-core'
import { renderStylesToNodeStream } from 'emotion-server';
import './styles.css'

const HeaderComponent = () => {
    const logo_props = {
        href: '/',
        onClick: () => console.log('logo clicked'),
        target: '_blank'
      };
    return <PageHeader 
    logo='Home'
    logoProps={logo_props}
    className='header'/>
}

export default HeaderComponent