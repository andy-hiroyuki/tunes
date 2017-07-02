import React from 'react';
import _ from 'lodash';
import Sound from 'react-sound';
import { List, ListItem } from 'material-ui/List';
import TrackItem from './TrackItem';

const propTypes = {
  setId: React.PropTypes.string,
  album: React.PropTypes.object,
  select: React.PropTypes.func,
  playingId: React.PropTypes.string,
  status: React.PropTypes.string,
};

class TrackBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(track) {
    this.props.select(track);
  }

  render() {
    const tracks = this.props.album.tracks;
    const styles = {
      listitem: {
        // click on padding area will be missed.
        padding: '0',
      },
      dummy: {
        height: 64 - 8,
      },
    };
    let nodes = [];
    nodes.push(<div key={'dummy'} style={styles.dummy}></div>);
    _.each(tracks, (t) => {
      const isSelected = (t.id === this.props.playingId);
      const isPlaying = isSelected && (this.props.status === Sound.status.PLAYING);
      nodes.push(
        <ListItem key={t.id} innerDivStyle={styles.listitem}>
          <TrackItem
            track={t}
            select={this.handleClick}
            isPlaying={isPlaying}
          />
        </ListItem>
      );
    });
    return (
      <List>
        {nodes}
      </List>
    );
  }
}

TrackBox.propTypes = propTypes;

export default TrackBox;
