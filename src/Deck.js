import React, { Component } from "react";
import axios from "axios";
import Card from './Card'
import './Deck.css'
let API_BASE_URL = "https://www.deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawnCard: [],
    };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: response.data });
  }

  async getCard() {
    let deckId = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}/${deckId}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error("No Card is remaining");
      }
      console.log(cardRes);
      let card = cardRes.data.cards[0];
      this.setState((st) => ({
        drawnCard: [
          ...st.drawnCard,
          {
            code: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
  }
  render() {
    let cards = this.state.drawnCard.map(c=>(
        <Card key={c.code} img={c.image} name={c.name}/>
    ))
    return (
      <div>
        <h1>CARD</h1>
        <button onClick={this.getCard}>Get Card</button>
        <div className="deck-card">{cards}</div>
      </div>
    );
  }
}
export default Deck;
