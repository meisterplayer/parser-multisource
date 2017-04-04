class MultiSource extends Meister.ParserPlugin {

    static get pluginName() {
        return 'MultiSource';
    }

    isItemSupported(item) { // eslint-disable-line
        return new Promise((resolve) => {
            if (item.type !== 'multi-source') {
                return resolve({
                    supported: false,
                    errorCode: Meister.ErrorCodes.WRONG_TYPE,
                });
            }

            return resolve({
                supported: true,
            });
        });
    }

    restructureItems(sources, hasDRM = false) { // eslint-disable-line
        const restructedItems = [];

        for (let i = 0; i < sources.length; i += 1) {
            const source = sources[i];

            const sourceHasDRM = Object.prototype.hasOwnProperty.call(source, 'drm');

            if (!sourceHasDRM) {
                source.drm = hasDRM;
            }

            restructedItems.push(source);
        }

        return restructedItems;
    }

    getItemToPlay(items) {
        const item = items[0];

        return this.meister.pluginLoader.getPluginByItem(item).then((plugin) => {
            if (plugin.errorCode && items.length > 1) {
                items.shift();
                return this.getItemToPlay(items);
            } else if (!plugin.errorCode) {
                return item;
            }

            this.meister.error(`Could not find plugin to play type: '${item.type}'.`, 'MLTSRC-0001', { title: 'Unable to play content.' });
            return null;
        });
    }

    process(item) {
        return new Promise((resolve, reject) => {
            const hasDRM = typeof item.drmConfig === 'object';
            item.sources = this.restructureItems(item.sources, hasDRM); // eslint-disable-line

            this.getItemToPlay(item.sources).then((newItem) => {
                if (newItem == null) {
                    reject(item);
                } else {
                    if (item.metadata) {
                        newItem.metadata = item.metadata; // eslint-disable-line
                    }

                    resolve(newItem);
                }
            });
        });
    }
}

Meister.registerPlugin(MultiSource.pluginName, MultiSource);
export default MultiSource;
