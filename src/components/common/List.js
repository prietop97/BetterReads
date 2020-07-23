import React from "react";
import PropTypes from "prop-types";

// Here is an example of a reusable list component.
// We are passing all of its functions through props to keep our component clean & testable
// Feel free to add to this component with some more advanced features of your own
const List = ({ LoadingComponent, RenderItems, items, isFetching }) => {
  console.log(items);
  // Here we return a loading component while our request is fetching
  // or we render our list of items from the data we receive from our successful request
  // We can change and swap these out through props!
  return isFetching ? <LoadingComponent /> : <RenderItems data={items} />;
};

export default List;

List.propTypes = {
  LoadingComponent: PropTypes.func.isRequired,
  RenderItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool
};
