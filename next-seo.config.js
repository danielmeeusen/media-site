
export default {
  defaultTitle:  'MedisSite',
  openGraph: {
    title: 'MedisSite',
    type: 'website',
    locale: 'en_US',
    url: process.env.WEB_URI,
    images: [
      {
        url: '/image/ogHome.jpg',
      },
    ], 
    site_name: 'MedisSite',
  },   
  
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    },
    {
      name: 'application-name',
      content: 'MedisSite',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'Me',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'msapplication-config',
      content: '/browserconfig.xml',
    },    
    {
      name: 'msapplication-TileColor',
      content: '#000000'
    },
    {
      name: 'msapplication-tap-highlight',
      content: 'no'
    },
    {
      name: 'theme-color',
      content: '#000000'
    },
  ],
  
  additionalLinkTags: [
    {
      rel: 'apple-touch-icon',
      href: '/icon/apple-touch-icon.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '152x152',
      href: '/icon/apple-touch-icon-152x152.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/icon/apple-touch-icon-180x180.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/icon/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/icon/favicon-16x16.png'
    },
    {
      rel: 'manifest',
      href: '/manifest.webmanifest'
    },
    {
      rel: 'mask-icon',
      href: '/icon/safari-pinned-tab.svg',
      color: '#000000'
    },
    {
      rel: 'shortcut icon',
      href: '/icon/favicon.ico'
    },
    {
      rel: "apple-touch-startup-image",
      href: "splashscreens/iphone5_splash.png", 
      media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)", 
    },
    {
      rel: "apple-touch-startup-image",
      href: "splashscreens/iphone6_splash.png", 
      media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)", 
    },
    {
      rel: "apple-touch-startup-image",
      href: "splashscreens/iphoneplus_splash.png", 
      media: "(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)", 
    },
    {
      rel: "apple-touch-startup-image",
      href: "splashscreens/iphonex_splash.png", 
      media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)", 
    },
    {
      rel: "apple-touch-startup-image",
      href: "splashscreens/iphonexr_splash.png", 
      media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)", 
    },
    {
      rel: "apple-touch-startup-image",
      href: "splashscreens/iphonexsmax_splash.png", 
      media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)", 
    },
    {
      rel: "apple-touch-startup-image",
      href: "splashscreens/ipad_splash.png", 
      media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)", 
    },
    {
      rel: "apple-touch-startup-image",
      href: "splashscreens/ipadpro1_splash.png", 
      media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
    },
    {
      rel: "apple-touch-startup-image",
      href: "splashscreens/ipadpro3_splash.png", 
      media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
    },
    {
      rel: "apple-touch-startup-image",
      href: "splashscreens/ipadpro2_splash.png", 
      media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
    }
  ],
}
