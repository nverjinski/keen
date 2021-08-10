import React, { Component } from 'react';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';
import { DataGrid } from '@material-ui/data-grid';

class Cards extends Component {
  static propTypes = {
    cards: PropTypes.array,
  };
  static defaultProps = {
    cards: [],
  };

  constructor(props) {
    super(props);
    const { cards } = this.props;
    const sortModel = JSON.parse(window.localStorage.getItem('sortModel'));

    const columns = [
      { field: 'name', headerName: 'Name', width: 250 },
      { field: 'score', headerName: 'Score', width: 150 },
      { field: 'cmc', headerName: 'CMC', width: 150 },
    ];
    const rows = this.generateRows(cards);
    this.state = {
      columns,
      rows,
      sortModel,
    };
  };

  generateRows = (cards) => {
    const rows = cards.map((card, index) => {
      return {
        id: index,
        name: card.name,
        score: card.score,
        cmc: card.cmc,
      };
    });
    return rows;
  };

  componentDidUpdate(prevProps) {
    const { cards } = this.props;
    if (!equal(prevProps.cards, cards)) {
      const rows = this.generateRows(cards);
      this.setState({
        rows,
      });
    }
  };

  handleSortModelChange = (sortModel) => {
    window.localStorage.setItem('sortModel', JSON.stringify(sortModel));
    this.setState({
      sortModel,
    });
  };

  render() {
    const { rows, columns, sortModel } = this.state;
    return (
      <div style={{ height: 500, width: '50%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={this.handleSortModelChange}
          disableSelectionOnClick
        />
      </div>
    )
  };
};

export default Cards;