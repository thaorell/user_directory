import React from "react";
import PropTypes from "prop-types"

import { Card, CardHeader, CardBody, CardFooter, Title } from '@patternfly/react-core';
import { Grid, GridItem } from '@patternfly/react-core';
import './styles.css'

class DetailsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, email, address, username, phone, website, company, error } = this.props
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

DetailsComponent.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    address: PropTypes.any,
    phone: PropTypes.string,
    website: PropTypes.string,
    company: PropTypes.any,
}

export default DetailsComponent