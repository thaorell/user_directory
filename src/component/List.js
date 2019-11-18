import React from 'react'
import './styles.css'
import { Table, TableHeader, TableBody, textCenter, } from '@patternfly/react-table'
import PropTypes from 'prop-types';

class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            columns: ['Name', 'Username', 'Email', 'Address'], // columns is always static
            isLoaded: (this.props.list !== [])
        };
    }


    render() {
        const { list } = this.props
        const { columns } = this.state
        let rows = []

        // grab information from list of users and put them in row cells before PF4 table rendering
        list.map(function (user) {
            rows.push({
                cells: [
                    <div id={'name-' + user.id}><a className='name-link' href={"/users/" + user.id}>{user.name}</a></div>,
                    <div id={'username-' + user.id}>{user.username}</div>,
                    <div id={'email-' + user.id}>{user.email}</div>,
                    <div id={'address-' + user.id}>{user.address.suite + ", " +
                        user.address.street + ", " +
                        user.address.city + ", " +
                        user.address.zipcode}</div>,
                ]
            });
        })

        // Parse rows and columns into PF4 
        return (
            <Table aria-label="Table" cells={columns} rows={rows}>
                <TableHeader />
                <TableBody />
            </Table>
        );
    }
}
ListComponent.propTypes = {
    list: PropTypes.array.isRequired
}

export default ListComponent;