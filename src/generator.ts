import * as t from './types';
import _ from 'lodash';

export interface GenerateOptions {
	/**
	 * Enable/disable the default sorting (ascending) or provide your own sort function
	 * @default true
	 */
	sortProptypes?: boolean | ((a: t.PropTypeNode, b: t.PropTypeNode) => 0 | -1 | 1);

	/**
	 * The name used when importing prop-types
	 * @default 'PropTypes'
	 */
	importedName?: string;

	/**
	 * Enable/disable including JSDoc comments
	 * @default true
	 */
	includeJSDoc?: boolean;

	/**
	 * Control which PropTypes are included in the final result
	 * @param proptype The current PropType about to be converted to text
	 */
	shouldInclude?(proptype: t.PropTypeNode): boolean | undefined;

	/**
	 * A comment that will be added to the start of the PropTypes code block
	 * @example
	 * foo.propTypes = {
	 *  // Comment goes here
	 * }
	 */
	comment?: string;
}

/**
 * Generates code from the given node
 * @param node The node to convert to code
 * @param options The options used to control the way the code gets generated
 */
export function generate(node: t.Node | t.PropTypeNode[], options: GenerateOptions = {}): string {
	const {
		sortProptypes = true,
		importedName = 'PropTypes',
		includeJSDoc = true,
		shouldInclude,
	} = options;

	function jsDoc(node: t.PropTypeNode | t.LiteralNode) {
		if (!includeJSDoc || !node.jsDoc) {
			return '';
		}
		return `/**\n* ${node.jsDoc.split(/\r?\n/).reduce((prev, curr) => prev + '\n* ' + curr)}\n*/\n`;
	}

	if (Array.isArray(node)) {
		let propTypes = node;

		if (typeof sortProptypes === 'function') {
			propTypes = propTypes.sort(sortProptypes);
		} else if (sortProptypes === true) {
			propTypes = propTypes.sort((a, b) => a.name.localeCompare(b.name));
		}

		let filteredNodes = node;
		if (shouldInclude) {
			filteredNodes = filteredNodes.filter((x) => shouldInclude(x));
		}

		return filteredNodes
			.map((prop) => generate(prop, options))
			.reduce((prev, curr) => `${prev}\n${curr}`);
	}

	if (t.isProgramNode(node)) {
		return node.body
			.map((prop) => generate(prop, options))
			.reduce((prev, curr) => `${prev}\n${curr}`);
	}

	if (t.isComponentNode(node)) {
		const comment =
			options.comment &&
			`// ${options.comment.split(/\r?\n/gm).reduce((prev, curr) => `${prev}\n// ${curr}`)}\n`;

		return `${node.name}.propTypes = {\n${comment ? comment : ''}${generate(
			node.types,
			options
		)}\n}`;
	}

	if (t.isPropTypeNode(node)) {
		let isOptional = false;
		let propType = { ...node.propType };

		if (t.isUnionNode(propType) && propType.types.some(t.isUndefinedNode)) {
			isOptional = true;
			propType.types = propType.types.filter(
				(prop) => !t.isUndefinedNode(prop) && !(t.isLiteralNode(prop) && prop.value === 'null')
			);
			if (propType.types.length === 1 && t.isLiteralNode(propType.types[0]) === false) {
				propType = propType.types[0];
			}
		}

		return `${jsDoc(node)}"${node.name}": ${generate(propType, options)}${
			isOptional ? '' : '.isRequired'
		},`;
	}

	if (t.isInterfaceNode(node)) {
		return `${importedName}.shape({\n${generate(node.types, {
			...options,
			shouldInclude: undefined,
		})}\n})`;
	}

	if (t.isFunctionNode(node)) {
		return `${importedName}.func`;
	}

	if (t.isStringNode(node)) {
		return `${importedName}.string`;
	}

	if (t.isBooleanNode(node)) {
		return `${importedName}.bool`;
	}

	if (t.isNumericNode(node)) {
		return `${importedName}.number`;
	}

	if (t.isLiteralNode(node)) {
		return `${importedName}.oneOf([${jsDoc(node)}${node.value}])`;
	}

	if (t.isObjectNode(node)) {
		return `${importedName}.object`;
	}

	if (t.isAnyNode(node)) {
		return `${importedName}.any`;
	}

	if (t.isElementNode(node)) {
		return `${importedName}.${node.elementType}`;
	}

	if (t.isInstanceOfNode(node)) {
		return `${importedName}.instanceOf(${node.instance})`;
	}

	if (t.isArrayNode(node)) {
		if (t.isAnyNode(node.arrayType)) {
			return `${importedName}.array`;
		}

		return `${importedName}.arrayOf(${generate(node.arrayType, options)})`;
	}

	if (t.isUnionNode(node)) {
		let [literals, rest] = _.partition(node.types, t.isLiteralNode);
		literals = _.uniqBy(literals, (x) => x.value);
		rest = _.uniqBy(rest, (x) => (t.isInstanceOfNode(x) ? `${x.type}.${x.instance}` : x.type));

		literals = literals.sort((a, b) => a.value.localeCompare(b.value));

		const nodeToStringName = (obj: t.Node): string => {
			if (t.isInstanceOfNode(obj)) {
				return `${obj.type}.${obj.instance}`;
			} else if (t.isInterfaceNode(obj)) {
				// An interface is PropTypes.shape
				// Use `ShapeNode` to get it sorted in the correct order
				return `ShapeNode`;
			}

			return obj.type;
		};

		rest = rest.sort((a, b) => nodeToStringName(a).localeCompare(nodeToStringName(b)));

		if (literals.find((x) => x.value === 'true') && literals.find((x) => x.value === 'false')) {
			rest.push(t.booleanNode());
			literals = literals.filter((x) => x.value !== 'true' && x.value !== 'false');
		}

		const literalProps =
			literals.length !== 0
				? `${importedName}.oneOf([${literals
						.map((x) => `${jsDoc(x)}${x.value}`)
						.reduce((prev, curr) => `${prev},${curr}`)}])`
				: '';

		if (rest.length === 0) {
			return literalProps;
		}

		if (literals.length === 0 && rest.length === 1) {
			return generate(rest[0], options);
		}

		return `${importedName}.oneOfType([${literalProps ? literalProps + ', ' : ''}${rest
			.map((x) => generate(x, options))
			.reduce((prev, curr) => `${prev},${curr}`)}])`;
	}

	throw new Error(`Nothing to handle node of type "${node.type}"`);
}
