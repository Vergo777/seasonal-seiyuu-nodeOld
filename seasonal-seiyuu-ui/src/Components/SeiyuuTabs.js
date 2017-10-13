import React from 'react';
import { Row, Tab, Tabs } from 'react-bootstrap';
import CharacterList from './CharacterList';

class SeiyuuTabs extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            key: 1
        }
    }

    handleSelect = (key) => {
        this.setState({key: key});
    } 

    render() {
        const currentSeasonRolesArray = this.props.currentSeasonRolesArray; 
        const overallRolesArray = this.props.overallRolesArray; 

        return(
            <Row>
                <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="seiyuuTabs">
                    <Tab eventKey={1} title="Current season roles"><CharacterList characterArray={currentSeasonRolesArray} /></Tab>
                    <Tab eventKey={2} title="All roles"><CharacterList characterArray={overallRolesArray} /></Tab>
                </Tabs>
            </Row>
        );
    };
}

export default SeiyuuTabs; 