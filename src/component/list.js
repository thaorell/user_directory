import React from 'react'
import './fonts.css'
import './styles.css'
import { Table, TableHeader, TableBody, textCenter, } from '@patternfly/react-table'
  
class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            list: [],
            columns: ['Name', 'Username', 'Email', 'Address']
        };
    }

    componentDidMount() {
        fetch("http://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result
                    });
                },
                // error handling
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, list } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            const { columns } = this.state
            let rows = []
            list.map(function(user){
                rows.push({
                    cells: [
                        <div><a className='name-link' href={"/users/" + user.id}>{ user.name }</a></div>,
                        user.username,
                        user.email,
                        user.address.suite + ", " +
                            user.address.street + ", " +
                            user.address.city + ", " +
                            user.address.zipcode,
                    ]
                });
            })
            return (
            <Table aria-label="Simple Table" cells={columns} rows={rows}>
                <TableHeader />
                <TableBody />
              </Table>
            );
        }
    }
}

export default ListComponent;