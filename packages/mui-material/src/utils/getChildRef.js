export default function getChildRef(children) {
  // 'ref' is passed as prop in React 19, whereas 'ref' is directly attached to children in React 18
  // below check is to ensure 'ref' is accessible in both cases
  return Object.keys(children.props).includes('ref') ? children.props.ref : children.ref;
}
