import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


class Item extends React.Component {
    constructor(props) {
        super(props);

        this.classes = makeStyles((theme) => ({
                root: {
                    minWidth: 275,
                }
            }));
    }

    render() {
        let item = (
            <Card className={this.classes.root} variant="outlined">
                <CardContent>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
                        <Grid item xs>
                            <Typography variant="h5" component="h2" gutterBottom>
                                {this.props.item.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                  required
                                  id="outlined"
                                  label="Count"
                                  variant="outlined"
                                  value={this.props.item.count}
                                  onChange={this.props.onChangeItemCount}
                                />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );

        return item;
    }
}

export default Item;