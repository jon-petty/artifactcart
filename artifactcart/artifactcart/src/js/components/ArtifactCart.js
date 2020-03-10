import React from 'react';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Item from './Item';


class ArtifactCart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
            ]
        }

        this.lastId = 0;

        this.handleChangeItemCount = this.handleChangeItemCount.bind(this);
        this.handleClickAddItem = this.handleClickAddItem.bind(this);
    }

    itemCount() {
        let itemCount = 0;

        for (let i=0; i<this.state.items.length; i++) {
            itemCount = itemCount + Number(this.state.items[i].count);
        }

        return itemCount;
    }

    handleChangeItemCount(itemId, event) {
        let oldItemsState = this.state.items;

        for (let i=0; i<oldItemsState.length; i++) {
            if (oldItemsState[i].id == itemId) {
                oldItemsState[i].count = event.target.value;

                this.setState({items: oldItemsState});
                break;
            }
        }
    }

    handleClickAddItem() {
        let oldItemsState = this.state.items;

        this.lastId = this.lastId + 1;
        let randomItemName = "Sample Item " + this.lastId + " " + Math.random().toString(36).substring(2, 15);

        oldItemsState.push({id: this.lastId, name: randomItemName, count: "1"})

        this.setState({items: oldItemsState});
    }

    render() {
        let itemList = this.state.items.map((item) => {
                let fragment = (
                        <Item key={item.id} item={item} onChangeItemCount={(event) => {this.handleChangeItemCount(item.id, event);}} />
                    );

                return fragment;
            });

        let helloWorld = (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="xl">
                    <Typography variant="h2" component="h2" gutterBottom>
                        Shopping Cart
                    </Typography>
                    <Button variant="contained" color="primary" onClick={this.handleClickAddItem} data-additem="button">
                        Add Item
                    </Button>
                    {itemList}
                    <Typography variant="h2" component="h2" gutterBottom>
                        Total Items: {this.itemCount()}
                    </Typography>
                </Container>
            </React.Fragment>
        );

        return helloWorld;
    }
}

export default ArtifactCart;