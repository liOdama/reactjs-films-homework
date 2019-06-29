import { createSelector } from 'reselect';

const typeView = state => state.typeView;

const checkTypeView = createSelector(
  typeView,
  data => data,
);

export default checkTypeView;
