import { ChainablePromiseElement } from 'webdriverio';
export abstract class Page {
    abstract get parentLocator(): ChainablePromiseElement<WebdriverIO.Element>;
}