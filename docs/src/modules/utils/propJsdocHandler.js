import { parse as parseDoctrine } from 'doctrine';

/**
 * parses JSDOC of propTypes
 */
export default function propJsdocHandler(documentation) {
  const { props } = documentation.toObject();

  Object.keys(props).forEach(propName => {
    const descriptor = documentation.getPropDescriptor(propName);
    const parsed = parseDoctrine(descriptor.description, {
      sloppy: true,
    });

    descriptor.description = parsed.description;
    descriptor.tags = parsed.tags;
  });
}
