// @flow
import { Element } from 'react';

/**
 * Workaround due to https://github.com/reactjs/react-docgen/issues/181
 *
 * Moving the type to a separate file allows react-docgen to continue even though
 * specifics of type information is lost due to only gathering local file type
 * information as reported here: https://github.com/reactjs/react-docgen/issues/180
 */
export type PolymorphicComponent = string | Function | Element<*>
