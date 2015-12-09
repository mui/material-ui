import StylePropable from './style-propable';

export default function(target) {
  target.propTypes = {
    ...StylePropable.propTypes,
    ...target.propTypes,
  };

  target.prototype.mergeStyles = StylePropable.mergeStyles;
  target.prototype.mergeAndPrefix = StylePropable.mergeAndPrefix;
  target.prototype.prepareStyles = StylePropable.prepareStyles;
}
