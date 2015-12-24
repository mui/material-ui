// Type definitions for React v0.14 (react-dom)
// Project: http://facebook.github.io/react/
// Definitions by: Asana <https://asana.com>, AssureSign <http://www.assuresign.com>, Microsoft <https://microsoft.com>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="react.d.ts" />

declare namespace __React {
    namespace __DOM {
        function findDOMNode<E extends Element>(instance: ReactInstance): E;
        function findDOMNode(instance: ReactInstance): Element;

        function render<P>(
            element: DOMElement<P>,
            container: Element,
            callback?: (element: Element) => any): Element;
        function render<P, S>(
            element: ClassicElement<P>,
            container: Element,
            callback?: (component: ClassicComponent<P, S>) => any): ClassicComponent<P, S>;
        function render<P, S>(
            element: ReactElement<P>,
            container: Element,
            callback?: (component: Component<P, S>) => any): Component<P, S>;

        function unmountComponentAtNode(container: Element): boolean;

        var version: string;

        function unstable_batchedUpdates<A, B>(callback: (a: A, b: B) => any, a: A, b: B): void;
        function unstable_batchedUpdates<A>(callback: (a: A) => any, a: A): void;
        function unstable_batchedUpdates(callback: () => any): void;

        function unstable_renderSubtreeIntoContainer<P>(
            parentComponent: Component<any, any>,
            nextElement: DOMElement<P>,
            container: Element,
            callback?: (element: Element) => any): Element;
        function unstable_renderSubtreeIntoContainer<P, S>(
            parentComponent: Component<any, any>,
            nextElement: ClassicElement<P>,
            container: Element,
            callback?: (component: ClassicComponent<P, S>) => any): ClassicComponent<P, S>;
        function unstable_renderSubtreeIntoContainer<P, S>(
            parentComponent: Component<any, any>,
            nextElement: ReactElement<P>,
            container: Element,
            callback?: (component: Component<P, S>) => any): Component<P, S>;
    }

    namespace __DOMServer {
        function renderToString(element: ReactElement<any>): string;
        function renderToStaticMarkup(element: ReactElement<any>): string;
        var version: string;
    }
}

declare module "react-dom" {
    import DOM = __React.__DOM;
    export = DOM;
}

declare module "react-dom/server" {
    import DOMServer = __React.__DOMServer;
    export = DOMServer;
}
