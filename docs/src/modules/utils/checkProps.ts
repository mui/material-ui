import * as doctrine from 'doctrine';
import { PropDescriptor, ReactDocgenApi } from 'react-docgen';

export interface ReactApi extends ReactDocgenApi {
  EOL: string;
  filename: string;
  forwardsRefTo: string | undefined;
  inheritance: { component: string; pathname: string } | null;
  name: string;
  pagesMarkdown: Array<{ components: string[]; filename: string; pathname: string }>;
  spread: boolean;
  src: string;
  styles: {
    classes: string[];
    globalClasses: Record<string, string>;
    name: string | null;
    descriptions: Record<string, string>;
  };
}

/**
 * Throws if it is invalid.
 * @param prop
 * @param propName
 */
function checkProp(propName: string, prop: PropDescriptor) {
  const { defaultValue, jsdocDefaultValue, description } = prop;

  const renderedDefaultValue = defaultValue?.value.replace(/\r?\n/g, '');
  const renderDefaultValue = Boolean(
    renderedDefaultValue &&
      // Ignore "large" default values that would break the table layout.
      renderedDefaultValue.length <= 150,
  );

  if (description === undefined) {
    throw new Error(`The "${propName}" prop is missing a description.`);
  }

  const annotation = doctrine.parse(description, {
    sloppy: true,
  });

  if (
    annotation.description.trim() === '' ||
    annotation.tags.some((tag) => tag.title === 'ignore')
  ) {
    return;
  }

  if (jsdocDefaultValue !== undefined && defaultValue === undefined) {
    throw new Error(
      `Declared a @default annotation in JSDOC for prop '${propName}' but could not find a default value in the implementation.`,
    );
  } else if (jsdocDefaultValue === undefined && defaultValue !== undefined && renderDefaultValue) {
    const shouldHaveDefaultAnnotation =
      // Discriminator for polymorphism which is not documented at the component level.
      // The documentation of `component` does not know in which component it is used.
      propName !== 'component';

    if (shouldHaveDefaultAnnotation) {
      throw new Error(`JSDOC @default annotation not found for '${propName}'.`);
    }
  } else if (jsdocDefaultValue !== undefined) {
    // `defaultValue` can't be undefined or we would've thrown earlier.
    if (jsdocDefaultValue.value !== defaultValue!.value) {
      throw new Error(
        `Expected JSDOC @default annotation for prop '${propName}' of "${jsdocDefaultValue.value}" to equal runtime default value of "${defaultValue?.value}"`,
      );
    }
  }
}

export default function checkProps(reactAPI: ReactApi) {
  Object.entries(reactAPI.props).forEach(([propName, propDescriptor]) => {
    checkProp(propName, propDescriptor);
  });
}
