import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Masonry from '@material-ui/lab/Masonry';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import itemData from './demoData';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 550,
    overflow: 'hidden',
    width: '100%',
  },
  masonryContainer: {
    height: 450,
    overflowY: 'scroll',
    position: 'relative',
    width: '100%',
  },
  card: {
    width: '100%',
    display: 'inline-block',
    marginBottom: theme.spacing(2),
    verticalAlign: 'top',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    position: 'relative',
  },
}));

function MasonryColumns() {
  const classes = useStyles();
  const [columns, setColumns] = React.useState(2);

  const handleChange = (event) => {
    setColumns(Number(event.target.value));
  };

  return (
    <div className={classes.root}>
      <div className={classes.masonryContainer}>
        <Masonry columns={columns}>
          {itemData.map((item, index) => (
            <Card key={`masonry-item-${index}`} className={classes.card}>
              <CardMedia
                className={classes.media}
                image={item.img}
                title={item.title}
              />
              <CardContent>{item.content}</CardContent>
            </Card>
          ))}
        </Masonry>
      </div>
      <FormLabel>columns</FormLabel>
      <RadioGroup
        name="columns"
        aria-label="columns"
        value={columns.toString()}
        onChange={handleChange}
        row
      >
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <FormControlLabel
            key={value}
            value={value.toString()}
            control={<Radio />}
            label={value.toString()}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

export default MasonryColumns;
