import EventPluginRegistry from 'react/lib/EventPluginRegistry';
import warning from 'warning';

export default function checkTapEventPlugin() {
  if (EventPluginRegistry && EventPluginRegistry.eventNameDispatchConfigs) {
    warning(EventPluginRegistry.eventNameDispatchConfigs.touchTap,
      `
      The 'react-tap-event-plugin' has not been registered!

      Material-UI requires that you load 'react-tap-event-plugin' and call 'injectTapEventPlugin()' for
      components receive touch events and work properly.

      See https://github.com/zilverline/react-tap-event-plugin for more details.
      `
    );
  }
}
