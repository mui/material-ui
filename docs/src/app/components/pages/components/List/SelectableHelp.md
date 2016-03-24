## Selectable List
Basically three steps are needed:
* enhance `List` with HOC
* decide where to put state
* implement and set valueLink

### Enhance List
Wrapping the `List` component with the higher order component "SelectableEnhance"
enables the clicked `ListItem` to be highlighted.
```javascript
import { SelectableContainerEnhance } from 'material-ui/hoc/selectable-enhance';
.
.
.
let SelectableList = SelectableContainerEnhance(List);
```
### Where to put state
If this component is used in conjunction with flux or redux this is a no-brainer. The callback-handler just has to update the store. Otherwise the state can be held within e.g the parent, but it is to be to considered that each time a `ListItem` is clicked, the state will update and the parent - including it's children - will rerender.

A possible solution for this is to use another hoc. An example can be found in the source-code of docs/src/app/components/pages/components/lists.jsx.
### The valueLink
The prop 'valueLink' of `List` has to be set, to make the highlighting controllable:
```javascript
valueLink={{
    value: this.state.selectedIndex,
    requestChange: this.handleUpdateSelectedIndex}}
```
A sample implementation might look like this.
```javascript
getInitialState() {
 return { selectedIndex: 1 };
},
handleUpdateSelectedIndex(e,index) {
  this.setState({
    selectedIndex: index,
});
```
### Adjust the `ListItem`
The `value` prop on each ListItem has to be set. This makes the item
addressable for the callback.
***
