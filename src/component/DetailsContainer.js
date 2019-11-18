import React from "react";
import PropTypes from "prop-types"

import './styles.css'
import DetailsComponent from "./Details";

// Container component for Details card
class DetailsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            name: null,
            email: null,
            username: null,
            address: null,
            phone: null,
            website: null,
            company: null
        }
    }

    getData(url) {
        // async fetch call and only grab the one where ID matches url
        fetch(url)
        .then(res => res.json())
        .then((result) => {
            const id = this.props.match.params.id
            const item = result.find(x => x.id == id);
            if (item) {
                this.setState({
                    name: item.name,
                    email: item.email,
                    username: item.username,
                    address: item.address,
                    phone: item.phone,
                    website: item.website,
                    company: item.company,
                    isLoaded: true,
                })
            } else {
                this.setState({
                    error: true
                })
                throw new Error("USER NOT FOUND")
            }
        })
    }
     
    componentDidMount() {
        this.getData(this.props.url)
    }

    render() {
        const { name, email, address, username, phone, website, company, error } = this.state
        return (
            // call the containing child
            <DetailsComponent
                name={name}
                email={email}
                address={address}
                username={username}
                phone={phone}
                website={website}
                company={company}
                error={error}
            />
        )
    }
}

DetailsContainer.propTypes = {
    url: PropTypes.string.isRequired
}

export default DetailsContainer