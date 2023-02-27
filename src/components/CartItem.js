import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import mobile from '../images/mobile.png';
import icons from '../icons';
import {
  removeItem, decrease, increase,
} from '../features/cart/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { ChevronUp, ChevronDown } = icons;
  const {
    id, title, price, amount,
  } = item;
  return (
    <article className="cart-item">
      <img src={mobile} alt="title" />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">
          $
          {price}
        </h4>
        <button type="button" className="remove-btn" onClick={() => dispatch(removeItem(id))}>remove</button>
      </div>
      <div>
        <button type="button" className="amount-btn" onClick={() => dispatch(increase(id))}>
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          type="button"
          className="amount-btn"
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease(id));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
