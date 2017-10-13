import React from 'react';
import { Row, Media, Grid } from 'react-bootstrap';
import sortBy from 'lodash/sortBy'; 

class CharacterList extends React.Component {
    constructor(props) {
        super(props); 
    }

    renderCharacterList = (characterArray) => {
        if(!characterArray) {
            return "Sorry, no character data found for this seiyuu!";
        }

        return characterArray.map(function(currentCharacter, index) {
            return(
                <Media.ListItem key={index} className="characterListElement">
                    <Media.Left>
                        <img width={46} height={64} src={currentCharacter.characterThumbnail} alt="Image"/>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>{currentCharacter.characterName}</Media.Heading>
                        <a href={"https://myanimelist.net/anime/" + currentCharacter.seriesID} target="#">
                            <p>{currentCharacter.seriesName}</p>
                        </a>
                    </Media.Body>   
                </Media.ListItem>
            )
        });
    }; 

    render() {
        const characterListStyle = {
            margin: 15
        }

        let characterArray = sortBy(this.props.characterArray, 'characterName');

        return(
            <Grid fluid={true}>
                <Row>
                    <Media.List style={characterListStyle}>
                        {this.renderCharacterList(characterArray)}    
                    </Media.List>
                </Row>
            </Grid>
        );
    };
}

export default CharacterList; 