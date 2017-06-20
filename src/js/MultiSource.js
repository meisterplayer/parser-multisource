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
        this.currentItem = item;

        // Set default config
        if (typeof this.currentItem.switchItemOnError === 'undefined') {
            this.currentItem.switchItemOnError = true;
        }

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

                    if (this.currentItem.switchItemOnError) {
                        this.on('playerError', this.onPlayerError.bind(this));
                    }

                    resolve(newItem);
                }
            });
        });
    }

    onPlayerError() {
        // Unload our previous item.
        super.unload();

        // We can remove the first item in our sources since it's not able to play.
        const removedItem = this.currentItem.sources.shift();

        // Make sure we do have sources to play.
        if (!this.currentItem.sources.length) return;

        console.warn(`${MultiSource.pluginName}: Item '${removedItem.type}' ran into an error while playing. Switching items for optimal experience.`);

        // Now retry the whole flow.
        this.meister.setItem(this.currentItem);
        this.meister.load();
    }
}

Meister.registerPlugin(MultiSource.pluginName, MultiSource);
Meister.registerPlugin('multisource', MultiSource);
export default MultiSource;
