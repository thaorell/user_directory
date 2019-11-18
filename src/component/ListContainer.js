import React from 'react'
import './styles.css'
import PropTypes from 'prop-types';
import ListComponent from './List'

// Container component for List
class ListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            list: [],
        };
    }

    // a customized comparator to sort in alphabetically ascending order
    compare(a, b) {
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
    }

    getData(url) {
        // async fetch to get information, sort then put it in list
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    result.sort(this.compare).reverse()
                    this.setState({
                        list: result,
                        isLoaded: true
                    });
                },
                // error handling
                (error) => {
                    this.setState({
                        error: true
                    });
                }
            )
    }
    
    componentDidMount() {
        this.getData(this.props.url)
    }

    render() {
        // call the list
        const { list } = this.state
        return <ListComponent list={list}/>
    }
}

ListContainer.propTypes = {
    url: PropTypes.string.isRequired
}

export default ListContainer;