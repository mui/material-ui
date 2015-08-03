var ReactInstanceMap = require("react/lib/ReactInstanceMap");
var ReactLifeCycle = require("react/lib/ReactLifeCycle");
var ReactNativeComponent = require("react/lib/ReactNativeComponent");
var ReactReconciler = require("react/lib/ReactReconciler");

var emptyObject = require("react/lib/emptyObject");
var invariant = require("react/lib/invariant");
var warning = require("react/lib/warning");

var ReactCompositeComponentMixin = require('react/lib/ReactCompositeComponent').Mixin;

var {mountComponent, updateComponent} = ReactCompositeComponentMixin;
var nextMountID = 1;


ReactCompositeComponentMixin.mountComponent = function(rootID, transaction, context) {
  this._context = context;
  this._mountOrder = nextMountID++;
  this._rootNodeID = rootID;

  var publicProps = this._processProps(this._currentElement.props);
  var publicContext = this._processContext(context);

  var Component = ReactNativeComponent.getComponentClassForElement(
    this._currentElement
  );

  // Initialize the public class
  var inst = new Component(publicProps, publicContext);
  // These should be set up in the constructor, but as a convenience for
  // simpler class abstractions, we set them up after the fact.
  inst.props = publicProps;
  inst.context = publicContext;
  inst.refs = emptyObject;

  this._instance = inst;

  // Store a reference from the instance back to the internal representation
  ReactInstanceMap.set(inst, this);

  if ("production" !== process.env.NODE_ENV) {
    // Since plain JS classes are defined without any special initialization
    // logic, we can not catch common errors early. Therefore, we have to
    // catch them here, at initialization time, instead.
    ("production" !== process.env.NODE_ENV ? warning(
      !inst.getInitialState ||
      inst.getInitialState.isReactClassApproved,
      'getInitialState was defined on %s, a plain JavaScript class. ' +
      'This is only supported for classes created using React.createClass. ' +
      'Did you mean to define a state property instead?',
      this.getName() || 'a component'
    ) : null);
    ("production" !== process.env.NODE_ENV ? warning(
      !inst.propTypes,
      'propTypes was defined as an instance property on %s. Use a static ' +
      'property to define propTypes instead.',
      this.getName() || 'a component'
    ) : null);
    ("production" !== process.env.NODE_ENV ? warning(
      !inst.contextTypes,
      'contextTypes was defined as an instance property on %s. Use a ' +
      'static property to define contextTypes instead.',
      this.getName() || 'a component'
    ) : null);
    ("production" !== process.env.NODE_ENV ? warning(
      typeof inst.componentShouldUpdate !== 'function',
      '%s has a method called ' +
      'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
      'The name is phrased as a question because the function is ' +
      'expected to return a value.',
      (this.getName() || 'A component')
    ) : null);
  }

  var initialState = inst.state;
  if (initialState === undefined) {
    inst.state = initialState = null;
  }
  ("production" !== process.env.NODE_ENV ? invariant(
    typeof initialState === 'object' && !Array.isArray(initialState),
    '%s.state: must be set to an object or null',
    this.getName() || 'ReactCompositeComponent'
  ) : invariant(typeof initialState === 'object' && !Array.isArray(initialState)));

  this._pendingStateQueue = null;
  this._pendingReplaceState = false;
  this._pendingForceUpdate = false;

  var renderedElement;

  var previouslyMounting = ReactLifeCycle.currentlyMountingInstance;
  ReactLifeCycle.currentlyMountingInstance = this;
  try {
    if (inst.componentWillMount) {
      inst.componentWillMount();
      // When mounting, calls to `setState` by `componentWillMount` will set
      // `this._pendingStateQueue` without triggering a re-render.
      if (this._pendingStateQueue) {
        inst.state = this._processPendingState(inst.props, inst.context);
      }
    }

    renderedElement = this._renderValidatedComponent();
  } finally {
    ReactLifeCycle.currentlyMountingInstance = previouslyMounting;
  }

  this._renderedComponent = this._instantiateReactComponent(
    renderedElement,
    this._currentElement.type // The wrapping type
  );

  var markup = ReactReconciler.mountComponent(
    this._renderedComponent,
    rootID,
    transaction,
    this._processChildContext(context)
  );
  if (inst.componentDidMount) {
    transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
  }

  return markup;
};

ReactCompositeComponentMixin.updateComponent = function(
  transaction,
  prevParentElement,
  nextParentElement,
  prevUnmaskedContext,
  nextUnmaskedContext
) {
  var inst = this._instance;

  var nextContext = inst.context;
  var nextProps = inst.props;

  // Distinguish between a props update versus a simple state update
  if (prevParentElement !== nextParentElement) {
    nextContext = this._processContext(nextUnmaskedContext);
    nextProps = this._processProps(nextParentElement.props);

    // An update here will schedule an update but immediately set
    // _pendingStateQueue which will ensure that any state updates gets
    // immediately reconciled instead of waiting for the next batch.

    if (inst.componentWillReceiveProps) {
      inst.componentWillReceiveProps(nextProps, nextContext);
    }
  }

  var nextState = this._processPendingState(nextProps, nextContext);

  var shouldUpdate =
    this._pendingForceUpdate ||
    !inst.shouldComponentUpdate ||
    inst.shouldComponentUpdate(nextProps, nextState, nextContext);

  if ("production" !== process.env.NODE_ENV) {
    ("production" !== process.env.NODE_ENV ? warning(
      typeof shouldUpdate !== 'undefined',
      '%s.shouldComponentUpdate(): Returned undefined instead of a ' +
      'boolean value. Make sure to return true or false.',
      this.getName() || 'ReactCompositeComponent'
    ) : null);
  }

  if (shouldUpdate) {
    this._pendingForceUpdate = false;
    // Will set `this.props`, `this.state` and `this.context`.
    this._performComponentUpdate(
      nextParentElement,
      nextProps,
      nextState,
      nextContext,
      transaction,
      nextUnmaskedContext
    );
  } else {
    // If it's determined that a component should not update, we still want
    // to set props and state but we shortcut the rest of the update.
    this._currentElement = nextParentElement;
    this._context = nextUnmaskedContext;
    inst.props = nextProps;
    inst.state = nextState;
    inst.context = nextContext;
  }
};


console.warn('Applied react-parent-context-patch!');
