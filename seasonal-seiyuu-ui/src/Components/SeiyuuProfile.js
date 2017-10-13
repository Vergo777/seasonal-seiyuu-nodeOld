import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SeiyuuTabs from './SeiyuuTabs';

class SeiyuuProfile extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            seiyuuDetails: {}
        }
    }

    componentDidMount() {
        const seiyuuID = this.props.match.params.id; 
        this.getSeiyuuDetails(seiyuuID);
    }

    getSeiyuuDetails = (seiyuuID) => {
        const that = this;
        fetch('/seiyuuDetails/' + seiyuuID)
        .then(function(response) {
            if(response.status > 400) {
                throw new Error("Problem with fetching seiyuu details");
            }

            return response.json();
        }).then(function(jsonData) {
            that.setState({
                seiyuuDetails: jsonData
            });
        });
    }

    render() {
        const imageDivStyle = {
            margin: 20
        };

        const captionStyle = {
            marginTop: 10,
            fontWeight: 'bold',
            fontSize: 30
        }

        let seiyuuDetails = this.state.seiyuuDetails; 

        return(
            <Row>
                <Col md={4}>
                    <div className="imageDiv" style={imageDivStyle}>
                        <img className="center-block" src={seiyuuDetails.image} />
                        <div className="text-center caption" style={captionStyle}>
                            <h2>{seiyuuDetails.name}</h2>
                        </div>
                    </div>
                </Col>
                <Col md={7}>
                    <div>
                        <SeiyuuTabs currentSeasonRolesArray={seiyuuDetails.currentSeasonRolesArray}
                            overallRolesArray={seiyuuDetails.overallRolesArray}
                        />
                    </div>    
                </Col>
            </Row>    
        );
    }
}

export default SeiyuuProfile;