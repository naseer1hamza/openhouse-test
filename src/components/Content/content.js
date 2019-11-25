import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';
import styles from './Content.module.css'
import noImage from './no-image-found.jpg';

class Content extends Component {
    state = {
        communities: [],
        home: [],
        isloaded: true,
    }

    componentDidMount() {

        fetch('https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    communities: json
                })
                console.log(this.state.communities)
            }).catch(function (error) {
                console.log(error);
            })


        fetch('https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes')
            .then(res => res.json())
            .then(json => {
                //console.log(json)
                this.setState({
                    home: json,
                    isloaded: false
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    GetAverage() {
        //console.log(this.state.home);
        for (var i = 0; i < this.state.communities.length; i++) {
            var priceAVG = 0.00;
            var counter = 0;
            var addPrice = { ...this.state.communities }

            for (var j = 0; j < this.state.home.length; j++) {
                if (this.state.communities[i].id == this.state.home[j].communityId) {
                    priceAVG = priceAVG + this.state.home[j].price;
                    counter++
                }
            }
            priceAVG = priceAVG / counter;
            priceAVG = priceAVG.toFixed(2);
            if (isNaN(priceAVG)) {
                priceAVG = 0.00;
            }
            addPrice[i].price = priceAVG;
        }

    }

    render() {
        var { isloaded, communities } = this.state;

        if (isloaded) {
            return <div>loading...</div>
        }
        else {
            this.GetAverage()
            return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>name</th>
                                <th>Group</th>
                                <th>Average Price</th>
                            </tr>
                            {communities.sort((a, b) => a.group.localeCompare(b.group))
                                .map(item => (
                                    <tr key={item.id} >
                                        <td>
                                            <img alt="" src={item.imgUrl == "" ? noImage : item.imgUrl} />
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>

                                        <td>
                                            {item.group}
                                        </td>
                                        <td>
                                            {item.price == 0 ? 'Average not available' : <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />}

                                        </td>
                                    </tr>
                                ))}
                        </thead>
                    </table>
                </div>
            );
        }

    }
}

export default Content;