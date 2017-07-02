import React from 'react';
import _ from 'lodash';
import Drawer from 'material-ui/Drawer';
import Logo from './Logo';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import AlbumItem from './AlbumItem';

const propTypes = {
  structure: React.PropTypes.array,
  activeAlbumId: React.PropTypes.string,
  clickMenu: React.PropTypes.func,
  isDocked: React.PropTypes.bool,
  isOpened: React.PropTypes.bool,
  controlMenuOpen: React.PropTypes.func,
};

class MenuBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
    this.handleReqChg = this.handleReqChg.bind(this);
  }

  handleClick(albumId) {
    this.props.clickMenu(albumId);
    this.props.controlMenuOpen(false);
  }

  handleReqChg(open) {
    this.props.controlMenuOpen(open);
  }

  render() {
    const nodes = [];
    const styles = {
      sidemenu: {
        backgroundColor: '#1812A8',
      },
      divider: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
      },
      subheader: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 16,
      },
      listitem: {
        // click on padding area will be missed.
        padding: '0',
      },
    };
    nodes.push(<Divider key={'top-divi'} style={styles.divider} />);
    nodes.push(<a key={'top-a'} href="/about.html">このサイトについて・利用規約</a>);
    _.each(this.props.structure, (grp) => {
      let grpCnt = '';
      if (grp.group_id === 'albums') {
        grpCnt = grp.group_count;
      }
      nodes.push(<Divider key={`divi-${grp.group_id}`} style={styles.divider} />);
      nodes.push(
        <Subheader key={grp.group_id} style={styles.subheader}>
          <span>{grp.group_id}</span>
          <span>{grpCnt}</span>
        </Subheader>
      );
      _.each(grp.listset, (album) => {
        const isActive = album.id === this.props.activeAlbumId;
        let activeStyle = {};
        if (isActive) {
          activeStyle = { backgroundColor: '#3a34ea' };
        }
        nodes.push(
          <ListItem
            key={`${grp.group_id}-${album.id}`}
            style={activeStyle}
            innerDivStyle={styles.listitem}
          >
            <AlbumItem
              key={`${grp.group_id}${album.id}`}
              album={album}
              select={this.handleClick}
            />
          </ListItem>
        );
      });
    });
    return (
      <Drawer
        open={this.props.isOpened}
        docked={this.props.isDocked}
        onRequestChange={this.handleReqChg}
      >
        <Logo />
        <List style={styles.sidemenu}>
          {nodes}
        </List>
      </Drawer>
    );
  }
}

MenuBox.propTypes = propTypes;

export default MenuBox;
