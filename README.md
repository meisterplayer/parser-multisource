MultiSource plugin for Meister
==========

This plugin allows you to set multiple media types as one item. MultiSource automaticly choses the correct media type to play. It will start at the first item in the array and work it's way through the list until it finds an item that it can play.

MultiSource supports the standard item format so you can use any media item plugin with this plugin.

Getting started
----------

Simply configure the plugin and use it in the setItem

Example:

``` JavaScript
var meisterPlayer = new Meister('#player', {
    MultiSource: {},
});

meisterPlayer.setItem({
    sources: [
        // We first want to try playing the Dash stream
        {
            src: 'INSERT_MPD_LINK_HERE',
            type: 'mpd',
        },

        // If that doesn't work on the current browser try HLS
        {
            src: 'INSERT_HLS_LINK_HERE',
            type: 'm3u8',
        },

        // Our last resort is to give the user a mp4 stream
        {
            src: 'INSERT_MP4_LINK_HERE',
            type: 'mp4',
        },
    ],
    type: 'multi-source'
});

meisterPlayer.load();
```

Item options
---------

The following options are available for per item configuration.

### drmConfig *[Object]* (default: undefined) ###

This plugin apply's the drm config on every item in ```sources``` so you don't have to configure each item stand alone. This plugin depend on the [Drm plugin for Meister](https://github.com/meisterplayer/utility-drm) to work. Also see the [README](https://github.com/meisterplayer/utility-drm/blob/develop/README.md) there for config options.

Example:

``` JavaScript
var meisterPlayer = new Meister('#player', {
    MultiSource: {},
});

meisterPlayer.setItem({
    sources: [
        // We first want to try playing the Dash stream
        {
            src: 'INSERT_MPD_LINK_HERE',
            type: 'mpd',
        },

        // If that doesn't work on the current browser try HLS
        {
            src: 'INSERT_HLS_LINK_HERE',
            type: 'm3u8',
        },
    ],
    drmConfig: {
        widevine: { ... }
        playready: { ... }
        fairplay: { ... }
    },
    type: 'multi-source'
});

meisterPlayer.load();
```
