import React from 'react';
import appBarCode from '!raw!material-ui/lib/app-bar';
import CodeExample from '../../code-example/code-example';
import PropTypeDescription from '../../PropTypeDescription';
import AppBarExampleIcon from '../../AppBar/ExampleIcon';
import appBarExampleIconCode from '!raw!../../AppBar/ExampleIcon';
import AppBarExampleIconButton from '../../AppBar/ExampleIconButton';
import appBarExampleIconButtonCode from '!raw!../../AppBar/ExampleIconButton';
import AppBarExampleIconMenu from '../../AppBar/ExampleIconMenu';
import appBarExampleIconMenuCode from '!raw!../../AppBar/ExampleIconMenu';
import AppBarExampleWaterfallOptimized from '../../AppBar/ExampleWaterfallOptimized';
import appBarExampleWaterfallOptimizedCode from '!raw!../../AppBar/ExampleWaterfallOptimized';
import AppBarExampleWaterfall from '../../AppBar/ExampleWaterfall';
import appBarExampleWaterfallCode from '!raw!../../AppBar/ExampleWaterfall';
import MarkdownElement from '../../MarkdownElement';
import appBarReadmeText from '../../AppBar/README';
import Toggle from 'toggle';

export default class AppBarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waterfallVisible: false,
      waterfallOptimized: true,
    };
  }

  render() {
    const styles = {
      toggle: {
        maxWidth: 250,
      },
    };
    return (
      <div>
        {
          this.state.waterfallVisible ?
            this.state.waterfallOptimized ?
            <AppBarExampleWaterfallOptimized onBack={this.onWaterfallBack}/>
              :
            <AppBarExampleWaterfall onBack={this.onWaterfallBack}/>
            :
            null
        }
        <MarkdownElement text={appBarReadmeText} />
        <CodeExample code={appBarExampleIconCode}>
          <AppBarExampleIcon />
        </CodeExample>
        <CodeExample code={appBarExampleIconButtonCode}>
          <AppBarExampleIconButton />
        </CodeExample>
        <CodeExample code={appBarExampleIconMenuCode}>
          <AppBarExampleIconMenu />
        </CodeExample>
        <CodeExample code={
          this.state.waterfallOptimized ? appBarExampleWaterfallOptimizedCode : appBarExampleWaterfallCode
        }>
          <Toggle
            label="View Waterfall example"
            defaultToggled={this.state.waterfallVisible}
            onToggle={this.onWaterfallToggle}
            style={styles.toggle}/>
          <Toggle
            label="Optimized waterfall"
            defaultToggled={this.state.waterfallOptimized}
            onToggle={this.onWaterfallOptimizeToggle}
            style={styles.toggle}/>
        </CodeExample>
        <PropTypeDescription code={appBarCode}/>
      </div>
    );
  }

  onWaterfallBack = () => {
    this.setState({waterfallVisible: false});
  }

  onWaterfallToggle = (event, toggled) => {
    this.setState({waterfallVisible: toggled});

    // animated scroll
    function scrollTo(element, to, duration) {
      if (duration <= 0) return;
      let difference = to - element.scrollTop;
      let perTick = difference / duration * 10;

      setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
      }, 10);
    }

    if (toggled) {
      scrollTo(document.body, 0, 1000);
    }
  }

  onWaterfallOptimizeToggle = (event, toggled) => {
    this.setState({waterfallOptimized: toggled});
  }
}
