import React from 'react';
import { Row } from 'react-bootstrap';
import ImageGrid from './ImageGrid';

class HomePage extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            currentSeasonSeiyuuArray: []
        }
    };

    componentDidMount() {
        this.getCurrentSeasonSummary(); 
    }

    getCurrentSeasonSummary = () => {
        const that = this; 
        fetch('/currentSeasonSummary')
        .then(function(response) {
            if(response.status > 400) {
                throw new Error("Problem with fetching current season summary");
            }

            return response.json();
        }).then(function(jsonData) {
            that.setState({
                currentSeasonSeiyuuArray: jsonData
            });
        });
    }

    render() {
        const searchValue = this.props.searchValue; 
        let currentSeasonSeiyuuArray = this.state.currentSeasonSeiyuuArray; 

        let filteredcurrentSeasonSeiyuuArray = currentSeasonSeiyuuArray.filter(function(currentSeiyuuObject) {
            return currentSeiyuuObject.name.toLowerCase().includes(searchValue.toLowerCase()); 
        });

        return(
            <Row>
                <ImageGrid currentSeasonSeiyuuArray={filteredcurrentSeasonSeiyuuArray} />
            </Row>    
        ); 
    }
};

export default HomePage;