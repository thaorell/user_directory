import React from 'react'
import './styles.css'
import PropTypes from 'prop-types';
import ListComponent from './List'

class ListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            list: [],
        };
    }

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
        const { list } = this.state
        return <ListComponent list={list}/>
    }
}

ListContainer.propTypes = {
    url: PropTypes.string.isRequired
}

export default ListContainer;