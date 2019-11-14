import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Title } from '@patternfly/react-core';
import { Grid, GridItem } from '@patternfly/react-core';
import './styles.css'

import ErrorBoundary from './error'

class DetailsComponent extends React.Component {
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

    componentDidMount() {
        fetch("http://jsonplaceholder.typicode.com/users")
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
                        company: item.company
                    })
                } else {
                    this.setState({
                        error: true
                    })
                    throw new Error("USER NOT FOUND")
                }
            })
    }

    render() {
        const { name, email, address, username, phone, website, company, error } = this.state
        if (error) {
            throw new Error("USER NOT FOUND")
        } else {
            let address_string = ""
            if (address) {
                address_string = address.suite + ", "
                    + address.street + ", "
                    + address.city + ", "
                    + address.zipcode;
            }

            let company_name, catch_phrase, bs
            if (company) {
                company_name = company.name
                catch_phrase = company.catchPhrase
                bs = company.bs
            }

            return (
                <Card
                    className='card'>
                    <CardHeader>
                        <Title headingLevel="h3" size="2xl">
                            {name}
                        </Title>
                    </CardHeader>
                    <Grid className='grid' gutter='md'>
                        <GridItem span={4}>Email:</GridItem>
                        <GridItem span={8}>{email}</GridItem>
                        <GridItem span={4}>Username:</GridItem>
                        <GridItem span={8}>{username}</GridItem>
                        <GridItem span={4}>Address:</GridItem>
                        <GridItem span={8}>{address_string}</GridItem>
                        <GridItem span={4}>Phone:</GridItem>
                        <GridItem span={8}>{phone}</GridItem>
                        <GridItem span={4}>Website: </GridItem>
                        <GridItem span={8}>{website}</GridItem>
                        <GridItem span={4} rowSpan={3}>Company Information:</GridItem>
                        <GridItem span={3}>Company Name:</GridItem>
                        <GridItem span={5}>{company_name}</GridItem>
                        <GridItem span={3}>Catch Phrase:</GridItem>
                        <GridItem span={5}>{catch_phrase}</GridItem>
                        <GridItem span={3}>BS:</GridItem>
                        <GridItem span={5}>{bs}</GridItem>
                    </Grid>
                </Card>
            )
        }
            
    }
}

export default DetailsComponent