/**
 *
 * @param {string} pageHref file name  of the page of the wrapper
 * @param {Function} callback a call back function to add eventListener
 * @returns {Promise<Element>} assemble elements loaded in a div element container
 */

export function loadPageByPromise(pageHref) {
    let pagePath = `/vues/${pageHref}`;
    return fetch(pagePath)
        .then(function (resp) {
            return resp.text();
        })
        .then(function (html) {
            let container = document.createElement('div');
            container.innerHTML = html;
            return container;
        });
}
