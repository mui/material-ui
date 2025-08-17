import { expect } from 'chai';
import getActiveElement from './getActiveElement';

describe('getActiveElement', () => {
    let mockElement: Element;

    beforeEach(() => {
        mockElement = document.createElement('div');
    });

    describe('basic functionality', () => {
        it('should return active element from document when no root provided', () => {
            Object.defineProperty(document, 'activeElement', {
                value: mockElement,
                writable: true,
            });

            const result = getActiveElement();
            expect(result).to.equal(mockElement);
        });

        it('should return active element from provided root', () => {
            const customRoot = { activeElement: mockElement } as Document;
            const result = getActiveElement(customRoot);
            expect(result).to.equal(mockElement);
        });

        it('should return null when no active element exists', () => {
            const customRoot = { activeElement: null } as Document;
            const result = getActiveElement(customRoot);
            expect(result).to.equal(null);
        });
    });

    describe('SSR compatibility', () => {
        let originalDocument: Document;

        beforeEach(() => {
            originalDocument = global.document;
            Object.defineProperty(global, 'document', {
                value: undefined,
                writable: true,
            });
        });

        afterEach(() => {
            global.document = originalDocument;
        });

        it('should return null when document is undefined', () => {
            const result = getActiveElement();
            expect(result).to.equal(null);
        });
    });

    describe('shadow DOM traversal', () => {
        it('should traverse into shadow root to find active element', () => {
            const shadowElement = document.createElement('div');
            const shadowRoot = shadowElement.attachShadow({ mode: 'open' });
            const activeElement = document.createElement('span');

            shadowRoot.appendChild(activeElement);

            Object.defineProperty(shadowRoot, 'activeElement', {
                value: activeElement,
                writable: true,
            });

            const result = getActiveElement(shadowRoot);
            expect(result).to.equal(activeElement);
        });

        it('should handle nested shadow DOM', () => {
            const outerDiv = document.createElement('div');
            const outerShadow = outerDiv.attachShadow({ mode: 'open' });

            const innerDiv = document.createElement('div');
            const innerShadow = innerDiv.attachShadow({ mode: 'open' });
            const activeElement = document.createElement('span');

            innerShadow.appendChild(activeElement);
            outerShadow.appendChild(innerDiv);

            // Set active element in outer shadow to be the inner div
            Object.defineProperty(outerShadow, 'activeElement', {
                value: innerDiv,
                writable: true,
            });

            // Set active element in inner shadow to be the span
            Object.defineProperty(innerShadow, 'activeElement', {
                value: activeElement,
                writable: true,
            });

            const result = getActiveElement(outerShadow);
            expect(result).to.equal(activeElement);
        });
    });

    describe('edge cases', () => {
        it('should handle undefined parameter and fallback to document', () => {
            Object.defineProperty(document, 'activeElement', {
                value: mockElement,
                writable: true,
            });

            const result = getActiveElement(undefined);
            expect(result).to.equal(mockElement);
        });

        it('should work with different element types', () => {
            const buttonElement = document.createElement('button');
            Object.defineProperty(document, 'activeElement', {
                value: buttonElement,
                writable: true,
            });

            expect(getActiveElement()).to.equal(buttonElement);
        });
    });
});