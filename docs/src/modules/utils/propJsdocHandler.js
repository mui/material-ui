import { parse as parseDoctrine } from 'doctrine';

export default function propJsdocHandler(documentation, componentDefinition) {
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
