module.exports = {
    pwa: {
        name: "Carbon Footprint",
        themeColor: "#15141a",
        msTileColor: '#eaae39',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        iconPaths: {
            favicon32: 'icon/favicon-32x32.png',
            favicon16: 'icon/favicon-16x16.png',
            appleTouchIcon: 'icon/apple-touch-icon.png',
            maskIcon: 'icon/safari-pinned-tab.svg',
            msTileImage: 'icon/mstile-150x150.png'
        },
        manifestOptions: {
            background_color: "#15141a",
            start_url: "/",
            icons: [
                {
                  src: 'icon/favicon-32x32.png',
                  sizes: '32x32',
                  type: 'image/png'
                },
                {
                  src: 'icon/favicon-16x16.png',
                  sizes: '16x16',
                  type: 'image/png'
                },
                {
                  src: 'icon/apple-touch-icon.png',
                  sizes: '152x152',
                  type: 'image/png'
                },
                {
                  src: 'icon/safari-pinned-tab.svg',
                  sizes: '942x942',
                  type: 'image/svg+xml'
                },
                {
                  src: 'icon/mstile-150x150.png',
                  sizes: '150x150',
                  type: 'image/png'
                },
                {
                    src: 'icon/android-chrome-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                src: 'icon/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png'
                },
            ]
        }
    }
}