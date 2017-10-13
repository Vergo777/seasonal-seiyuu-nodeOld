import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import orderBy from 'lodash/orderBy';

class ImageGrid extends React.Component {
    constructor(props) {
        super(props); 
    }

    createArrayOfGalleryItems = (currentSeasonSeiyuuArray) => {
        const gridElementStyle = {
            margin: 20
        };

        const captionStyle = {
            marginTop: 10,
        }

        return currentSeasonSeiyuuArray.map(function(currentSeiyuuDetails, index) {
            return(
                <Col md={3} key={index}>
                    <div className="gridElement" style={gridElementStyle}>
                        <Link to={"/seiyuu/" + currentSeiyuuDetails.id}>
                            <div className="gridImage">
                                <Image className="center-block" src={currentSeiyuuDetails.image} rounded responsive 
                                    onError={(event)=>event.target.setAttribute("src","https://myanimelist.cdn-dena.com/images/characters/14/295062.jpg")}/>
                            </div>
                        </Link>
                        <div className="text-center caption" style={captionStyle}>
                            <h3>{currentSeiyuuDetails.name}</h3>
                            <p>{"Playing " + currentSeiyuuDetails.currentSeasonRolesArray.length + " character(s) this season"}</p>
                        </div>
                    </div>
                </Col>
            )
        });
    }

    render() {
        const currentSeasonSeiyuuArray = orderBy(this.props.currentSeasonSeiyuuArray, function(currentSeiyuuObject) {
            return currentSeiyuuObject.currentSeasonRolesArray.length;
        }, 'desc'); 

        return(
            <Row>
                {this.createArrayOfGalleryItems(currentSeasonSeiyuuArray)}
            </Row>   
        )
    }
}

export default ImageGrid;